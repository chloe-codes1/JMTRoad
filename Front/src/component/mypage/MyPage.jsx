import Paper from "@material-ui/core/Paper";
import React from "react";
//import { BrowserRouter as Router } from "react-router-dom";
import "./MyPage.scss";
import MyPageList from "./MyPageList";
import MyPageMenu from "./MyPageMenu";
import MyPageProfile from "./MyPageProfile";


class MyPage extends React.Component {


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
        {this.state.data}
            <div className="Modal-overlay" />
            <div className="Modal">
              <MyPageProfile history={this.props.history} />
              <Paper elevation={5}>
                <MyPageMenu callbackFromParent = {this.parentCallback} data = {this.state.data}/>
              </Paper>
              <Paper elevation={5}>
                <MyPageList callbackFromParent = {this.parentCallback} data = {this.state.data}/>
              </Paper>
            </div>
      </div>
    );
  }
}
export default MyPage;
