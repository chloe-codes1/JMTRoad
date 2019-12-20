import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            ownerNo: '',
            storeName: '',
            BRNo: '',
            tel: '',
            address: '',
            openingHours: '',
            cusine: '',
            menuImg: '',
            selectedFile: null,
            message: null
        }
        this.saveStroeinfo = this.saveStroeinfo.bind(this);
    }

    saveStroeinfo = (e) => {
        e.preventDefault();
        let storeinfo = {ownerNo: this.state.ownerNo, storeName: this.state.storeName, BRNo: this.state.BRNo,
            tel: this.state.tel, address: this.state.address, openingHours: this.state.openingHours, cusine: this.state.cusine, menuImg: this.state.menuImg};
        ApiService.addUser(storeinfo)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/storeinfo');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });


    render() {
        return(
            <div>
                <Typography variant="h4" style={style}>Add User</Typography>
                <form style={formContainer}>


                    <TextField placeholder="storeName" fullWidth margin="normal" name="storeName" value={this.state.storeName} onChange={this.onChange}/>
                    
                    <TextField type="number" placeholder="BRNo" fullWidth margin="normal" name="BRNo" value={this.state.BRNo} onChange={this.onChange}/>

                    <TextField type="number" placeholder="tel" fullWidth margin="normal" name="tel" value={this.state.tel} onChange={this.onChange}/>
                    
                    <TextField placeholder="address" fullWidth margin="normal" name="address" value={this.state.address} onChange={this.onChange}/>

                    <TextField type="number" placeholder="openingHours" fullWidth margin="normal" name="openingHours" value={this.state.openingHours} onChange={this.onChange}/>

                    <TextField placeholder="cusine" fullWidth margin="normal" name="cusine" value={this.state.cusine} onChange={this.onChange}/>

                   <TextField placeholder="menuImg" fullWidth margin="normal" name="menuImg" value={this.state.menuImg} onChange={this.onChange}/>

                    <div type="file" name="file" onChange={null}/>

                    <Button variant="contained" color="primary" onClick={this.saveStroeinfo}>Save</Button>
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

export default AddUserComponent;