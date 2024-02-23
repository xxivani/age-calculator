
function calculateAge() {
  const dayInput = document.getElementById('DD').value;
  const monthInput = document.getElementById('MM').value;
  const yearInput = document.getElementById('YYYY').value;

  if (dayInput === '' || monthInput === '' || yearInput === '') {
    alert('Please fill in all fields');
    return;
  }

  const birthDate = new Date(yearInput, monthInput - 1, dayInput);
  const today = new Date();

  // Calculate age
  const age = calculateAgeFromDate(birthDate, today);

  displayAge(age);
}

function calculateAgeFromDate(birthDate, today) {
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  // Adjust age if birthday hasn't occurred yet this year
  if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
    ageYears--;
    ageMonths += 12;
  }

  // Calculate months and days since last birthday
  const lastBirthday = new Date(today.getFullYear() - ageYears, birthDate.getMonth(), birthDate.getDate());
  if (lastBirthday > today) {
    lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
  }
  const monthsSinceLastBirthday = today.getMonth() - lastBirthday.getMonth() + (12 * (today.getFullYear() - lastBirthday.getFullYear()));
  const daysSinceLastBirthday = Math.ceil((today - lastBirthday) / (1000 * 60 * 60 * 24));

  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
    monthsSinceLastBirthday: monthsSinceLastBirthday,
    daysSinceLastBirthday: daysSinceLastBirthday
  };
}

function displayAge(age) {
  document.querySelector('.years').textContent = age.years;
  document.querySelector('.months').textContent = age.months;
  document.querySelector('.days').textContent = age.days;
  document.querySelector('.monthsSinceLastBirthday').textContent = age.monthsSinceLastBirthday;
  document.querySelector('.daysSinceLastBirthday').textContent = age.daysSinceLastBirthday;
}