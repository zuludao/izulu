'use strict';

var React = require('react');
var ReactDOM = require('react-dom/client');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = "body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;margin:0}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}";
styleInject(css_248z$1);

var css_248z = ".izulu.weather-container{align-items:center;background:#222;background-image:url(https://source.unsplash.com/1600x900?landscape);display:flex;font-family:Open Sans,sans-serif;font-size:inherit;height:100%;justify-content:center;margin:0;padding:1em}.izulu .weather-wrapper{background:#000000d0;border-radius:30px;color:#fff;margin:1em;max-width:420px;padding:2em;width:100%}.search{align-items:center;display:flex;justify-content:center}button{border-radius:50%;cursor:pointer;height:44px;margin:.5em;transition:.2s ease-in-out;width:44px}button,input.search-bar{background:#7c7c7c2b;border:none;color:#fff;outline:none}input.search-bar{border-radius:24px;font-family:inherit;font-size:105%;padding:.4em 1em;width:calc(100% - 100px)}button:hover{background:#7c7c7c6b}h1.temp{margin:0 0 .4em}.flex{align-items:center;display:flex}.description{margin-left:8px;text-transform:capitalize}.weather.loading{max-height:20px;position:relative;visibility:hidden}.weather-wrapper.loading:after{color:#fff;content:\"Loading...\";left:20px;position:absolute;top:0;visibility:visible}input#color{border:#000000d0;border-radius:50%;height:40px;margin-left:-25px;margin-right:10px;opacity:0;position:relative;width:39px;z-index:1}.color-picker{align-items:center;border-bottom:1px solid #3c3b3b;display:flex;font-size:12px;justify-content:left;padding:13px}.logo{display:flex;height:30px;width:20px}";
styleInject(css_248z);

