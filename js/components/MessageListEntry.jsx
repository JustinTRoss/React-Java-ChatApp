import React from 'react';

const MessageListEntry = ({ message }) => {
  const { author, content, timestamp } = message;

  return (
    <div className="message-list-entry">
      <div className="message-text">
        <span className="message-author">{`${author}: `}</span>
        <span className="message-content">{content}</span>
      </div>
        <span className="message-timestamp">{`${new Date(timestamp)}`}</span>
    </div>
  );
};

export default MessageListEntry;
