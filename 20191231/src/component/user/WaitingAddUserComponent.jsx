import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import 'antd/dist/antd.css';
import axios from "axios";

class WaitingAddUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            waitNO: '',
            ownerNo: '',
            userNo: '',
            waitingList: '',
            username: '',
            phone: '',
            adult: '',
            child: '',
            modal : false
        }
        this.saveWaiting = this.saveWaiting.bind(this);
        // this.handleCloseModal = this.handleCloseModal.bind(this);
    }

//      handleCloseModal = () => {
//     this.setState({
//       modal: false
//     });
//   };

   
  saveWaiting = (e) => {
        //  e.preventDefault();
        let waiting = {
            waitNO: this.state.waitNO,
            ownerNo: this.state.ownerNo,
            userNo: this.state.userNo,
            waitingList: this.state.waitingList,
            username: this.state.username,
            phone: this.state.phone,
            adult: this.state.adult,
            child: this.state.child,
            request: this.state.request,
        };
      
        console.log("adf"+this.state.ownerNo)
        console.log(waiting.ownerNo)
        axios.post('http://localhost:1217/waiting',waiting,{
       
        })

        alert("대기신청이 완료 되었습니다");

        // this.handleCloseModal;

        // this.props.onClose();

    //     ApiService.addUser(reserve)
    //         .then(res => {
    //             this.setState({ message: 'User added successfully.' });
    //             this.props.history.push("/store");
    //         });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

        

    render() {
        
        
        return (

            <div>
                <form>

                    <div className="form-group">
                        <label >이름</label>
                        <input type="text" placeholder="예약자 이름" name="username" className="form-control" value={this.state.username} onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label>전화번호</label>
                        <input type="text" placeholder="전화번호" name="phone" className="form-control" value={this.state.phone} onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label>성인</label>
                        <input type="number" placeholder="성인 인원 ex)1,2,3" name="adult" className="form-control" value={this.state.adult} onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label>유아</label>
                        <input type="number" placeholder="유아 인원 ex)1,2,3" name="child" className="form-control" value={this.state.child} onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label>요구사항</label>
                        <input type="text" placeholder="요청사항을 입력해주세요 ex) 아기 전용 의자가 필요합니다." name="request" className="form-control" value={this.state.request} onChange={this.onChange} />
                    </div>
                    <p style={{ color:'red'}}>*주의사항: 가게에서 호명 후 20분이 넘어가면 No show 처리가 됩니다.</p>

                    <button className="btn btn-success" onClick={this.saveWaiting}>추가</button>
                </form>
            </div>
        );
    }
}

export default WaitingAddUserComponent;