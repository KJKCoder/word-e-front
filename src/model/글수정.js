import { useNavigate, useParams } from 'react-router-dom';
import './글수정.css';
import { useEffect, useState } from 'react';
import { get_auth_header, get_post_contents } from '../func/utils';
import axios from 'axios';
import Modal from 'react-modal';
import FileUpload from './파일업로드';

function ModifyPageWrapper() {
    const navigate = useNavigate();
    const isLoggedIn = get_auth_header()['access-token'];
  
    useEffect(() => {
      if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        navigate('/model');
      }
    }, [isLoggedIn, navigate]);
  
    return isLoggedIn ? <ModifyPage /> : null;
  }


function ModifyPage() {
    const navigate = useNavigate();
    const {postID} = useParams()
    const post_form ={
                        "모델_id": postID,
                        "제목": "",
                        "작성자": "",
                        "글내용_모델": "",
                        "글내용_데이터": "",
                        "태그": [],
                    }
    const [write_contents, set_write_contents] = useState(post_form)
    const [is_upload_window_opened, set_is_upload_window_opened] = useState(false);

    const updateParentState = (newState) => {
        set_write_contents({...write_contents, 모델: newState})
        set_is_upload_window_opened(false)
    };

    const post_write_to_save = (datas) => {
        if (write_contents["태그"].length==0){alert("최소 하나의 태그를 입력하세요"); return false} 
        axios.put(`word-e-back:8000/model/modify/${postID}/`, Object.assign({}, write_contents, get_auth_header())).then(res=>{
            alert("저장되었습니다.")
            navigate(`/model/`)
            return true
        }).catch(error=>{
            console.log(error)
            alert("저장에 실패하였습니다.")
            return false
        })
    }

    useEffect(()=>{
        get_post_contents(postID).then(post_contents =>{
            set_write_contents(post_contents)
        })
    },[])

    return (
        <body className='글수정페이지'>
            <br/><br/><br/><br/><br/>

            <div className="page_contents">
                <div className="수평요소wrapper">
                    <img className="파일첨부버튼" src="/imgs/파일첨부버튼.png" onClick={()=>set_is_upload_window_opened(!is_upload_window_opened)}/>
                    <img className="글저장버튼" src="/imgs/글저장버튼.png" onClick={()=>post_write_to_save(postID, write_contents)}/>
                </div>
            </div>

            <div className="page_contents">
                <div className="title_box">
                    <textarea value={write_contents["제목"]} onChange={(event) => set_write_contents({...write_contents, "제목": event.target.value})}/>
                </div>
            </div>

            <div className="page_contents">
                <div className="선택버튼">
                    <h2>모델</h2>
                </div>
                <div className="model_box">
                    <textarea value={write_contents["글내용_모델"]} onChange={(event) => set_write_contents({...write_contents, "글내용_모델": event.target.value})}/>
                </div>
            </div>
            <br/>
            <div className="page_contents">
                <div className="선택버튼">
                    <h2>데이터</h2>
                </div>
                <div className="model_box">
                    <textarea value={write_contents["글내용_데이터"]} onChange={(event) => set_write_contents({...write_contents, "글내용_데이터": event.target.value})}/>
                </div>
            </div>

            <br/>

            <div className="page_contents">
                <div className="tag_box">
                    <textarea value={write_contents["태그"]} onChange={(event) => set_write_contents({...write_contents, "태그": event.target.value})}/>
                </div>
            </div>

            <br/><br/><br/><br/>
            <Modal className="모델선택창" isOpen={is_upload_window_opened} onRequestClose={()=>set_is_upload_window_opened(false)} >
                <FileUpload post_name={post_form["제목"]} model_id={postID} updateParentState={updateParentState}/>
            </Modal>
        </body>
  );
}

export default ModifyPageWrapper;
