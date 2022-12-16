const BASE_URL = 'https://my-json-server.typicode.com/dmptts/admin-db'

export const ApiUrls = {
  gateways: () => `${BASE_URL}/gateways`,
  gateway: (id: number) => `${BASE_URL}/gateways/${id}`,
  modelConfigs: () => `${BASE_URL}/models`,
  modelConfig: (id: number) => `${BASE_URL}/models/${id}`,
  regions: () => `${BASE_URL}/regions`,
  region: (id: number) => `${BASE_URL}/regions/${id}`
};

export interface Gateway {
  id: number,
  ip: string,
  login: string,
  password: string,
  type: number,
};

export type GatewayPostData = Omit<Gateway, 'id'>;

export interface ModelConfig {
  id: number,
  model: string,
  region: string,
  configuration: string,
  login: string,
  password: string,
  super_password: string,
};

export type ModelConfigPostData = Omit<ModelConfig, 'id'>;

export interface Region {
  id: number,
  name: string,
  description: string,
  gateway_id: number
};

export type RegionPostData = Omit<Region, 'id'>;
  
export enum DataHeadingsTranslations {
  id = 'ID',
  name = 'Имя',
  region = 'Регион',
  gateway_id = 'ID шлюза',
  ip = 'IP',
  login = 'Логин',
  password = 'Пароль',
  type = 'Тип',
  title = 'Название',
  host = 'Хост',
  model = 'Модель',
  description = 'Описание',
  configuration = 'Конфигурация',
  super_password = 'Привелегированный пароль',
  status = 'Статус'
};

export const propertiesOrder = [
  'id',
  'name',
  'model',
  'region',
  'ip',
  'type',
  'title',
  'host',
  'configuration',
  'description',
  'status',
  'gateway_id',
  'login',
  'password',
  'super_password',
]