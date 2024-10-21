import create from 'zustand';
import { api } from './api';

interface Evaluation {
  _id: string;
  title: string;
  // ... otros campos
}

interface EvaluationStore {
  evaluations: Evaluation[];
  loading: boolean;
  error: string | null;
  fetchEvaluations: () => Promise<void>;
  addEvaluation: (evaluation: Omit<Evaluation, '_id'>) => Promise<void>;
}

export const useEvaluationStore = create<EvaluationStore>((set) => ({
  evaluations: [],
  loading: false,
  error: null,
  fetchEvaluations: async () => {
    set({ loading: true });
    try {
      const evaluations = await api.get('/evaluations');
      set({ evaluations, loading: false, error: null });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  addEvaluation: async (evaluation) => {
    try {
      const newEvaluation = await api.post('/evaluations', evaluation);
      set((state) => ({
        evaluations: [...state.evaluations, newEvaluation],
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));