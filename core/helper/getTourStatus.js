export const getTourStatus = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const startUTC = new Date(
    Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()),
  );
  const endUTC = new Date(
    Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()),
  );

  const dayToStart = Math.ceil((startUTC - todayUTC) / (24 * 60 * 60 * 1000));

  if (todayUTC < startUTC) {
    return {
      status: "upcoming",
      label: `${dayToStart} روز تا برگذاری`,
    };
  }

  if (todayUTC >= startUTC && todayUTC <= endUTC) {
    return {
      status: "ongoing",
      label: "درحال برگذاری",
    };
  }

  return { status: "ended", label: "به پایان رسیده" };
};
