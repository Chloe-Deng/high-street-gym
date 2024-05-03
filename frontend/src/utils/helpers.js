export function formatIsoDateToDateTime(isoDate) {
  const date = new Date(isoDate);
  return date.toISOString().replace("T", "  ").slice(0, 20);
}

export function formatUtcDateWithOffset(dateString, dayOffset = 1) {
  const date = new Date(dateString);

  // Add the specified day offset
  date.setUTCDate(date.getUTCDate() + dayOffset);

  // Extract the UTC date parts
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed, add 1
  const dd = String(date.getUTCDate()).padStart(2, "0");

  // Return the formatted date string 'YYYY-MM-DD'
  return `${yyyy}-${mm}-${dd}`;
}
