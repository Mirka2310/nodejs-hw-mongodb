export const notFoundHandler = (_, res) => {
  res.status(404).json({
    message: 'Rout not found',
  });
};