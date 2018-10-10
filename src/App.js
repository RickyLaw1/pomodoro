import React, { Component } from 'react';
import './App.css';
import "./styles/styles.scss"
import Chart from "chart.js"
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
      chart: null
    } 
  }

  componentDidMount() {

  }

  toggleTimer = () => {
    // Clearing previous interval to prevent doubling
    clearInterval(this.state.timer);

    const time = this.state.time;    
    time.start = !time.start; // Toggling start state
    this.setState({ time });

    const timer = this.makeTimer();

    if (!time.start) {
      clearInterval(timer);
    }

    this.setState({ timer });
  }

  makeTimer = () => {
    const chart = this.makeChart();

    const timer = setInterval(() => {
      let minutes = this.state.time.minutes;
      let seconds = this.state.time.seconds;   

      if (seconds === 0 && minutes === 0 ) {
        clearInterval();        
      } else {
        this.decrement(minutes, seconds);
      }

      this.updateChart(chart, seconds, minutes);
      
      chart.update();
    }, 1000)

    return timer;
  }

  makeChart = () => {
    const ctx = document.getElementById("chart").getContext("2d");
    let seconds = this.state.time.seconds; 

    const colour1 = 'rgba(54, 162, 235, 0.2)';
    const colour2 = 'rgba(255, 99, 132, 0.2)';
    const border1 = 'rgba(54, 162, 235, 1)';
    const border2 = 'rgba(255,99,132, 1)';

    let data = [60 - seconds, seconds];
    let backgroundColor = [colour1, colour2];
    let borderColor = [border1, border2];

    const chart = new Chart(ctx, {
      
      type: 'doughnut',
      data: {
        datasets: [{
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1
        }]
      },
      options: { events: false, animation: { duration: 10 } }
    });

    return chart;
  }

  updateChart = (chart, seconds, minutes) => {
    const colour1 = 'rgba(54, 162, 235, 0.2)';
    const colour2 = 'rgba(255, 99, 132, 0.2)';
    const border1 = 'rgba(54, 162, 235, 1)';
    const border2 = 'rgba(255,99,132, 1)';

    let backgroundColor;
    let borderColor;

    if (minutes % 2 === 0) {
      backgroundColor = [colour1, colour2];
      borderColor = [border1, border2];
    } else {
      backgroundColor = [colour2, colour1];
      borderColor = [border2, border1];
    }

    chart.data.datasets[0].backgroundColor = backgroundColor;
    chart.data.datasets[0].borderColor = borderColor;
    chart.data.datasets[0].data[0] = 60 - seconds;
    chart.data.datasets[0].data[1] = seconds;
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
      <canvas id="chart" width="300" height="300"></canvas>
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
