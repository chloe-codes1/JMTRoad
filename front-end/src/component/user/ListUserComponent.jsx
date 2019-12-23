import React, { Component } from "react";
import withLogin from "../login/LoginHOC";

class ListUserComponent extends Component{
  
  render(){
    return(
      <div>
        아...
      </div>
    );
  }
}

export default withLogin(ListUserComponent);