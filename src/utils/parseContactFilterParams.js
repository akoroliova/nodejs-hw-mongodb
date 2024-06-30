import { typeList } from '../constants/contacts-constants.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (!['true', 'false'].includes(value)) return;

  const parsedValue = Boolean(value);

  return parsedValue;
};
const parseContactFilterParams = ({ contactType, isFavourite }) => {
  const parsedType = typeList.includes(contactType) ? contactType : null;
  const parsedFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedFavourite,
  };
};

export default parseContactFilterParams;
