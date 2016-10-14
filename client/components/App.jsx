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

  // componentDidMount() {
  //   // Auto-focus message div to latest messages
  //   const messageList = this.refs.messageList;
  //   messageList.scrollTop = messageList.scrollHeight;
  //   console.log(messageList.scrollTop, messageList.scrollHeight);
  // }

  componentDidUpdate() {
    // Auto-focus message div to latest messages
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
    console.log(messageList.scrollTop, messageList.scrollHeight);
  }

  getAllMessages() {
    const messageUrl = '/fixtures/fakedata.json';
    fetch(messageUrl)
      .then(res => res.json())
      .then(responseObj => responseObj.messages)
      .then(messageArray => {

        // messageArray is NOT indexed by timestamp, so we must sort accordingly.
        messageArray = messageArray.sort((m1,m2) => {
          return m1.timestamp - m2.timestamp;
        })

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
        <div id="message-list">
          <div
            id="message-list-content"
            ref="messageList"
          >
            <MessageList 
              messageArray = { this.state.messageArray }
            />
          </div>
        </div>

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
