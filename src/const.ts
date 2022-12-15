const BASE_URL = 'https://my-json-server.typicode.com/dmptts/admin-db'

export const ApiUrls = {
  gateways: () => `${BASE_URL}/gateways`,
  gateway: (id: number) => `${BASE_URL}/gateways/${id}`,
  modelConfigs: () => `${BASE_URL}/models`,
  modelConfig: (id: number) => `${BASE_URL}/models/${id}`,
};

export interface Gateway {
  id: number,
  ip: string,
  login: string,
  password: string,
  type: number,
};

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
  'gateway_id',
  'name',
  'model',
  'region',
  'ip',
  'login',
  'type',
  'title',
  'host',
  'configuration',
  'description',
  'status',
  'password',
  'super_password',
]