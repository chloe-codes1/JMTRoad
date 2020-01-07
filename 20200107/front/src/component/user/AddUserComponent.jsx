import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

//@material-ui 사용하기
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



class AddUserComponent extends Component{

    // 실직적인 Input창 Component

    constructor(props){
        super(props);
        this.state ={
            userID: '',
            nickname: '',
            phone: '',
            birthday: '',
            gender: '',
            shareLocation:'',
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
    }
    
    // MySQL DB에 저장하기 위해 API (ApiService.js)  불러옴
    saveUser = (e) => {
        e.preventDefault();
        let user = {
            userID: this.state.userID,
            nickname: this.state.nickname,
            phone: this.state.phone,
            birthday: this.state.birthday,
            gender: this.state.gender,
            shareLocation:this.state.shareLocation
        };
        ApiService.addUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/users');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
              <Typography variant="h4" style={style}>Add User</Typography>
                <form style={formContainer}>

                    <TextField type="text" placeholder="userID" margin="normal" name="userID" value={this.state.userID} onChange={this.onChange}/>

                    <TextField type="text" placeholder="nickname" margin="normal" name="nickname" value={this.state.nickname} onChange={this.onChange}/>

                    <TextField type="text" placeholder="phone" margin="normal" name="phone" value={this.state.phone} onChange={this.onChange}/>

                    <TextField type="text" placeholder="birthday" margin="normal" name="birthday" value= {this.state.birthday} onChange={this.onChange}/>
                    {/* <DatePicker margin="normal" name="birthday" selected={this.state.birthday} onChange={this.onChange} dateFormat="MM/dd/yyyy"/> */}
                    
                    <FormControl component="fieldset">
                     <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup defaultValue="41" margin="normal" name="gender" value={this.state.gender} onChange={this.onChange}>
                    <FormControlLabel value="41" control={<StyledRadio />} label="Female" />
                    <FormControlLabel value="42" control={<StyledRadio />} label="Male" />
                    </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset">
                    <FormLabel component="legend">Share Your Location </FormLabel>
                    <RadioGroup defaultValue="true" margin="normal" name="shareLocation" value={this.state.shareLocation} onChange={this.onChange}>
                    <FormControlLabel value="true" control={<StyledRadio />} label="Agree" />
                    <FormControlLabel value="false" control={<StyledRadio />} label="Disagree" />
                    </RadioGroup>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
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
const useStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
  });


  function StyledRadio(props) {
    const classes = useStyles();
  
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

export default AddUserComponent;