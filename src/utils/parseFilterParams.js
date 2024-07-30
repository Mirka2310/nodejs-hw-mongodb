export const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'boolean') {
    return isFavourite;
  } else if (typeof isFavourite === 'string') {
    if (isFavourite.toLowerCase() === 'true') {
      return true;
    } else if (isFavourite.toLowerCase() === 'false') {
      return false;
    }
  }
  return undefined;
};

const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return;

  const lowerType = contactType.toLowerCase();
  if (['work', 'home', 'personal'].includes(lowerType)) {
    return lowerType;
  }
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedFavorite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    isFavourite: parsedFavorite,
    contactType: parsedContactType,
  };
};