import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MainPage from './main/main';
import IntroPage from './intro/intro';
import DemoPage_Word from './demo/데모페이지(단어)';
import DemoPage_Setence from './demo/데모페이지(문장)';
import ModelPage from './model/모델페이지';
import PostPage from './model/글내용';
import WritePageWrapper from './model/글작성';
import ModifyPageWrapper from './model/글수정';
import FileUpload from './model/파일업로드';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="/main" element={<MainPage/>}/>
        <Route path="/intro" element={<IntroPage/>}/>

        <Route path="/demo/word" element={<DemoPage_Word/>}/>
        <Route path="/demo/sentence" element={<DemoPage_Setence/>}/>

        <Route path="/model" element={<Navigate to="/model/전체/1" replace />}/>
        <Route path="/model/:tag/:page" element={<ModelPage/>}/>
        <Route path="/model/post/0" element={<Navigate to="/model/전체/1" replace />}/>

        <Route path="/model/post/:postID" element={<PostPage/>}/>

        <Route path="/model/write" element={<WritePageWrapper/>}/>
        <Route path="/model/post/:postID/modify" element={<ModifyPageWrapper/>}/>
        
        <Route path="/model/post/upload/" element={<FileUpload/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
