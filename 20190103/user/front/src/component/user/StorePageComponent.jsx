import React, { Component, Fragment } from 'react'
import ApiService from "../../service/ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import img from '../../Img/balls.png'
import ReservationModal from "../Storebtn/ReservationModal";
import WaitingModal from "../Storebtn/WaitingModal";

import SimpleTabs from "../user/SimpleTabs";

import axios from "axios";
import jQuery from "jquery";
import $ from "jquery";

window.$ = window.jQuery = jQuery;

const { kakao } = window;

class StorePageComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeinfo: [],
            reviews: [],
            message: null
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);

    }

    componentDidMount() {
        this.reloadUserList();
        //덕현 할 수 있다!
    }

    reloadUserList() {
        ApiService.fetchOwnerById(window.localStorage.getItem("ownerNo"))
        .then((res) => {
            let owner = res.data;

            if(owner.cuisine=="51"){
                owner.cuisine="한식";
            }
            else if(owner.cuisine=="52"){
                owner.cuisine="양식";
            }
            else if(owner.cuisine=="53"){
                owner.cuisine="중식";
            }
            else if(owner.cuisine=="54"){
                owner.cuisine="일식";
            }
            else if(owner.cuisine=="55"){
                owner.cuisine="동남아식";
            }
            else if(owner.cuisine=="56"){
                owner.cuisine="뷔페식";
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

            console.log("No : "+userNo)

            window.localStorage.setItem("ownerNo",this.state.ownerNo);
            
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
        console.log("componentDidUpdate() called!!");
        console.log("간다고" + this.state.address);

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=cf322787f4669732502374b0e6ffc647&autoload=false&libraries=services,clusterer,drawing";
        document.head.appendChild(script);

        script.onload = () => {
            var container = document.getElementById("map");
            var options = {
                center: new kakao.maps.LatLng(37.4994764, 127.024962),
                level: 4
            };
            var map = new kakao.maps.Map(container, options); //지도 생성 + 객체 리턴


            // 주소-좌표 변환 객체를 생성
            var geocoder = new kakao.maps.services.Geocoder();

            //------------------------------ setTimeout() ------------------------------

            var displayMarker = setTimeout(function () {
                map.relayout();
                //------------------------------ GeoLocation 으로 지도 중심 재설정 ------------------------------

                // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
                if (navigator.geolocation) {
                    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var lat = position.coords.latitude, // 위도
                            lon = position.coords.longitude; // 경도

                        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                            message =
                                '<div style="width:40px; text-align:center; padding:6px 0; font-size: 10pt">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

                        // 마커와 인포윈도우를 표시합니다
                        displayMarker(locPosition, message);
                    });
                } else {
                    // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

                    var locPosition = new kakao.maps.LatLng(37.4994764, 127.024962),
                        message = "geolocation을 사용할수 없어요..";

                    displayMarker(locPosition, message);
                }

                displayMarker = (locPosition, message) => {
                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: locPosition
                    });

                    var iwContent = message, // 인포윈도우에 표시할 내용
                        iwRemoveable = true;

                    // 인포윈도우를 생성
                    var infowindow = new kakao.maps.InfoWindow({
                        content: iwContent,
                        removable: iwRemoveable
                    });

                    // 인포윈도우 마커위에 표시
                    infowindow.open(map, marker);

                    // 지도 중심좌표를 접속위치로 변경
                    map.setCenter(locPosition);
                };
            });

            // ------------------------------ JSON으로 만든 list를 map으로 뽑기 ------------------------------

            // 주소로 좌표를 검색
            geocoder.addressSearch(this.state.address, (result, status) => {
                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    var storeName = this.state.storeName;
                    var coordinate = coords["Ga"] + "," + coords["Ha"];

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

                    // console.log(coords);
                    // console.log(coords["Ga"]+","+coords["Ha"]);

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
                    // console.log(infowindow);

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
            });

            var drawingFlag = false; // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
            var moveLine; // 선이 그려지고 있을때 마우스 움직임에 따라 그려질 선 객체 입니다
            var clickLine; // 마우스로 클릭한 좌표로 그려질 선 객체입니다
            var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
            var dots = {}; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.

            // 지도에 클릭 이벤트를 등록합니다
            // 지도를 클릭하면 선 그리기가 시작됩니다 그려진 선이 있으면 지우고 다시 그립니다
            kakao.maps.event.addListener(map, "click", function (mouseEvent) {
                // 마우스로 클릭한 위치입니다
                var clickPosition = mouseEvent.latLng;

                // 지도 클릭이벤트가 발생했는데 선을 그리고있는 상태가 아니면
                if (!drawingFlag) {
                    // 상태를 true로, 선이 그리고있는 상태로 변경합니다
                    drawingFlag = true;

                    // 지도 위에 선이 표시되고 있다면 지도에서 제거합니다
                    deleteClickLine();

                    // 지도 위에 커스텀오버레이가 표시되고 있다면 지도에서 제거합니다
                    deleteDistnce();

                    // 지도 위에 선을 그리기 위해 클릭한 지점과 해당 지점의 거리정보가 표시되고 있다면 지도에서 제거합니다
                    deleteCircleDot();

                    // 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
                    clickLine = new kakao.maps.Polyline({
                        map: map, // 선을 표시할 지도입니다
                        path: [clickPosition], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
                        strokeWeight: 3, // 선의 두께입니다
                        strokeColor: "#db4040", // 선의 색깔입니다
                        strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                        strokeStyle: "solid" // 선의 스타일입니다
                    });

                    // 선이 그려지고 있을 때 마우스 움직임에 따라 선이 그려질 위치를 표시할 선을 생성합니다
                    moveLine = new kakao.maps.Polyline({
                        strokeWeight: 3, // 선의 두께입니다
                        strokeColor: "#db4040", // 선의 색깔입니다
                        strokeOpacity: 0.5, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                        strokeStyle: "solid" // 선의 스타일입니다
                    });

                    // 클릭한 지점에 대한 정보를 지도에 표시합니다
                    displayCircleDot(clickPosition, 0);
                } else {
                    // 선이 그려지고 있는 상태이면

                    // 그려지고 있는 선의 좌표 배열을 얻어옵니다
                    var path = clickLine.getPath();

                    // 좌표 배열에 클릭한 위치를 추가합니다
                    path.push(clickPosition);

                    // 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정합니다
                    clickLine.setPath(path);

                    var distance = Math.round(clickLine.getLength());
                    displayCircleDot(clickPosition, distance);
                }
            });

            // 지도에 마우스무브 이벤트를 등록합니다
            // 선을 그리고있는 상태에서 마우스무브 이벤트가 발생하면 그려질 선의 위치를 동적으로 보여주도록 합니다
            kakao.maps.event.addListener(map, "mousemove", function (mouseEvent) {
                // 지도 마우스무브 이벤트가 발생했는데 선을 그리고있는 상태이면
                if (drawingFlag) {
                    // 마우스 커서의 현재 위치를 얻어옵니다
                    var mousePosition = mouseEvent.latLng;

                    // 마우스 클릭으로 그려진 선의 좌표 배열을 얻어옵니다
                    var path = clickLine.getPath();

                    // 마우스 클릭으로 그려진 마지막 좌표와 마우스 커서 위치의 좌표로 선을 표시합니다
                    var movepath = [path[path.length - 1], mousePosition];
                    moveLine.setPath(movepath);
                    moveLine.setMap(map);

                    var distance = Math.round(
                        clickLine.getLength() + moveLine.getLength()
                    ), // 선의 총 거리를 계산합니다
                        content =
                            '<div class="dotOverlay distanceInfo">총거리 <span class="number">' +
                            distance +
                            "</span>m</div>"; // 커스텀오버레이에 추가될 내용입니다

                    // 거리정보를 지도에 표시합니다
                    showDistance(content, mousePosition);
                }
            });

            // 지도에 마우스 오른쪽 클릭 이벤트를 등록합니다
            // 선을 그리고있는 상태에서 마우스 오른쪽 클릭 이벤트가 발생하면 선 그리기를 종료합니다
            kakao.maps.event.addListener(map, "rightclick", function (mouseEvent) {
                // 지도 오른쪽 클릭 이벤트가 발생했는데 선을 그리고있는 상태이면
                if (drawingFlag) {
                    // 마우스무브로 그려진 선은 지도에서 제거합니다
                    moveLine.setMap(null);
                    moveLine = null;

                    // 마우스 클릭으로 그린 선의 좌표 배열을 얻어옵니다
                    var path = clickLine.getPath();

                    // 선을 구성하는 좌표의 개수가 2개 이상이면
                    if (path.length > 1) {
                        // 마지막 클릭 지점에 대한 거리 정보 커스텀 오버레이를 지웁니다
                        if (dots[dots.length - 1].distance) {
                            dots[dots.length - 1].distance.setMap(null);
                            dots[dots.length - 1].distance = null;
                        }

                        var distance = Math.round(clickLine.getLength()), // 선의 총 거리를 계산합니다
                            content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다

                        // 그려진 선의 거리정보를 지도에 표시합니다
                        showDistance(content, path[path.length - 1]);
                    } else {
                        // 선을 구성하는 좌표의 개수가 1개 이하이면
                        // 지도에 표시되고 있는 선과 정보들을 지도에서 제거합니다.
                        deleteClickLine();
                        deleteCircleDot();
                        deleteDistnce();
                    }

                    // 상태를 false로, 그리지 않고 있는 상태로 변경합니다
                    drawingFlag = false;
                }
            });

            // 클릭으로 그려진 선을 지도에서 제거하는 함수입니다
            function deleteClickLine() {
                if (clickLine) {
                    clickLine.setMap(null);
                    clickLine = null;
                }
            }

            // 마우스 드래그로 그려지고 있는 선의 총거리 정보를 표시하거
            // 마우스 오른쪽 클릭으로 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 생성하고 지도에 표시하는 함수입니다
            function showDistance(content, position) {
                if (distanceOverlay) {
                    // 커스텀오버레이가 생성된 상태이면

                    // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
                    distanceOverlay.setPosition(position);
                    distanceOverlay.setContent(content);
                } else {
                    // 커스텀 오버레이가 생성되지 않은 상태이면

                    // 커스텀 오버레이를 생성하고 지도에 표시합니다
                    distanceOverlay = new kakao.maps.CustomOverlay({
                        map: map, // 커스텀오버레이를 표시할 지도입니다
                        content: content, // 커스텀오버레이에 표시할 내용입니다
                        position: position, // 커스텀오버레이를 표시할 위치입니다.
                        xAnchor: 0,
                        yAnchor: 0,
                        zIndex: 3
                    });
                }
            }

            // 그려지고 있는 선의 총거리 정보와
            // 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수입니다
            function deleteDistnce() {
                if (distanceOverlay) {
                    distanceOverlay.setMap(null);
                    distanceOverlay = null;
                }
            }

            // 선이 그려지고 있는 상태일 때 지도를 클릭하면 호출하여
            // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 표출하는 함수입니다
            function displayCircleDot(position, distance) {
                // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
                var circleOverlay = new kakao.maps.CustomOverlay({
                    content: '<span class="dot"></span>',
                    position: position,
                    zIndex: 1
                });

                // 지도에 표시합니다
                circleOverlay.setMap(map);

                if (distance > 0) {
                    // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
                    var distanceOverlay = new kakao.maps.CustomOverlay({
                        content:
                            '<div class="dotOverlay">거리 <span class="number">' +
                            distance +
                            "</span>m</div>",
                        position: position,
                        yAnchor: 1,
                        zIndex: 2
                    });

                    // 지도에 표시합니다
                    distanceOverlay.setMap(map);
                }

                // 배열에 추가합니다
                dots.push({ circle: circleOverlay, distance: distanceOverlay });
            }

            // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
            function deleteCircleDot() {
                var i;

                for (i = 0; i < dots.length; i++) {
                    if (dots[i].circle) {
                        dots[i].circle.setMap(null);
                    }

                    if (dots[i].distance) {
                        dots[i].distance.setMap(null);
                    }
                }

                dots = [];
            }

            // 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여
            // 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
            // HTML Content를 만들어 리턴하는 함수입니다
            function getTimeHTML(distance) {
                // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
                var walkkTime = (distance / 67) | 0;
                var walkHour = "",
                    walkMin = "";

                // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
                if (walkkTime > 60) {
                    walkHour =
                        '<span class="number">' +
                        Math.floor(walkkTime / 60) +
                        "</span>시간 ";
                }
                walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

                // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
                var bycicleTime = (distance / 227) | 0;
                var bycicleHour = "",
                    bycicleMin = "";

                // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
                if (bycicleTime > 60) {
                    bycicleHour =
                        '<span class="number">' +
                        Math.floor(bycicleTime / 60) +
                        "</span>시간 ";
                }
                bycicleMin = '<span class="number">' + (bycicleTime % 60) + "</span>분";

                // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
                var content = '<ul class="dotOverlay distanceInfo">';
                content += "    <li>";
                content +=
                    '        <span class="label">총거리</span><span class="number">' +
                    distance +
                    "</span>m";
                content += "    </li>";
                content += "    <li>";
                content +=
                    '        <span class="label">도보</span>' + walkHour + walkMin;
                content += "    </li>";
                content += "    <li>";
                content +=
                    '        <span class="label">자전거</span>' +
                    bycicleHour +
                    bycicleMin;
                content += "    </li>";
                content += "</ul>";

                return content;
            }
            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
            var zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

            // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록
            kakao.maps.event.addListener(map, "zoom_changed", function () {
                // 지도의 현재 레벨을 얻어옵니다
                var level = map.getLevel();

                var message = "현재 지도 레벨은 " + level + " 입니다";
                var resultDiv = document.getElementById("result");
                resultDiv.innerHTML = message;
            });

        };
    }


    render() {
        return (
    
            <Fragment>
                
                <WaitingModal />
                <ReservationModal />
                <h4 style={{ marginLeft: "50px"}}>가계번호:{this.state.ownerNo}</h4>
                    <h4 style={{ marginLeft: "50px"}}>{this.props.userNo}</h4>
                    <h4 style={{ marginLeft: "50px"}}>{this.state.storeName}</h4>
                    <h4 style={{ marginLeft: "50px"}}>{this.state.address}</h4>
                    <div>
                    <div id="storeimg" style={{ float: "left", marginRight: "50px", marginLeft: "50px" }}>
                        <p>[ 음식점메뉴사진 ]</p>
                        <span><img id="img"  src={this.state.menuImg} style={{ width: "400px", height: "400px", paddingBottom: "50px" }}/></span>
                    </div>
                    <div id="map" style={{ width: "500px", height: "500px", marginRight: "100px",  float: "right", border: "1px solid green" }}>
                    </div>
                </div>
                <div id="storemenu" style={{ width: "50px"}} >
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