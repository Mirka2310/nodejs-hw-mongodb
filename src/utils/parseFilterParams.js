const parseFavoriteContacts = (favourite) => {
  const isString = typeof favourite === 'string';
  if (!isString) return;
  const isFavouriteContact = (favourite) =>
    ['true', 'false'].includes(favourite);
  if (isFavouriteContact(favourite)) return favourite;
};

const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isContactType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isContactType(type)) return type;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;
  const parsedFavorite = parseFavoriteContacts(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    isFavourite: parsedFavorite,
    contactType: parsedContactType,
  };
};