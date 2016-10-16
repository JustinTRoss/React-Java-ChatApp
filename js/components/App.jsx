import React from 'react';
import 'isomorphic-fetch';

// Socket + Testing workaround for window object.
const window = window || { 
  io: () => { 
    return {
      on : () => null,
      emit: () => null,
    }; 
  }
};
const socket = window.io();

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
      username: 'Anonymous',
    };

    this.changeMessageInputValue = this.changeMessageInputValue.bind(this);
    this.handleMessageInputKeyUp = this.handleMessageInputKeyUp.bind(this);
    this.postMessageToServer = this.postMessageToServer.bind(this);
    this.addMessageToMessageList = this.addMessageToMessageList.bind(this);
    this.getAllMessages = this.getAllMessages.bind(this);
  }

  componentWillMount() {
    this.getAllMessages('http://localhost:3005/fixtures/fakedata.json');
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

  getAllMessages(messageUrl) {
    fetch(messageUrl)
      .then(res => res.json())
      .then(responseObj => responseObj.messages)
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

  changeMessageInputValue(event) {
    this.setState({
      messageInputValue: event.target.value,
    });
  }

  handleMessageInputKeyUp(event) {
    // if Enter key is pressed and released
    if (event.keyCode == '13' && event.target.value !== '') {
      const { messageInputValue, username } = this.state;
      const messageObject = {
        author: username,
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

  postMessageToServer(messageObject) {
    socket.emit('send:message', messageObject);
    // Maybe add a post to the server here so we can separate sockets out on the backend
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
          <Sidebar />
          <div 
            id="message-list-container"
            ref="messageList"
          >
              <MessageList messageArray = { this.state.messageArray }/>
          </div>
        <Footer
          messageInputValue = { this.state.messageInputValue }
          changeMessageInputValue = { this.changeMessageInputValue }
          handleMessageInputKeyUp = { this.handleMessageInputKeyUp }
        />
        </div>
      </div>
    );
  }
}

export default App;
