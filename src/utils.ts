import { propertiesOrder } from './const';

export const sortPropertiesByTemplate = (a: string, b: string) => {
  const aIndex = propertiesOrder.findIndex((key) => key === a);
  const bIndex = propertiesOrder.findIndex((key) => key === b);
  return aIndex - bIndex;
};