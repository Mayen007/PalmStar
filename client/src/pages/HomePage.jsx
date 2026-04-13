import { useEffect, useState } from 'react';

function HomePage() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadHealth() {
      try {
        const response = await fetch('/api/health');
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
    <section>
      <h1>Welcome to PalmStar</h1>
      <p>This is the React home page and it is connected to the API.</p>

      {loading && <p className="status">Checking API health...</p>}
      {!loading && error && <p className="status error">API error: {error}</p>}

      {!loading && !error && health && (
        <div className="status success">
          <p>Status: {health.status}</p>
          <p>Service: {health.service}</p>
          <p>Time: {health.timestamp}</p>
        </div>
      )}
    </section>
  );
}

export default HomePage;
