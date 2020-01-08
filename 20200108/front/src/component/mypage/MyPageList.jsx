import React from 'react';
import MyPageListData from './MyPageListData';
import './MyPageListData';

class MyPageList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: ""
        }
    }

    render() {
        return(
            <div id="MyPageList" style={{display:"inline"}}>
                <MyPageListData data = {this.props.data}/>
            </div>
        )
    }
}
export default MyPageList;
