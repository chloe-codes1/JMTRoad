import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withLogin from "../login/LoginHOC";

class ListUserComponent extends Component{
  render(){
    return(
      <div>
        까아꾸웅
      </div>
    );
  }
}

export default withLogin(withRouter(ListUserComponent));