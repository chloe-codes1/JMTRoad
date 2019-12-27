import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import santaclaus from "../Img/santaclaus.png";
import snowman from "../Img/snowman.png";
import christmastree from "../Img/christmastree.png";

const style = {
    flexGrow: 1
}
const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={style}>
                        맛집의 민족
                        <span><img src={christmastree} style={{width: "30px", height: "30px"}} className="img_spoon"/></span>
                        <span><img src={santaclaus} style={{width: "30px", height: "30px"}} className="img_spoon"/></span>
                        <span><img src={snowman} style={{width: "30px", height: "30px"}} className="img_spoon"/></span>
                        {/* <span><img src={balls} style={{width: "30px", height: "30px"}} className="img_spoon"/></span> */}
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;