function IzuluReact(props) {
  // constructor(props) {
  //   super(props);
  // create a ref to store the textInput DOM element
  const container = React.useRef(HTMLElement);
  const cityInput = React.useRef(HTMLElement);
  const city = React.useRef(HTMLElement);
  const weatherIconImage = React.useRef(HTMLElement);
  const descField = React.useRef(HTMLElement);
  const tempField = React.useRef(HTMLElement);
  const humidityField = React.useRef(HTMLElement);
  const windField = React.useRef(HTMLElement);
  const pressureField = React.useRef(HTMLElement);
  const weatherWrapper = React.useRef(HTMLElement);
  const searchButton = React.useRef(HTMLElement);
  const colorPicker = React.useRef(HTMLElement);
  const colorPickerWrapper = React.useRef(HTMLElement);
  // this.init = this.init.bind(this);
  // this.getConfiguration = this.getConfiguration.bind(this);
  // this.setConfiguration = this.setConfiguration.bind(this);
  // this.fetchWeather = this.fetchWeather.bind(this);
  // this.DisplayWeather = this.DisplayWeather.bind(this);
  // this.search = this.search.bind(this);

  React.useEffect(() => {
    const handleEvent = event => {
      if (event.key == "Enter") {
        search();
      }
    };

    cityInput.current.addEventListener("keyup", handleEvent);
    return () => {
      cityInput.current.removeEventListener("keyup", handleEvent);
    };
  }, []);
  React.useEffect(() => {
    if (getConfiguration().isBackroundImageEnabled) {
      container.current.style.backgroundImage = "url('https://source.unsplash.com/1920x1920/?" + cityInput.current.value + "')";
    } else if (getConfiguration().backgroundColor) {
      container.current.style.background = getConfiguration().backgroundColor.toString();
    } else {
      container.current.style.background = "none";
    }

    colorPickerWrapper.current.style = `display:${getConfiguration().isUserConfig ? 'flex' : 'none'}`;
  });
  init(props);
  console.log(props);

  function init(config) {
    let conf = {
      apiKey: config.apiKey ? config.apiKey : izuluDefaultConfig.apiKey,
      parentClassName: config.parentClassName ? config.parentClassName : izuluDefaultConfig.parentClassName,
      isUserConfig: config.isUserConfig ? config.isUserConfig : izuluDefaultConfig.isUserConfig,
      autoRefresh: config.autoRefresh ? config.autoRefresh : izuluDefaultConfig.autoRefresh,
      defualtCity: config.defualtCity ? config.defualtCity : izuluDefaultConfig.defualtCity,
      isBackroundImageEnabled: config.isBackroundImageEnabled ? config.isBackroundImageEnabled : izuluDefaultConfig.isBackroundImageEnabled,
      backgroundColor: config.backgroundColor ? config.backgroundColor : izuluDefaultConfig.backgroundColor
    };
    setConfiguration(conf); // Creating HTML Elements dynamically inside container  

    fetchWeather(conf.defualtCity);
    return izuluDefaultConfig;
  }

  function fetchWeather(cityValue) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&units=metric&appid=" + getConfiguration().apiKey).then(response => {
      if (!response.ok) {
        city.current.innerText = "No Weather found for the city.";
        throw new Error("No weather found.");
      }

      return response.json();
    }).then(data => DisplayWeather(data));
  }

  function getConfiguration() {
    return izuluDefaultConfig;
  }

  function setConfiguration(config) {
    izuluDefaultConfig = {
      aapiKey: config.apiKey ? config.apiKey : izuluDefaultConfig.apiKey,
      parentClassName: config.parentClassName ? config.parentClassName : izuluDefaultConfig.parentClassName,
      isUserConfig: config.isUserConfig ? config.isUserConfig : izuluDefaultConfig.isUserConfig,
      autoRefresh: config.autoRefresh ? config.autoRefresh : izuluDefaultConfig.autoRefresh,
      defualtCity: config.defualtCity ? config.defualtCity : izuluDefaultConfig.defualtCity,
      isBackroundImageEnabled: config.isBackroundImageEnabled ? config.isBackroundImageEnabled : izuluDefaultConfig.isBackroundImageEnabled,
      backgroundColor: config.backgroundColor ? config.backgroundColor : izuluDefaultConfig.backgroundColor
    };
    return izuluDefaultConfig;
  }

  function DisplayWeather(data) {
    const {
      name
    } = data;
    const {
      icon,
      description
    } = data.weather[0];
    const {
      temp,
      humidity,
      pressure
    } = data.main;
    const {
      speed
    } = data.wind; // colorPicker.current.style = `display:${ getConfiguration.isUserConfig ? 'flex' : 'none'}`
    // searchButton.current.addEventListener("click", function () {
    //     search();
    // });
    // cityInput.current
    //       .addEventListener("keyup", function (event) {
    //         if (event.key == "Enter") {
    //           search();
    //         }
    //   });
    // colorPicker.current.addEventListener("change", function(){
    //       container.current.style.background = this.value;
    //   })

    city.current.innerText = "Weather in " + name;
    weatherIconImage.current.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    descField.current.innerText = description;
    tempField.current.innerText = temp + "°C";
    humidityField.current.innerText = "Humidity: " + humidity + "%";
    windField.current.innerText = "Wind speed: " + speed + " km/h";
    pressureField.current.innerText = "Pressure: " + pressure + " mbar"; // weatherWrapper.current.classList.remove("loading");
    // if (getConfiguration().isBackroundImageEnabled) {
    //   container.current.style.backgroundImage =
    //   "url('https://source.unsplash.com/1920x1920/?" + name + "')";
    // } else if (getConfiguration().backgroundColor) {
    //   container.current.style.background = getConfiguration().backgroundColor.toString();
    // } else {
    //   container.current.style.background = "none";
    // }
  }

  function search() {
    fetchWeather(cityInput.current.value);
  }

  function setBackGround() {
    container.current.style.background = colorPicker.current.value;
  }

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "izulu weather-container",
    ref: container
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "weather-wrapper"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "color-picker",
    ref: colorPickerWrapper
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "logo"
  }, /*#__PURE__*/React__default["default"].createElement("img", {
    src: "",
    alt: "",
    className: "color-trigger"
  })), /*#__PURE__*/React__default["default"].createElement("input", {
    name: "Color Picker",
    id: "color",
    type: "color",
    onChange: setBackGround,
    value: "#000000",
    ref: colorPicker
  }), /*#__PURE__*/React__default["default"].createElement("span", null, "Change Background Color")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "search"
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    type: "text",
    className: "search-bar",
    value: getConfiguration.defualtCity,
    onKeyUp: e => e.key == 'Enter' ? search : "",
    placeholder: "Search",
    ref: cityInput
  }), /*#__PURE__*/React__default["default"].createElement("button", {
    ref: searchButton,
    onClick: search
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 1024 1024",
    height: "1.5em",
    width: "1.5em",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
  })))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "weather",
    ref: weatherWrapper
  }, /*#__PURE__*/React__default["default"].createElement("h2", {
    className: "city flex",
    ref: city
  }, "Please enter the city"), /*#__PURE__*/React__default["default"].createElement("h1", {
    className: "temp flex",
    ref: tempField
  }, "0\xB0C"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React__default["default"].createElement("img", {
    src: "https://openweathermap.org/img/wn/04n.png",
    alt: "weather-condition",
    className: "icon",
    ref: weatherIconImage
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "description",
    ref: descField
  }, "Cloudy")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "humidity flex",
    ref: humidityField
  }, "Humidity: 0%"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "wind flex",
    ref: windField
  }, "Wind speed: 0.0 km/h"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "pressure flex",
    ref: pressureField
  }, "Wind speed: 0.0 km/h"))));
}

let izuluDefaultConfig = {
  apiKey: "",
  parentClassName: "weather",
  isUserConfig: true,
  autoRefresh: true,
  isBackroundImageEnabled: true,
  backgroundColor: false,
  defualtCity: "Johannesburg"
};

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    Promise.resolve().then(function () { return require('./web-vitals-b8b00b43.js'); }).then(({
      getCLS,
      getFID,
      getFCP,
      getLCP,
      getTTFB
    }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

const root = ReactDOM__default["default"].createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/React__default["default"].createElement(React__default["default"].StrictMode, null, /*#__PURE__*/React__default["default"].createElement(IzuluReact, null))); // If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
