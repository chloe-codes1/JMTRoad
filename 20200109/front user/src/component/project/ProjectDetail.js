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
import PanToolIcon from '@material-ui/icons/PanTool';
import CreateIcon from '@material-ui/icons/Create';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FaceIcon from '@material-ui/icons/Face';

class ProjectDetail extends Component {
  async projectDetail(){
    console.log("하이");
    console.log(this.props.match.params.projectNo)
    // const response = await Axios.get(`/list/${this.props.match.params.projectNo}`);
    const response = await Axios.get(`/${this.props.match.params.projectNo}`);
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



  componentDidMount(){
    this.projectDetail();
    this.projectLikeView();
    

        
  }

  projectLikeView(){
    Axios({
      method: "get",
      url:`/projectLikeView/${this.props.match.params.projectNo}/${window.sessionStorage.getItem("userNo")}`,
    }).then((res) => {
      console.log("1234",res.data)
      if(res.data){
        this.setState({
          like: true
        });
      }
      
    }).catch(error => console.log("에러" +error));
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
      <div >
        <div> 
          {project&&(
                  <div className="div1">
                    <br/>
                    <div style={{display:'block', backgroundColor: '#FAEBFF', height:'130px', textAlign:'center', fontSize: '20px', color:'#FFFFFF',
                        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>
                        
                        <span style={{display:'block', fontSize: '40px',fontWeight: "bold", float:'left', paddingLeft:'50px', paddingTop:'20px', color:'#FFFFFF',
                        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
                      }}>{project.title} </span>      
                          <div style={{float:'right', fontSize: '30px',fontWeight: "bold", paddingRight:'50px',paddingTop:'30px'}}>
                          
                            <PanToolIcon style={{color:'black'}}/><div>{project.meetingDate} </div><AttachMoneyIcon style={{color:'black'}}/>{project.totalExpense} 
                          
                         

                          </div>
                          
                          <div style={{clear:'both', float:'left', marginLeft:'30px', paddingTop:'10px'}}>
                              <div> <CreateIcon style={{color:'black'}} />{project.regDate} </div> &nbsp;
                              
                              {/* <FaceIcon/><FaceIcon/><div>{project.buddies} </div>         */}
                              {/* <div>{project.projectNo} </div>  */}
                              <FaceIcon style={{color:'black'}}/><div>{project.nickname} </div>
                              <VisibilityIcon style={{color:'black'}}/><div>{project.read} </div>
                          </div>

                          <div style={{ float:'right', marginRight:'40px'}}>

                          {this.state.like === true ? (
                              <Button onClick={this.projectLikeDel}>
                                <Favorite style={{color:'red', height:'40px', width:'40px'}}/> 
                                <span style={{fontSize: '15px', color:'#FFFFFF', 
                        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}}>좋아요</span>
                                </Button> 
                            ) : (
                              <Button onClick={this.projectLike}>
                                <FavoriteBorder style={{color:'red', height:'40px', width:'40px'}}/> 
                                <span style={{fontSize: '15px', color:'#FFFFFF', 
                        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'}}>좋아요</span>
                              </Button>
                            )}

                          </div>

                          

                          
                      </div>  

                    
                    
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
        
          {/* {this.state.like === true ? (
            <Button onClick={this.projectLikeDel}>
              <Favorite style={{color:'red'}}/>좋아요
              </Button> 
          ) : (
            <Button onClick={this.projectLike}>
              <FavoriteBorder style={{color:'red'}}/>좋아요
            </Button>
          )}  <br/> */}
                 
        <div>   
          <CommentList projectNo = {this.props.match.params.projectNo}/>
        </div>

      </div>
    );
  }
}

export default ProjectDetail;