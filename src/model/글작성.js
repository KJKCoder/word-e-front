import { useNavigate } from 'react-router-dom';
import HeaderMenu from '../header_and_login/상단메뉴바';
import FooterMenu from '../header_and_login/하단메뉴바';
import './글작성.css';
import { useEffect, useState } from 'react';
import { get_auth_header, get_user_info } from '../func/utils';
import axios from 'axios';
import Modal from 'react-modal';
import FileUpload from './파일업로드';

function WritePageWrapper() {
    const navigate = useNavigate();
    const isLoggedIn = get_auth_header()['access-token'];
  
    if (!isLoggedIn) {
      navigate('/model');
      return null;
    }
  
    return <WritePage />;
  }

function WritePage() {
    const navigate = useNavigate();
    const post_form ={
                        "모델": "입력된 모델이 없습니다",
                        "제목": "제목을 입력하세요",
                        "유저": "",
                        "글내용_모델": "",
                        "글내용_데이터": "",
                        "태그": ""
                    }
    const [write_contents, set_write_contents] = useState(post_form)
    const [is_upload_window_opened, set_is_upload_window_opened] = useState(false);
    
    const updateParentState = (newState) => {
        set_write_contents({...write_contents, 모델: newState})
        set_is_upload_window_opened(false)
    };

    const post_write_to_save = (datas) => {
        if (write_contents["태그"].length==0){alert("최소 하나의 태그를 입력하세요"); return false} 
        axios.post(`http://word-e-back:8000/model/write/`, Object.assign({}, datas, get_auth_header())).then(res=>{
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
        get_user_info().then(user_info =>{
            if (user_info){
                set_write_contents({...write_contents, 유저: user_info["유저_id"]})
            }else{
                set_write_contents({...write_contents, 유저: -1})
            }
        })
    },[])

    return (
    <body className='글작성페이지'>
        <HeaderMenu/>

        <br/><br/><br/><br/><br/>

        <div className="page_contents">
            <div className="수평요소wrapper">
                <img className="파일첨부버튼" src="/imgs/파일첨부버튼.png" onClick={()=>set_is_upload_window_opened(!is_upload_window_opened)}/>
                <img className="글저장버튼" src="/imgs/글저장버튼.png" onClick={()=>post_write_to_save(write_contents)}/>
            </div>
        </div>

        <div className="page_contents">
            <div className="title_box">
                <textarea onChange={(event)=>set_write_contents({...write_contents, 제목: event.target.value})}>제목을 입력해주세요</textarea>
            </div>
        </div>

        <div className="page_contents">
            <div className="선택버튼">
                <h2>모델</h2>
            </div>
            <div className="model_box">
                <textarea onChange={(event)=>set_write_contents({...write_contents, 글내용_모델: event.target.value})}>모델에 관련된 설명을 입력해주세요</textarea>
            </div>
        </div>
        <br/>
        <div className="page_contents">
            <div className="선택버튼">
                <h2>데이터</h2>
            </div>
            <div className="model_box">
                <textarea onChange={(event)=>set_write_contents({...write_contents, 글내용_데이터: event.target.value})}>데이터에 관련된 설명을 입력해주세요</textarea>
            </div>
        </div>

        <br/>

        <div className="page_contents">
            <div className="tag_box">
                <textarea onChange={(event)=>set_write_contents({...write_contents, 태그: event.target.value})}>태그들을 입력해주세요. 예시와 같이 정확한 형태로 입력해주세요! EX: #기사,#댓글,#뉴스,#소설</textarea>
            </div>
        </div>

        <br/><br/><br/><br/>

        <Modal className="모델선택창" isOpen={is_upload_window_opened} onRequestClose={()=>set_is_upload_window_opened(false)} >
          <FileUpload post_name={post_form["제목"]} model_id={0} updateParentState={updateParentState}/>
        </Modal>

        <FooterMenu/>
    </body>
  );
}

export default WritePageWrapper;
