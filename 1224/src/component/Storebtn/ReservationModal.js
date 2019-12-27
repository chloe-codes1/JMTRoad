import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ReservationModal from '@material-ui/core/Modal';
import ReservationAddUserComponent from '../user/ReservationAddUserComponent';

import close from '../../Img/close.png';

/*
function Example() {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);
};
*/

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
        <Button variant="outlined" color="primary" onClick={handleOpen}>음식점예약</Button>
        <div style={{ float: 'right' }} >
          <ReservationModal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <div style={{ position: 'absolute', top: 100, right: 550 }} className={classes.paper}>
{/*               <button type="button" style={{ float: 'right'}} onClick={handleClose}> </button>*/}
              <img src={close} style={{width: "20px", height: "20", float: 'right'}} onClick={handleClose} className="img_close"/>
              <h2 id="simple-modal-title">예약신청</h2>
              <div><ReservationAddUserComponent /></div>
              <div className="WriteReview"></div>
            </div>
          </ReservationModal>
        </div>
      </div>
  );
}
