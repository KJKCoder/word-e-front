import './로그인.css';
import { useState } from 'react';
import { Login_Try } from '../func/utils';

function LoginModal() {
    const [login_id, setId] = useState('');
    const [login_pw, setPassword] = useState('');
    const [Is_Logined, set_Is_Logined] = useState(false)

    function click_login(){
        Login_Try(login_id, login_pw).then(res=>set_Is_Logined(res))
    }

    return (
        <body className='로그인창'>
            {Is_Logined ?
                <div>
                    <h1>로그인 완료</h1>
                    {window.location.reload()}
                </div>
                :
                <div>
                    <h1>Login</h1>
                    <label>
                        <span>ID:</span>
                        <input type="text" onChange={(event)=>setId(event.target.value)}/>
                    </label>
                        <br/>
                    <label>
                        <span>Password:</span>
                        <input type="password" onChange={(event)=>setPassword(event.target.value)}/>
                    </label>
                        <br/><br/>
                        <button onClick={click_login}>로그인</button>
                </div>
            }
        </body>
    );
}

export default LoginModal;