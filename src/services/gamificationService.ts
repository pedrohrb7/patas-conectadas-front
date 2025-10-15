import api from './api';

interface GamificationRule {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Ranking {
}

export const getGamificationRules = async (): Promise<GamificationRule[]> => {
  const response = await api.get('/gamification');
  return response.data;
};

export const getRanking = async (): Promise<Ranking[]> => {
  const response = await api.get('/gamification/ranking');
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getVolunteerGamification = async (volunteerId: string): Promise<any> => {
  const response = await api.get(`/gamification/volunteer/${volunteerId}`);
  return response.data;
};

export const getGamificationRuleById = async (id: string): Promise<GamificationRule> => {
  const response = await api.get(`/gamification/${id}`);
  return response.data;
};

export const createGamificationRule = async (ruleData: Omit<GamificationRule, 'id'>): Promise<GamificationRule> => {
  const response = await api.post('/gamification', ruleData);
  return response.data;
};

export const updateGamificationRule = async (id: string, ruleData: Partial<GamificationRule>): Promise<GamificationRule> => {
  const response = await api.put(`/gamification/${id}`, ruleData);
  return response.data;
};

export const deleteGamificationRule = async (id: string): Promise<void> => {
  await api.delete(`/gamification/${id}`);
};
