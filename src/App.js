import React, { Component } from 'react';
import './App.css';
import "./styles/styles.scss"
import Timer from './components/Timer';

class App extends Component {

  constructor() {
    super();
    this.state = {
      time: {
        minutes: 5,
        seconds: 0,
        start: false
      },
      timer: null,
      toggleClass: "",
    } 
  }

  toggleTimer = () => {
    // Clearing previous interval to prevent doubling
    clearInterval(this.state.timer);

    const time = this.state.time;
    time.start = !time.start; // Toggling start state

    this.setState({ time });

    const timer = setInterval(() => {
      let minutes = this.state.time.minutes;
      let seconds = this.state.time.seconds;   

      if (seconds === 0 && minutes === 0 ) {
        clearInterval();        
      } else {
        this.decrement(minutes, seconds);
      }
    }, 1000)

    if (!time.start) {
      clearInterval(timer);
      this.setState({ toggleClass: "" });
    } else {
      this.setState({ toggleClass: "animation" });
    }

    this.setState({ timer });
  }

  decrement = (minutes, seconds) => {
    if (seconds === 0) {
      seconds = 59;
      minutes -= 1;
    } else {
      seconds -= 1;
    }

    this.setState({
      time: {
        minutes,
        seconds,
        start: this.state.time.start
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Timer 
          time={this.state.time}
          toggleTimer={this.toggleTimer}
          toggleClass={this.state.toggleClass}
        />
      </div>
    );
  }
}

export default App;
