import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import FaceIcon from '@material-ui/icons/Face';
import VisibilityIcon from '@material-ui/icons/Visibility';

class HotProjectList extends Component {

  async hotProjectList() {
    const response = await Axios.get("/main/hot");

    this.setState({
      data: response.data

    });
  }

  state = {
    data: null,
    show: false,
    project: {
      projectNo: '',
      nickname: '',
      projectStatus: '',
      reasonCode: '',
      title: '',
      regDate: '',
      meetingDate: '',
      totalExpense: '',
      read: '',
      open: '',
      shared: '',
      baseNo: '',
      buddies: '',
      menuImg : ''
    }
  }

  componentDidMount() {
    this.hotProjectList()
  }

  render() {
    // console.log(this.state.data); //데이터확인..
    const { data } = this.state
    let result = null;

    if (data !== null) {
      result = data.map((list) =>
        (<Fragment >
          <Link to={`/${list.projectNo}`} style={{color:'black'}} >
            <div style={{display:'inline-block', paddingTop:'2px', border:'1px solid black', marginRight:'80px', marginBottom:'20px'}}>
                <div style={{display:'inline-block'}}>           
                  <img src={list.menuImg} height='150' width='200'></img>              
                  {/* {list.projectNo} */}
                  <div style={{display:'block', textAlign:'center'}}>
                  {list.title} &nbsp;
                  <div style={{display:'block', textAlign:'right', marginRight:'10px'}}>          
                    <FaceIcon style={{width:'15px',height:'15px'}}/>{list.nickname} &nbsp;

                     <VisibilityIcon style={{width:'15px',height:'15px'}}/>&nbsp;{list.read}
                  </div>
                  </div>
                </div>
            </div>
          </Link>
        </Fragment>))
    }

    return (
      <div className="ProjectList">
        {result}
      </div>
    );
  }
}

export default HotProjectList;