import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    info: 'bg-blue-100',
    warning: 'bg-yellow-100',
  }[type] || 'bg-blue-100';

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
    warning: 'text-yellow-800',
  }[type] || 'text-blue-800';

  const icon = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertCircle size={20} />,
  }[type];

  return (
    <div className={`${bgColor} ${textColor} px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4`}>
      <div className="flex items-center gap-2">
        {icon}
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="hover:opacity-70">
        <X size={20} />
      </button>
    </div>
  );
};

export default Toast;
