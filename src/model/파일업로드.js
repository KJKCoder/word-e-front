import React, { useState } from 'react';
import axios from 'axios';
import './파일업로드.css';
import { get_auth_header } from '../func/utils';

function FileUpload(props) {
  const {post_name, model_id, updateParentState} = props;
  const [progress, setProgress] = useState(0);

  const [models, setModels] = useState([]);
  const [datas, setDatas] = useState([]);

  function handleParentState(new_state){
    updateParentState(new_state);
  };

  const handleModelChange = (event) => {
    setModels(event.target.files);
  }

  const handleDataChange = (event) => {
    setDatas(event.target.files);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    for(let i=0; i<models.length; i++) {
      formData.append(`model${i}`, models[i]);
    }
    for(let i=0; i<datas.length; i++){
      formData.append(`data${i}`, datas[i]);
    }

    formData.append("access-token", get_auth_header()["access-token"])
    formData.append("name", post_name)
    axios.post(`https://port-0-word-e-back-5llo2alhg6lxfy.sel4.cloudtype.app/api/upload/${model_id}`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
      onUploadProgress: (progressEvent) => {const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); setProgress(percentCompleted);},
    }).then(response => {
      handleParentState(response.data["모델_id"])
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    
    <form className="FileUpload" onSubmit={handleSubmit}>

      

      <body>
        <div class="상단틀"></div>  
          <h1 style={{textAlign: "center"}}>파일 업로드</h1>
          <hr style={{borderWidth: "3px"}}/>
          <div class="field">
              <div>
                  <h2> {'>'} 모델 <span style={{color:'red'}}>*필수</span></h2>
                  <label htmlFor="modelInput">
                    <img src="/imgs/모델파일선택.png"/>
                  </label>    
                  <input id="modelInput" type="file" onChange={handleModelChange} multiple style={{display: 'none'}}/>
                  <div>
                  <label style={{textAlign:'center'}}>모델파일 {models.length}개</label>
                  </div>
              </div>
          </div>

          <div class="field">
              <div>
                  <h2> {'>'} 데이터 <span style={{color:'black'}}>*선택</span></h2>
                  <label htmlFor="dataInput">
                    <img src="/imgs/데이터파일선택.png"/>
                  </label>
                  <input id="dataInput" type="file" onChange={handleDataChange} multiple style={{display: 'none'}}/>
                  <div>
                  <label style={{textAlign:'right'}}>데이터파일 {datas.length}개</label>
                  </div>
              </div>
          </div>

          <div class="field">
              <div>
                  <br/>
                  <button className="uploadbutton" type="submit"><img class="업로드버튼" src="/imgs/업로드버튼.png"/></button>
              </div>
          </div>
        <div class="하단틀"></div>

      </body>

      <ProgressBar progress={progress} />
      
    </form>
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


export default FileUpload;