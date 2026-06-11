import { useEffect, useState } from 'react';
import { fetchList } from '../apiConfig';

export default function Activities() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchList('activities/')
      .then((d) => mounted && setItems(d))
      .catch(() => mounted && setItems([]))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false };
  }, []);

  if (loading) return <div>Loading activities...</div>;
  if (!items.length) return <div>No activities found.</div>;

  return (
    <div>
      <h2>Activities</h2>
      <ul className="list-group">
        {items.map((a) => (
          <li key={a._id || a.id} className="list-group-item">
            <strong>{a.type}</strong> — {a.duration} min — {a.calories || 0} kcal
          </li>
        ))}
      </ul>
    </div>
  );
}
