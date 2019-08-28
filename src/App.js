import React from 'react';

import form from "./components/form";
import title from "./components/title";
import weather from "./components/weather";


const API_KEY = "341f92eb4b0f3362758044610e9758b5";

class App extends React.Component {

state = {
  temperature: undefined,
  city: undefined,
  country: undefined,
  humidity: undefined,
  description: undefined,
  error: undefined
};

getWeather = async e => {
  e.preventDefault();
  const city = e.target.element.city.value;
  const country = e.target.element.country.value;

  const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`);

  const data = await api_call.json();

  if (city && country) {
    console.log(data);
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });
  }else{
    this.setState({
      temperature: undefined,
      city:undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "please enter the values!"
    });
  }
};
render() {
  return(
    <div>
      <div className="wrapper">
          <div className="main">
              <div className="container">
                  <div className="row">
                      <div className="title-container">
                        <title />
                      </div>
                      <div className="from-container">
                        <from getWeather={this.getWeather} />
                        <weather
                          temperature={this.state.temperature}
                          city={this.state.city}
                          country={this.state.country}
                          humidity={this.state.humidity}
                          description={this.state.description}
                          error={this.state.error} 
                         />
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );

}

}

export default App;


















