import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'));
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data || payload.results || [];

        if (isMounted) {
          setUsers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load users');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users available.</p>}
      <ul className="list-group">
        {users.map((user, index) => (
          <li className="list-group-item" key={user.id || user._id || `${user.name}-${index}`}>
            <strong>{user.name || 'Unnamed user'}</strong>
            <div className="text-muted">{user.email || 'No email'}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
