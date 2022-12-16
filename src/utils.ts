import { propertiesOrder } from './const';
import * as yup from 'yup';

export const sortPropertiesByTemplate = (a: string, b: string) => {
  const aIndex = propertiesOrder.findIndex((key) => key === a);
  const bIndex = propertiesOrder.findIndex((key) => key === b);
  return aIndex - bIndex;
};

export const validationSchema = yup.object().shape({
  model: yup.string().required(),
  region: yup.string().required(),
  configuration: yup.string().required(),
  login: yup.string().required(),
  password: yup.string().required(),
  super_password: yup.string().required(),
});