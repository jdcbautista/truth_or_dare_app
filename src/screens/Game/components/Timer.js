import React, { Component } from 'react';
import { SmallTimerContainer } from '../GameStyles';

class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      endTime: parseInt(props.votePhaseEnd),
      timeDisplay: '',
      isHotseat: props.isHotseat}
    this.endVoting = props.endVoting.bind(this);
  }
  timer() {
    console.log(this.state.endTime)
    let remainingTime = this.state.endTime - Date.now()
    //will always be less than an hour so don't need hours
    const mins = Math.floor((remainingTime / 60000));
    const secs = Math.floor((remainingTime % 60000) / 1000);

    //display as mm:ss
    let display = "";
    display += ("" + mins + ":" + (secs < 10 ? "0" : ""));
    display += ("" + secs);

    this.setState({
      timeDisplay: display
    })
    if(remainingTime < 1000) {
      if (this.state.isHotseat) {
        this.endVoting()
      }
      clearInterval(this.intervalId);
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  render() {
    return(
      <SmallTimerContainer>&nbsp; {this.state.timeDisplay} &nbsp; </SmallTimerContainer>
    );
  }
}

export default Timer;