import React, { Component, Fragment } from 'react';
import './projectList.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import withLogin from '../login/LoginHOC';

class ProjectList extends Component {

  async projectList() {
    const response = await Axios.get("/list");

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
    this.projectList()
  }

  handleChange = (e) => {
    this.setState({
      project: {
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    // console.log(this.state.data); //데이터확인..
    const { data } = this.state
    let result = null;

    if (data !== null) {
      result = data.map((list) =>
        (<Fragment className="ProjectList">
          <Link to={`/list/${list.projectNo}`}>
            <div>           
              <img src={list.menuImg} height='100' width='100'></img>              
              {/* {list.projectNo} */}
              {list.title} &nbsp;
              {list.nickname} &nbsp;
              {list.read} &nbsp;

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

// export default withLogin(ProjectList);
export default ProjectList;