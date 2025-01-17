const parseNumber = (number, defaulValue) => {
  if (isNaN(parseInt(number))) {
    return defaulValue;
  }

  return parseInt(number);
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};