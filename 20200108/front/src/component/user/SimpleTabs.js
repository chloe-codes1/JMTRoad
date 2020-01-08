import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import StoreReviewModal from "../StoreReview/StoreReviewModal";
import ReviewListUserComponent from "../StoreReview/ReviewListUserComponent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function SimpleTabs() {

  const classes ={
    backgroundColor: 'black'
  }
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor:'#7F46A6'}}/>
      <TabPanel value={value} index={0}>
      <p style={{fontSize:'40px',textAlign:'center', fontFamily:'Segoe UI', fontWeight:'bold'}}>Review List</p>
        <div style={{float:"right"}}><StoreReviewModal/></div>
        <ReviewListUserComponent />

      </TabPanel>
      {/* <TabPanel value={value} index={1}>
      <p style={{marginRight: "10px" }}>순위(좋아요순위/별점순위)</p>
      <span style={{borderRight: "6px solid green", height: "300px", position: "absolute"}}><PopStoreLike/></span>
      <span style={{marginLeft:"300px"}}><PopStoreStar/></span>
      </TabPanel> */}
      
    </div>
  );
}

