const BASE_URL = 'https://my-json-server.typicode.com/dmptts/admin-db'

export const ApiUrls = {
  fetchGateways: () => `${BASE_URL}/gateways`,
  patchGateway: (id: number) => `${BASE_URL}/gateways/${id}`,
};

export interface Gateway {
  id: number,
  ip: string,
  login: string,
  password: string,
  type: number,
}