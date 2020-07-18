const sendForm = () => {

    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро свяжемся с Вами!';
    const body = {};
    const allForms = document.querySelectorAll('form');
    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        mode: 'cors'
    });

    const phoneMaxLengh = () => {
        const inputPhone1 = document.querySelector('#form1-phone').maxLength = '10',
            inputPhone2 = document.querySelector('#form2-phone').maxLength = '10',
            inputPhone3 = document.querySelector('#form3-phone').maxLength = '10';

        inputPhone1.maxLength = '10';
        inputPhone2.maxLength = '10';
        inputPhone3.maxLength = '10';
    };
    phoneMaxLengh();

    allForms.forEach(form => {
        form.addEventListener('input', evt => {
            const target = evt.target;
            if (target.name === 'user_phone') {
                if (target.style) {
                    target.style.border = 'none';
                }
                target.value = target.value.replace(/[^+\d]/g, '');
                if (!/^\+?(\d){0,18}$/g.test(target.value)) {
                    target.value = target.value.substring(0, target.value.length - 1);
                }

            }
            if (target.name === 'user_name' || target.name === 'user_message') {
                target.value = target.value.replace(/[^а-я ]/gi, '');
            }
            if (target.name === 'user_email') {
                target.value = target.value.replace(/[а-я ]/gi, '');
            }
            // if (target.placeholder === 'Номер телефона') {


            //}
        });

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem';

        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formData = new FormData(form);
            form.querySelectorAll('input').forEach(elem => {
                elem.value = '';
            });

            formData.forEach((val, key) => {
                body[key] = val;
            });
            const outputData = () => {
                statusMessage.textContent = successMessage;
                form.reset();
            };

            const error = () => {
                statusMessage.textContent = errorMessage;
                form.reject();
            };
            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw 'error !!! ';
                    }
                    outputData();
                })
                .catch(error);

        });
    });


};
export default sendForm;
