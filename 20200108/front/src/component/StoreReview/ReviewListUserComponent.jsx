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
        this.reloadReviewList = this.reloadReviewList.bind(this);
    }

    componentDidMount() {
        this.reloadReviewList();
    }

    reloadReviewList() {
        ApiService.ownerReviews(window.localStorage.getItem("ownerNo"))
        .then((res) => {
                this.setState({reviews: res.data})
            });   
    }

    render() {
        return (
            <form id='reviewlist'style={{width:'1200px', margin:'auto'}}>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>nickname</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Star</TableCell>
                            <TableCell align="center">contents</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.reviews.map(row => (
                            <TableRow key={row.storereviewNo}>
                                <TableCell align="right">{row.nickname}</TableCell>
                                <TableCell align="right">{row.reviewDate}</TableCell>
                                <TableCell align="right">{row.star}</TableCell>
                                <TableCell align="right">{row.contents}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            </form>
        );
    }

}



const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ReviewListUserComponent;