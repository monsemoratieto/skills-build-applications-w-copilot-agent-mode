import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data || payload.results || [];

        if (isMounted) {
          setActivities(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load activities');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && activities.length === 0 && <p>No activities available.</p>}
      <ul className="list-group">
        {activities.map((activity, index) => (
          <li className="list-group-item" key={activity.id || activity._id || `${activity.type}-${index}`}>
            <strong>{activity.type || 'Activity'}</strong>
            <div className="text-muted">{activity.durationMinutes || 0} minutes</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
