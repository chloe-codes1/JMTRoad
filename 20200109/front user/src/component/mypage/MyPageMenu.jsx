import React from 'react';
import './MyPageMenu.scss';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';

class MyPageMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuStatus: ""
    }
  }

  render () {
  return (
    <div className="MyPageMenu">
      <Paper >
        <MenuList>
          <MenuItem onClick = {() => this.props.callbackFromParent("myProjectList")}>내가 만든 맛집 로드</MenuItem>
          <MenuItem onClick = {() => this.props.callbackFromParent("likedProjectList")}>좋아요한 맛집 로드</MenuItem>
          <MenuItem onClick = {() => this.props.callbackFromParent("likedStoreList")}>좋아요한 음식점</MenuItem>
          <MenuItem onClick = {() => this.props.callbackFromParent("followingList")}>팔로잉 </MenuItem>
          <MenuItem onClick = {() => this.props.callbackFromParent("followerList")}>팔로워 </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
  }
}

export default MyPageMenu;