#  Izulu (Weather) 

Izulu meaning weather / heaven in the african language of ZULU. 
A weather widget to display weather conditions for any city in the world. 

### Prerequisites

[Open Weather API](https://openweathermap.org/)
[React](https://reactjs.org)
[Node](https://nodejs.org)


### Default Configuration
```typescript
  apiKey: "YOUR OPEN WEATHER API KEY",
  parentClassName: String default "weather",
  autoRefresh: Boolean default true,
  isBackroundImageEnabled: Boolean default true,
  backgroundColor: Boolean default false,
  isUserConfig: Boolean default true, //Experimental
  defualtCity: String default "New York",
  refreshInterval: Number default 30000 /ms,
```

## Simple Installation

Use the cdn to add weather.vanilla.js and style.css.

```bash
https://gitcdn.link/cdn/zuludao/izulu/master/weather.vanilla.js
https://gitcdn.link/cdn/zuludao/izulu/master/style.css
```

### Exmaple

```xml
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather Today</title>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://gitcdn.link/cdn/zuludao/izulu/master/style.css">
  <!-- <script type="test/javascript"
   src="https://raw.githubusercontent.com/zuludao/izulu/main/weather.vanilla.js">
      </script> THIS WONT WORK! -->
  <script type="text/javascript" src="https://gitcdn.link/cdn/zuludao/izulu/main/weather.vanilla.js">

  </script>
</head>

<body>
  <div class="weather"></div>
</body>

<script>
  setTimeout(function() {<!-- setTimeout is Required to ensure all JS loads -->
    Weather.init({ 
      isUserConfig : true, 
      apiKey: "YOUR OPEN WEATHER API KEY", <!-- apiKey is Required-->
      ...
     });
  })
</script>
</html>
```
##
## React Installation

NB Ensure your react app is up and running.

you can create a new React app with the command below.

```
npx create-react-app YOUR-APP-NAME
```

Use the __npm__ or __yarn__ to install.

```bash
npm i izulu-react-package --save-dev
```

### Usage

```javascript
import IzuluReact from "izulu-react-package";

function App() {
  return (
    <div className="App">
      <IzuluReact refreshInterval={150000} 
        apiKey="YOUR OPEN WEATHER API KEY" <!-- apiKey is Required-->
        isBackroundImageEnabled={true} 
        isUserConfig={false}
      />
    </div>
  );
}

export default App;
```

### Run Tests

All tests are located inside __test__ folder

```bash
npm test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


Please make sure to update tests as appropriate.

## License
[GPLv3 see license file or, Click here](https://choosealicense.com/licenses/mit/)
