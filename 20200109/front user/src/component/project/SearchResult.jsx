import React from "react";
import { Form, Table } from "react-bootstrap";
class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      checkedStore: ""
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
    const storeName = event.target.value;
    const address = event.target.name;
    console.log("선택된 가게이름..." + storeName);
    console.log("선택된 가게주소..." + address);

    this.setState({ checkedStore: storeName });

    this.props.result(storeName, address);
  };

  render() {
    const list = this.state.list;
    return (
      <div id="searchResultDiv">
        <Table responsive >
        <colgroup>
            <col style={{ width: "250px" }} />
            <col style={{ width: "170px" }} />
            <col style={{ width: "30px" }} />
          </colgroup>
          <thead style={{background: "#e9ecef"}}>
            <tr>
              <td>음식점 이름 </td>
              <td>메인 메뉴</td>
              <td>선택</td>
            </tr>
          </thead>
          <tbody>
            {list.map(row => (
              <tr key={row.ownerNo}>
                <td>{row.storeName}</td>
                <td>{row.mainMenu}</td>
                <td>
                  <Form.Check
                    type="radio"
                    name={row.address} 
                    value={row.storeName}
                    onChange={this.handleCheckboxChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default SearchResult;
