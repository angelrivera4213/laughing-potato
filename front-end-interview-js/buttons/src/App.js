import logo from './logo.svg';
import './App.css';

import React from 'react';

const BALL_DX = 10;
const BALL_DY = 10;

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      ballDx: 0,
      ballDy: 0
    }

    this._ball = React.createRef();
    this._ballBox = React.createRef();
  }

  componentDidMount () {
    const step = () => {
      this._draw();
      this._animationId = requestAnimationFrame(step)
    };
    this._animationId = requestAnimationFrame(step)
  }

  componentWillUnmount () {
    cancelAnimationFrame(this._animationId);
  }

  render () {
    return (
      <div className="App">
        <div className="world">
          <div className="top-paddle-container">
            <div className="top-button" onMouseDown={this._topPress} onMouseUp={this._onMouseUp}></div>
          </div>
          <div className='left-right-ball-paddles-container'>
            <div className='left-paddle-container'>
              <div className="left-button" onMouseDown={this._leftPress} onMouseUp={this._onMouseUp}></div>
            </div>
            <div ref={this._ballBox} className="ball-container">
              <div ref={this._ball} className='ball'></div>
            </div>
            <div className='right-paddle-container'>
              <div className="right-button" onMouseDown={this._rightPress} onMouseUp={this._onMouseUp}></div>
            </div>
          </div>
          <div className="bottom-paddle-container">
            <div className="bottom-button" onMouseDown={this._bottomPress} onMouseUp={this._onMouseUp}></div>
          </div>
        </div>
      </div>
    );
  }

  _onMouseUp = () => {
    this.setState({
      ballDx: 0,
      ballDy: 0
    });
  }

  _leftPress = () => {
    this.setState({
      ballDx: -BALL_DX,
      ballDy: 0
    });
  }

  _rightPress = () => {
    this.setState({
      ballDx: BALL_DX,
      ballDy: 0
    });
  }

  _topPress = () => {
    this.setState({
      ballDx: 0,
      ballDy: -BALL_DY
    });
  }
  _bottomPress = () => {
    this.setState({
      ballDx: 0,
      ballDy: BALL_DY
    });
  }

  _draw = () => {
    const { ballDx, ballDy } = this.state;
    const ballBox = this._ballBox.current;
    const ball = this._ball.current;
    const ballRect = ball.getBoundingClientRect();

    const maxX = ballBox.clientWidth;
    const maxY = ballBox.clientHeight;
    const ballX = ball.offsetLeft;
    const ballY = ball.offsetTop;

    const newBallX = ballX + ballDx;
    const newBallY = ballY + ballDy;

    if (newBallX >= 0 && newBallX <= maxX - ballRect.width) {
      ball.style.left = `${newBallX}px`;
    }

    if (newBallY >= 0 && newBallY <= maxY - ballRect.height) {
      ball.style.top = `${newBallY}px`;
    }
  }
}

export default App;
