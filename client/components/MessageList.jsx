import React from 'react';
import MessageListEntry from './MessageListEntry';

const MessageList = ({ messageArray }) => {
  return (
      <div>
        { messageArray.map(message => {
            return <MessageListEntry
              message = {message}
            />
        })}
      </div>
  );
};

export default MessageList;
