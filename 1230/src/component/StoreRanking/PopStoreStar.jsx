import React, { Component, Fragment } from 'react';

class PopStoreStar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      storestar: [],
      //   message: null
      storereviewNo: '',
      nickname: '',
      userNo: '',
      ownerNo: '',
      reviewDate: '',
      star: '',
      contents: ''
    }
    this.storestarList = this.storestarList.bind(this);
  }

  componentDidMount() {
    this.storestarList();
  }

  // storestarList(){
  //     ApiService.fetchstorestar(window.localStorage.getItem("storereviewNo"),window.localStorage.getItem("nickname"),window.localStorage.getItem("star"))
  //     .then((res) => {
  //             this.setState({storestar: res.data.star})
  //         });   
  // }

  //  storestarList() {
  //    ApiService.fetchReviews()
  //     .then((res) => {
  //       this.setState({ storestar: res.data })
  //     });
  // }
  render() {
    return (
      <Fragment>
        <span>가게 별점 순위 랭킹</span>

        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="hidden">ownerNo</th>
                <th> 1 </th>
                <th> 2 </th>
                <th> 3 </th>
                <th> 4 </th>
                <th> 5 </th>
                <th> 6 </th>
              </tr>
            </thead>
            <tbody>
              {this.state.storestar.map((storestar) => (
                <tr key={storestar.storereviewNo}>
                  <td>{storestar.storereviewNo} </td>
                  <td>{storestar.nickname}</td>
                  <td>{storestar.star}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}
export default PopStoreStar;