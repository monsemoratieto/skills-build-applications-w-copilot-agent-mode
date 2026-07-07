import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data || payload.results || [];

        if (isMounted) {
          setWorkouts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load workouts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && workouts.length === 0 && <p>No workouts available.</p>}
      <ul className="list-group">
        {workouts.map((workout, index) => (
          <li className="list-group-item" key={workout.id || workout._id || `${workout.title}-${index}`}>
            <strong>{workout.title || 'Workout'}</strong>
            <div className="text-muted">{workout.difficulty || 'Unknown difficulty'}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
