const BASE_URL = 'https://my-json-server.typicode.com/dmptts/admin-db'

export const ApiUrls = {
  gateways: () => `${BASE_URL}/gateways`,
  gateway: (id: number) => `${BASE_URL}/gateways/${id}`,
  models: () => `${BASE_URL}/models`,
  model: (id: number) => `${BASE_URL}/models/${id}`,
};

export interface Gateway {
  id: number,
  ip: string,
  login: string,
  password: string,
  type: number,
}

export interface Model {
  id: number,
  model: string,
  region: string,
  configuration: string,
  login: string,
  password: string,
  super_password: string,
}