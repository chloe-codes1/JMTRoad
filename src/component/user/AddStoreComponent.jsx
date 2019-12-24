import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import result from '../../result.json';


class AddStoreComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {

      ownerNo: '',
      ownerID: '',
      password: '',
      name: '',
      BRNo: '',

      storeName: '',
      address: '',
      tel: '',
      cuisine: '',
      mainMenu: '',
      menuImg: [],
      openingHours: '',

    }
    this.updateOwner = this.updateOwner.bind(this);
    

  }

  componentDidMount() {
    this.loadOwner();
  }

  loadOwner() {

    ApiService.fetchUserById(window.localStorage.getItem("ownerNo"))
      .then((res) => {
        let owner = res.data;
        this.setState({
          ownerNo: owner.ownerNo,
          ownerID: owner.ownerID,
          password: owner.password,
          name: owner.name,
          BRNo: owner.brNo,
          storeName: owner.storeName,
          address: owner.address,
          tel: owner.tel,
          cuisine: owner.cuisine,
          mainMenu: owner.mainMenu,
          menuImg: owner.MenuImg,
          openingHours: owner.openingHours
        })
      });
  }

updateOwner= (e) =>{

  const store = {
    ownerNo: this.state.test,
    ownerID: this.state.ownerID,
    password: this.state.password,
    name: this.state.name,
    BRNo: this.state.BRNo,

    storeName: this.state.storeName,
    address: this.state.address,
    tel: this.state.tel,
    cuisine: this.state.cuisine,
    mainMenu: this.state.mainMenu,
    menuImg: this.state.menuImg,
    openingHours: this.state.openingHours,
  };

 
  console.log("이미지 :: " + this.state.menuImg);
  console.log("ownerNo :: "+this.state.ownerNo);


  ApiService.addOwners(store)
    .then(res => {
      this.props.history.push('/owners');
    });
}
  



  onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  search = (e) => {
    //페이지 리로딩 방지
    e.preventDefault();

    let input = document.getElementById("storeName").value;

    let loc1 = null;
    let tel1 = null;
    let foodstyle1 = null;
    let mainMenu1 = null;

    result.map(function (a) {
      if (a.stname === input) {
        return loc1 = a.address, tel1 = a.tel, foodstyle1 = a.style, mainMenu1 = a.main
      }
    });
    this.setState({
      address: loc1,
      tel: tel1,
      cuisine: foodstyle1,
      mainMenu: mainMenu1
    });

  }

  render() {


    return (

      <div>

        <h2 className="text-center">음 식 점 등 록</h2>


        <div className="form-group">

          <div className="form-group">
          <label>음식점 번호</label>
          <input type="text" placeholder="음식점 번호" name="ownerno" className="form-control" value={this.state.ownerNo} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label>아이디</label>
          <input type="text" placeholder="아이디" name="ownerID" className="form-control" value={this.state.ownerID} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input type="text" placeholder="비밀번호" name="password" className="form-control" value={this.state.password} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label>주인이름</label>
          <input type="text" placeholder="주인이름" name="name" className="form-control" value={this.state.name} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label>사업자 등록번호</label>
          <input type="text" placeholder="사업자 등록번호" name="brNo" className="form-control" value={this.state.BRNo} onChange={this.onChange} />
        </div>


          <form onSubmit={this.search}>
            <label>음식점이름</label>
            <input type="text" placeholder="음식점 이름" id="storeName" name="storeName" className="form-control" value={this.state.storeName} onChange={this.onChange} />
            <button type="submit">확인</button>
          </form>
        </div>

        <div className="form-group">
          <label>주소</label>
          <input type="text" placeholder="주소" name="address" className="form-control" value={this.state.address} onChange={this.onChange} />
        </div>

        <div className="form-group">
          <label>전화번호</label>
          <input type="text" placeholder="전화번호" name="tel" className="form-control" value={this.state.tel} onChange={this.onChange} />
        </div>

        <div className="form-group">
          <label> 사진 최대 5장 </label>
          <input type="file" placeholder="이미지" id="menuImg" name="menuImg" className="form-control" value={this.state.menuImg} onChange={this.onChange} />
          {/* <button onClick={this.uploadfile}>저장</button> */}
        </div>

        <div className="form-group">
          <label>음식 스타일</label>
          <input type="text" placeholder="음식 스타일 ex)한식, 중식, 일식" name="cuisine" className="form-control" value={this.state.cuisine} onChange={this.onChange} />
        </div>


        <div className="form-group">
          <label>주된 음식</label>
          <input type="text" placeholder=" 주메뉴 ex)김치찌개, 된장찌개" name="mainMenu" className="form-control" value={this.state.mainMenu} onChange={this.onChange} />
        </div>


        <div className="form-group">
          <label>운영시간</label>
          <input type="text" placeholder="음식점 운영시간 ex) 10~22" name="openingHours" className="form-control" value={this.state.openingHours} onChange={this.onChange} />
        </div>

        <button className="btn btn-success" onClick={this.updateOwner}>Save</button>



      </div>
    );
  }
}

export default AddStoreComponent;