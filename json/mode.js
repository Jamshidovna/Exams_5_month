const body = document.querySelector('body');
const btn = document.querySelector('.btn');
const icon = document.querySelector('.btn__icon');
const cards = document.querySelector('.flag__cards');
const search = document.querySelector('#search');


function store(value){
    localStorage.setItem('darkmode',value);
}

function load(){
    const darkmode = localStorage.getItem('darkmode');

    // if the dark mode was never activated
    if(!darkmode){
        store(false);
        icon.classList.add('fa-sun');
    }else if( darkmode == 'true'){
        body.classList.add('darkmode');
        icon.classList.add('fa-moon');
    }else if(darkmode == 'false'){
        icon.classList.add('fa-sun');
    }
}

load();

btn.addEventListener('click', () =>{

  body.classList.toggle('darkmode');
  icon.classList.add('animated');

// save true or false
  store(body.classList.contains('darkmode'));

  if(body.classList.contains('darkmode')){
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }else{
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  setTimeout( () => {
    icon.classList.remove('animated');

  },500)
})




async function fetchData(searchValue,region) {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    const filteredData = data.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return searchValue === '' || countryName.includes(searchValue);
    });
    

    renderCards(filteredData);
  } catch (error) {
    console.log(error);
  }
}

function renderCards(data) {
  cards.innerHTML = '';

  data.forEach((country) => {
    let card = document.createElement('div');
    card.classList.add('card');

    let image = document.createElement('img');
    image.classList.add('card_image');
    let name = document.createElement('h2');
    let population = document.createElement('h3');
    let region=document.createElement('h4')
    let capital = document.createElement('p');

    card.append(image, name, population,region, capital);
    population.textContent = 'Population: ' + country.population;
    name.textContent = country.name.common;
    image.src = country.flags.png;
    capital.textContent = 'Capital: ' + (country.capital && country.capital[0]);
    region.textContent='Region: '+country.region
    cards.append(card);
   
  });
}
 function navigateToCountry(countryName) {
      const url = 'country.html?country=' + encodeURIComponent(countryName);
      window.location.href = url;
    }
fetchData('');



// const api = 'https://restcountries.com/v3.1/all'

// const stations =[];
// fetch(api)
//    .then(res => res.json())
//    .then(data => {

// console.log('data >>>>',data);
//    data.forEach(name => {
//     array.push(name.array);
//    })
//    });

//    function getOptions(word, array){

//     return array.filter(s => {

// const regex = new RegExp(word, 'gi');


//       return s.name.match(regex);
//     })
//    }





   