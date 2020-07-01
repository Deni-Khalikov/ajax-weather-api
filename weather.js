

let button = document.querySelector('.button')
let input = document.getElementById('submit')
let inputValue = document.querySelector('.inputValue')

let name = document.querySelector('.name');
let desc = document.querySelector('.description');
let temp = document.querySelector('.temperature');

let dates = document.querySelectorAll('.date')
let temps = document.querySelectorAll('.forecastTemperature')


// getting the button click and 
button.addEventListener('click', function()
{
    // function for enter
    // button.addEventListener('keyup', function(event) 
    // {
    //     // Number 13 is the "Enter" key on the keyboard
    //     if (event.keyCode === 13) 
    //     {
    //       // Cancel the default action, if needed
    //       event.preventDefault();
    //       // Trigger the button element with a click
    //       document.getElementById('button').click();
    //     }
    // })



// fetching api, setting default city to Antwerpen Belgium and making them promises and catching errors

// When users want to search their city -> https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=cb400385e5f79fbcc340676a069bae24'
fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=838f0c8c58468427bd7ae7c6b0c07c3b&units=metric')
.then(response => response.json())
.then(data => 
{
    console.log(data);
    // getting data from OW
    let nameValue = data.city.name; 
    // accessing the current weather from the list
    let tempValue = data.list[0].main.temp // -273.15; // substracting from Kelvin for Celcius
    // accessing the weather description from the array of list -> weather -> description
    let descValue = data.list[0].weather[0].description;

    name.innerHTML = nameValue;
    temp.innerHTML = tempValue;
    desc.innerHTML = descValue;

    let now = new Date();
    let forecastDays = 5;

    // for (let i = 0; i< 5; i++)
    // {
    // console.log(i);
    // }


    for (let i = 0; i < forecastDays; i++) 
    {
        console.log(i);

        // getting the current year, month, and incrementing the days until 5 day forecast
        let newDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()+i);
        console.log(newDate);
        let year = newDate.getFullYear();
        console.log(now.getDate()+i);
        // same function as if statement:
        // let month;
        // if (date.getMonth()<10)
        // {month = `0${date.getMonth() +1}`;}
        // else
        // {month = date.getMonth() +1}
        let month = (newDate.getMonth() < 9) ? `0${newDate.getMonth() +1}` : newDate.getMonth() +1;
        let day = (newDate.getDate() < 9) ? `0${newDate.getDate()}` : newDate.getDate();

        // cutting through the array (40) (dont forget, its an array)
        let cutArr = data.list.filter(object => object.dt_txt.indexOf(`${year}-${month}-${day}`) !== -1);
        let avgTemp = cutArr.map(item => parseFloat(item.main.temp)).reduce((total, num) => total + num) / cutArr.length;

    
        dates[i].innerHTML = `${newDate.toDateString().substring(0,3)}`;
        temps[i].innerHTML = `${parseInt(avgTemp)}&deg;C`


    }

})
 
// getting the error
.catch(err => console.log("no city found"))
})