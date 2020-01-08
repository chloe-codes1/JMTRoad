import React, { Component } from 'react';
import './projectDetail.css';
import Axios from 'axios';
import CommentList from '../comment/CommentList';
import Detailpj from '../project/Detailpj';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { Button } from '@material-ui/core';
import $ from 'jquery';
import jquery from 'jquery';
import './projectDetail.css';

class ProjectDetail extends Component {
  async projectDetail(){
    console.log("하이");
    console.log(this.props.match.params.projectNo)
    const response = await Axios.get(`/list/${this.props.match.params.projectNo}`);
    this.setState({
      project: response.data
    });
  }

  state = {
    projectNo:"",
    like: false,
    project :{
      projectNo : '',
      nickname : '',
      projectStatus : '',
      reasonCode : '',
      title : '',
      regDate : '',
      meetingDate : '',
      totalExpense : '',
      read : '',
      open : '',
      shared : '',
      baseNo : '',
      buddies: '',
      userNo: ''
    },
    update :{
      title : '',
      meetingDate : '',
      buddies: ''
    }
  }

  projectLikeView(){
    let userNo = window.sessionStorage.getItem("userNo");
    let projectNo = this.props.match.params.projectNo;
    let params = new FormData();

    params.append("userNo", userNo);
    params.append("projectNo", projectNo);

    Axios({
      method: "post",
      url:"/projectLikeView",
      data: params
    }).then(success => {
      this.setState({
        like: true
      });
    });
  }

  componentDidMount(){
    this.projectLikeView();
    this.projectDetail();
        
  }

  

  projectLike = async () => {
    let userNo = window.sessionStorage.getItem("userNo");
    let projectNo = this.props.match.params.projectNo;
    let params = new FormData();

    params.append("userNo", userNo);
    params.append("projectNo", projectNo);

    // console.log(userNo);
    // console.log(projectNo);

    await Axios({
      method: "post",
      url:"/projectLike",
      data: params
    }).then(success => {
      // const data = success.data;
      // console.log("좋아요성공"+data);
      this.setState({
        like: true
      });
    });
  }

  projectLikeDel = async () => {
    let userNo = window.sessionStorage.getItem("userNo");
    let projectNo = this.props.match.params.projectNo;
    let params = new FormData();

    params.append("userNo", userNo);
    params.append("projectNo", projectNo);

    await Axios({
      method: "post",
      url:"/projectLikeDel",
      data: params
    }).then(success => {
      // const data = success.data;
      // console.log("좋아요 취소 성공"+data);
      this.setState({
        like: false
      });
    });
  }

  async projectDelete(projectNo) {
    
    // let userNo = window.sessionStorage.getItem("userNo");
    let params = new FormData();

    // params.append("userNo", userNo);
    params.append("projectNo", projectNo);

    await Axios({
      method: "post",
      url:"/project/delete",
      data: params
    }).then(success => {
      const data = success.data;
      console.log("프로젝트 삭제 성공"+data);
      this.props.history.push('/Main'); 
    });
}

handleChange = (e) => {
  console.log(e.target.value);
  this.setState({
    update : {
      ...this.state.update,
    [e.target.name] : e.target.value
    }
  })
}

onClickButton = (e) => {
  this.setState(() => ({hidden: true,update:this.state.project}));
  $("#project").removeClass("hide").addClass("show");
}
projectUpdate = async() => {
      
      const detail=this.state.update;
      console.log(detail);
      
        await Axios({
          method: "post",
          url:"/project/update",
          data: detail
        }).then(success => {
          const data = success.data;
          console.log("수정 성공"+data);
          this.setState({
            project:this.state.update
          })
        }).catch(error => console.log("에러" +error));

        //document.getElementById("project").style.visibility="hidden";
        $("#project").removeClass("show").addClass("hide");
        // console.log(document.getElementById("project"))
}



  render(){
    const {project} = this.state
    return (
      <div>
        <div> 
          {project&&(
                  <div className="div1">
                    <br/>
                    <div>{project.title} </div>         
                    <div>{project.regDate} </div>
                    <div>{project.meetingDate} </div>
                    <div>{project.totalExpense} </div>
                    <div>{project.buddies} </div>        
                    {/* <div>{project.projectNo} </div>  */}
                    <div>{project.nickname} </div>
                    <div>{project.read} </div>

                    
                    
              {(sessionStorage.getItem("adminID") || (sessionStorage.getItem("userNo") == project.userNo ))&& 
                    (<div>&nbsp;&nbsp;<button onClick={ () => this.projectDelete(project.projectNo) }>삭제</button>  &nbsp;
                      <button onClick={this.onClickButton}>수정</button> <br/>

                    <span id={"project"} className="hide">
                        &nbsp;title:<input type="text" value={this.state.update.title} onChange={this.handleChange} name="title" /> 
                        &nbsp;meetingDate:<input type="text" value={this.state.update.meetingDate} onChange={this.handleChange} name="meetingDate" /> 
                        &nbsp;buddies:<input type="text" value={this.state.update.buddies} onChange={this.handleChange} name="buddies" />                        
                        &nbsp;<button onClick={ this.projectUpdate }> 저장 </button>
                    </span>  <br/>
                      </div>
                      )}  
                  </div>
              )} <br/>
        </div> 
          
          <div>
            <Detailpj projectNo = {this.props.match.params.projectNo}/>
          </div>
        
          {this.state.like === true ? (
            <Button onClick={this.projectLikeDel}>
              <Favorite/>좋아요
              </Button> 
             
          ) : (
            <Button onClick={this.projectLike}>
              <FavoriteBorder/>좋아요
            </Button>
          )}  <br/>
                 
        <div>   
          <CommentList projectNo = {this.props.match.params.projectNo}/>
        </div>

      </div>
    );
  }
}

export default ProjectDetail;