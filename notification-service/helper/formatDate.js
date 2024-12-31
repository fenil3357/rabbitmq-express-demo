export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const weekday = date.toLocaleString('default', { weekday: 'long' });
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  const formattedHours = hours % 12 || 12; // Convert 24h to 12h format

  // Add ordinal suffix (1st, 2nd, 3rd, etc.)
  const ordinalSuffix = (n) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${ordinalSuffix(day)} ${month} ${weekday} at ${formattedHours}:${minutes} ${period}`;
}