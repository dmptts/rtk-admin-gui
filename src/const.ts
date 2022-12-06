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

export interface ModelConfig {
  id: number,
  model: string,
  region: string,
  configuration: string,
  login: string,
  password: string,
  super_password: string,
}

export enum TableHeadings {
  id = 'ID',
  name = 'Имя',
  description = 'Описание',
  gateway_id = 'ID шлюза',
  ip = 'IP',
  login = 'Логин',
  password = 'Пароль',
  type = 'Тип',
  title = 'Название',
  host = 'Хост',
  region = 'Регион',
  model = 'Модель',
  configuration = 'Конфигурация',
  super_password = 'Привелегированный пароль',
  status = 'Статус'
}