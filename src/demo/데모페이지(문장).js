import './데모페이지(문장).css';
import HeaderMenu from '../header_and_login/상단메뉴바';
import FooterMenu from '../header_and_login/하단메뉴바';
import LeftMenu from './좌측메뉴';
import { useState } from 'react';
import Modal from 'react-modal';
import SelectModelModal from './SelectModel';
import { post_demo_sentence } from '../func/utils';

function DemoPage_Setence() {
    const sentence_num = 10;
    const [is_selectModelOpen, set_is_selectModelopen] = useState(false)
    const [current_model_name, set_current_model_name] = useState(['Select Model에서 모델을 선택해주세요',0]);
    const [target_sentence, set_target_sentence]= useState("")
    const [sentence_list, set_sentence_list] = useState(Array.from({length: sentence_num}, () => ''))
    const [sentence_list_place_holder, set_sentence_list_place_holder] = useState(Array.from({length: sentence_num}, () => '비교할 문장을 입력하세요'))
    
    const updateParentState = (newState) => {
        set_current_model_name(newState);
        set_target_sentence("")
        set_sentence_list(Array.from({length: sentence_num}, () => ''))
    };

    function handleTargetInputChange(event){
        set_target_sentence(event.target.value);
    }

    function handleListInputChange(event, index){
        const newInputSentences = [...sentence_list];
        newInputSentences[index] = event.target.value;
        set_sentence_list(newInputSentences);
    };

    function searchOnClick(){
        post_demo_sentence(target_sentence, sentence_list, current_model_name[1]).then((similarity_list)=>{
            if (similarity_list){
                set_sentence_list(Array.from({length: sentence_num}, () => ''))
                set_sentence_list_place_holder(similarity_list)
            }else{
                alert("유사도 검색 결과가 없습니다.")
                set_sentence_list(Array.from({length: sentence_num}, () => ''))
            }
        })
    };

    return (
    <body className='문장데모페이지'>
        <HeaderMenu/>
        <br/><br/><br/><br/>
        
        <div className="page_contents">
            <div className="페이지설명">
                <h1>문장 유사도 계산</h1>
                <p>입력한 문장 간 유사도를 계산한 결과를 출력합니다.</p>
            </div>
            <img className="모델선택버튼" src="/imgs/Select Model.png" onClick={()=>set_is_selectModelopen(!is_selectModelOpen)}/>
            <Modal className="모델선택창" isOpen={is_selectModelOpen} onRequestClose={()=>set_is_selectModelopen(false)} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0)'}}}>
                <SelectModelModal updateParentState={updateParentState}></SelectModelModal>
            </Modal>
        </div>
        <hr style={{borderWidth: "5px"}}/>
        
        <div className="page_contents">
            <p className="검색어입력">
                {'>'} 문장을 입력하세요: 
                <textarea style={{width:"700px"}} onChange={(event) => handleTargetInputChange(event,0)} value={target_sentence} placeholder={"검색어를 입력해주세요"}></textarea>
            </p>
            <button>
                <img className="검색버튼" src="/imgs/검색버튼.png" onClick={()=>searchOnClick()}/>
            </button>
        </div>
        
        <div className="page_contents">
            <div className="현재모델">
                <h2> &nbsp;&nbsp;- {current_model_name[0]}</h2>
            </div>
        </div>
        
        <br/>

        <div className="page_contents">
            <div className="input_sentence_wraper">
            {
                sentence_list.map((item, index)=>(
                    <p className='검색어입력' id={index}>&nbsp;&nbsp;Sentence {index+1}: 
                        <textarea style={{width:"900px"}} placeholder={sentence_list_place_holder[index]}  onChange={(event) => handleListInputChange(event,index)} value={sentence_list[index]}/>
                    </p>        
                ))
            }
            </div>
        </div>

        <br/>
        <LeftMenu/>
        <FooterMenu/>
    </body>
    );
}

export default DemoPage_Setence;