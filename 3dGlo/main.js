window.addEventListener('DOMContentLoaded', () => {


    //timer
    function countTimer(deadline) {
        const timeHours = document.querySelector('#timer-hours'),
            timeMinute = document.querySelector('#timer-minutes'),
            timeSeconds = document.querySelector('#timer-seconds');

        function getTimeReamning() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeReamning = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeReamning % 60),
                minutes = Math.floor((timeReamning / 60) % 60),
                hours = Math.floor(timeReamning / 60 / 60);
            return { timeReamning, hours, minutes, seconds };
        }
        function updateClock() {
            const timer = getTimeReamning();

            timeHours.textContent = timer.hours;
            timeMinute.textContent = timer.minutes;
            timeSeconds.textContent = timer.seconds;
            //Изменить скрипт так, чтобы в таком случае выводилось: 00:00:00
            if (timer.hours < 0 || timer.minutes < 0 || timer.seconds < 0) {
                timeHours.textContent = 0;
                timeMinute.textContent = 0;
                timeSeconds.textContent = 0;
            }
            // из 4:6:50 сделает 04:06:50
            if (timer.hours < 10) {
                timeHours.textContent = "0" + timer.hours;
            } else if (timer.minute < 10) {
                timeMinute.textContent = "0" + timer.minutes;
            }
            if (timer.seconds < 10) {
                timeSeconds.textContent = "0" + timer.seconds;
            }

            if (timer.timeReamning > 0) {
                setTimeout(updateClock, 1000);
            }
        }
        updateClock();
    }
    countTimer('2 july 2020');
    // setInterval(countTimer, 1000, '2 july 2020');
});
