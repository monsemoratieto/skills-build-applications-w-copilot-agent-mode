import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'));
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data || payload.results || [];

        if (isMounted) {
          setTeams(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load teams');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && teams.length === 0 && <p>No teams available.</p>}
      <ul className="list-group">
        {teams.map((team, index) => (
          <li className="list-group-item" key={team.id || team._id || `${team.name}-${index}`}>
            <strong>{team.name || 'Unnamed team'}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
