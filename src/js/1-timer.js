import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("[data-start]");
const dateTimePicker = document.querySelector("#datetime-picker");

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

startBtn.addEventListener("click", onclick);

let userSelectedDate = null;
let intervalId = null;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const pickedDate = selectedDates[0];
        if (pickedDate && pickedDate > new Date()) {
            userSelectedDate = pickedDate;
            startBtn.disabled = false;
        } else {
            userSelectedDate = null;
            startBtn.disabled = true;

            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
                position: "topRight",
            });
        }
    },
  };

flatpickr(dateTimePicker, options);

function onclick() {
    if (!userSelectedDate) {
        return;
    };

    startBtn.disabled = true;
    dateTimePicker.disabled = true;

    intervalId = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = userSelectedDate - currentTime;

        if (deltaTime <= 0) {
            clearInterval(intervalId);
            updateTimerDisplay(0, 0, 0, 0);

            iziToast.info({
                title: "Info",
                message: "Countdown finished!",
                position: "topRight",
            });

            dateTimePicker.disabled = false;
            startBtn.disabled = true;

            return;
        }

        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        updateTimerDisplay(days, hours, minutes, seconds);
    }, 1000);

};

function updateTimerDisplay(days, hours, minutes, seconds) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

  