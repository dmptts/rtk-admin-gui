const BASE_URL = 'https://my-json-server.typicode.com/dmptts/admin-db'

export const ApiUrls = {
  gateways: () => `${BASE_URL}/gateways`,
  gateway: (id: number) => `${BASE_URL}/gateways/${id}`,
  modelConfigs: () => `${BASE_URL}/models`,
  modelConfig: (id: number) => `${BASE_URL}/models/${id}`,
  regions: () => `${BASE_URL}/regions`,
  region: (id: number) => `${BASE_URL}/regions/${id}`,
  hosts: () => `${BASE_URL}/hosts`,
  host: (id: number) => `${BASE_URL}/hosts/${id}`,
};

export interface IGateway {
  id: number,
  ip: string,
  login: string,
  password: string,
  type: number,
};

export type GatewayPostData = Omit<IGateway, 'id'>;

export interface IModelConfig {
  id: number,
  model: string,
  region: string,
  configuration: string,
  login: string,
  password: string,
  super_password: string,
};

export type ModelConfigPostData = Omit<IModelConfig, 'id'>;

export interface IRegion {
  id: number,
  name: string,
  description: string,
  gateway_id: number
};

export type RegionPostData = Omit<IRegion, 'id'>;

export interface IHost {
  id: number,
  ip: string,
  title: string,
  host: string,
  region: string,
  model: string,
  type: string,
  name: string,
  configuration: string,
  login: string,
  password: string,
  super_password: string,
  status: number,
}

export type HostPostData = Omit<IHost, 'id'>;
  
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
];

export interface IAlert {
  message: string,
  type: 'success' | 'error' | '',
};

export enum InputPlaceholders {
  id = '7',
  name = 'MSK',
  region = 'MSK',
  gateway_id = '142',
  ip = '1.1.1.1',
  login = 'rst-user',
  password = 'pass-example',
  type = 'type',
  title = 'ADd2',
  host = 'someHost',
  model = 'Mds23-4',
  description = 'some description',
  configuration = 'someConfig',
  super_password = 'super-pass',
  status = '0'
};
