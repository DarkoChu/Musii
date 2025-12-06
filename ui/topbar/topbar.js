function updateGreeting() {
    const greetingEl = document.getElementById("greeting-text");
    const now = new Date();
    const hour = now.getHours();

    let greeting = "Hello! Looks like your clock's broken :c";

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning!";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon!";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening!";
    } else {
        greeting = "Good Night!";
    }

    greetingEl.textContent = greeting;
}

updateGreeting();
setInterval(updateGreeting, 60 * 1000);

function updateClock() {
    const clockEl = document.getElementById("clock-text");
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    clockEl.textContent = `${hours}:${minutes} ${ampm} l ${month}/${day}`;
}

updateClock();
setInterval(updateClock, 1000);
