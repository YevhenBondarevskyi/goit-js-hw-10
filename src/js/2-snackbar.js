import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form");
formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const { delay, state } = event.target.elements;
    const delayValue = +delay.value;
    const stateValue = state.value;

    createPromise(delayValue, stateValue)
        .then((delay) => {
            iziToast.success({
                title: "Success",
                message: `Fulfilled promise in ${delay}ms`,
                position: "topRight",
            });
            console.log(`✅ Fulfilled promise in ${delay}ms`);
        })
        .catch((delay) => {
            iziToast.error({
                title: "Error",
                message: `Rejected promise in ${delay}ms`,
                position: "topRight",
            });
            console.log(`❌ Rejected promise in ${delay}ms`);
        })
};

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
};