import { useEffect, useState } from 'react';
import { fetchList } from '../apiConfig';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchList('users/')
      .then((d) => mounted && setUsers(d))
      .catch(() => mounted && setUsers([]))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false };
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (!users.length) return <div>No users found.</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((u) => (
          <li key={u._id || u.id} className="list-group-item">
            {u.username || `${u.profile?.firstName || ''} ${u.profile?.lastName || ''}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
