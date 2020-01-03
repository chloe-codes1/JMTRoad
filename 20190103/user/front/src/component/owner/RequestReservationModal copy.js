import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ApiService from "../../service/ApiService";

import Modal from '@material-ui/core/Modal';
import RequestReserveListComponent from '../owner/RequestReserveListComponent';

import close from '../../Img/close.png';



const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




export default function SimpleModal(props) {

 
  let userNo = window.sessionStorage.getItem("userNo");
  let ownerNo = window.localStorage.getItem("ownerNo");
  let count

  console.log("test"+props.ownerNo)

  ApiService.requestListReserve(ownerNo).then((res)=>{
    let a;
    console.log("길이"+res.data.length)
    count = a;
    
  console.log("음식점 번호1"+ownerNo)
  ownerNo=2;
  console.log("음식점 번호2"+ownerNo)
  })
  console.log("음식점 번호3"+ownerNo)
  // console.log("음식점 번호"+ownerNo)
  // console.log("b"+b)
  // ApiService.requestcountReserve(1).then((res) => {
  //   console.log("aaaaaaaaaa"+res.data)

  // });

// console.log("nnnn" + this.state.count)


const classes = useStyles();
const [open, setOpen] = React.useState(false);

const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};





  return (


    <div style={{ float: 'right', padding: '10px' }}>
<button onClick={handleOpen}>예약신청:{count}</button>
      <div style={{ float: 'right' }} >
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}>

          <div style={{ position: 'absolute', top: 100, right: 550 }} className={classes.paper}>
            <img src={close} style={{ width: "20px", height: "20", float: 'right' }} onClick={handleClose} className="img_close" />
            <h2 id="simple-modal-title">예약신청</h2>
            <div><RequestReserveListComponent /></div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

