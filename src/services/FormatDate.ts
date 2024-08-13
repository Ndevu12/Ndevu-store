function formatDateTime(dateTimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour format with AM/PM
    timeZone: 'UTC' // Explicitly set to UTC
  };

  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleDateString('en-US', options);
}
export default formatDateTime;
