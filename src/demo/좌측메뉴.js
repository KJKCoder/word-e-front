import { Link } from 'react-router-dom';
import './좌측메뉴.css';

function LeftMenu() {
    return (
        <nav className="좌측메뉴">
            <div className="header"><p>기준</p></div>
            <div className="button"><Link to="/demo/word"><p>단어</p></Link></div>
            <div className="button"><Link to="/demo/sentence"><p>문장</p></Link></div>
            <div className="button"><p>문서</p></div>
        </nav>
    );
}

export default LeftMenu;