import { propertiesOrder } from './const';
import * as yup from 'yup';

export const sortPropertiesByTemplate = (a: string, b: string) => {
  const aIndex = propertiesOrder.findIndex((key) => key === a);
  const bIndex = propertiesOrder.findIndex((key) => key === b);
  return aIndex - bIndex;
};

export const modelConfigValidationSchema = yup.object().shape({
  model: yup
    .string()
    .required('Обязательно для заполнения'),
  region: yup
    .string()
    .min(3, 'Минимальное кол-во символов: 3')
    .max(4, 'Максимальное кол-во символов: 4')
    .matches(/^[A-Z]{3,4}$/, 'Только заглавные латинские символы')
    .required('Обязательно для заполнения'),
  configuration: yup
    .string()
    .required('Обязательно для заполнения'),
  login: yup
    .string()
    .min(4, 'Минимум 4 символа')
    .matches(/^[A-Za-z0-9#^*&%!@_-]{4,}$/, 'Только латинница и спец. символы')
    .required('Обязательно для заполнения'),
  password: yup
    .string()
    .min(4, 'Минимум 4 символа')
    .matches(/^[A-Za-z0-9#^*&%!@_-]{4,}$/, 'Только латинница и спец. символы')
    .required('Обязательно для заполнения'),
  super_password: yup
    .string()
    .min(4, 'Минимум 4 символа')
    .matches(/^[A-Za-z0-9#^*&%!@_-]{4,}$/, 'Только латинница и спец. символы')
    .required('Обязательно для заполнения'),
});

export const gatewayValidationSchema = yup.object().shape({
  ip: yup
    .string()
    .matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, 'Только в формате \'1.1.1.1\'')
    .required('Обязательно для заполнения'),
  type: yup
    .string()
    .required('Обязательно для заполнения'),
  login: yup
    .string()
    .min(4, 'Минимум 4 символа')
    .matches(/^[A-Za-z0-9#^*&%!@_-]{4,}$/, 'Только латинница и спец. символы')
    .required('Обязательно для заполнения'),
  password: yup
    .string()
    .min(4, 'Минимум 4 символа')
    .matches(/^[A-Za-z0-9#^*&%!@_-]{4,}$/, 'Только латинница и спец. символы')
    .required('Обязательно для заполнения'),
});

export const regionValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Минимальное кол-во символов: 3')
    .max(4, 'Максимальное кол-во символов: 4')
    .matches(/^[A-Z]{3,4}$/, 'Только заглавные латинские символы')
    .required('Обязательно для заполнения'),
  description: yup
    .string()
    .required('Обязательно для заполнения'),
  gateway_id: yup
    .string()
    .matches(/^\d+$/, 'Только числа')
    .required('Обязательно для заполнения'),
});

export const hostValidationSchema = yup.object().shape({
  ip: yup
    .string()
    .matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, 'Только в формате \'1.1.1.1\'')
    .required('Обязательно для заполнения'),
  name: yup
    .string()
    .required('Обязательно для заполнения'),
  host: yup
    .string()
    .required('Обязательно для заполнения'),
  region: yup
    .string()
    .min(3, 'Минимальное кол-во символов: 3')
    .max(4, 'Максимальное кол-во символов: 4')
    .matches(/^[A-Z]{3,4}$/, 'Только заглавные латинские символы')
    .required('Обязательно для заполнения'),
  model: yup
    .string()
    .required('Обязательно для заполнения'),
  type: yup
    .string()
    .required('Обязательно для заполнения'),
  configuration: yup
    .string()
    .required('Обязательно для заполнения'),
  login: yup
    .string()
    .min(4, 'Минимум 4 символа')
    .matches(/^[A-Za-z0-9#^*&%!@_-]{4,}/, 'Только латинница и спец. символы')
    .required('Обязательно для заполнения'),
  password: yup
    .string()
    .min(4, 'Минимум 4 символа')
    .matches(/^[A-Za-z0-9#^*&%!@_-]{4,}/, 'Только латинница и спец. символы')
    .required('Обязательно для заполнения'),
  super_password: yup
    .string()
    .min(4, 'Минимум 4 символа')
    .matches(/^[[A-Za-z0-9#^*&%!@_-]{4,}/, 'Только латинница и спец. символы')
    .required('Обязательно для заполнения'),
  status: yup
    .string()
    .matches(/^\d+$/, 'Только цифры')
    .required('Обязательно для заполнения'),
});

export type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export interface IPatchData<T extends { id: number, [key: string]: any }> {
  id: number,
  payload: AtLeastOne<Omit<T, 'id'>>
}