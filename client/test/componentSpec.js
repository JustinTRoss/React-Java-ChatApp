import { expect } from 'chai';
import nock from 'nock';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

// Components:
import App from '../js/components/App';
import Header from '../js/components/Header';
import Sidebar from '../js/components/Sidebar';
import UsernameInput from '../js/components/UsernameInput';
import MessageList from '../js/components/MessageList';
import MessageListEntry from '../js/components/MessageListEntry';
import Footer from '../js/components/Footer';
import MessageInput from '../js/components/MessageInput';

const seedGetResponseJSON = {
  "body": {
    "messages": [
      {
        "id": 1,
        "author": "Jane",
        "timestamp": 1421953410956,
        "content": "Hello!"
      },
      {
        "id": 2,
        "author": "Sam",
        "timestamp": 1421953434028,
        "content": "How are you?",
        "last_edited": 1421953454124
      },
      {
        "id": 3,
        "author": "Jane",
        "timestamp": 1421953433276,
        "content": "I'm in SAT!"
      },
      {
        "id": 4,
        "author": "Jane",
        "timestamp": 1421953454129,
        "content": "Flight is delayed. :P San Antonio TSA was the friendliest I've ever encountered, though. And I have a hamburger, a beer, and decent wifi."
      }
    ]
  }
};

describe('TinyChat Application Components:', () => {
  describe('Stateful Components:', () => {
    const renderer = TestUtils.createRenderer();
    describe('App Component:', () => {
      before(() => {
        nock('http://localhost:3005')
          .persist()
          .get('/api/v1/messages')
          .reply(200, seedGetResponseJSON);
        renderer.render(<App />);
      });

      it('renders a div with two children', () => {
        const node = renderer.getRenderOutput();
        expect(node.type).to.deep.equal('div');
        expect(node.props.children).to.have.lengthOf(2);
      });
    });
  });

  describe('Functional Stateless Components:', () => {
    const renderer = TestUtils.createRenderer();
    describe('Header Component:', () => {
      beforeEach(() => {
        renderer.render(<Header />);
      });

      it('renders a header with a proper id', () => {
        const node = renderer.getRenderOutput();
        expect(node.type).to.deep.equal('header');
        expect(node.props.id).to.deep.equal('header');
      });
    });

    describe('Sidebar Component:', () => {
      beforeEach(() => {
        renderer.render(<Sidebar
            usernameInputValue={'usernameInputValue'}
            changeUsernameInputValue={'changeUsernameInputValue'}
          />);
      });

      it('renders a div with a proper id', () => {
        const node = renderer.getRenderOutput();
        expect(node.type).to.deep.equal('div');
        expect(node.props.id).to.deep.equal('sidebar');
      });

      it('renders a UsernameInput child inside of a div', () => {
        const node = renderer.getRenderOutput();
        expect(node.props.children.props.children).to.contain(
          <UsernameInput
            usernameInputValue={'usernameInputValue'}
            changeUsernameInputValue={'changeUsernameInputValue'}
          />
        );
      });

      describe('UsernameInput Component:', () => {
        beforeEach(() => {
          renderer.render(<UsernameInput />);
        });

        it('renders an input with a proper id', () => {
          const node = renderer.getRenderOutput();
          expect(node.type).to.deep.equal('input');
          expect(node.props.id).to.be.equal('username-input');
        });
      });
    });

    describe('MessageList Component:', () => {
      const messages = seedGetResponseJSON.body.messages;
      const numberOfMessages = messages.length;

      beforeEach(() => {
        renderer.render(<MessageList messageArray={messages} />);
      });

      it('renders a div with a proper id', () => {
        const node = renderer.getRenderOutput();
        expect(node.type).to.deep.equal('div');
        expect(node.props.id).to.deep.equal('message-list');
      });

      it('renders as many children as messages passed', () => {
        const node = renderer.getRenderOutput();
        expect(node.props.children).to.have.lengthOf(numberOfMessages);
      });

      describe('MessageListEntry Component:', () => {
        beforeEach(() => {
          renderer.render(
            <MessageListEntry
              message={messages[0]}
              key={messages[0].id}
            />);
        });

        it('renders a div with a proper id', () => {
          const node = renderer.getRenderOutput();
          expect(node.type).to.deep.equal('div');
          expect(node.props.className).to.deep.equal('message-list-entry');
        });

        it('renders the appropriate author, content, and timestamp', () => {
          const node = renderer.getRenderOutput();
          expect(node.props.children).to.have.lengthOf(2);
        });
      });
    });

    describe('Footer Component:', () => {
      beforeEach(() => {
        renderer.render(
          <Footer
            messageInputValue={'messageInputValue'}
            changeMessageInputValue={'changeMessageInputValue'}
            submitMessageOnEnterKeyUp={'submitMessageOnEnterKeyUp'}
          />
        );
      });

      it('renders a footer with a proper id', () => {
        const node = renderer.getRenderOutput();
        expect(node.type).to.deep.equal('footer');
        expect(node.props.id).to.deep.equal('footer');
      });

      it('renders a MessageInput child', () => {
        const node = renderer.getRenderOutput();
        expect(node.props.children).to.deep.equal(
          <MessageInput
            messageInputValue={'messageInputValue'}
            changeMessageInputValue={'changeMessageInputValue'}
            submitMessageOnEnterKeyUp={'submitMessageOnEnterKeyUp'}
          />
        );
      });

      describe('MessageInput Component:', () => {
        beforeEach(() => {
          renderer.render(<MessageInput />);
        });

        it('renders an input with a proper id', () => {
          const node = renderer.getRenderOutput();
          expect(node.type).to.deep.equal('input');
          expect(node.props.id).to.be.equal('message-input');
        });
      });
    });
  });
});

