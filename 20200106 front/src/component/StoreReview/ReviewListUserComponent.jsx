import React, { Component } from 'react'
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

class ReviewListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            message: null
        }
        this.deleteReview = this.deleteReview.bind(this);
        this.reloadReviewList = this.reloadReviewList.bind(this);
    }

    componentDidMount() {
        this.reloadReviewList();
    }

    async reloadReviewList() {
        ApiService.fetchReviews()
        .then((res) => {
                this.setState({reviews: res.data})
            });   
    }

    deleteReview(storereviewNo) {
        ApiService.deleteReview(storereviewNo)
           .then(res => {
               this.setState({message : 'Review deleted successfully.'});
               this.setState({reviews: this.state.reviews.filter(reviews => reviews.storereviewNo !== storereviewNo)});
           })
    }
    

    render() {
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>storereviewNo</TableCell>
                            <TableCell>nickname</TableCell>
                            <TableCell align="right">userNo</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Star</TableCell>
                            <TableCell align="right">contents</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.reviews.map(row => (
                            <TableRow key={row.storereviewNo}>
                                <TableCell component="th" scope="row">
                                    {row.storereviewNo}
                                </TableCell>
                                <TableCell align="right">{row.nickname}</TableCell>
                                <TableCell align="right">{row.userNo}</TableCell>
                                <TableCell align="right">{row.reviewDate}</TableCell>
                                <TableCell align="right">{row.star}</TableCell>
                                <TableCell align="right">{row.contents}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}



const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ReviewListUserComponent;