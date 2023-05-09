import Modal from 'react-modal';
import './프로필.css';
import { useEffect, useState } from 'react';
import { get_user_info, remove_auth_token } from "../func/utils"
import LoginModal from './로그인';
import SignUpModal from './회원가입';

function ProfileModal() {
    const [IsLogin, set_IsLogin] = useState(false);
    const [UserName, set_UserName] = useState("")
    const [LoginWindowIsOpen, setLoginWindowIsOpen] = useState(false)
    const [SighUpWindowIsOpen, setSighUpWindowIsOpen] = useState(false)

    useEffect(()=>{
        get_user_info().then(user_info =>{
            if (user_info){
                set_IsLogin(true);
                set_UserName(user_info["닉네임"])
            }else{
                set_IsLogin(false);
                set_UserName("")
            }
        })
    },[])

    return (
        <body class="프로필팝업">
            <div class="field">
                <img class="아이콘" src="/imgs/개인아이콘.png"/>
                {IsLogin?
                (<div className='로그인후'>
                    <a onClick={()=>{remove_auth_token(); set_IsLogin(false); window.location.reload()}}><img src="/imgs/로그아웃.png"/></a>
                    <a><h2 style={{color:'white'}}>Welcome!<br/>{UserName}</h2></a>
                </div>
                )
                :
                (<div className='로그인전'>
                    <a onClick={()=>setLoginWindowIsOpen(true)}><img src="/imgs/로그인.png"/></a>
                    <a onClick={()=>setSighUpWindowIsOpen(true)}><img src="/imgs/회원가입.png"/></a>
                </div>)}
            </div>
            <Modal className="로그인팝업" isOpen={LoginWindowIsOpen} onRequestClose={()=>setLoginWindowIsOpen(false)}>
                <LoginModal></LoginModal>
            </Modal>
            <Modal className="회원가입팝업" isOpen={SighUpWindowIsOpen} onRequestClose={()=>setSighUpWindowIsOpen(false)}>
                <SignUpModal></SignUpModal>
            </Modal>
        </body>
    );
}

export default ProfileModal;