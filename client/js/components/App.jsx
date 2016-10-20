// Testing workaround for window object and relative url path
import 'isomorphic-fetch';
const amTesting = process.env.NODE_ENV === 'test';
const apiUrl = amTesting ? 'http://localhost:3005' : '';

import React from 'react';
const socket = !amTesting ? window.io('http://localhost:3005') : { on : () => null, emit: () => null, };

// Components:
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
      usernameInputValue: '',
    };

    this.changeMessageInputValue = this.changeMessageInputValue.bind(this);
    this.submitMessageOnEnterKeyUp = this.submitMessageOnEnterKeyUp.bind(this);
    this.changeUsernameInputValue = this.changeUsernameInputValue.bind(this);
    this.postMessageToServer = this.postMessageToServer.bind(this);
    this.addMessageToMessageList = this.addMessageToMessageList.bind(this);
    this.getAllMessages = this.getAllMessages.bind(this);
  }

  componentWillMount() {
    this.getAllMessages();
  }

  componentDidMount() {
    //open socket 'on' listeners
    socket.on('broadcast:message', message => {
      this.addMessageToMessageList(message);
    });
  }

  componentDidUpdate() {
    // Auto-focus message-list div to latest messages
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
  }

  // Asynchronous functions:
  getAllMessages() {
    fetch(`${apiUrl}/api/messages`)
      .then(res => res.json())
      .then(responseObj => {
        console.log(responseObj);
        return responseObj._embedded.messages;
      })
      .then(messageArray => {
        // messageArray is NOT indexed by timestamp, so we must sort accordingly.
        messageArray = messageArray.sort((m1,m2) => {
          return m1.timestamp - m2.timestamp;
        });

        this.setState({
          messageArray: messageArray,
        });
      }).catch(err => console.error('Error fetching messages: ', err));
  }

  postMessageToServer(messageObject) {
    socket.emit('send:message', messageObject);

    fetch(`${apiUrl}/api/messages`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(messageObject),
    }).catch(err => console.error(err));
  }

  changeMessageInputValue(event) {
    this.setState({
      messageInputValue: event.target.value,
    });
  }

  submitMessageOnEnterKeyUp(event) {
    // If Enter key is pressed and released
    if (event.keyCode == '13' && event.target.value !== '') {
      const { messageInputValue, usernameInputValue } = this.state;

      const messageObject = {
        author: usernameInputValue || 'Anonymous',
        content: messageInputValue,
        timestamp: Date.now(),
      }

      this.addMessageToMessageList(messageObject);
      this.postMessageToServer(messageObject);

      this.setState({
        messageInputValue: '',
      });
    }
  }

  changeUsernameInputValue(event) {
    this.setState({
      usernameInputValue: event.target.value,
    });
  }


  addMessageToMessageList(messageObject) {
    const { messageArray } = this.state;
    messageArray.push(messageObject);
    this.setState({messageArray});
  }

  render() {
    return (
      <div>
        <Header />
        <div id="main-content">
          <Sidebar 
            usernameInputValue = { this.state.usernameInputValue }
            changeUsernameInputValue = { this.changeUsernameInputValue }
          />
          <div id="message-list-container" ref="messageList" >
              <MessageList messageArray = { this.state.messageArray }/>
          </div>
        <Footer
          messageInputValue = { this.state.messageInputValue }
          changeMessageInputValue = { this.changeMessageInputValue }
          submitMessageOnEnterKeyUp = { this.submitMessageOnEnterKeyUp }
        />
        </div>
      </div>
    );
  }
}

export default App;
