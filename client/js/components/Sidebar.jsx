import React from 'react';
import UsernameInput from './UsernameInput';

const Sidebar = ({ usernameInputValue, changeUsernameInputValue }) => {
  return (
    <div id="sidebar">
      <div id="username-container">
        <h4>Enter your username: </h4>
        <UsernameInput 
          usernameInputValue = { usernameInputValue }
          changeUsernameInputValue = { changeUsernameInputValue }
        />
      </div>
    </div>
  );
};

export default Sidebar;
