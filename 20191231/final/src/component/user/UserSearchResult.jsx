import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {Form} from "react-bootstrap";
// import { Checkbox } from "@material-ui/core";


class UserSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      checkedItems: ""
    };
  }

  componentDidMount() {
    this.setState({
      list: this.props.data
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        list: this.props.data
      });
    }
  }

  handleCheckboxChange = event => {
    const item = event.target.value;
    console.log("아이템..." + item);
    // const isChecked = event.target.checked;
    this.setState({
      checkedItems: item
    });
    this.props.result(item);
  };

  render() {
    const list = this.state.list;
    return (
      <div>
        <Table
          style={{ width: "450px", marginTop: "20px", marginBottom: "30px" }}
        >
          <colgroup>
            <col style={{ width: "250px" }} />
            <col style={{ width: "170px" }} />
            <col style={{ width: "30px" }} />
          </colgroup>
          <TableBody>
            <TableRow>
              <TableCell>아이디</TableCell>
              <TableCell>닉네임</TableCell>
              <TableCell>선택</TableCell>
            </TableRow>
            {list.map(row => (
              <TableRow key={row.userNo}>
                <TableCell> {row.userID}</TableCell>
                <TableCell>{row.nickname}</TableCell>
                <TableCell>
                  {/*        <Checkbox
                    name={row.userNo}
                    // checked={this.state.checkedItems.get(row.userNo)}
                    onChange={this.handleCheckboxChange}/> */}
                  <Form.Check
                    type="radio"
                    name="userNo-radio"
                    value={row.userNo}
                    // checked={this.state.checkedItems.get(row.userNo)}
                    onChange={this.handleCheckboxChange}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default UserSearchResult;
