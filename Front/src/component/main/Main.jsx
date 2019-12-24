import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React from "react";
import FormMail from "../admin/FormMail";
import StoreSearchResult from "../store/StoreSearchResult";


// user 1 로그인 했다고 가정하기
const user1 = "1";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      showSearchResult: false,
      storeName: "",
      cuisine: "",
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

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  search = async () => {
     if (this.state.storeName !== "" && this.state.cuisine !== null) {
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
            cuisine: "",
            showSearchResult: true
          });
        })
        .catch(error => console.log("에러..." + error));
    } else if 
    (this.state.cuisine === null) {
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
        <h4>메인페이지</h4>
        <div>
          {/* 검색 */}
          <form  noValidate autoComplete="on">
            <TextField
              type="text"
              id="outlined-basic"
              margin="normal"
              label="Search"
              variant="outlined"
              placeholder="어느 음식점에서"
              name="storeName"
              onChange={this.onChange}
              value={this.state.storeName}
              defaultValue=""
            />
             <FormControl >
              <Select
              labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                placeholder="어떤 음식을 드실건가요"
                name="cuisine"
                value={this.state.cuisine}
                onChange={this.onChange}
                defaultValue = ""
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
               <MenuItem value="51">한식</MenuItem>
               <MenuItem value="52">양식</MenuItem>
               <MenuItem value="53">중식</MenuItem>
               <MenuItem value="54">일식</MenuItem>
               <MenuItem value="55">동남아식</MenuItem>
                <MenuItem value="56">뷔페식</MenuItem>         
                </Select>
            </FormControl> 

            <Button variant="contained"  onClick={this.search}>
              <SearchIcon />
            </Button>
          </form>
        </div>
        {this.state.showSearchResult && (
          <StoreSearchResult data={this.state.list} />
        )}{""}

        {/* 폼메일 보내기 */}
        <Button onClick={this.openModal}>Email Us</Button>
        {this.state.isModalOpen && <FormMail onClose={this.closeModal} />} {""}
      </div>
    );
  }
}

export default Main;
