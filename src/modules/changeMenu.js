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
export default changePhoto;
