export default function formatDate(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();

  let month = newDate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = newDate.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
}
