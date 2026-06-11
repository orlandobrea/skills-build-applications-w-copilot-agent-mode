import { useEffect, useState } from 'react';
import { fetchList } from '../apiConfig';

export default function Workouts() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchList('workouts/')
      .then((d) => mounted && setItems(d))
      .catch(() => mounted && setItems([]))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false };
  }, []);

  if (loading) return <div>Loading workouts...</div>;
  if (!items.length) return <div>No workouts found.</div>;

  return (
    <div>
      <h2>Workouts</h2>
      <ul className="list-group">
        {items.map((w) => (
          <li key={w._id || w.id} className="list-group-item">
            <strong>{w.name}</strong> — {w.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
