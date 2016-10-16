import React from 'react';

const MessageInput = ({ messageInputValue, changeMessageInputValue, submitMessageOnEnterKeyUp }) => {

  return (
    <input
      id="message-input"
      value = { messageInputValue }
      onChange = { changeMessageInputValue }
      onKeyUp = { submitMessageOnEnterKeyUp }
    />
  );
};

export default MessageInput;
