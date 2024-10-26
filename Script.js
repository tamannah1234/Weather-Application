let input = document.querySelector("#Input-text");
let searchBtn = document.querySelector(".search-button");
const apikey = '19ba6af71caa41e9a32154423241807'; // Replace with your actual API key

// Add event listener to search button click (assuming you have a search button)
searchBtn.addEventListener("click", async function () {
 
  if (location !== "") {
    // select value 
    const location = input.value;
    // check for empty
    if (location != "") {
        // data get
        const data = await fetchWeather(location)
        //update data inside my dom
        if (data != null) {
            updateDOM(data);
        }
        input.value = "";
      }
}
})
const temperatureElem = document.querySelector(".temperature");
const locationElem = document.querySelector(".location");
const emojiImg = document.querySelector(".emoji");
const timeElem = document.querySelector(".time");
const dayElem = document.querySelector(".day");
const dateElem = document.querySelector(".date");
const conditionElem = document.querySelector(".condition");


// Function to update the DOM with weather data
function updateDOM(data) {
  const temp = data.current.temp_c;
  const location = data.location.name;
  const timeData = data.location.localtime;
  const [date,time] = timeData.split(" "); // Assuming "YYYY-MM-DD HH:mm" format
  const iconLink = data.current.condition.icon;
  const condition = data.current.condition.text;

  temperatureElem.textContent = temp + "°C";
  locationElem.textContent = location;
  emojiImg.src = iconLink;
  dateElem.innerText = date;
  timeElem.innerText = time; 
  conditionElem.innerText = condition;
}
async function fetchWeather(location) {

  const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}&aqi=no`
  // fetch -> inbuilt function to get http response from a server
  const response = await fetch(url);
  if (response.status == 400) {
      alert("location is invalid");
      return null;
  } else if (response.status == 200) {
      const json = await response.json();
      return json;
  }
}

