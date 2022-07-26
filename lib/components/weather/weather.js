import React, { useRef, useEffect } from "react";
import "./style.css";

function IzuluReact(props) {
  const container = useRef(HTMLElement);
  const cityInput = useRef(HTMLElement);
  const city = useRef(HTMLElement);
  const weatherIconImage = useRef(HTMLElement);
  const descField = useRef(HTMLElement);
  const tempField = useRef(HTMLElement);
  const humidityField = useRef(HTMLElement);
  const windField = useRef(HTMLElement);
  const pressureField = useRef(HTMLElement);
  const weatherWrapper = useRef(HTMLElement);
  const searchButton = useRef(HTMLElement);
  const colorPicker = useRef(HTMLElement);
  const colorPickerWrapper = useRef(HTMLElement);
  useEffect(() => {
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
  useEffect(() => {
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
      backgroundColor: config.backgroundColor ? config.backgroundColor : izuluDefaultConfig.backgroundColor,
      refreshInterval: config.refreshInterval ? config.refreshInterval : izuluDefaultConfig.refreshInterval
    };
    setConfiguration(conf);
    fetchWeather(conf.defualtCity);
    setInterval(() => {
      fetchWeather(getConfiguration().defualtCity);
    }, getConfiguration().refreshInterval);
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
      apiKey: config.apiKey ? config.apiKey : izuluDefaultConfig.apiKey,
      parentClassName: config.parentClassName ? config.parentClassName : izuluDefaultConfig.parentClassName,
      isUserConfig: config.isUserConfig ? config.isUserConfig : izuluDefaultConfig.isUserConfig,
      autoRefresh: config.autoRefresh ? config.autoRefresh : izuluDefaultConfig.autoRefresh,
      defualtCity: config.defualtCity ? config.defualtCity : izuluDefaultConfig.defualtCity,
      isBackroundImageEnabled: config.isBackroundImageEnabled ? config.isBackroundImageEnabled : izuluDefaultConfig.isBackroundImageEnabled,
      backgroundColor: config.backgroundColor ? config.backgroundColor : izuluDefaultConfig.backgroundColor,
      refreshInterval: config.refreshInterval ? config.refreshInterval : izuluDefaultConfig.refreshInterval
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
    } = data.wind;
    city.current.innerText = "Weather in " + name;
    weatherIconImage.current.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    descField.current.innerText = description;
    tempField.current.innerText = temp + "°C";
    humidityField.current.innerText = "Humidity: " + humidity + "%";
    windField.current.innerText = "Wind speed: " + speed + " km/h";
    pressureField.current.innerText = "Pressure: " + pressure + " mbar";
  }

  function search() {
    fetchWeather(cityInput.current.value);
  }

  function setBackGround() {
    container.current.style.background = colorPicker.current.value;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "izulu weather-container",
    ref: container
  }, /*#__PURE__*/React.createElement("div", {
    className: "weather-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "color-picker",
    ref: colorPickerWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "",
    alt: "",
    className: "color-trigger"
  })), /*#__PURE__*/React.createElement("input", {
    name: "Color Picker",
    id: "color",
    type: "color",
    onChange: setBackGround,
    value: "#000000",
    ref: colorPicker
  }), /*#__PURE__*/React.createElement("span", null, "Change Background Color")), /*#__PURE__*/React.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "search-bar",
    value: getConfiguration.defualtCity,
    onKeyUp: e => e.key == 'Enter' ? search : "",
    placeholder: "Search",
    ref: cityInput
  }), /*#__PURE__*/React.createElement("button", {
    ref: searchButton,
    onClick: search
  }, /*#__PURE__*/React.createElement("svg", {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 1024 1024",
    height: "1.5em",
    width: "1.5em",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "weather",
    ref: weatherWrapper
  }, /*#__PURE__*/React.createElement("h2", {
    className: "city flex",
    ref: city
  }, "Please enter the city"), /*#__PURE__*/React.createElement("h1", {
    className: "temp flex",
    ref: tempField
  }, "0\xB0C"), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://openweathermap.org/img/wn/04n.png",
    alt: "weather-condition",
    className: "icon",
    ref: weatherIconImage
  }), /*#__PURE__*/React.createElement("div", {
    className: "description",
    ref: descField
  }, "Cloudy")), /*#__PURE__*/React.createElement("div", {
    className: "humidity flex",
    ref: humidityField
  }, "Humidity: 0%"), /*#__PURE__*/React.createElement("div", {
    className: "wind flex",
    ref: windField
  }, "Wind speed: 0.0 km/h"), /*#__PURE__*/React.createElement("div", {
    className: "pressure flex",
    ref: pressureField
  }, "Wind speed: 0.0 km/h")))));
} // Default Config.


let izuluDefaultConfig = {
  apiKey: "",
  parentClassName: "weather",
  isUserConfig: true,
  autoRefresh: true,
  isBackroundImageEnabled: true,
  backgroundColor: false,
  defualtCity: "New York",
  refreshInterval: 30000
};
export default IzuluReact;