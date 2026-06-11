import { useEffect, useState } from 'react';
import { fetchList } from '../apiConfig';

export default function Teams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchList('teams/')
      .then((d) => mounted && setTeams(d))
      .catch(() => mounted && setTeams([]))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false };
  }, []);

  if (loading) return <div>Loading teams...</div>;
  if (!teams.length) return <div>No teams found.</div>;

  return (
    <div>
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((t) => (
          <li key={t._id || t.id} className="list-group-item">
            <strong>{t.name}</strong> — {t.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
