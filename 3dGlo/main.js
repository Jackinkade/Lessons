/* eslint-disable no-trailing-spaces */
window.addEventListener('DOMContentLoaded', () => {


    //timer
    function countTimer(deadline) {
        const timeHours = document.querySelector('#timer-hours'),
            timeMinute = document.querySelector('#timer-minutes'),
            timeSeconds = document.querySelector('#timer-seconds');

        const getTimeReamning = () => {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeReamning = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeReamning % 60),
                minutes = Math.floor((timeReamning / 60) % 60),
                hours = Math.floor(timeReamning / 60 / 60);
            return { timeReamning, hours, minutes, seconds };
        };
        const updateClock = () => {
            const timer = getTimeReamning();

            timeHours.textContent = timer.hours;
            timeMinute.textContent = timer.minutes;
            timeSeconds.textContent = timer.seconds;
            //Изменить скрипт так, чтобы в таком случае выводилось: 00:00:00
            // из 4:6:50 сделает 04:06:50
            if (timer.hours < 10) {
                timeHours.textContent = "0" + timer.hours;
            } else if (timer.minute < 10) {
                timeMinute.textContent = "0" + timer.minutes;
            }
            if (timer.seconds < 10) {
                timeSeconds.textContent = "0" + timer.seconds;
            }
            if (timer.hours < 0) {
                timeHours.textContent = 0;
            } if (timer.minutes < 0) {
                timeMinute.textContent = 0;
            } if (timer.seconds < 0) {
                timeSeconds.textContent = 0;
            }
            if (timer.timeReamning > 0) {
                setTimeout(updateClock, 1000);
            }
        };
        updateClock();
    }
    countTimer('2 july 2020');
    //menu
    
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItem = document.querySelectorAll('ul>li');
        // document.addEventListener('click', event => {
            
        //     if (!btnMenu.contains(event.target)) btnMenu.style.display = 'block';
        // });
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        // eslint-disable-next-line arrow-parens
        menuItem.forEach((elem) => elem.addEventListener('click', handlerMenu));
       
    };
    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');
        // let count = 0;
        // let popupanimate;
        let count = 0,
            count1 = 100;

        const openPopup = () => {
            const popupanimate = requestAnimationFrame(openPopup);
            // count++;
            count1 += 10;
            popup.style.display = 'block';
            if (popup.style.opacity < 5) {
                // popup.style.display = 'block';
              
                popup.style.opacity = count += 0.155;
                popupContent.style.left = count1 * 2 + 'px';
                // 1 - Math.sin(Math.acos(count1));
            // if (count < 600) {
            //     popup.style.display = 'block';
            //     popupContent.style.left = count * 2 + 'px';
            } else {
                cancelAnimationFrame(popupanimate);
            }
        };
        // popupanimate = requestAnimationFrame(openPopup);
        
        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                if (window.innerWidth  >= 768) {
                    openPopup();
                } else {
                    popup.style.display = '';
                }
            });

            popupClose.addEventListener('click', () => {
                popup.style.display = '';
            });
           
        });
        
        // document.querySelectorAll('.popup-btn').addEventListener('click', () => {
        //     const popup = document.querySelector('popup');
            
        //     let movePopup;
        //     let count = 0;
        //     const movePopupBlock = () => {
        //         movePopup = requestAnimationFrame(movePopupBlock);
        //         count++;
        //         if (count < 500) {
        //             popup.style.left = count + 'px';
        //         } else if (count < 700) {
        //             cancelAnimationFrame(movePopup);
        //         }
        //     };
        //     movePopupBlock();
        // });
    };
    togglePopUp();
   

});

