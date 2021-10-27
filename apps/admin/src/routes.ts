export const routes = {
  home: '/',
  auth: '/auth',
  transactions: '/transactions',
  clients: '/clients',
  client: (id: string) => `/clients/${id}`,
  currentCompany: '/companies/current',
  settings: '/settings',
  pos: '/pos',
};
