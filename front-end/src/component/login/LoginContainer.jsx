import React from 'react';
import Store from './LoginStorage';
import Login from './Login';


const LoginContainer = () => {
  return(
    <Store.Consumer>
      {store => (
        <Login onLogin={store.onLogin} />
      )}
    </Store.Consumer>
  );
}

export default LoginContainer;