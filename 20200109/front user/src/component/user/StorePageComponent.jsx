import React, { Component, Fragment } from 'react'
import ApiService from "../../service/ApiService";
import Axios from 'axios';
import ReservationModal from "../Storebtn/ReservationModal";
import WaitingModal from "../Storebtn/WaitingModal";
import SimpleTabs from "../user/SimpleTabs";
import StorePage from "../user/StorePage.scss";

import jQuery from "jquery";

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { Button } from '@material-ui/core';

window.$ = window.jQuery = jQuery;

const { kakao } = window;

class StorePageComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            like: false,
            storeinfo: [],
            reviews: [],
            message: null,
            coords: new kakao.maps.LatLng(37.513433, 126.982328)
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);

    }

    componentDidMount() {
        this.reloadUserList();
        console.log("``````````````````````````````" + this.state.like);


    }

    storeLike = async () => {
        let userNo = window.sessionStorage.getItem("userNo");
        let ownerNo = this.state.ownerNo;
        let params = new FormData();

        params.append("userNo", userNo);
        params.append("ownerNo", ownerNo);

        // console.log(userNo);
        // console.log(projectNo);

        await Axios({
            method: "post",
            url: "/owners/storeLike",
            data: params
        }).then(success => {
            // const data = success.data;
            // console.log("좋아요성공"+data);
            this.setState({
                like: true
            });
        });
    }

    storeLikeDel = async () => {
        let userNo = window.sessionStorage.getItem("userNo");
        let ownerNo = this.state.ownerNo;
        let params = new FormData();

        params.append("userNo", userNo);
        params.append("ownerNo", ownerNo);

        await Axios({
            method: "post",
            url: "/owners/storeLikeDel",
            data: params
        }).then(success => {
            // const data = success.data;
            // console.log("좋아요 취소 성공"+data);
            this.setState({
                like: false
            });
        });
    }


    reloadUserList() {
        ApiService.fetchOwnerById(window.localStorage.getItem("ownerNo"))
            .then((res) => {
                let owner = res.data;

                if (owner.cuisine == "51") {
                    owner.cuisine = "한식";
                }
                else if (owner.cuisine == "52") {
                    owner.cuisine = "양식";
                }
                else if (owner.cuisine == "53") {
                    owner.cuisine = "중식";
                }
                else if (owner.cuisine == "54") {
                    owner.cuisine = "일식";
                }
                else if (owner.cuisine == "55") {
                    owner.cuisine = "동남아식";
                }
                else if (owner.cuisine == "56") {
                    owner.cuisine = "뷔페식";
                }

                this.setState({
                    ownerNo: owner.ownerNo,
                    ownerID: owner.ownerID,
                    password: owner.password,
                    name: owner.name,
                    brNo: owner.brNo,
                    storeName: owner.storeName,
                    address: owner.address,
                    tel: owner.tel,
                    menuImg: owner.menuImg,
                    cuisine: owner.cuisine,
                    mainMenu: owner.mainMenu,
                    openingHours: owner.openingHours,



                })

                let userNo = window.sessionStorage.getItem("userNo");
                console.log("No : " + userNo)
                window.localStorage.setItem("ownerNo", this.state.ownerNo);
                window.localStorage.setItem("storeName", this.state.storeName);
            });

        ApiService.loadstorelike(window.sessionStorage.getItem("userNo"), window.localStorage.getItem("ownerNo"))
            .then((res) => {
                console.log("didididi", res.data.ownerNo)
                console.log("didididi", window.sessionStorage.getItem("userNo"))
                console.log("didididi", window.localStorage.getItem("ownerNo"))

                {
                    if ((res.data.ownerNo) == window.localStorage.getItem("ownerNo")) {

                        console.log("test")
                        this.setState({
                            like: true
                        })
                    }
                }

            });
    }

    deleteUser(ownerNo) {
        ApiService.deleteUser(ownerNo)
            .then(res => {
                this.setState({ message: 'User deleted successfully.' });
                this.setState({ users: this.state.users.filter(user => user.ownerNo !== ownerNo) });
            })
    }

    editUser(ownerNo) {
        window.localStorage.setItem("userId", ownerNo);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

    componentDidUpdate() {
        let coords1;
        console.log("componentDidUpdate() called!!");
        console.log("간다고" + this.state.address);

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=cf322787f4669732502374b0e6ffc647&autoload=false&libraries=services,clusterer,drawing";
        document.head.appendChild(script);

        script.onload = () => {
            var container = document.getElementById("map");
            var geocoder = new kakao.maps.services.Geocoder();
            var coordinate;
            geocoder.addressSearch(this.state.address, (result, status) => {
                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    this.state.coords = coords;
                    var storeName = this.state.storeName;
                    coordinate = coords["Ga"] + "," + coords["Ha"];

                    // 결과로 받은 위치를 마커로 표시
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords,
                        title: this.state.storeName,
                        clickable: false // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
                    });

                    console.log("위치 잘 찍히니? 네 => " + marker.getTitle());

                    // ------------------------------ 마커에 클릭이벤트를 등록하긔 ------------------------------

                    kakao.maps.event.addListener(marker, "click", async () => {
                        await (() => {
                            this.props.selection(marker.getTitle(), coordinate);
                        })();

                        var imageSrc =
                            "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                            imageSize = new kakao.maps.Size(37, 45), // 마커이미지의 크기입니다
                            imageOption = { offset: new kakao.maps.Point(17, 40) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

                        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                        var markerImage = new kakao.maps.MarkerImage(
                            imageSrc,
                            imageSize,
                            imageOption
                        ),
                            markerPosition = marker.getPosition();

                        // 마커를 생성합니다
                        marker = new kakao.maps.Marker({
                            position: markerPosition,
                            image: markerImage // 마커이미지 설정
                        });

                        // 마커가 지도 위에 표시되도록 설정합니다
                        marker.setMap(map);

                        console.log("마커 눌렸따!" + marker.getTitle() + storeName);

                        // 인포윈도우로 장소에 대한 설명을 표시
                        var infowindow =
                            coords &&
                            new kakao.maps.InfoWindow({
                                content:
                                    '<div style="width:40px; text-align:center; padding:6px 0; font-size: 10pt">' +
                                    this.state.storeName +
                                    '<br/> <a href="https://map.kakao.com/link/to/' +
                                    this.state.storeName +
                                    "," +
                                    coords["Ga"] +
                                    "," +
                                    coords["Ha"] +
                                    '" style="color:blue" target="_blank">길찾기</a></div>'
                            });
                        infowindow.open(map, marker);
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시
                    var infowindow =
                        coords &&
                        new kakao.maps.InfoWindow({
                            content:
                                '<div style="width:30px; text-align:center; padding:6px 0; font-size: 10pt">' +
                                this.state.storeName +
                                '<br/> <a href="https://map.kakao.com/link/to/' +
                                this.state.storeName +
                                "," +
                                coords["Ga"] +
                                "," +
                                coords["Ha"] +
                                '" style="color:blue" target="_blank">길찾기</a></div>'
                        });

                    // 마커에 마우스오버 이벤트를 등록합니다
                    kakao.maps.event.addListener(marker, "mouseover", () => {
                        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                        infowindow.open(map, marker);
                    });

                    // 마커에 마우스아웃 이벤트를 등록.....
                    kakao.maps.event.addListener(marker, "mouseout", () => {
                        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
                        infowindow.close();
                    });
                }
                console.log("coords" + coords1)
            });
            var options = {
                // center: new kakao.maps.LatLng(37.4994764, 127.024962),
                center: this.state.coords,
                level: 8
            };

            var map = new kakao.maps.Map(container, options); //지도 생성 + 객체 리턴

            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
            var zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

            // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록
            kakao.maps.event.addListener(map, "zoom_changed", function () {
                // 지도의 현재 레벨을 얻어옵니다
                var level = map.getLevel();
                var message = "현재 지도 레벨은 " + level + " 입니다";
                var resultDiv = document.getElementById("result");
            });
        };
    }

    render() {
        return (
            <Fragment>
                <WaitingModal />
                <ReservationModal />
                {this.state.like === true ? (
                    <Button onClick={this.storeLikeDel} style={{ fontFamily: 'Handon3gyeopsal300g', fontWeight: 'bold', fontSize: '13px', float: 'right',marginTop:'10px', border:'1px solid #7F46A6' }}>
                        <Favorite style={{color:'red'}} />&nbsp; 좋아요
                    </Button>
                ) : (
                        <Button onClick={this.storeLike} style={{ fontFamily: 'Handon3gyeopsal300g', fontWeight: 'bold', fontSize: '13px', float: 'right',marginTop:'10px', border:'1px solid #7F46A6' }}>
                            <FavoriteBorder style={{color:'red'}}/>&nbsp; 좋아요
                    </Button>
                    )}

                <p className="storeinfo">가계번호:{this.state.ownerNo}</p>
                <p className="storeinfo">{this.props.userNo}</p>
                <p className="storeinfo">{this.state.storeName}</p>
                <p className="storeinfo">{this.state.address}</p>

                <div>
                    <div id="storeimg">
                        <img id="img" src={this.state.menuImg} />
                    </div>
                    <div id="map" style={{ width: "500px", height: "500px", marginBottom: '20px', marginRight: '250px', float: "right", border: "1px solid green" }}>
                    </div>
                </div>
                <span id="storemenu">
                    <p className="storemenulabel"> 운영시간 : {this.state.openingHours}시</p>
                    <p className="storemenulabel"> 음식스타일 : {this.state.cuisine} </p>
                    <p className="storemenulabel"> 전화번호 : {this.state.tel}</p>
                    <p className="storemenulabel"> 메인메뉴 : {this.state.mainMenu}</p>
                </span>
                

                <div><SimpleTabs /></div>
            </Fragment>
        );
    }

}

const style = {
    display: 'flex',
    justifyContent: 'center',
}

export default StorePageComponent;