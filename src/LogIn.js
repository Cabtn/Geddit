import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Modal from 'react-modal';
const style = {
  margin: 12,
};
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
//Lots of good stuff happening here
export default class LogIn extends Component  {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      usernameSelected: false,
      username: ''
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.usernameSelected = this.usernameSelected.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "blue";
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  handleUserChange (e) {
    this.setState({username: e.target.value});
    console.log(e.target.value);
  }
  handleNameChange (e) {
    this.setState({password: e.target.value});
  }
  //WTF IS THIS?! Make it hide the get started button
  usernameSelected () {
    this.setState({display: 'none'});
  }
  submitUser () {
    fetch("/api/register", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
      })
    }).then(() => console.log("You have saved it!"))
  }
  render() {
    return (
      <div>
        <RaisedButton onClick={this.openModal} label="Get Started" secondary={true} style={style} />
        <Modal
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          >
          {/*Need to take in the values from these input*/}
          <h2>Please Make a Username</h2>
          <div>Username</div>
          <form>
            <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleUserChange} />
          <div></div>
            <RaisedButton label="Get Started" primary={true} style={style} onClick={this.submitUser} />
          </form>
        </Modal>
      </div>
    );
  }
}
