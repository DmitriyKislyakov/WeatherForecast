const apiKey = '64e76fdb7bd8a2f3dda9542655c62592';
const url = `https://api.openweathermap.org/data/2.5/weather?q=Иваново&units=metric&lang=ru&appid=${apiKey}`;
const funcUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const searchInput = document.querySelector(".searchInput input");
const searchButton = document.querySelector(".searchButton");

//асинхронная функция описания работы приложения
async function weather(city) {
    //запрос на сайт по апи
    const response = await fetch(funcUrl + city + `&units=metric&lang=ru&appid=${apiKey}`)
    //если название введено неправильно
    if (response.status === 404) {
        console.log('Error 404')
        document.querySelector(".city").innerHTML = 'Неккоректно введен город!'
    } else {
        const data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + '&deg';
        document.querySelector('.feels_like_value').innerHTML = Math.round(data.main.feels_like) + '&deg';
        document.querySelector('.icon').innerHTML = `<img src=https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png>`;
        document.querySelector('.wind_value').innerHTML = `${data.wind['speed']} м/c.`;
        document.querySelector('.humidity_value').innerHTML = `${data.main.humidity} %`;
        document.querySelector('.pressure_value').innerHTML = `${data.main.pressure} мм.рт.ст.`;
        document.querySelector('.visibility_value').innerHTML = `${data.visibility} м.`;
    }

}

weather('Иваново')


//функция поиска города
searchButton.addEventListener("click", () => {
    weather(searchInput.value);
    searchInput.value = "";
  });

//функция поиска с кнопки Enter
searchInput.addEventListener('keydown', (elem) => {
    if (elem.keyCode === 13) {
        weather(searchInput.value);
        searchInput.value = ''
    }
})
