export const getWeekNumber = (date) => {
    if (!date) {
      date = new Date();
  }
  const year = date.getFullYear();
  let yearStart = new Date(year, 0, 1, 19, 0, 0); // 1 de enero a las 19:00 AM
  let actualYear = year;
  yearStart.setDate(yearStart.getDate() + ((3 - yearStart.getDay()) + 7) % 7);
  
  if (yearStart > date) {
      yearStart = new Date(year - 1, 0, 1, 19, 0, 0);
      yearStart.setDate(yearStart.getDate() + ((3 - yearStart.getDay()) + 7) % 7);
      actualYear -= 1;
  }
  
  const diffDays = Math.floor((date - yearStart) / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7) + 1;
  
    // Devolver el número de semana y el año correspondiente
    return `${weekNumber}-${actualYear}`;
}

const date = new Date(2024, 0, 9, 19, 0, 0)

console.log(date)
console.log(getWeekNumber(date))