function analogClock() {

    let hourHands = document.querySelector('[data-hour-hand]')
    let minuteHands = document.querySelector('[data-minute-hand]')
    let secondHands = document.querySelector('[data-second-hand]')
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let hourRotation = 30 * hours + minutes / 2;
    let minuteRotation = 6 * minutes;
    let secondRotation = 6 * seconds;

    hourHands.style.transform = `rotate(${hourRotation}deg)`
    minuteHands.style.transform = `rotate(${minuteRotation}deg)`
    secondHands.style.transform = `rotate(${secondRotation}deg)`

}
analogClock();
setInterval(analogClock, 1000)