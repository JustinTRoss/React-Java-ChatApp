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
    // if Enter key is pressed
    if (event.keyCode == '13') {
      this.addMessageToMessageStack('test');
      this.postMessageToServer('test');

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
