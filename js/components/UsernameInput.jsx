import React from 'react';

const UsernameInput = ({ usernameInputValue, changeUsernameInputValue }) => {

  return (
    <input
      id="username-input"
      value = { usernameInputValue }
      onChange = { changeUsernameInputValue }
      placeholder = "Anonymous"
    />
  );
};

export default UsernameInput;
