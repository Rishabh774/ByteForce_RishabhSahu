function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🎟️ EventAdda</h1>
      <p>Hyper-Local Event Ticketing Platform</p>
      <button onClick={() => fetch('http://localhost:5000').then(r=>r.json()).then(console.log)}>
        Test API
      </button>
    </div>
  );
}
export default App;