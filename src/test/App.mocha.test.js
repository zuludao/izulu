import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { expect } from "chai";
var jsdom = require("mocha-jsdom");

global.document = jsdom({
  url: "http://localhost:3000/"
});

import IzuluReact from "izulu-react-package";

let rootContainer;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer = null;
});

describe("izulu React Loading", () => {
  it("Check for specific", () => {
    act(() => {
      ReactDOM.render(<IzuluReact refreshInterval={150000} apiKey="YOUR API KEY" isBackroundImageEnabled={false} isUserConfig={false}/>, rootContainer);
    });
    const h1 = rootContainer.querySelector("h1");
    expect(h1.textContent).to.equal("Hello World");
  });
});


describe("Fetch Weather", () => {
  it("Renders Hello World Title", () => {

    act(() => {
      ReactDOM.render(<IzuluReact refreshInterval={150000} apiKey="YOUR API KEY" isBackroundImageEnabled={false} isUserConfig={false}/>, rootContainer);
    });

    const h2 = rootContainer.querySelector("city");
    expect(h1.textContent).to.contains(`Weather in`);
  });

  it("Weather Api Test", async function(){
    const response = IzuluReact.fetchWeather("warsaw");
    console.log(response);
    expect(Object.keys(response).length).to.equal(13);
  })

  it("Weather Api City Test", async function(){
    const name = "warsaw"
    const response = IzuluReact.fetchWeather(name);
    console.log(response);
    expect(response.name).to.equal(name);
  })

  it("Weather Api Temp Test", async function(){
    const response = IzuluReact.fetchWeather("warsaw");
    console.log(response);
    expect(response.main.temp).to.not.equal(0);
  })

  it("Weather Api Weather Test", async function(){
    const response = IzuluReact.fetchWeather("warsaw");
    console.log(response);
    expect(response.weather.length).to.not.equal(0);
  })

  it("Weather Api Humidity Test", async function(){
    const response = IzuluReact.fetchWeather("warsaw");
    console.log(response);
    expect(response.main.humidity).to.not.equal(0);
  })

  it("Weather Api Wind Test", async function(){
    const response = IzuluReact.fetchWeather("warsaw");
    console.log(response);
    expect(response.wind.speed).to.not.equal(0);
  })
  it("Weather Api Pressure Test", async function(){
    const response = IzuluReact.fetchWeather("warsaw");
    console.log(response);
    expect(response.main.pressure).to.not.equal(0);
  })
});

