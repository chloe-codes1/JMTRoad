import React, { Component } from 'react';

class PopStoreLike extends Component {

  constructor(props) {
    super(props)
    this.state = {
        reviews: [],
        message: null
    }
    this.storelikeList = this.storelikeList.bind(this);
}

componentDidMount() {
    this.storelikeList();
}

async storelikeList() {
    ApiService.fetchstorelikes()
    .then((res) => {
            this.setState({reviews: res.data})
        });   
}

  render() {
    return (
      <div class="card col-lg-4 col-md-12">
        <div class="card-header d-flex justify-content-between">
          <h5 class="card-title m-0">
            가게 좋아요 순위 랭킹
          </h5>
          <a href="#" class="text-light">
            <i class="fas fa-ellipsis-v"></i>
          </a>
        </div>

        <div class="card-body">        

        </div>
      </div>
    );
  }
}
export default PopStoreLike;