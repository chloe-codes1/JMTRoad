import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import StoreReviewModal from '@material-ui/core/Modal';
import ReviewAddUserComponent  from '../StoreReview/ReviewAddUserComponent';

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

export default function SimpleModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

      <div style={{ float: 'right', padding:'10px'}}>
        <Button variant="outlined" color="secondary" onClick={handleOpen}>리뷰작성</Button>
        <div style={{ float: 'right' }} >
          <StoreReviewModal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <div style={{ position: 'absolute', top: 100, right: 550 }} className={classes.paper}>
              <img src={close} style={{width: "20px", height: "20", float: 'right'}} onClick={handleClose} className="img_close"/>
              
              <div><ReviewAddUserComponent/></div>
              <div className="WriteReview"></div>
            </div>
          </StoreReviewModal>
        </div>
      </div>
  );
}
