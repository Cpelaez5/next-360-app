'use client'

import { useState, useEffect } from 'react';
import { api } from '../../lib/api';

export default function EvaluationList() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvaluations() {
      try {
        const data = await api.get('/evaluations');
        setEvaluations(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchEvaluations();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {evaluations.map((evaluation) => (
        <li key={evaluation._id}>{evaluation.title}</li>
      ))}
    </ul>
  );
}