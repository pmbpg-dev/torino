export const getTourStatus = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  console.log(todayUTC);
  const startUTC = new Date(
    Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()),
  );
  const endUTC = new Date(
    Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()),
  );

  const dayToStart = Math.ceil((startUTC - todayUTC) / (24 * 60 * 60 * 1000));

  if (todayUTC < startUTC) {
    return {
      status: "yellow-600",
      label: `${dayToStart} روز تا برگذاری`,
    };
  }

  if (todayUTC >= startUTC && todayUTC <= endUTC) {
    return {
      status: "primary",
      label: "درحال برگذاری",
    };
  }

  return { status: "destructive", label: "به پایان رسیده" };
};
