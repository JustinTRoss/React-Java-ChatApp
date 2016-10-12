import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MessageList from './MessageList';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      test: 'test',
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <MessageList />
        <Footer />
      </div>
    );
  }
}

export default App;
