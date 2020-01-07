import React, { Component } from 'react';
import heart from '../../Img/heart.png';

class PopStoreLike extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//         reviews: [],
//         message: null
//     }
//     this.storelikeList = this.storelikeList.bind(this);
// }

// componentDidMount() {
//     this.storelikeList();
// }

// async storelikeList() {
//     ApiService.fetchstorelikes()
//     .then((res) => {
//             this.setState({reviews: res.data})
//         });   
// }

  render() {
    return (
      <span> <img src={heart} style={{ width: "20px", height: "20px", marginRight: "10px" }}></img>가게 좋아요 순위 랭킹</span>
  //     <span>
  //     <table className="table table-striped">
  //         <thead>
  //             <tr>
  //                 <th className="hidden">ownerNo</th>
  //                 <th> 1</th>
  //                 <th> 2</th>
  //                 <th> 3</th>
  //             </tr>
  //         </thead>
  //         <tbody>
  //             {this.state.ownerstore.map((ownerstore) => (
  //                     <tr key={ownerstore.ownerNo}>
  //                         <td>{ownerstore.ownerNo} </td>
  //                         <td>{ownerstore.ownerID}</td>
  //                         <td>{ownerstore.password}</td>
  //                     </tr>
  //                 ))}
  //         </tbody>
  //     </table>

  // </span>
    );
  }
}
export default PopStoreLike;