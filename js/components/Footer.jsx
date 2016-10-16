import React from 'react';
import MessageInput from './MessageInput';

const Footer = ({ messageInputValue, changeMessageInputValue, submitMessageOnEnterKeyUp }) => {
  return (
    <footer id="footer">
      <MessageInput
        messageInputValue = { messageInputValue }
        changeMessageInputValue = { changeMessageInputValue }
        submitMessageOnEnterKeyUp = { submitMessageOnEnterKeyUp }
      />
    </footer>
  );
};

export default Footer;
