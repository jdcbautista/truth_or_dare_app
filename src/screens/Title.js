// I will show the game title
// I will display one button for hosting, one button for joining
import React from 'react'
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
            <button onClick={() => this.triggerCallback('Host')} className="debug"> HOST </button>
            <button onClick={() => this.triggerCallback('Join')} className="debug"> JOIN </button>  
      </div>
    );
  }
}

export default Title;
