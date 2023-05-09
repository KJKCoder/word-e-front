import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import HeaderMenu from '../header_and_login/상단메뉴바';
import FooterMenu from '../header_and_login/하단메뉴바';
import './글내용.css';
import { delete_user_import_model, get_auth_header, get_user_info, post_user_import_model, put_user_import_model } from '../func/utils';



function PostPage() {
    const {postID} = useParams();
    const post_id = parseInt(postID)

    const [post_contents, set_post_contents] = useState({});
    const [main_contents_target, set_main_contents_target] = useState("글내용_모델");
    const [is_import, set_is_import] = useState() 
    const [IsLogin, set_IsLogin] = useState(false);
    
    useEffect(() => {
        axios.get(`https://web-word-e-front-5llo2alhg6lxfy.sel4.cloudtype.app/model/read/${post_id}/`, get_auth_header())
            .then(response => {
                set_post_contents(response.data); 
                get_user_info().then(res=>{
                    if (res["유저_id"]==post_contents["유저_id"]){
                        set_IsLogin(true);
                    }else{
                        set_IsLogin(false)
                    }
                })
                post_user_import_model(post_id).then(res=>{
                    if (res==true){
                        set_is_import(true)
                    }else{
                        set_is_import(false)
                    }
                })
            })
            .catch(error => {
            console.log(error);
            
            });
    }, [is_import]);

    function click_import_export_button(){
        post_user_import_model(post_id).then(res=>
            {
                if (res==true){
                    delete_user_import_model(post_id)
                    set_is_import(false)
                }else{
                    put_user_import_model(post_id)
                    set_is_import(true)
                }
            }
            )
    }
    
    const [progress, setProgress] = useState(0);
    async function handleDownloadClick() {
        try {
          const response = await axios({
            method: 'get',
            url: `https://web-word-e-front-5llo2alhg6lxfy.sel4.cloudtype.app/api/download/${post_id}`,
            responseType: 'blob',
            onDownloadProgress: progressEvent => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted)
            },
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'WordE_model_data_file.zip');
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error(error);
    }}

    return(
    <body className='글내용'>
        <HeaderMenu/>

        <br/><br/><br/><br/>
        
        <div className="page_contents">
            <div className="페이지설명">
                <h1>{post_contents["제목"]}</h1>
                <p>작성자: {post_contents["작성자"]} / 작성일:{post_contents["작성일"]} / 수정일:{post_contents["수정일"]} / #태그: {post_contents["태그"]}</p>
            </div>
        </div>
        <hr style={{borderWidth: "5px"}}/>
        
        <div className="page_contents">
            <div className="수평요소wrapper">
                <div className="선택버튼">
                    <a onClick={() => set_main_contents_target("글내용_모델")}><h2>모델</h2></a>
                </div>
                <div className="선택버튼">
                    <a onClick={() => set_main_contents_target("글내용_데이터")}><h2>데이터</h2></a>
                </div>
                {
                !is_import?
                <a onClick={()=>click_import_export_button()}>                 
                    <img className="import버튼" src="/imgs/Import버튼.png"/>
                </a>
                :
                <a onClick={()=>click_import_export_button()}>
                    <img className="import버튼" src="/imgs/Export버튼.png"/>
                </a>
                }
                    
            </div>
        </div>
        
        <br/>

        <div className="page_contents">
            <div className="contents">
                <p>{post_contents[main_contents_target]}</p>
            </div>
        </div>
        <br/>
        <div className="page_contents">
            <div className="수평요소wrapper">
                <img className="다운로드버튼" src="/imgs/다운로드버튼.png" onClick={handleDownloadClick}/>
                {
                IsLogin?
                <Link to={`/model/post/${postID}/modify`}><img className="글수정버튼" src="/imgs/글수정버튼.png"/></Link>
                :
                <div/>
                }
            </div>
        </div>
        <div className="page_contents">
            <ProgressBar progress={progress} />
        </div>

        <br/><br/><br/><br/>
        <FooterMenu/>
    </body>
    );
}

const ProgressBar = ({ progress }) => {
    return (
      <div className="progress">
        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
    );
  };

export default PostPage;
