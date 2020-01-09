import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import $ from 'jquery';
import jquery from 'jquery';
import './Comment.css';
import CommentIcon from '@material-ui/icons/Comment';
import FaceIcon from '@material-ui/icons/Face';
// window.$ = window.jquery = jquery;


class CommentList extends Component {
    async commentList() {
    console.log("ㅜㅜ");
    const response = await Axios.get(`/projectComment/${this.props.projectNo}`);

    this.setState({
        data: response.data
      });
    }  

    state = {
        data : null,
        projectNo:"",
        projectComment :{
          projectCommentNo : '',
          projectNo : '',
          nickname : '',
          userNo : '',
          content : '',
          regDate : '',
          open : ''  
        },
        updateContent:''
      }

      componentDidMount(){
        this.commentList();
      }

      handleChange = (e) => {
        this.setState({
          projectComment : {
            [e.target.name] : e.target.value
          }
        })
        console.log(e.target.value)
      }

      onChange = (e) => {
        // const data=[...this.state.data];
        // data[e.target.name]={
        //   ...data[e.target.name],
        //       content:e.target.value
        // }

        // this.setState({
        //   data : data
        // })

        this.setState({
          updateContent:e.target.value
        })
        // console.log(e.target.value)
      }

      insertComment = async() => {
        let comment = {
          projectNo : this.props.projectNo,
          userNo : window.sessionStorage.getItem("userNo"),
          content : this.state.projectComment.content
        };
    
        await Axios ({
          method: "post",
          url: "/projectComment/insert",
          data: comment
        }).then (success => {
          const data = success.data;
          console.log("댓글작성성공 " + data);
          
          window.location.reload();
        }).catch(error => console.log("에러다..." +error));
      };

  async commentDelete(projectCommentNo) {
    
    // let userNo = window.sessionStorage.getItem("userNo");
    let params = new FormData();

    // params.append("userNo", userNo);
    params.append("projectCommentNo", projectCommentNo);

    await Axios({
      method: "post",
      url:"/projectComment/delete",
      data: params
    }).then(success => {
      const data = success.data;
      console.log("댓글 삭제 성공"+data);
      window.location.reload();
    });
}

onClickButton = (index) =>{
  // this.setState(() => ({hidden: true}));
  this.setState({updateContent:this.state.data[index].content});
  $("#comment"+index+"").removeClass("hide").addClass("show");
}

commentUpdate = async(index) => {
  // console.log(index)
   const data=[...this.state.data];
        data[index]={
          ...data[index],
              content:this.state.updateContent
        }
        this.setState({
          data : data
        })

        let params = new FormData();
        params.append("projectCommentNo",  data[index].projectCommentNo);
        params.append("content", data[index].content);

        await Axios({
          method: "post",
          url:"/projectComment/update",
          data: params
        }).then(success => {
          const data = success.data;
          console.log("댓글 수정 성공"+data);
        });

        // document.getElementById("comment"+index).style.visibility="hidden";
        $("#comment"+index).removeClass("show").addClass("hide");
        console.log(document.getElementById("comment"+index))
}
// {/* {window.sessionStorage.getItem("userNo") === {list.userNo} || window.sessionStorage.getItem("admin") ?  } ( */}
  render() {
    const { data } = this.state
    let result = null;
    console.log(localStorage.getItem("adminID"));
    if (data !== null) {
      result = data.map((list, index) =>
        (<Fragment>
            <div style={{padding: '50px', fontSize:'20px'}}>
                {/* sessionStorage.getItem("adminID") */}
                
                <span style={{}}> {list.regDate}&nbsp;&nbsp; </span>
                <span style={{}}> <FaceIcon/> {list.nickname}&nbsp;&nbsp;</span>
                <span> {list.content}&nbsp;&nbsp;</span>
                {(sessionStorage.getItem("adminID") || (sessionStorage.getItem("userNo") == list.userNo ))&& (
                
                          
                <div>&nbsp;&nbsp;<button onClick={ () => this.commentDelete(list.projectCommentNo) }>삭제</button>  &nbsp;
                <button onClick={ () => this.onClickButton(index)}>수정</button> 
                <div id={"comment"+index} className="hide">
                
                   &nbsp;&nbsp;<input type="text" value={this.state.updateContent} onChange={this.onChange} name={index} /> &nbsp;
                   <button onClick={ () => this.commentUpdate(index) } > 저장 </button>
                </div> 
                </div>
                )}
               <br/>
            </div> 
        </Fragment>))
    }

    let nickname = window.sessionStorage.getItem('nickname');
    // console.log('nickname', nickname);
    return (
        <div>
            <hr/>
            <div style={{padding: '30px'}}>
            &nbsp;&nbsp;<FaceIcon/> {nickname} &nbsp;
            <input placeholder="댓글내용" type="text" value= {this.state.content} 
            onChange={this.handleChange} name="content" /> &nbsp;
            <button  onClick={this.insertComment.bind(this)}> 댓글등록 </button> 
            <br/><br/>
            {result}
            </div>
        </div>
    );
  }
}

export default CommentList;