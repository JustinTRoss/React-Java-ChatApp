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
    };

    this.changeMessageInputValue = this.changeMessageInputValue.bind(this);
    this.handleMessageInputKeyUp = this.handleMessageInputKeyUp.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  changeMessageInputValue(event) {
    this.setState({
      messageInputValue: event.target.value,
    });
  }

  handleMessageInputKeyUp(event) {
    if (event.keyCode == '13') {
      this.postMessage('test');
      this.setState({
        messageInputValue: '',
      });
    }
  };

  postMessage(message) {
    console.log(window.location.pathname);
    $.post('/fixtures/fakedata.json', 'test', (response) => {
      console.log(response);
    }, 'json');
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <MessageList />
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
