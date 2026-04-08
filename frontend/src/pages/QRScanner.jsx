import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode/esm';
import { bookingAPI, eventAPI } from '../utils/apiCalls';
import Toast from '../components/Toast';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [toast, setToast] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const scannerRef = useRef(null);
  const htmlScannerRef = useRef(null);

  useEffect(() => {
    fetchOrganizerEvents();
  }, []);

  const fetchOrganizerEvents = async () => {
    try {
      const response = await eventAPI.getOrganizerEvents();
      setEvents(response.data.events);
    } catch (error) {
      setToast({ message: 'Failed to fetch events', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const startScanning = (eventId) => {
    const event = events.find(e => e._id === eventId);
    setSelectedEvent(event);
    setScanHistory([]);
    setScanning(true);

    // Initialize scanner
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        'qr-scanner-container',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        async (decodedText) => {
          // Parse the QR code data
          let qrData;
          try {
            qrData = JSON.parse(decodedText);
          } catch (e) {
            setToast({
              message: '❌ Invalid QR code format',
              type: 'error',
            });
            return;
          }

          const { ticketId, bookingId } = qrData;

          // Verify attendance
          try {
            const response = await bookingAPI.verifyAttendance({
              ticketId,
              bookingId,
            });

            if (response.data.success) {
              setScanHistory(prev => [
                {
                  ticketId,
                  status: 'success',
                  message: 'Ticket verified ✅',
                  time: new Date().toLocaleTimeString(),
                },
                ...prev,
              ]);
              setToast({
                message: `✅ Ticket ${ticketId.slice(0, 8)}... verified!`,
                type: 'success',
              });
            }
          } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to verify ticket';
            setScanHistory(prev => [
              {
                ticketId,
                status: 'error',
                message: `❌ ${errorMsg}`,
                time: new Date().toLocaleTimeString(),
              },
              ...prev,
            ]);
            setToast({
              message: errorMsg,
              type: 'error',
            });
          }
        },
        (error) => {
          // Ignore scanning errors (normal when no QR detected)
        }
      );

      htmlScannerRef.current = scanner;
    }, 100);
  };

  const stopScanning = async () => {
    if (htmlScannerRef.current) {
      try {
        await htmlScannerRef.current.clear();
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    setScanning(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (scanning && selectedEvent) {
    return (
      <div className="min-h-screen bg-light py-8">
        <div className="max-w-4xl mx-auto px-4">
          {toast && (
            <div className="mb-4">
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
              />
            </div>
          )}

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={stopScanning}
              className="p-2 hover:bg-gray-200 rounded-lg transition"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold">{selectedEvent.title}</h1>
              <p className="text-gray-600">Scan tickets to verify attendance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Scanner */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div id="qr-scanner-container" className="w-full"></div>
              </div>
            </div>

            {/* Scan History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Scan History</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {scanHistory.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No tickets scanned yet
                  </p>
                ) : (
                  scanHistory.map((entry, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg flex items-start gap-2 ${
                        entry.status === 'success'
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      {entry.status === 'success' ? (
                        <Check size={20} className="text-green-600 mt-0.5" />
                      ) : (
                        <X size={20} className="text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-semibold">
                          {entry.ticketId.slice(0, 8)}...
                        </p>
                        <p className="text-xs text-gray-600">
                          {entry.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {entry.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">QR Code Scanner</h1>
          <p className="text-gray-600">Select an event to start scanning tickets</p>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">No events found</p>
            <button
              onClick={() => navigate('/organizer-dashboard')}
              className="text-primary hover:underline"
            >
              Create an event first
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => startScanning(event._id)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {event.description}
                  </p>
                  <div className="space-y-1 text-sm text-gray-500 mb-4">
                    <p>📍 {event.venue?.city}</p>
                    <p>👥 {event.totalTicketsBooked || 0} tickets booked</p>
                  </div>
                  <button
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition font-semibold"
                  >
                    Start Scanning
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
