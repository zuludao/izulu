const Weather = {
  apiKey: "2e086fdb55cb7c15890337b33894a803",
  // Adding Initial customization.
  init: function (config) {
    let conf = { 
      parentClassName: config.parentClassName ?? defaultConfig.parentClassName,
      isUserConfig : config.isUserConfig ?? defaultConfig.isUserConfig,
      autoRefresh: config.autoRefresh ?? defaultConfig.autoRefresh,
      defualtCity: config.defualtCity ?? defaultConfig.defualtCity,
      isBackroundImageEnabled: config.isBackroundImageEnabled ?? defaultConfig.isBackroundImageEnabled,
      backgroundColor: config.backgroundColor ?? defaultConfig.backgroundColor,
    };

    defaultConfig = conf;

    document.querySelector(`.${conf.parentClassName}`).appendChild(container);
    document.querySelector(`.${conf.parentClassName}`).innerHTML = ` 
      <div class="color-picker">
        <div class="logo">
          <img src="iZulu" alt="" class="color-trigger" />
        </div>
        <input name="Color Picker" id="color" type="color"/>
        <span>Change Background Color</span>
      </div>


      <div class="search">
        <input type="text" class="search-bar" placeholder="Search">
        <button>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em"
            width="1.5em" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z">
            </path>
          </svg>
        </button>
      </div>

      <div class="weather loading">
        <h2 class="city">Please enter the city</h2>
        <h1 class="temp">0°C</h1>
        <div class="flex">
          <img src="https://openweathermap.org/img/wn/04n.png" alt="weather-condition" class="icon" />
          <div class="description">Cloudy</div>
        </div>
        <div class="humidity">Humidity: 0%</div>
        <div class="wind">Wind speed: 0.0 km/h</div>
      </div>`;


    document.querySelector(".color-picker").style = `display:${ conf.isUserConfig ? 'flex' : 'none'}`

    document.querySelector(".search button").addEventListener("click", function () {
        Weather.search();
    });
      
    document
        .querySelector(".search-bar")
        .addEventListener("keyup", function (event) {
          if (event.key == "Enter") {
            Weather.search();
          }
    });
      
    document.querySelector("#color").addEventListener("change", function(){
        document.body.style.background = this.value;
    })

    this.fetchWeather(conf.defualtCity);
    return defaultConfig;
  },
  getConfiguration: function () {
    return defaultConfig;
  },
  setConfiguration: function (config) {
    let conf = { 
      parentClassName: config.parentClassName ?? defaultConfig.parentClassName,
      isUserConfig : config.isUserConfig ?? defaultConfig.isUserConfig,
      autoRefresh: config.autoRefresh ?? defaultConfig.autoRefresh,
      defualtCity: config.defualtCity ?? defaultConfig.defualtCity,
      isBackroundImageEnabled: config.isBackroundImageEnabled ?? defaultConfig.isBackroundImageEnabled,
      backgroundColor: config.backgroundColor ?? defaultConfig.backgroundColor,
    };

    defaultConfig = conf;
    return defaultConfig;
  },
  // Fetches the weather for a given city
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          document.querySelector(".city").innerText = "No Weather found for the city."
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  // Displayes the weather on the parent container.
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, pressure } = data.main;
    const { speed } = data.wind;


    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    if (this.getConfiguration().isBackroundImageEnabled) {
      document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1920/?" + name + "')";
    } else if (this.getConfiguration().backgroundColor) {
      document.body.style.background = this.getConfiguration().backgroundColor.toString();
    } else {
      document.body.style.background = "none";
    }
   
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};



// Defualt Configuration.
let defaultConfig = {
  parentClassName: "weather",
  isUserConfig: true,
  autoRefresh: true,
  isBackroundImageEnabled: true,
  backgroundColor: false,
  defualtCity: "Johannesburg",
}

// Creating HTML Elements dynamically inside container
const container = document.createElement("div");
container.className = "weather-container";

export { Weather };