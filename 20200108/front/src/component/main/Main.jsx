import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React from "react";
import FormMail from "../admin/FormMail";
import StoreSearchResult from "../store/StoreSearchResult";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DraftsIcon from '@material-ui/icons/Drafts';
import "./Main.css";
import HotProjectList from "./HotProjectList";
import NewProjectList from "./NewProjectList";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import HighlightIcon from '@material-ui/icons/Highlight';
import withLogin from "../login/LoginHOC";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      showSearchResult: false,
      storeName: "",
      cuisine: 0,
      list: []
    };
  }

  // component load 되면 로그인 했다고 가정하고 session에 user 1의 userNo 넣기
  componentDidMount () {
    // window.sessionStorage.setItem("userNo", user1)
    // window.sessionStorage.clear();
  }


  openModal = () => {
    this.setState({
      isModalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  search = async () => {
     if (this.state.storeName !== "" && this.state.cuisine !== 0) {
      let storeName = this.state.storeName;
      let cuisine = this.state.cuisine;
      await axios({
        method: "get",
        url: `searchBothOfThem/${storeName}/${cuisine}`,
      })
        .then(success => {
          const data = success.data;
          console.log("음식점 이름 & 음식종류로 검색 성공 크크.. " + data);
          this.setState({
            list: data,
            storeName: "",
            cuisine: 0,
            showSearchResult: true
          });
        })
        .catch(error => console.log("에러..." + error));
    } else if 
      (this.state.cuisine === 0) {
      const storeName = this.state.storeName;
      await axios({
        method: "get",
        url: `searchByName/${storeName}`
      }).then(success => {
        const data = success.data;
        console.log("음식점 이름으로 검색 성공 " + data);
        this.setState({
          list: data,
          storeName: "",
          showSearchResult: true
        });
        console.log(this.state.showSearchResult);
      }).catch(error => console.log("에러..흑흑.. => " + error));

    } else if (this.state.storeName === "") {
      const cuisine = this.state.cuisine;
      await axios({
        method: "get",
        url: `searchByCuisine/${cuisine}`
      }).then(success => {
        const data = success.data;
        console.log("음식 종류로 검색 성공 " + data);
        this.setState({
          list: data,
          storeName: "",
          showSearchResult: true
        });
      })
        .catch(error => console.log("에러..흑흑.. => " + error));
    }
  };

  render() {
    // const classes = useStyles();
    return (
      <div>
      <div>
        <div>
        <div id="searchstyle" >
          {/* 검색 */}
          <form  noValidate autoComplete="on" id="formstyle">
            <TextField
              type="text"
              id="outlined-basic"
              margin="normal"
              label="어느 음식점에서"
              variant="outlined"
              placeholder="음식점 이름을 입력하세요!"
              name="storeName"
              onChange={this.onChange}
              value={this.state.storeName}
              defaultValue=""
              style={textfieldStyle}
              className="searchtextfield"
            />
             <FormControl>
             <FormHelperText />
              <Select
                name="cuisine"
                value={this.state.cuisine}
                onChange={this.onChange}
                defaultValue = "0"
                id='selectStyle'
              >
               <MenuItem value="0" style={menuinneritem}>어떤 음식을 드실건가요?</MenuItem>
               <MenuItem value="51">한식</MenuItem>
               <MenuItem value="52">양식</MenuItem>
               <MenuItem value="53">중식</MenuItem>
               <MenuItem value="54">일식</MenuItem>
               <MenuItem value="55">동남아식</MenuItem>
               <MenuItem value="56">뷔페식</MenuItem>
                </Select>
           
            </FormControl> 

            <Button variant="contained"  onClick={this.search} id='searchbtn'>
              <SearchIcon style={{width:'20px',height:'20px'}}/>
            </Button>
          </form>
        </div>
        {this.state.showSearchResult && (
          <StoreSearchResult data={this.state.list} />
        )}{""}
</div>
<div style={{position:'relative', overflow:'scroll'}}>
            <p className='listtitle'><EmojiEventsIcon/>Top5</p>
            <span className='listimg'>
            <HotProjectList />
            </span>
            <hr />
            <p className='listtitle'><HighlightIcon/>New</p>
            <span className='listimg'>
            <NewProjectList />
            </span>
  </div>
        {/* 폼메일 보내기 */}
        <footer id='footer'>
        <Button onClick={this.openModal} id='mailbtn'><DraftsIcon/>Email Us</Button>
        {this.state.isModalOpen && <FormMail onClose={this.closeModal} />} {""}

        
        
        </footer>
      </div>
      </div>

    );
  }
}

const textfieldStyle = {
  margin: '10px',
  marginTop: '10px',
  width: '500px',
  backgroundColor:'#FE9F27',
  fontFamily: 'S-CoreDream-3Light'
}


const menuinneritem = {
  height: '25px',
  fontFamily: 'LotteMartHappy'
}

export default withLogin(Main);
