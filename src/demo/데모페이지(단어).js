import { Link } from 'react-router-dom';
import './데모페이지(단어).css';
import HeaderMenu from '../header_and_login/상단메뉴바';
import FooterMenu from '../header_and_login/하단메뉴바';
import LeftMenu from './좌측메뉴';
import { useState } from 'react';
import SelectModelModal from './SelectModel';
import Modal from 'react-modal';
import { post_demo_words } from '../func/utils';

function DemoPage_Word() {
    const [is_selectModelOpen, set_is_selectModelopen] = useState()
    const [current_model_name, set_current_model_name] = useState(['Select Model에서 모델을 선택해주세요',0]);
    const [input_words, set_input_words] = useState(["","",""])
    const [search_result, set_search_result] = useState(["검색어를 입력해주세요."])
  
    const updateParentState = (newState) => {
        set_current_model_name(newState);
    };

    function handleInputChange(event, index){
        const newInputWords = [...input_words];
        newInputWords[index] = event.target.value;
        set_input_words(newInputWords);
    };

    function searchOnClick(){
        post_demo_words(input_words, current_model_name[1]).then((similarity_list)=>{
            if (similarity_list){
                set_search_result(similarity_list)
            }else{
                set_search_result(["유사도 검색 결과가 없습니다."])
            }
        })
    };

    return (
    <body className='단어데모페이지'>
        <HeaderMenu/>
        <br/><br/><br/><br/>
        
        <div className="page_contents">
            <div className="페이지설명">
                <h1>단어 유사도 계산</h1>
                <p>입력한 단어와 모델 내 정의된 단어의 유사도를 계산한 결과를 출력합니다.</p>
            </div>
            <img className="모델선택버튼" src="/imgs/Select Model.png" onClick={()=>set_is_selectModelopen(!is_selectModelOpen)}/>
            <Modal className="모델선택창" isOpen={is_selectModelOpen} onRequestClose={()=>set_is_selectModelopen(false)} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0)'}}}>
                <SelectModelModal updateParentState={updateParentState}></SelectModelModal>
            </Modal>
        </div>
        <hr style={{borderWidth: "5px"}}/>

        <div className="page_contents">
            <div className='검색어박스'>
            <p className="검색어입력">
                {'>'} 단어를 입력하세요: 
                <textarea style={{width:"140px"}} onChange={(event) => handleInputChange(event,0)}/>/ 
                <textarea style={{width:"140px"}} onChange={(event) => handleInputChange(event,1)}/>/ 
                <textarea style={{width:"140px"}} onChange={(event) => handleInputChange(event,2)}/>
            </p>
                <img className="검색버튼" src="/imgs/검색버튼.png" onClick={()=>searchOnClick()}/>
            </div>
        </div>
        <br/>
        <div className="page_contents">
            <div className="현재모델">
                <Link to={`/model/post/${current_model_name[1]}`}><h2> &nbsp;&nbsp;- {current_model_name[0]}</h2></Link>
            </div>
        </div>
        
        <br/>

        <div className="page_contents">
            <div className="검색결과">
                {search_result.map((item) => (
                    <p>{item}</p>
                ))}
            </div>
        </div>

        <br/>
        <LeftMenu/>
        <FooterMenu/>
    </body>
    );
}

export default DemoPage_Word;