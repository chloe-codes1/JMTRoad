import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';

class ReviewAddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            storereviewNo: '',
            nickname: '',
            userNo: '',
            ownerNo: '',
            reviewDate:'',
            star: '',
            contents: '',
            message: null
        }
        this.saveReview = this.saveReview.bind(this);
        // this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    //***** 음식점 리뷰 저장부분 *****
    saveReview = (e) => {
        
        // e.preventDefault();
        
        let storereview = {
            storereviewNo: this.state.storereviewNo,
            nickname: this.state.nickname,
            userNo: this.state.userNo,
            ownerNo: this.state.ownerNo,
            reviewDate: this.state.reviewDate,
            star: this.state.star,
            contents: this.state.contents,
        };
        //     this.setState({
        //     modal: false
        // });

        console.log(storereview)

        axios.post('http://localhost:1217/storereview', storereview, {})

        alert("리뷰를 남겨주셔서 감사합니다.");

        window.location.reload();

    }

    // handleCloseModal = (e) => {
        
    //         this.setState({
    //             modal: false
    //         });
    //         console.log("야야야야야")
    //     };


/*         ApiService.addReview(storereview)
            .then(res => {
                this.setState({message : 'Reviews added successfully.'});
                this.props.history.push('/saveReview');
            });
    } */

    //***** 리뷰 값 넘겨주는 부분 *****
    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    //*****리뷰 별점 부분 *****
    onStarClick(nextValue, prevValue, name) {
        this.setState({ star: nextValue })
    }

    render(){

        return(

            <div>
                <Typography variant="h4" style={style}>리 뷰 작 성</Typography>
                <form style={formContainer}>

                <TextField type="text" placeholder="nickname" fullWidth margin="normal" name="nickname" value={this.state.nickname} onChange={this.onChange}/>

                    <TextField type="number" placeholder="userNo" fullWidth margin="normal" name="userNo" value={this.state.userNo} onChange={this.onChange}/>

                    <TextField type="number" placeholder="ownerNo" fullWidth margin="normal" name="ownerNo" value={this.state.ownerNo} onChange={this.onChange}/>

                    <TextField type="date" placeholder="date" fullWidth margin="normal" name="reviewDate" value={this.state.reviewDate} onChange={this.onChange}/>

                    <Typography>Star</Typography>

                    <div>
                    <StarRatingComponent
                            name="star"
                            starCount={5}
                            value={this.state.star}
                            onStarClick={this.onStarClick.bind(this)}/>
                    </div>

                    <TextField type="text" placeholder="contents" fullWidth margin="normal" name="contents" value={this.state.contents} onChange={this.onChange}/>

                    <Button variant="contained"  color="primary" onClick={this.saveReview}>Save</Button>
            </form>
    </div>
        );
    }
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

export default ReviewAddUserComponent;