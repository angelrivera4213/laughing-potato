

class LightBox extends React.Component {
  render () {
    const { show } = this.props;
    return show ? (
      <div className='light-box'>
        <div className='light-box-container' onClick={this._handleClose}>
          {this.props.children}
        </div>
      </div>
    ) : null;
  }

  _handleClose = (e) => {
    const { onClose } = this.props;
    onClose && onClose(e);
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      accepted: false
    };
  }

  render () {
    const { show, accepted } = this.state;
    return (
      <div className='app'>
        <div className='main'>
          <div className='offers'>
            {
                  !accepted ? (
                    <button onClick={this._handleOfferClick}>Show Offer</button>
                  ) : null
                }
                {
                  accepted ? (
                    <p>Offer was Accepted!</p>
                  ) : null
                }
          </div>
        </div>
        <div className='overlay'>
          <LightBox show={show} onClose={this._handleModalClose}>
            <div className='app-modal' onClick={this._stopPropagation}>
              <div className='modal-header modal-section'>
                <button className='close-btn' onClick={this._handleModalClose}>X</button>
              </div>
              <div className='modal-message modal-section'>
                This offer is Great! Accept this offer below
              </div>
              <div className='modal-section submit-section'>
                    <button className='submit-btn' onClick={this._handleAcceptOffer}>
                      Accept
                    </button>
               </div>
            </div>
          </LightBox>
        </div>
      </div>
    );
  }

  _stopPropagation = (e) => {
    e && e.stopPropagation();
  }

  _handleOfferClick = (e) => {
    this.setState({
      show: true
    });
  }

  _handleModalClose = (e) => {
    this.setState({
      show: false
    });
  }

  _handleAcceptOffer = (e) => {
    this.setState({
      accepted: true,
      show: false
    })
  }
}


const el = document.querySelector("#root");
ReactDOM.render(<App />, el);
