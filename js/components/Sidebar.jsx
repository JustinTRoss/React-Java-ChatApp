import React from 'react';
import UsernameInput from './UsernameInput';

const Sidebar = ({ usernameInputValue, changeUsernameInputValue }) => {
  return (
    <div id="sidebar">
      <UsernameInput 
        usernameInputValue = { usernameInputValue }
        changeUsernameInputValue = { changeUsernameInputValue }
      />
    </div>
  );
};

export default Sidebar;
