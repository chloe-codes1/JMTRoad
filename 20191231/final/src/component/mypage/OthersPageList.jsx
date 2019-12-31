import React from 'react';
import OthersPageListData from './OthersPageListData';
import './MyPageList.scss';

class MyPageList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: ""
        }
    }

    render() {
        return(
            <div id="MyPageList" >
                <OthersPageListData data = {this.props.data}/>
            </div>
        )
    }
}
export default MyPageList;
