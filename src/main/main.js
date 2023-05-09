import { Link } from 'react-router-dom';
import HeaderMenu from '../header_and_login/상단메뉴바';
import FooterMenu from '../header_and_login/하단메뉴바';
import './main.css';

function MainPage() {
  return (
    <div>
        <HeaderMenu/>
        <body>
            <br/><br/><br/><br/>
            <div className="content_wrapper">
                <div className="intro_box">
                    <img src="/imgs/메인이미지.png"/>
                    <img className="boxlogo" src="/imgs/Word-E.png"/>
                    <Link to="/intro"><img className="start_button" src="/imgs/Get start.png"/></Link>
                    <div className="content_box">Word-E는 원본 데이터에 따른 모델링의 차이를 
                        손쉽게 비교해볼 수 있는 데모를 제공하는 사이트입니다.</div>
                </div>
            </div>
        </body>
        <FooterMenu/>
    </div>
  );
}

export default MainPage;
