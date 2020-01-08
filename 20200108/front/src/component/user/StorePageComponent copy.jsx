import React, { Component, Fragment } from 'react'
import ApiService from "../../service/ApiService";

import ReservationModal from "../Storebtn/ReservationModal";
import WaitingModal from "../Storebtn/WaitingModal";
import SimpleTabs from "../user/SimpleTabs";

import jQuery from "jquery";

window.$ = window.jQuery = jQuery;

const { kakao } = window;

class StorePageComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
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
                    openingHours: owner.openingHours
                })
                let userNo = window.sessionStorage.getItem("userNo");
                console.log("No : " + userNo)
                window.localStorage.setItem("ownerNo", this.state.ownerNo);
                window.localStorage.setItem("storeName", this.state.storeName);
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
                    // this.setState({
                    //     coords:coords
                    // })
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
                console.log("coords"+coords1)
            });
            var options = {
                // center: new kakao.maps.LatLng(37.4994764, 127.024962),
                center: this.state.coords,
                level: 8
            };

            var map = new kakao.maps.Map(container, options); //지도 생성 + 객체 리턴


            // 주소-좌표 변환 객체를 생성
            // var geocoder = new kakao.maps.services.Geocoder();

            //------------------------------ setTimeout() ------------------------------

            // var displayMarker = setTimeout(function () {
            //     map.relayout();
            //     //------------------------------ GeoLocation 으로 지도 중심 재설정 ------------------------------

            //     // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
            //     if (navigator.geolocation) {
            //         // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            //         // navigator.geolocation.getCurrentPosition(function (position) {
            //         //     var lat = position.coords.latitude, // 위도
            //         //         lon = position.coords.longitude; // 경도

            //         //     var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            //         //         message =
            //         //             '<div style="width:40px; text-align:center; padding:6px 0; font-size: 10pt">' + window.localStorage.getItem("storeName") + '</div>'; // 인포윈도우에 표시될 내용입니다

            //         //     // 마커와 인포윈도우를 표시합니다
            //         //     displayMarker(locPosition, message);
            //         // });
            //     } else {
            //         // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

            //         // var locPosition = new kakao.maps.LatLng(37.4994764, 127.024962),
            //         //     message = "geolocation을 사용할수 없어요..";

            //         // displayMarker(locPosition, message);
            //     }

            //     displayMarker = (locPosition, message) => {
            //         // 마커를 생성합니다
            //         var marker = new kakao.maps.Marker({
            //             map: map,
            //             position: locPosition
            //         });

            //         var iwContent = message, // 인포윈도우에 표시할 내용
            //             iwRemoveable = true;

            //         // 인포윈도우를 생성
            //         var infowindow = new kakao.maps.InfoWindow({
            //             content: iwContent,
            //             removable: iwRemoveable
            //         });

            //         // 인포윈도우 마커위에 표시
            //         infowindow.open(map);

            //         // 지도 중심좌표를 접속위치로 변경
            //         map.setCenter(locPosition);
            //     };
            // });

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
                <h4 style={{ marginLeft: "50px" }}>가계번호:{this.state.ownerNo}</h4>
                <h4 style={{ marginLeft: "50px" }}>{this.props.userNo}</h4>
                <h4 style={{ marginLeft: "50px" }}>{this.state.storeName}</h4>
                <h4 style={{ marginLeft: "50px" }}>{this.state.address}</h4>
                <div>
                    <div id="storeimg" style={{ float: "left", marginRight: "50px", marginLeft: "50px" }}>
                        <p>[ 음식점메뉴사진 ]</p>
                        <span><img id="img" src={this.state.menuImg} style={{ width: "400px", height: "400px", paddingBottom: "50px" }} /></span>
                    </div>
                    <div id="map" style={{ width: "500px", height: "500px", marginRight: "100px", float: "right", border: "1px solid green" }}>
                    </div>
                </div>
                <div id="storemenu" style={{ width: "50px" }} >
                    <p >[ 음식점정보부분 ]</p>
                    <p> 운영시간 : {this.state.openingHours}</p>
                    <p> 음식스타일 : {this.state.cuisine} </p>
                    <p> 전화번호 : {this.state.tel}</p>
                    <p> 메인메뉴 : {this.state.mainMenu}</p>
                </div>
                <div><SimpleTabs /></div>
            </Fragment>
        );
    }

}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default StorePageComponent;