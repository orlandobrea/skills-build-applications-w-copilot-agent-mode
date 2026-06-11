import { useEffect, useState } from 'react';
import { fetchList } from '../apiConfig';

export default function Leaderboard() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchList('leaderboard/')
      .then((d) => mounted && setRows(d))
      .catch(() => mounted && setRows([]))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false };
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (!rows.length) return <div>No leaderboard entries.</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {rows.map((r) => (
          <li key={r._id || r.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{r.userId?.username || r.userId?.email || r.userId}</div>
              Score: {r.score}
            </div>
            <span className="badge bg-primary rounded-pill">#{r.rank}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
