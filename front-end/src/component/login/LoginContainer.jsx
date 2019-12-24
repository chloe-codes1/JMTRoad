import React from 'react';
import Storage from './Storage';
import Login from './Login';


const LoginContainer = () => {
  return(
    <Storage.Consumer>
      {Storage => (
        <Login onLogin={Storage.onLogin} />
      )}
    </Storage.Consumer>
  );
}


export default LoginContainer;