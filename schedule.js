const calendarDates = document.getElementById("calendar-dates");

const monthYear = document.getElementById("month-year");

const timeSlots = document.getElementById("time-slots");

const prevBtn = document.getElementById("prev");

const nextBtn = document.getElementById("next");


let currentDate = new Date();

let selectedDate = null;

let selectedTime = null;


const availableTimes = [
    "09:00 AM",
    "10:30 AM",
    "01:00 PM",
    "03:30 PM"
];


// DISPLAY CALENDAR

function renderCalendar() {

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const lastDate = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = currentDate.toLocaleString(
        "default",
        {
            month: "long",
            year: "numeric"
        }
    );

    calendarDates.innerHTML = "";

    // Empty spaces before first day

    for (let i = 0; i < firstDay; i++) {

        calendarDates.innerHTML += "<span></span>";

    }


//    Generate calender dates


    const today = new Date();

    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= lastDate; day++) {

        const date = new Date(year, month, day);

        const button = document.createElement("button");

        button.textContent = day;

        button.disabled = date < today;

        if (
            selectedDate &&
            date.toDateString() === selectedDate.toDateString()
        ) {
            button.classList.add("selected");
        }

        button.addEventListener("click", function () {

            selectedDate = date;

            selectedTime = null;

            renderCalendar();

            renderTimes();

        });

        calendarDates.appendChild(button);

    }

}


// DISPLAY AVAILABLE TIMES

function renderTimes() {

    timeSlots.innerHTML = "";

    if (!selectedDate) {

        timeSlots.innerHTML =
            "<p>Select a date to see available times.</p>";

        return;

    }

    availableTimes.forEach(function(time) {

        const button = document.createElement("button");

        button.textContent = time;

        if (selectedTime === time) {

            button.classList.add("selected");

        }

        button.addEventListener("click", function() {

            selectedTime = time;

            renderTimes();

        });

        timeSlots.appendChild(button);

    });

}


// PREVIOUS MONTH

prevBtn.addEventListener("click", function() {

    const today = new Date();

    const previousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
    );

    if (
        previousMonth.getFullYear() < today.getFullYear() ||
        (
            previousMonth.getFullYear() === today.getFullYear() &&
            previousMonth.getMonth() < today.getMonth()
        )
    ) {
        return;
    }

    currentDate = previousMonth;

    selectedDate = null;

    selectedTime = null;

    renderCalendar();

    renderTimes();

});


// NEXT MONTH

nextBtn.addEventListener("click", function() {

    currentDate.setMonth(currentDate.getMonth() + 1);

    selectedDate = null;

    selectedTime = null;

    renderCalendar();

    renderTimes();

});


// FORM SUBMISSION

document.getElementById("booking-form")
.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!selectedDate || !selectedTime) {

        alert("Please select a date and time.");

        return;

    }

    alert(
        "Booking request submitted for " +
        selectedDate.toDateString() +
        " at " +
        selectedTime
    );

});


// INITIALIZE

renderCalendar();

renderTimes();