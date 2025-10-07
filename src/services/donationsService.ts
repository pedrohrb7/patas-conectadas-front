import api from './api';

interface Donation {
  id: string;
  amount: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PeriodicReport {
}

export const getDonations = async (): Promise<Donation[]> => {
  const response = await api.get('/donations');
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPeriodicDonationsReport = async (params: any): Promise<PeriodicReport> => {
  const response = await api.get('/donations/reports/periodic', { params });
  return response.data;
};

export const getDonationById = async (id: string): Promise<Donation> => {
  const response = await api.get(`/donations/${id}`);
  return response.data;
};

export const createDonation = async (donationData: Omit<Donation, 'id'>): Promise<Donation> => {
  const response = await api.post('/donations', donationData);
  return response.data;
};

export const updateDonation = async (id: string, donationData: Partial<Donation>): Promise<Donation> => {
  const response = await api.put(`/donations/${id}`, donationData);
  return response.data;
};

export const deleteDonation = async (id: string): Promise<void> => {
  await api.delete(`/donations/${id}`);
};
