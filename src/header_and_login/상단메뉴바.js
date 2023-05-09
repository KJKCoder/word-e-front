import { Link } from 'react-router-dom';
import './상단메뉴바.css';
import Modal from 'react-modal';
import { useState } from 'react';
import ProfileModal from './프로필';

function HeaderMenu() {
    const [profile_is_open, set_profile_is_open] = useState(false);

    return (
        <header>
            <div className="상단메뉴바">
                <div className="메뉴버튼">
                    <Link to="/main"><h2>Home</h2></Link>
                    <Link to="/intro"><h2>Intro</h2></Link>
                    <Link to="/demo/word"><h2>Demo</h2></Link>
                    <Link to="/model"><h2>Model</h2></Link>
                </div>
                <img className="프로필아이콘" src="/imgs/개인아이콘.png" 
                        onClick={()=>set_profile_is_open(true)}/>
            </div>
            <Modal className="프로필창" isOpen={profile_is_open} onRequestClose={()=>set_profile_is_open(false)}>
                <button onClick={()=>set_profile_is_open(false)}>Modal_close</button>
                <ProfileModal/>
            </Modal>
        </header>
    );
}

export default HeaderMenu;