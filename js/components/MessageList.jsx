import React from 'react';
import MessageListEntry from './MessageListEntry';

const MessageList = ({ messageArray }) => {
  return (
    <div
      id="message-list"
    >
      { messageArray.map(message => {
          return <MessageListEntry
            message = {message}
            key = {message.id}
          />
      })}
    </div>
  );
};

export default MessageList;
