import React from 'react';

const MessageInput = ({ messageInputValue, changeMessageInputValue, handleMessageInputKeyUp }) => {

  return (
      <input
        id="message-input"
        value = { messageInputValue }
        onChange = { changeMessageInputValue }
        onKeyUp = { handleMessageInputKeyUp }
      />
  );
};

export default MessageInput;
