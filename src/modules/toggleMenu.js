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
export default toggleMenu;
