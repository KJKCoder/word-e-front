import { Link, useParams } from 'react-router-dom';
import HeaderMenu from '../header_and_login/상단메뉴바';
import FooterMenu from '../header_and_login/하단메뉴바';
import './모델페이지.css';
import LeftTagMenu from './태그메뉴';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { get_auth_header } from '../func/utils';


function ModelPage() {
    const { tag , page } = useParams();
    const default_dict = {"총글개수":0,"제목":[""],"작성자":[""],"최종수정일":[""],"모델_id":[""]};
    const [post_dict, set_post_dict] = useState(default_dict);
    const [search_word, set_search_word] = useState("");

    useEffect(() => {
        axios.get(`http://word-e-back:8000/model/search/${tag}/${page}/`, get_auth_header())
          .then(response => {
            if (response.status !== 200) {
                throw new Error('Response status not 200');
              }
            set_post_dict(response.data); // Update state with fetched data
          })
          .catch(error => {
            console.log(error);
            set_post_dict(default_dict);
          });
      }, [tag, page]);

    const post_num = post_dict["총글개수"]
    const title = post_dict["제목"]
    const writer = post_dict["작성자"]
    const date = post_dict["최종수정일"]
    const model_id = post_dict["모델_id"]

    const post_list = Array.from({length: 10}, () => '');

    const currentpage = parseInt(page)
    const total_page = parseInt(post_num/10)+1;
    const page_below = Array.from({length: total_page}, (_, index) => index === currentpage-1 ? true : false);
    const IsLogin = get_auth_header()['access-token']

  return (
    <body className='모델페이지'>
        <HeaderMenu/>
        <br/><br/><br/><br/>
        
        <div className="page_contents">
            <div className="페이지설명">
                <h1>모델 목록</h1>
                <p>원하는 모델을 검색하고 Import해 데모테스트하거나 다운로드할 수 있습니다.</p>
            </div>
                {IsLogin?
                <Link to="/model/write/"><img className="글작성버튼" src="/imgs/글작성버튼.png"/></Link>
                :
                <a onClick={()=>alert("로그인이필요합니다.")}><img className="글작성버튼" src="/imgs/글작성버튼.png"/></a>
                }
        </div>
        <hr style={{borderWidth: "5px"}}/>
        
        <div className="page_contents">
            <div className="검색박스">
                <p className="현재태그">
                    태그: #{tag}
                </p>
                <p className="검색어입력">
                    {'>'} 검색어를 입력하세요: 
                    <textarea onChange={(event)=>set_search_word(event.target.value)}></textarea>
                </p>
                <Link to={`/model/${search_word}/1`}><img className="버튼" src="/imgs/검색버튼.png"/></Link>
            </div>
        </div>

        <div className="page_contents">
            <div className="글목록박스">
                {
                    post_list.map((item,index)=>(
                        <>
                            <Link to={`/model/post/${model_id[index]}`}>
                                <div id={index} style={{display:"flex", justifyContent:"space-between", height:"40px"}}>
                                    <p>{title[index]}</p>
                                    <p style={{textAlign:"right"}}>{writer[index]}/{date[index]}</p>
                                </div>
                            </Link>   
                            <hr style={{borderWidth:"2px"}}/>  
                        </>                   
                    ))
                }
            </div>
        </div>
        <div className="page_contents">
            <div className="페이지핸들러">
                {
                    page_below.map((item,index)=>{
                            if (item) {
                                return <p key={index} style={{color: 'red'}}> {index+1} </p>
                            } else {
                                return <Link to={`/model/${index+1}`}><p key={index}> {index+1} </p></Link>
                            }
                        }
                    )
                }
            </div>
        </div>
    
        <br/><br/>
        <LeftTagMenu/>
        <FooterMenu/>
    </body>
  );
}

export default ModelPage;
