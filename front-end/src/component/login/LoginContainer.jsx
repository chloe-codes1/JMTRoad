import React from 'react';
import Storage from './Storage';
import Login from './Login';


const LoginContainer = () => {
  return(
    <Storage.Consumer>
      {store => (
        <Login onLogin={store.onLogin} />
      )}
    </Storage.Consumer>
  );
}

export default LoginContainer;