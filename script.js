API_KEY = 'K9uPVg2SYsd6JW5zqCDHrHjP8hmtR2QucfgNdIve';
API = 'https://api.nasa.gov/planetary/apod?api_key='

const form = document.getElementById('searchImg');
const btn = document.getElementById('btn');

fetch(API + API_KEY)
.then(response => response.json())
.then(data => {
  displayData(data)
})


btn.addEventListener('click', e => {
  e.preventDefault();
  getRandomNasaApod();  
})

form.addEventListener('submit', e => {
  e.preventDefault()

  getNasaApodFromDate()
})

function getNasaApodFromDate() {
  const inputDate = document.getElementById('inputDate').value;
  fetch(API + API_KEY + '&date=' + inputDate)
  .then(response => response.json())
  .then(data => {
    displayData(data)
  })
}

const getRandomNasaApod = async function () {

  const newDate = randomDate(new Date('1995,06,16'), new Date())
  const resp = await fetch (API + API_KEY + '&date=' + newDate)
  const data = await resp.json()

  displayData(data)
}

function displayData(data) {
    document.getElementById("nasaImg").src = data.hdurl;
    document.getElementById("title").textContent = data.title;
    document.getElementById("date").textContent = data.date;
    document.getElementById("explanation").textContent = data.explanation;
    document.getElementById("copyright").textContent = data.copyright; 
}



// RANDOM & FORMAT DATE

function randomDate(start, end) {
    return getFormattedDate((new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))))
}

function getFormattedDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
