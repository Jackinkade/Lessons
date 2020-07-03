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
                timeMinute.textContent = 0;
                timeSeconds.textContent = 0;
            }
            if (timer.timeReamning > 0) {
                setTimeout(updateClock, 1000);
            }
        };
        updateClock();
    }
    countTimer('1 july 2020');
    //menu
    
    const toggleMenu = () => {
        const menu = document.querySelector('menu');
        
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        document.body.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.menu') || target.closest('menu ul>li') || target.closest('.close-btn');
            if (target) {
                handlerMenu();
            } else if (!target) {
                menu.classList.remove('active-menu'); 
            }
            

        });
       
    };
    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
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

        
           
        });
        popup.addEventListener('click', event => {
            let target  = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };
    togglePopUp();
   
    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) { //index = 1
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');//Отображает элемент котрый выбран И||Э||Ф
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');//проверка селектора если не нашед === null

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);//передает индекс элемента
                    }
                });   
            } 
        });
    };

    tabs();

});
const b = 21;
console.log(b);
