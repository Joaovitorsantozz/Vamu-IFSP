export const isValidTime = (time: string) => {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
};