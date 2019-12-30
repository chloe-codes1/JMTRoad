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

import PopStoreLike from "../StoreRanking/PopStoreLike"
import PopStoreStar from "../StoreRanking/PopStoreStar"
import ServiceStats from "../StoreRanking/ServiceStats"

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Review" {...a11yProps(0)} />
          <Tab label=" 순 위 " {...a11yProps(1)} />
          <Tab label=" 정 보 " {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <div style={{float:"left", width:"1200px"}} >
        <div style={{float:"left"}}>
          <StoreReviewModal/></div>
        <ReviewListUserComponent /></div>

      </TabPanel>
      <TabPanel value={value} index={1}>
      <p style={{marginRight: "10px" }}>순위(좋아요순위/별점순위)</p>
      <span style={{borderRight: "6px solid green", height: "300px", position: "absolute"}}><PopStoreLike/></span>
      <span style={{marginLeft:"300px"}}><PopStoreStar/></span>
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        시간대별 방문자(해당사이트이용객기준)
      <div><ServiceStats/></div>
      </TabPanel>
    </div>
  );
}
