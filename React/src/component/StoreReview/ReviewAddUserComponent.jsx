import React, { Component , Route, useState} from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { hashHistory } from 'react-router';
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    }
    
    saveReview = (e) => {
        e.preventDefault();
        let reviews = {storereviewNo: this.state.storereviewNo, nickname: this.state.nickname, userNo: this.state.userNo, ownerNo: this.state.ownerNo, reviewDate: this.state.reviewDate, star: this.state.star, contents: this.state.contents};
        ApiService.addReview(reviews)
            .then(res => {
                this.setState({message : 'Reviews added successfully.'});
                this.props.history.push('/saveReview');
                /*window.location.href = 'http://localhost:3000/store';*/
            });
    }


    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    onStarClick(nextValue, prevValue, name) {
        this.setState({ star: nextValue })
    }

    render(){

        return(

            <div>
                <Typography variant="h4" style={style}>Add Reviews</Typography>
                <form style={formContainer}>

                <TextField type="text" placeholder="nickname" fullWidth margin="normal" name="nickname" value={this.state.nickname} onChange={this.onChange}/>

                    <TextField type="number" placeholder="userNo" fullWidth margin="normal" name="userNo" value={this.state.userNo} onChange={this.onChange}/>

                    <TextField type="number" placeholder="ownerNo" fullWidth margin="normal" name="ownerNo" value={this.state.ownerNo} onChange={this.onChange}/>

                    <TextField type="date" placeholder="date" fullWidth margin="normal" name="reviewDate" value={this.state.reviewDate} onChange={this.onChange}/>

                    <Typography>Star</Typography>

                    <div>
                        <StarRatingComponent
                            type="number"
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