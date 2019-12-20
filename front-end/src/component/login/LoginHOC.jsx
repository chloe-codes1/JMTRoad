import React, { Component } from "react";
import Storage from "./Storage";
import LoginContainer from "./LoginContainer";

const withLogin = (WrappedComponent) =>

class IsLogin extends Component {

  render(){
    return(
      <Storage.Consumer>
        { storage => {
          if(storage.logged === false)
            return <LoginContainer />;
          else 
            return <WrappedComponent />;
        }}
      </Storage.Consumer>
    );
  }
}

export default withLogin;