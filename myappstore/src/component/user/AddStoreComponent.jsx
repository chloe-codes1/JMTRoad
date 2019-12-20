import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import result from '../../result.json';
import axios from 'axios';

class AddStoreComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ownerNo: '',
      ownerID: '',
      password: '',
      name: '',
      tel: '',
      loc: '',
      stName: '',
      BRNo: '',
      foodstyle: '',
      mainMenu: [],
      menuImg: '',
      octime: '',
      file: '',
      imagePreviewUrl: ''
    }
    this.saveReserve = this.saveReserve.bind(this);

  }

  saveReserve = async (e) => {
    e.preventDefault();

    // const fd = new FormData();

    const reserve = {
      ownerNo: this.state.ownerNo,
      ownerID: this.state.ownerID,
      password: this.state.password,
      name: this.state.name,
      tel: this.state.tel,
      loc: this.state.loc,
      stName: this.state.stName,
      BRNo: this.state.BRNo,
      foodstyle: this.state.foodstyle,
      mainMenu: this.state.mainMenu,
      menuImg: this.state.menuImg,
      octime: this.state.octime,
    };

    // console.log("이미지" + this.state.menuImg);

    // fd.append("file1", this.state.menuImg);
    // fd.append("file2", "가나다2");
    // fd.append("file3", "가나다3");
    // fd.append("file4", "가나다4");

    // console.log("form :::" + fd.get('file1'));

    // axios({
    //   url: 'localhost:8080/owner',
    //   method: 'post',
    //   data: fd.get('file1'),
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // }).then (success => {
    //   const data = success.data;
    //   console.log("잘 업로드 되나 볼까"+data);
    // }).catch(
    //   error=>console.log("에러"+error.code)
    // );
    // axios.post('localhost:8080/owner/upload',{
    //   headers: {
    //     data : fd,
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    //   .then((response) => {
    //     // 응답 처리
    //   })
    //   .catch((error) => {
    //     // 예외 처리
    //     console.log("에러"+error.response)
    //   })





    ApiService.addReserve(reserve)
      .then(res => {
        this.props.history.push('/users');
      });
  }

  // uploadFile = (file,stateKey) => {
  //   this.setState({
  //     [stateKey]: this.state[stateKey].concat(file),
  //     error: '',
  //     post:false
  // });
  // };
  saveFile = async (e) => {
      e.preventDefault();
      let flag = true;

      if(this.state.menuImg.length===0) flag = false;

      if(flag) {
        let params = new FormData();
        const file = this.state.menuImg;

        console.log(file)

        // 덕현오빠는 이곳에 이미지 외에 다른 정보를 JSON.stringfy?? 그거로 합친 데이터를 
        // params.append() 로 넣어야 할듯!



        //  file.forEach(function(f) {
          params.append('file',file);


      //  })

        console.log("test:"+params.get('file'));

        await axios({
          method:'post',
          url: `http://localhost:8080/owner/upload`,
          data: params,
          headers : {
          'Content-Type': 'multipart/*:charset=UTF-8'
          }
        }).then (success => {
          const data = success.data;
          console.log("잘 업로드 되나 볼까.." + data);
        }).catch (
          error => console.log("에러..." +error)
        );
        this.setState ({
          selectedImage: '',
          error: '',
          post: true,
          showing: false
        });
      } else {
        this.setState({
          error: "업로드 할 파일을 선택해주세요."
        });
      }
    }

  onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  search = (e) => {
    //페이지 리로딩 방지
    e.preventDefault();

    let input = document.getElementById("stName").value;

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
      loc: loc1,
      tel: tel1,
      foodstyle: foodstyle1,
      mainMenu: mainMenu1
    });

  }


  render() {


    return (

      <div>

        <h2 className="text-center">음 식 점 등 록</h2>


        <div className="form-group">

          <form onSubmit={this.search}>
            <label>음식점이름</label>
            <input type="text" placeholder="음식점 이름" id="stName" name="stName" className="form-control" value={this.state.stName} onChange={this.onChange} />
            <button type="submit">확인</button>
          </form>
        </div>

        <div className="form-group">
          <label>주소</label>
          <input type="text" placeholder="주소" name="loc" className="form-control" value={this.state.loc} onChange={this.onChange} />
        </div>

        <div className="form-group">
          <label>전화번호</label>
          <input type="text" placeholder="전화번호" name="tel" className="form-control" value={this.state.tel} onChange={this.onChange} />
        </div>

        <div className="form-group">
          <label> 사진 최대 5장 </label>
          <input type="file" placeholder="이미지" id="menuImg" name="menuImg" className="form-control" value={this.state.menuImg} onChange={this.onChange} />
          <button onClick={this.saveFile}>확인</button>
        </div>

        <div className="form-group">
          <label>음식 스타일</label>
          <input type="text" placeholder="음식 스타일 ex)한식, 중식, 일식" name="foodstyle" className="form-control" value={this.state.foodstyle} onChange={this.onChange} />


        </div>


        <div className="form-group">
          <label>주된 음식</label>
          <input type="text" placeholder=" 주메뉴 ex)김치찌개, 된장찌개" name="mainMenu" className="form-control" value={this.state.mainMenu} onChange={this.onChange} />
        </div>


        <div className="form-group">
          <label>운영시간</label>
          <input type="text" placeholder="음식점 운영시간 ex) 10~22" name="octime" className="form-control" value={this.state.octime} onChange={this.onChange} />
        </div>

        <button className="btn btn-success" onClick={this.saveReserve}>Save</button>



      </div>
    );
  }
}

export default AddStoreComponent;