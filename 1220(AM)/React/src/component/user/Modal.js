import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import ReviewAddUserComponent from "../StoreReview/ReviewAddUserComponent";

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
    <div style={{float:'right'}}>
      <button type="button" onClick={handleOpen}>
        리 뷰 작 성
      </button>
      <div style={{float:'right'}} >
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        >
        <div style={{ position: 'absolute', top: 100, right: 550}} className={classes.paper}>
            <button type="button" style={{float:'right'}} onClick={handleClose}>close</button>
          <h4 id="simple-modal-title">리뷰를 작성해 주세요</h4>
            <div className="WriteReview"></div>
              <ReviewAddUserComponent/>
        </div>
      </Modal>
      </div>
    </div>
  );
}