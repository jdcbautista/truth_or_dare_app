// I will show the game title
// I will display one button for hosting, one button for joining
import React, { useState } from 'react'
import logo from '../logo.svg';
import '../App.css';

// const Title = (props) => {
class Title extends React.Component {

  triggerCallback(value) {
    console.log(this.props)
    this.props.handleCallback(value)
  }
  render() {
    return (
      <div className="Game">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            TRUTH OR DARE
          </p>
            <button onClick={() => this.triggerCallback(1)} className="debug"> HOST </button>
            <button onClick={() => this.triggerCallback(2)} className="debug"> JOIN </button>  
      </div>
    );
  }
}

export default Title;
