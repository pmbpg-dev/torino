export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startOnly = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const endOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  const diffTime = endOnly - startOnly;

  return diffTime / (1000 * 60 * 60 * 24);
};
