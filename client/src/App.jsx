import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHealth() {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw new Error(`Health check failed: ${response.status}`);
        }

        const data = await response.json();
        setHealth(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadHealth();
  }, []);

  return (
    <main className="app">
      <h1>PalmStar Client</h1>
      <p>Minimal React app connected to the Express API.</p>

      {loading && <p className="status">Checking API health...</p>}

      {!loading && error && <p className="status error">API error: {error}</p>}

      {!loading && !error && health && (
        <div className="status success">
          <p>Status: {health.status}</p>
          <p>Service: {health.service}</p>
          <p>Time: {health.timestamp}</p>
        </div>
      )}
    </main>
  );
}

export default App;
