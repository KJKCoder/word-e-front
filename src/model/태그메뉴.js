import { Link } from 'react-router-dom';
import './태그메뉴.css';

function LeftTagMenu() {
    const tag_list = ["전체","기사","댓글"]

    return (
        <nav className="좌측메뉴">
            <div className="header"><p>태그</p></div>
            <Link to={`/model/${tag_list[0]}/1`}><div className="button"><p>#{tag_list[0]}</p></div></Link>
            <Link to={`/model/${tag_list[1]}/1`}><div className="button"><p>#{tag_list[1]}</p></div></Link>
            <Link to={`/model/${tag_list[2]}/1`}><div className="button"><p>#{tag_list[2]}</p></div></Link>
        </nav>
    );
}

export default LeftTagMenu;