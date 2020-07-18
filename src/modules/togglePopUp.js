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
export default togglePopUp;
