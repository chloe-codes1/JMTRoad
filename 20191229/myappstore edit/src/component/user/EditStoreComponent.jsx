import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import result from '../../result.json';
import axios from 'axios'


class EditStoreComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {

      ownerNo: '',
      ownerID: '',
      password: '',
      name: '',
      brNo: '',

      storeName: '',
      address: '',
      tel: '',
      cuisine: '',
      mainMenu: '',
      menuImg: [],
      openingHours: '',

    }
    this.updateOwner = this.updateOwner.bind(this);
    this.loadOwner = this.loadOwner.bind(this);
    // this.saveFile = this.saveFile.bind(this);

  }

  componentDidMount() {
    this.loadOwner();
  }

  loadOwner() {

    ApiService.fetchOwnerById(window.localStorage.getItem("ownerNo"))
      .then((res) => {
        let owner = res.data;
        this.setState({
          ownerNo: owner.ownerNo,
          ownerID: owner.ownerID,
          password: owner.password,
          name: owner.name,
          brNo: owner.brNo,
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

  onChange = (e) =>
  this.setState({ [e.target.name]: e.target.value });

  updateOwner = (e) => {
    const store = {
      ownerNo: this.state.ownerNo,
      ownerID: this.state.ownerID,
      password: this.state.password,
      name: this.state.name,
      brNo: this.state.brNo,
      storeName: this.state.storeName,
      address: this.state.address,
      tel: this.state.tel,
      cuisine: this.state.cuisine,
      mainMenu: this.state.mainMenu,
      menuImg: this.state.menuImg,
      openingHours: this.state.openingHours,
    };

    ApiService.editOwner(store)
      .then(res => {
        this.props.history.push('/ownerlogin');
      });
  }

  // saveFile = async () => {
  //   let flag = true;
  
  //   if(this.state.menuImg.length===0) flag = false;
  
  //   if(flag) {
  //     let params = new FormData();
  //     const file = this.state.menuImg;

  //     console.log(file);
  
  //     // 덕현오빠는 이곳에 이미지 외에 다른 정보를 JSON.stringfy?? 그거로 합친 데이터를 
  //     // params.append() 로 넣어야 할듯!
  
  //     let ownerNo = this.state.ownerNo;
  
  //     file.forEach((f) => {
  //       params.append('file',f);
  //     })
  
  //     await axios({
  //       method:'post',
  //       url: `owners/uploadImage/${ownerNo}`,
  //       data: params,
  //       // headers : {
  //       // 'Content-Type': 'multipart/*'
  //       // }
  //     }).then (success => {
  //       const data = success.data;
  //       console.log("잘 업로드 되나 볼까.." + data);
  //     }).catch (
  //       error => console.log("에러..." +error)
  //     );
  //     this.setState ({
  //       selectedImage: '',
  //       error: '',
  //       post: true,
  //       showing: false
  //     });
  //   } else {
  //     this.setState({
  //       error: "업로드 할 파일을 선택해주세요."
  //     });
  //   }
  // }
  
//   onFileChangeHandler = (e) => {
//     e.preventDefault();
//     this.setState({
//       menuImg: e.target.menuImg[0]
//     });
//     const formData = new FormData();
//     formData.append('file', this.state.menuImg);
//     console.log(formData);
//     fetch('http://localhost:8080/upload', {
//         method: 'post',
//         body: formData
//     }).then(res => {
//         if(res.ok) {
//             console.log(res.data);
//             alert("File uploaded successfully.")
//         }
//     });
// };



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
            <input type="text" placeholder="음식점 번호" name="ownerNo" className="form-control" value={this.state.ownerNo} onChange={this.onChange} />
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
            <input type="text" placeholder="사업자 등록번호" name="brNo" className="form-control" value={this.state.brNo} onChange={this.onChange} />
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
          <input type="file" placeholder="이미지" id="menuImg" name="menuImg" className="form-control" value={this.state.menuImg} onChange={this.onChange} multiple />
          {/* <button onClick={this.saveFile}>저장</button> */}
        </div>

        <div className="form-group">
          <label>음식 스타일</label>
          <input type="text" placeholder="음식 스타일 ex)한식, 양식, 중식, 일식, 동남아식, 뷔페식 " name="cuisine" className="form-control" value={this.state.cuisine} onChange={this.onChange} />
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

export default EditStoreComponent;