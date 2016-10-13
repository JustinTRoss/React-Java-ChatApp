import React from 'react';

const MessageInput = ({ messageInputValue, changeMessageInputValue, handleMessageInputKeyUp }) => {

  return (
    <div>
      <input
        value = { messageInputValue }
        onChange = { changeMessageInputValue }
        onKeyUp = { handleMessageInputKeyUp }
      />
    </div>
  );
};

export default MessageInput;
