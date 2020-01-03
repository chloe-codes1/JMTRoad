import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';

class ReviewAddUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storereviewNo: '',
            nickname: '',
            userNo: '',
            ownerNo: '',
            storeName:'',
            reviewDate: '',
            star: '',
            contents: '',
            message: null
        }
        this.saveReview = this.saveReview.bind(this);
        this.storeReviewOwner = this.storeReviewOwner.bind(this);
    }

    componentDidMount(){
        this.ReviewOwnerNoAdd();
    }

    storeReviewOwner(ownerNo,storeName){
        this.state.ownerNo = window.localStorage.setItem("ownerNo");
        this.state.storeName = window.localStorage.setItem("storeName");
     }

    ReviewOwnerNoAdd(){
        ApiService.fetchOwnerToReview(window.localStorage.getItem("ownerNo"),window.localStorage.getItem("storeName"))
        .then((res) => {
            console.log("여기는 오나..?ghrtnl..?"+res.data.ownerNo)
            console.log("음식점이름"+res.data.storeName)
            this.setState({storeName: res.data.storeName, ownerNo: res.data.ownerNo})
        });
    }

    //***** 음식점 리뷰 저장부분 *****
    saveReview = (e) => {
        this.state.ownerNo = window.localStorage.getItem("ownerNo");
        this.state.userNo = window.sessionStorage.getItem('userNo');
        let storereview = {
            storereviewNo: this.state.storereviewNo,
            nickname: this.state.nickname,
            userNo: this.state.userNo,
            ownerNo: this.state.ownerNo,
            reviewDate: this.state.reviewDate,
            star: this.state.star,
            contents: this.state.contents,
        };
        console.log(storereview)
        axios.post('http://localhost:1217/storereview', storereview, {})
        alert("리뷰를 남겨주셔서 감사합니다.");
        window.location.reload();

    }



    //***** 리뷰 값 넘겨주는 부분 *****
    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    //*****리뷰 별점 부분 *****
    onStarClick(nextValue, prevValue, name) {
        this.setState({ star: nextValue })
    }

    render() {
        return (
            <div>
                <Typography variant="h5" style={style}>리 뷰 작 성</Typography>
                <Typography variant="h7" style={store}>음식점번호: {this.state.ownerNo} </Typography>
                <Typography variant="h7" style={store}>음식점이름: {this.state.storeName} </Typography>
                <TextField type="text" placeholder="nickname" fullWidth margin="normal" name="nickname" value={this.state.nickname} onChange={this.onChange} />
                <TextField type="date" placeholder="date" fullWidth margin="normal" name="reviewDate" value={this.state.reviewDate} onChange={this.onChange} />
                <Typography>Star</Typography>
                <div>
                    <StarRatingComponent
                        name="star"
                        starCount={5}
                        value={this.state.star}
                        onStarClick={this.onStarClick.bind(this)} />
                </div>
                <TextField type="text" placeholder="contents" fullWidth margin="normal" name="contents" value={this.state.contents} onChange={this.onChange} />
                <Button variant="contained" color="primary" onClick={this.saveReview}>Save</Button>
            </div>
        );
    }
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style = {
    display: 'flex',
    justifyContent: 'center'

};

const store = {
    display: 'flex',
    justifyContent: 'left'
}

export default ReviewAddUserComponent;