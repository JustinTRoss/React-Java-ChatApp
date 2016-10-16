import React from 'react';
import MessageInput from './MessageInput';

const Footer = ({ messageInputValue, changeMessageInputValue, handleMessageInputKeyUp }) => {
  return (
    <footer id="footer">
      <MessageInput
        messageInputValue = { messageInputValue }
        changeMessageInputValue = { changeMessageInputValue }
        handleMessageInputKeyUp = { handleMessageInputKeyUp }
      />
    </footer>
  );
};

export default Footer;
