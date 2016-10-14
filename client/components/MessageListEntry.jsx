import React from 'react';

const MessageListEntry = ({ message }) => {
  const { author, content, timestamp } = message;

  return (
    <div className="message-list-entry">
      <span>
        <span className="message-author"> {`${author}:`} </span>
        <span className="message-content"> {`${content}`} </span>
        <span className="message-date"> {`${new Date(timestamp)}`} </span>
      </span>
    </div>
  );
};

export default MessageListEntry;
