// document.addEventListener('DOMContentLoaded', () => {

//     const select = document.getElementById('cars'),
//         output = document.getElementById('output');

//     select.addEventListener('change', () => {
//         const request = new XMLHttpRequest();
//         request.open('GET', './cars.json');
//         request.setRequestHeader('Content-type', 'application/json');
//         request.send();
//         request.addEventListener('readystatechange', () => {
//             if (request.readyState === 4 && request.status === 200) {
//                 const data = JSON.parse(request.responseText);
//                 data.cars.forEach(item => {
//                     if (item.brand === select.value) {
//                         const { brand, model, price } = item;
//                         output.innerHTML = `Тачка ${brand} ${model} <br>
//                         Цена: ${price}$`;
//                     }
//                 });
//             } else {
//                 output.innerHTML = 'Произошла ошибка';
//             }
//         });
//     });

// });
document.addEventListener('DOMContentLoaded', () => {


    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {


        const postData = () => new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                } else {
                    reject('Произошла ошибка');
                }
            });

            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
        });

        const outputData = data => {
            data.cars.forEach(item => {
                console.table(item);
                if (item.brand === select.value) {
                    const { brand, model, price } = item;
                    output.innerHTML = `Тачка ${brand} ${model} <br>
                    Цена: ${price}$`;
                } else if (select.value === 'no') {
                    output.innerHTML = `выбери тачку`;
                }
            });
        };

        const error = data => {
            output.innerHTML = data;
        };

        postData()
            .then(outputData)
            .catch(error);
    });

});
