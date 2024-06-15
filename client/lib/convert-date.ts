export const dateFormat = (dateInput: string) => {
  let date = new Date(dateInput);

  // Extract day, month, and year
  let day = String(date.getUTCDate()).padStart(2, "0");
  let month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  let year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
