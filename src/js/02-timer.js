import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix, { Notify } from 'notiflix';

const startButton = document.querySelector('button[data-start]')
const dateInput = document.querySelector('input')
const picker = document.querySelector('#datetime-picker');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]')

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] <= options.defaultDate) {
          startButton.disabled = true;
          return Notify.failure("Please choose a date in the future");

      } else {
          startButton.disabled = false;
          return parseDate(selectedDates);
      }
  },
};

let date = flatpickr(picker, options);
let selectedInMs = null;


startButton.addEventListener('click', (() => {
    dateInput.disabled = true;
    const timer = setInterval(() => {
        const deltaTime = selectedInMs - Date.now();
        const remainingMs = convertMs(deltaTime);
        if (selectedInMs - Date.now() > 0) {
            timeMarkup(remainingMs);

        } else {
            clearInterval(timer)
            Notify.success('Time is up!')
            startButton.disabled = false;
            dateInput.disabled = false;
        }
        
    }, 1000);
    startButton.disabled = true;
}));

function parseDate(date) {
    return selectedInMs = Date.parse(date)
}
// let remainingMs = convertMs(clickMs);
function timeMarkup({ days, hours, minutes, seconds }) {
    timerDays.textContent = `${days}`;
    timerHours.textContent = `${hours}`;
    timerMinutes.textContent = `${minutes}`;
    timerSeconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}