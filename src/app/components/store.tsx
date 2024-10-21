'use client'

import { useEffect } from 'react';
import { useEvaluationStore } from '@/lib/store';

export default function EvaluationList() {
  const { evaluations, loading, error, fetchEvaluations } = useEvaluationStore();

  useEffect(() => {
    fetchEvaluations();
  }, [fetchEvaluations]);

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