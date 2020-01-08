import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import $ from 'jquery';
import jquery from 'jquery';
import './detailpj.css';


export default class Detailpj extends Component {
    async detailpj() {
        const response = await Axios.get(`/projectDetail/${this.props.projectNo}`);
        this.setState({
            data: response.data,
            });
    }

    state = {
        data : null,
        projectNo:"",
        projectDetail :{
          projectNo : '',
          ownerNo : '',
          routeNo : '',
          estimate : '',
          payment : '',
          memo : '',
          storeName : '',
          menuImg : '',
          userNo : ''
          
        },
        updateDetail: {
          projectNo : '',
          ownerNo : '',
          routeNo : '',
          estimate : '',
          payment : '',
          memo : '',
          storeName : '',
          menuImg : '',
          userNo : ''
        }
      }

      componentDidMount(){
        this.detailpj();
      }

      onChange = (e) => {
        this.setState({
          updateDetail:{
            ...this.state.updateDetail,
            [e.target.name]:e.target.value}
        })
        //console.log(e.target.value)
      }

      async detailDelete(projectNo, ownerNo) {

        let params = new FormData();
        params.append("projectNo", projectNo);
        params.append("ownerNo", ownerNo);
    
        await Axios({
          method: "post",
          url:"/projectDetail/delete",
          data: params
        }).then(success => {
          const data = success.data;
          console.log("삭제 성공"+data);
          window.location.reload();
        });
    }

    onClickButton = (index) =>{
      // this.setState(() => ({hidden: true}));
      this.setState({updateDetail:this.state.data[index]});
      $("#detail"+index+"").removeClass("hide").addClass("show");
    }

    detailUpdate = async(index) => {
      // console.log(index)
       const data=[...this.state.data];
            data[index]={
              ...data[index],                  
                  estimate:this.state.updateDetail.estimate,
                  payment:this.state.updateDetail.payment,
                  memo:this.state.updateDetail.memo
            }
            this.setState({
              data : data
            })

            let detail = {
              projectNo : data[index].projectNo,
              ownerNo : data[index].ownerNo,
              estimate : data[index].estimate,
              payment : data[index].payment,
              memo : data[index].memo
            };

            await Axios({
              method: "post",
              url:"/projectDetail/update",
              data: detail
            }).then(success => {
              const data = success.data;
              console.log("수정 성공"+data);
            });
    
            //document.getElementById("detail"+index).style.visibility="hidden";
            
            $("#detail"+index).removeClass("show").addClass("hide");
            console.log(document.getElementById("detail"+index))
    }
    

  render() {
    const { data } = this.state
    let result = null;

    if (data !== null) {
        result = data.map((list, index) =>
          (<Fragment>
              <div>
              {/* ownerNo: {list.ownerNo}, &nbsp; */}
              <img src={list.menuImg} height='100' width='100'></img>, &nbsp;
              storeName: {list.storeName}, &nbsp;
              estimate: {list.estimate}, &nbsp;
              payment: {list.payment}, &nbsp;
              memo: {list.memo} &nbsp;
              {(sessionStorage.getItem("adminID") || (sessionStorage.getItem("userNo") == list.userNo )) && (
                <div>
                  <button onClick={ () => this.detailDelete(this.props.projectNo,list.ownerNo) }>삭제</button> &nbsp;
                  <button onClick={ () => this.onClickButton(index)}>수정</button>  <br/><br/> &nbsp;
                  <span id={"detail"+index} className="hide">
                   &nbsp;estimate:<input type="text" value={this.state.updateDetail.estimate} onChange={this.onChange} name="estimate" /> 
                   &nbsp;payment:<input type="text" value={this.state.updateDetail.payment} onChange={this.onChange} name="payment" /> 
                   &nbsp;memo:<input type="text" value={this.state.updateDetail.memo} onChange={this.onChange} name="memo" /> 
                   &nbsp;<button onClick={ () => this.detailUpdate(index) }> 저장 </button>
                </span>  <br/>
                </div>
                )}<br/>

              </div> 
          </Fragment>))
      }
    return (
      <div> {result} </div>
    );
  }
}
