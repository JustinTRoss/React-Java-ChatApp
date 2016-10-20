import React from 'react';
import { expect } from 'chai';
import nock from 'nock';
import { mount } from 'enzyme';
import 'jsdom-global/register';
import { spy } from 'sinon';

// Components:
import App from '../js/components/App';

const targetUri = 'http://localhost:8080';
const seedGetResponseJSON = {
  "_embedded": {
    "messages": [
      {
        "author": "Jane",
        "timestamp": 1421953410956,
        "content": "Hello!",
        "_links" : {
          "self" : {
            "href" : "http://www.localhost:8080/api/messages/1"
          },
          "message" : {
            "href" : "http://www.localhost:8080/api/messages/1"
          }
        }
      },
      {
        "author": "Sam",
        "timestamp": 1421953434028,
        "content": "How are you?",
        "_links" : {
          "self" : {
            "href" : "http://www.localhost:8080/api/messages/2"
          },
          "message" : {
            "href" : "http://www.localhost:8080/api/messages/2"
          }
        }
      },
      {
        "author": "Jane",
        "timestamp": 1421953433276,
        "content": "I'm in SAT!",
        "_links" : {
          "self" : {
            "href" : "http://www.localhost:8080/api/messages/3"
          },
          "message" : {
            "href" : "http://www.localhost:8080/api/messages/3"
          }
        }
      },
      {
        "author": "Jane",
        "timestamp": 1421953454129,
        "content": "Flight is delayed. :P San Antonio TSA was the friendliest I've ever encountered, though. And I have a hamburger, a beer, and decent wifi.",
        "_links" : {
          "self" : {
            "href" : "http://www.localhost:8080/api/messages/4"
          },
          "message" : {
            "href" : "http://www.localhost:8080/api/messages/4"
          }
        }
      }
    ]
  }
};
const seedPostResponseJSON = {
  "author" : "Sam",
  "content" : "Not bad.",
  "timestamp" : 1421953475813,
  "_links" : {
    "self" : {
      "href" : "http://www.localhost:8080/api/messages/5"
    },
    "message" : {
      "href" : "http://www.localhost:8080/api/messages/5"
    }
  }
};

