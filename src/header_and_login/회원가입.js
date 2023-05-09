import './회원가입.css';
import { useState } from 'react';
import { SignUp_Try } from '../func/utils';

function SignUpModal() {
    const [signUp_nickName, set_signUp_nickName] = useState('');
    const [signUp_id, set_signUp_id] = useState('');
    const [signUp_pw, set_signUp_pw] = useState('');
    const [signUp_pw_again, set_signUp_pw_again] = useState('');
    const [Is_signUp, set_Is_signUp] = useState(false)

    function click_SignUp(){
        if (signUp_pw == signUp_pw_again){
            SignUp_Try(signUp_nickName, signUp_id, signUp_pw).then(res=>{
                if (res["state"]==true){
                    set_Is_signUp(true)
                }else{
                    alert(res["error"])
                    set_signUp_nickName(""); set_signUp_id(""); set_signUp_pw(""); set_signUp_pw_again("");
                }
            })
        }else{
            alert("입력한 두 비밀번호가 다릅니다.")
        }
    }

    return (
        <body className='회원가입창'>
            {Is_signUp ?
                <div>
                    <h1>회원가입 완료</h1>
                    {window.location.reload()}
                </div>
                :
                <div>
                    <h1>Sign Up</h1>
                    <label>
                        <span>NickName:</span>
                        <input type="text" value={signUp_nickName} onChange={(event)=>set_signUp_nickName(event.target.value)}/>
                    </label>
                    <br/>
                    <label>
                        <span>ID:</span>
                        <input type="text" value={signUp_id} onChange={(event)=>set_signUp_id(event.target.value)}/>
                    </label>
                    <br/>
                    <label>
                        <span>PW:</span>
                        <input type="password" value={signUp_pw} onChange={(event)=>set_signUp_pw(event.target.value)}/>
                    </label>
                    <br/>
                    <label>
                        <span>PW Again:</span>
                        <input type="password" value={signUp_pw_again} onChange={(event)=>set_signUp_pw_again(event.target.value)}/>
                    </label>
                        <br/><br/>
                        <button onClick={click_SignUp}>회원가입</button>
                </div>
            }
        </body>
    );
}

export default SignUpModal;