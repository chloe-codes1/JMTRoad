import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import 'antd/dist/antd.css';
import axios from "axios";

class ReservationAddUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservationNO: '',
            ownerNo: '',
            userNo: '',
            reservationList: '',
            username: '',
            phone: '',
            regdate: '',
            retime: '',
            adult: '',
            child: '',
            request: '',
            modal: true 
           
        }
        this.saveReserve = this.saveReserve.bind(this);
        
    }

    saveReserve = async(e) => {

        this.state.ownerNo=window.localStorage.getItem("ownerNo");
        this.state.userNo=window.sessionStorage.getItem('userNo');

        let reserve = {
            reservationNO: this.state.reservationNO,
            ownerNo: this.state.ownerNo,
            userNo: this.state.userNo,
            reservationList: this.state.reservationList,
            username: this.state.username,
            phone: this.state.phone,
            regdate: this.state.regdate,
            retime: this.state.retime,
            adult: this.state.adult,
            child: this.state.child,
            request: this.state.request,
        };
        
        console.log("유저번호"+reserve.userNo)
        console.log("음식점번호"+reserve.ownerNo)

        await axios ({
            method: 'post',
            url: 'reserve/save',
            data: reserve
        }).then(success => {
            console.log("난 간다");
        })
        .catch (error => console.log("에러났긔... "+ error));

        this.props.history.push('/store');
    
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return (

            <div>
                <form>

                    <div className="form-group">
                        <label>예약이름</label>
                        <input type="text" placeholder="예약자 이름" name="username" className="form-control" value={this.state.username} onChange={this.onChange} />
                    </div>
                    <p></p>

                    <div className="form-group">
                        <label>전화번호</label>
                        <input type="text" placeholder="전화번호" name="phone" className="form-control" value={this.state.phone} onChange={this.onChange} />
                    </div>
                    <p></p>

                    <div className="form-group">
                        <label>예약날짜</label>
                        <input type="date" placeholder="예약날짜" name="regdate" className="form-control" value={this.state.regdate} onChange={this.onChange} />
                    </div>
                    <p></p>

                    <div className="form-group">
                        <label>예약 시간 </label>
                        <select placeholder="예약시간" name="retime" className="form-control" value={this.state.retime} onChange={this.onChange}>
                            <option value>선택</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                        </select>
                    </div>
                    <p></p>

                    <div className="form-group">
                        <label>성인</label>
                        <input type="number" placeholder="성인 인원 ex)1,2,3" name="adult" className="form-control" value={this.state.adult} onChange={this.onChange} />
                    </div>
                    <p></p>

                    <div className="form-group">
                        <label>유아</label>
                        <input type="number" placeholder="유아 인원 ex)1,2,3" name="child" className="form-control" value={this.state.child} onChange={this.onChange} />
                    </div>
                    <p></p>

                    <div className="form-group">
                        <label>요구사항</label>
                        <input type="text" placeholder="요청사항을 입력해주세요 ex) 아기 전용 의자가 필요합니다." name="request" className="form-control" value={this.state.request} onChange={this.onChange} />
                    </div>
                    <p></p>
                    
                    <button className="btn btn-success" onClick={this.saveReserve}>추가</button>
                </form>
            </div>
        );
    }
}

export default ReservationAddUserComponent;