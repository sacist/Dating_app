const getAgeFromDOB=(dob: string): number=> {
    const monthsMap: Record<string, number> = {
      'Января': 0,
      'Февраля': 1,
      'Марта': 2,
      'Апреля': 3,
      'Мая': 4,
      'Июня': 5,
      'Июля': 6,
      'Августа': 7,
      'Сентября': 8,
      'Октября': 9,
      'Ноября': 10,
      'Декабря': 11
    };
  
    const [dayStr, monthStr, yearStr] = dob.split('/');
    const day = parseInt(dayStr);
    const month = monthsMap[monthStr];
    const year = parseInt(yearStr);
  
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      throw new Error("Неверный формат даты");
    }
  
    const birthDate = new Date(year, month, day);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
  
    const isBeforeBirthday =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
  
    if (isBeforeBirthday) {
      age--;
    }
  
    return age;
  }
  
export default getAgeFromDOB