let keyAPI = "811069fec0ca1cb74d5b5da64b88caaf";
let urlAPI = "https://api.openweathermap.org/data/2.5/weather?q=Gorizia&appid=" + keyAPI +"&lang=it";
let temperaturaTesto = document.querySelector('.temperature');
let nomeCitta = document.querySelector(".nome-citta");
let umiditaDescription = document.querySelector(".umidity");
let descrizioneMeteo = document.querySelector(".text-meteo")

window.addEventListener("load", ()=>{
  let long;
  let lat;

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${keyAPI}&lang=it&units=metric`;

      fetch(api)
        .then(response => response.json())
        .then(data =>{setParametri(data)});
        })
      }
})
function setIcona(position,icon){
  let skycons = new Skycons({ color: "white"});
  let finalIcon;

  if(icon == "cielo sereno") finalIcon = "CLEAR_DAY";
  if(icon == "poche nuvole" || icon == "nubi sparse") finalIcon = "PARTLY_CLOUDY_DAY";
  else if (icon == "pioggerella"||icon == "piogga leggera"||icon == "acquazzone") finalIcon = "RAIN";
  else if (icon == "nebbia") finalIcon = "FOG";
  else if (icon == "neve") finalIcon = "SNOW";
  else if (icon == "cielo coperto") finalIcon = "CLOUDY";

  skycons.play();
  return skycons.set(position,Skycons[finalIcon]);
}
function setParametri(data){
  nomeCitta.textContent = `${data.name}, ${data.sys.country}`;
  let temperatura = Math.floor(data.main.temp)
  temperaturaTesto.textContent = `${temperatura}°C`;
  umiditaDescription.textContent = `Umidità: ${data.main.humidity}%`;
  let descrizione = data.weather[0].description;
  let descrizioneFinale = descrizione[0].toUpperCase() + descrizione.slice(1);
  descrizioneMeteo.textContent = `${descrizioneFinale}`;
  setIcona(document.querySelector(".icon"),data.weather[0].description);
}

let buttonRicerca = document.querySelector(".button-ricerca");
buttonRicerca.addEventListener("click",(e)=>{
  e.preventDefault();

  let testoRicerca = document.querySelector(".testo-ricerca");
  let ricerca = testoRicerca.value;
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${ricerca}&appid=${keyAPI}&lang=it&units=metric`;

  fetch(api)
    .then( response => response.json() )
    .then( data => setParametri(data) );



  testoRicerca.value = "";

})
function stampaData(){
  let date = new Date();
  let numeroGiorno = date.getDate();
  let mese = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno",
  "Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
  let nomeGiorno = ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì",
  "Venerdì","Sabato"];
  let dataFinale = `${nomeGiorno[date.getDay()]} ${numeroGiorno} ${mese[date.getMonth()]}`
  let dataOggi = document.querySelector(".data-oggi");
  dataOggi.textContent = dataFinale;
}
stampaData();
