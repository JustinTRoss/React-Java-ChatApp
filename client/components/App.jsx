import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MessageList from './MessageList';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      messageInputValue: '',
      messageArray: [],
    };

    this.changeMessageInputValue = this.changeMessageInputValue.bind(this);
    this.handleMessageInputKeyUp = this.handleMessageInputKeyUp.bind(this);
    this.postMessageToServer = this.postMessageToServer.bind(this);
    this.addMessageToMessageStack = this.addMessageToMessageStack.bind(this);
    this.getAllMessages = this.getAllMessages.bind(this);
  }

  componentWillMount() {
    this.getAllMessages();
  }

  getAllMessages() {
    const messageUrl = '/fixtures/fakedata.json';
    fetch(messageUrl)
      .then(res => res.json())
      .then(responseObj => responseObj.messages)
      .then(messageArray => {
        console.log(messageArray);
        console.log(this.state);
        this.setState({
          messageArray: messageArray,
        });
        console.log(this.state);
      }).catch(err => console.error('Error fetching messages: ', err));
  }

  changeMessageInputValue(event) {
    this.setState({
      messageInputValue: event.target.value,
    });
  }

  handleMessageInputKeyUp(event) {
    // if Enter key pressed
    if (event.keyCode == '13') {
      this.postMessage('test');

      this.setState({
        messageInputValue: '',
      });
    }
  }

  postMessageToServer(message) {
    
  }

  addMessageToMessageStack(message) {

  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <MessageList 
          messageArray = { this.state.messageArray }
        />
        <Footer
          messageInputValue = { this.state.messageInputValue }
          changeMessageInputValue = { this.changeMessageInputValue }
          handleMessageInputKeyUp = { this.handleMessageInputKeyUp }
        />
      </div>
    );
  }
}

export default App;
