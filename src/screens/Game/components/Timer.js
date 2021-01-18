// import React, { useEffect, useState } from "react";
// import ms from "pretty-ms";

// export const FTimer = () => {
//   const [elapsedTime, setElapsedTime] = useState(0)
//   const [isRunning, setRunning] = useState(false)
//   const [startTime, setStartTime] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => setElapsedTime(Date.now() - startTime), 1);
//     return () => clearInterval(timer);
//   }, []);
  
//   const startTimer = () => {
//     setRunning(true)
//     setElapsedTime(elapsedTime)
//     setStartTime(Date.now() - startTime)
//   }

//   const stopTimer = () => {
//     //stop
//     setRunning(false)
//     clearInterval(this.timer)
//   } 

//   const resetTimer = () => {
//     setElapsedTime(0)
//     setRunning(false)
//   }

//   return (
//     <div>
//       <p>timer: {ms(elapsedTime)}</p>
//       <p>timer: {ms(startTime)}</p> 
//     </div>

//   )

// }


// class Timer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       time: 0,
//       isOn: this.props.timerRunning,
//       start: 0,
//     };
//     this.startTimer = this.startTimer.bind(this);
//     this.stopTimer = this.stopTimer.bind(this);
//     this.resetTimer = this.resetTimer.bind(this);
//   }
//   // startTimer() {
//   //   this.setState({
//   //     isOn: true,
//   //     time: this.state.time,
//   //     start: Date.now() - this.state.time,
//   //   });
//   //   this.timer = setInterval(
//   //     () =>
//   //       this.setState({
//   //         time: Date.now() - this.state.start,
//   //       }),
//   //     1
//   //   );
//   // }
//   stopTimer() {
//     this.setState({ isOn: false });
//     clearInterval(this.timer);
//   }
//   resetTimer() {
//     this.setState({ time: 0, isOn: false });
//   }
//   render() {
//     let start =
//       this.state.time === 0 ? (
//         <button onClick={this.startTimer}>start</button>
//       ) : null;
//     let stop =
//       this.state.time === 0 || !this.state.isOn ? null : (
//         <button onClick={this.stopTimer}>stop</button>
//       );
//     let resume =
//       this.state.time === 0 || this.state.isOn ? null : (
//         <button onClick={this.startTimer}>resume</button>
//       );
//     let reset =
//       this.state.time === 0 || this.state.isOn ? null : (
//         <button onClick={this.resetTimer}>reset</button>
//       );
//     return (
//       <div>
//         <h3>timer: {ms(this.state.time)}</h3>
//         <h3>start: {ms(this.state.start)}</h3>
//         {start}
//         {resume}
//         {stop}
//         {reset}
//       </div>
//     );
//   }
// }

// export default Timer;
