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
    countTimer('9 july 2020');
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

        let count = 0,
            count1 = 100;

        const openPopup = () => {
            const popupanimate = requestAnimationFrame(openPopup);
          
            count1 += 10;
            popup.style.display = 'block';
            if (popup.style.opacity < 5) {
                
                popup.style.opacity = count += 0.155;
                popupContent.style.left = count1 * 2 + 'px';
            } else {
                cancelAnimationFrame(popupanimate);
            }
        };

        
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
                if (index === i) { 
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
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            newdot = document.querySelector('.portfolio-dots');
        const dot = [];
        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        const autoPlaySlide = () => {
            
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {   
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });
        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });
       
        const createDots = () => {
            for (let i = 0; i < slide.length; i++) {
                dot[i] = document.createElement('li');
                dot[i].classList.add('dot');
                newdot.appendChild(dot[i]);
            }
        };
        createDots();
        startSlide(2000);
    };
    
    slider();

    // меняем фото 
    const changePhoto = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');
        commandPhoto.forEach(item => {
            let showPhoto;

            item.addEventListener('mouseenter', event => { //mouseover work too
                showPhoto = event.target.src;
                event.target.src = event.target.dataset.img;
            });

            item.addEventListener('mouseleave', event => {
                event.target.src = showPhoto;
            });
        });
    };
    changePhoto();
    //ввод только чисел
    const deleteWord = () => {
        const calcItem = document.querySelectorAll('.calc-item');
        calcItem.forEach(check => {
            check.addEventListener('input', () => {
                check.value = check.value.replace(/[^0-9]/, '');
            });
        });
    };
    deleteWord();

    // калькулятор 
    // калькулятор
    const calculator = (price = 100) => {
        // ввод только чисел
     
        const calcItem = document.querySelectorAll('.calc-item');
        calcItem.forEach(check => {
            check.addEventListener('input', () => {
                check.value = check.value.replace(/[^0-9]/, '');
            });
        });
      

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1)  / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (target === calcType || target === calcSquare || target === calcCount || target === calcDay) {
                countSum();
            }
        });

    };
    calculator(100);
        
});







