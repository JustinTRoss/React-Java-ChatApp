import React from 'react';

const MessageListEntry = ({ message }) => {
  const { author, content, timestamp } = message;

  return (
    <div className="message-list-entry">
      {`${author}: ${content} @ ${new Date(timestamp)}`}
    </div>
  );
};

export default MessageListEntry;
