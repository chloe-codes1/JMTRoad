import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Navigation = () => {
  return(
    <div>
      <h1>Navigation.jsx</h1>
      <span><Link to="/"> 홈으로 </Link></span>
      <span><Link to="/users"> 리스트 </Link></span>
    </div>
  );
}

export default withRouter(Navigation);