describe('Functions and logic', () => {
  describe('<App />', () => {
    before(function() {
      nock(targetUri)
        .persist()
        .get('/api/messages')
        .reply(200, seedGetResponseJSON);

      nock(targetUri)
        .persist()
        .post('/api/messages')
        .reply(200, seedPostResponseJSON);
    });

    describe('Lifecycle hooks', () => {
      it('calls componentWillMount once', () => {
        spy(App.prototype, 'componentWillMount');
        mount(<App />);
        expect(App.prototype.componentWillMount.calledOnce).to.equal(true);
      });

      it('calls componentDidMount once', () => {
        spy(App.prototype, 'componentDidMount');
        mount(<App />);
        expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
      });

      it('calls componentDidUpdate', (done) => {
        spy(App.prototype, 'componentDidUpdate');
        mount(<App />);
        setTimeout(() => {
          expect(App.prototype.componentDidUpdate.called).to.equal(true);
          done();
        }, 100);
      });
    });

    describe('Async functions', () => {
      describe('getAllMessages', () => {
        it('is called once on render', () => {
          spy(App.prototype, 'getAllMessages');
          const wrapper = mount(<App />);
          expect(App.prototype.getAllMessages.calledOnce).to.equal(true);
        });

        it('should change messageArray state to equal seedGetResponseJSON._embedded.messages sorted by timestamp', (done) => {
          const wrapper = mount(<App />);
          expect(wrapper.state().messageArray).to.deep.equal([]);
          setTimeout(() => {
            wrapper.update();
            expect(wrapper.state().messageArray).to.deep.equal(
              seedGetResponseJSON._embedded.messages.sort((m1, m2) => {
                return m1.timestamp - m2.timestamp;
              })
            );
            done();
          }, 100);
        });
      });
    });

    describe('sync functions', () => {
      describe('changeMessageInputValue', () => {

        it('should be called once upon change to message-input', () => {
          spy(App.prototype, 'changeMessageInputValue');
          const wrapper = mount(<App />);
          expect(App.prototype.changeMessageInputValue.callCount).to.deep.equal(0);
          wrapper.find('#message-input').simulate('change', { target: { value: 'My new value' } });
          expect(App.prototype.changeMessageInputValue.callCount).to.deep.equal(1);
        });
        
        it('should change messageInputValue state on entry to the input field', () => {
          const wrapper = mount(<App />);
          expect(wrapper.state().messageInputValue).to.deep.equal('');

          wrapper.find('#message-input').simulate('change', { target: { value: 'My new value' } });
          wrapper.update();
          expect(wrapper.state().messageInputValue).to.deep.equal('My new value');
        });
      });

      describe('submitMessageOnEnterKeyUp', () => {
        before(function() {
          this.spy1 = spy(App.prototype, 'submitMessageOnEnterKeyUp');
          this.spy2 = spy(App.prototype, 'addMessageToMessageList');
          this.spy3 = spy(App.prototype, 'postMessageToServer');
        });

        afterEach(function() {
          this.spy1.reset();
          this.spy2.reset();
          this.spy3.reset();
        });
        
        it('should be called once for each key pressed KeyUp', () => {
          const wrapper = mount(<App />);
          const messageInput = wrapper.find('#message-input')
          expect(App.prototype.submitMessageOnEnterKeyUp.callCount).to.deep.equal(0);
          messageInput.simulate('keyUp', { keyCode: 2 });
          expect(App.prototype.submitMessageOnEnterKeyUp.callCount).to.deep.equal(1);
          messageInput.simulate('keyUp', { keyCode: 31 });
          expect(App.prototype.submitMessageOnEnterKeyUp.callCount).to.deep.equal(2);
          messageInput.simulate('keyUp', { keyCode: 13 });
          expect(App.prototype.submitMessageOnEnterKeyUp.callCount).to.deep.equal(3);
        });

        it('should clear message-input only upon \'Enter\' KeyUp', () => {
          const wrapper = mount(<App />);
          const messageInput = wrapper.find('#message-input')
          messageInput.simulate('change', { target: { value: 'My new value' } });
          expect(App.prototype.submitMessageOnEnterKeyUp.callCount).to.deep.equal(0);
          messageInput.simulate('keyUp', { keyCode: 2 });
          expect(App.prototype.submitMessageOnEnterKeyUp.callCount).to.deep.equal(1);
          messageInput.simulate('keyUp', { keyCode: 31 });
          expect(App.prototype.submitMessageOnEnterKeyUp.callCount).to.deep.equal(2);
          messageInput.simulate('keyUp', { keyCode: 13 });
          expect(App.prototype.submitMessageOnEnterKeyUp.callCount).to.deep.equal(3);
        });

        it('should not call addMessageToMessageList if a non-\'Enter\' key is released', () => {
          expect(App.prototype.addMessageToMessageList.callCount).to.deep.equal(0);
          const wrapper = mount(<App />);
          const messageInput = wrapper.find('#message-input');
          messageInput.simulate('change', { target: { value: 'My new value' } });
          messageInput.simulate('keyUp', { keyCode: 21 });
          expect(App.prototype.addMessageToMessageList.callCount).to.deep.equal(0);
        });

        it('should not call postMessageToServer if a non-\'Enter\' key is released', () => {
          expect(App.prototype.postMessageToServer.callCount).to.deep.equal(0);
          const wrapper = mount(<App />);
          const messageInput = wrapper.find('#message-input');
          messageInput.simulate('change', { target: { value: 'My new value' } });
          messageInput.simulate('keyUp', { keyCode: 21 });
          expect(App.prototype.postMessageToServer.callCount).to.deep.equal(0);
        });

        it('should call addMessageToMessageList once if \'Enter\' key is released', () => {
          expect(App.prototype.addMessageToMessageList.callCount).to.deep.equal(0);

          const wrapper = mount(<App />);
          const messageInput = wrapper.find('#message-input');
          messageInput.simulate('change', { target: { value: 'My new value' } });
          messageInput.simulate('keyUp', { keyCode: 13 });
          expect(App.prototype.addMessageToMessageList.callCount).to.deep.equal(1);
        });

        it('should call postMessageToServer once if \'Enter\' key is released', () => {
          expect(App.prototype.postMessageToServer.callCount).to.deep.equal(0);

          const wrapper = mount(<App />);
          const messageInput = wrapper.find('#message-input');
          messageInput.simulate('change', { target: { value: 'My new value' } });
          messageInput.simulate('keyUp', { keyCode: 13 });
          expect(App.prototype.postMessageToServer.callCount).to.deep.equal(1);
        });
      });

      describe('addMessageToMessageList', () => {
        it('extend messageArray state by one', () => {
          expect(App.prototype.addMessageToMessageList.callCount).to.deep.equal(0);

          const wrapper = mount(<App />);
          const messageArrayLength = wrapper.state().messageArray.length;
          const messageInput = wrapper.find('#message-input');
          messageInput.simulate('change', { target: { value: 'My new value' } });
          messageInput.simulate('keyUp', { keyCode: 13 });
          expect(wrapper.state().messageArray).to.have.lengthOf(messageArrayLength + 1);
        });
      });
    });
  });
});

