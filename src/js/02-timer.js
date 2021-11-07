import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]')
const picker = document.querySelector('#datetime-picker');
const now = new Date();

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
          window.alert("Please choose a date in the future")

      } else {
          startButton.disabled = false;
          console.log(selectedDates[0].getTime());
          console.log(this.defaultDate);
      }
  },
};

let date = flatpickr(picker, options);

// console.log(date.selectedDates[0].getTime() - now.getTime());

// const pickedDate = date.selectedDates.getTime();


// convertMs(date.selectedDates[0].getTime())

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}