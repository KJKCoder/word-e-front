import { Link } from 'react-router-dom';
import HeaderMenu from '../header_and_login/상단메뉴바';
import FooterMenu from '../header_and_login/하단메뉴바';
import './intro.css';

function IntroPage() {
  return (
    <div>
        <HeaderMenu/>
        <body>
        <br/><br/><br/><br/>
        <div className="content_wrapper">
            <div className="intro_box">
                <img src="./imgs/인트로이미지1.png"/>
                <img className="boxlogo" src="./imgs/BrowseModel.png"/>
                <Link to="/model"><img className="start_button" src="./imgs/Get start.png"/></Link>
                <div className="content_box">Word-E는 다양한 데이터셋을 이용해 학습시킨 여러 모델들을 공유하는 커뮤니티입니다.<br/>
                    필요한 모델을 탐색하고 피드백을 나누며 함께 공부하세요!</div>
            </div>
        </div>
        <div className="content_wrapper">
            <div className="intro_box2">
                <img src="./imgs/인트로이미지2.png"/>
                <img className="boxlogo" src="./imgs/Demo Now.png"/>
                <Link to="/demo/word"><img className="start_button" src="./imgs/Get start.png"/></Link>
                <div className="content_box">사용해보고 싶은 모델을 찾으셨나요? 다운받고 환경을 마련하느라 골머리를 앓을 필요 없습니다!<br/>
                    바로 Import하여 Word-E 웹페이지 내에서 데모테스트 해보세요!
                </div>
            </div>
        </div>
        <div className="content_wrapper">
            <div className="intro_box">
                <img src="./imgs/인트로이미지3.png"/>
                <img className="boxlogo" src="./imgs/Contact Us.png"/>
                <Link to="/main"><img className="start_button" src="./imgs/Get start.png"/></Link>
                <div className="content_box">좀 더 자세한 사항을 알고 싶다면 직접 개발자에게 연락하세요!</div>
            </div>
        </div>
        </body>
        <FooterMenu/>
    </div>
  );
}

export default IntroPage;
