import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import '../../index.css';

class NoStoreComponent extends Component {

    render() {
        
        return (
            <div>
               존재 하지 않는 아이디 입니다.
            <p></p>
            <Link to="/ownerlogin">로그인</Link>
            <Link to="/regowners">회원가입</Link>
            </div>
        );
    }
}

export default NoStoreComponent;