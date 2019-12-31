import Paper from "@material-ui/core/Paper";
import React from "react";
//import { BrowserRouter as Router } from "react-router-dom";
import OthersPageList from "./OthersPageList";
import MyPageMenu from "./MyPageMenu";
import OthersPageProfile from "./OthersPageProfile";
import withLogin from "../login/LoginHOC";

class OthersPage extends React.Component {

constructor(props){
  super(props);
  this.state = {
    data:""
  }
}

parentCallback = (dataFromChild) => {
  this.setState({
    data: dataFromChild
  })
}

  render() {
    return (
      <div>
        여긴 남의 마이 페이지&nbsp; {this.state.data}
            <div className="Modal-overlay" />
            <div className="Modal">
              <OthersPageProfile history={this.props.history} />
              <Paper elevation={5}>
                <MyPageMenu callbackFromParent = {this.parentCallback} data = {this.state.data}/>
              </Paper>
                <OthersPageList callbackFromParent = {this.parentCallback} data = {this.state.data}/>
            </div>
      </div>
    );
  }
}
export default withLogin(OthersPage);
