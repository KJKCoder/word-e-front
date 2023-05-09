import axios from "axios";

export async function post_demo_words(input_words, model_id){
    try{
        const datas = {"input_words":input_words, "모델_id":model_id}
        const res = await axios.post(`http://127.0.0.1:8000/demo/word`, datas)

        if (res.status === 200) {
            return res.data
          } else {
            console.log(res.status)
            return false
          }
    }catch{
        return false
    }
}

export async function post_demo_sentence(target_sentence, sentence_list, model_id){
    try{
        const datas = {"모델_id":model_id, "input_sentence":target_sentence, "sentence_list":sentence_list}
        const res = await axios.post(`http://127.0.0.1:8000/demo/sentence`, datas)

        if (res.status === 200) {
            return res.data
          } else {
            console.log(res.status)
            return false
          }
    }catch{
        return false
    }
}

export function get_auth_header(){
    const access_token = localStorage.getItem('access_token');
    const headers = {"access-token": access_token};
    return headers
}

export function remove_auth_token(){
    localStorage.removeItem('access_token');
    return true
}

export async function get_user_info(){
    try{
        const res = await axios.post(`http://127.0.0.1:8000/checktoken/`, get_auth_header())

        if (res.status === 200) {
            return res.data
          } else {
            return false
          }
    }catch{
        return false
    }
}

export async function get_post_contents(model_id){
    try{
        const res = await axios.post(`http://127.0.0.1:8000/model/modify/${model_id}/`, get_auth_header())

        if (res.status === 200) {
            return res.data
          } else {
            return false
          }
    }catch{
        return false
    }
}

export async function get_user_import_model_list(){
    try{
        const res = await axios.post("http://127.0.0.1:8000/user-import-model-list/", get_auth_header())

        if (res.status === 200) {
            return res.data
          } else {
            return false
          }

    }catch{
        return false
    }
};

export async function post_user_import_model(model_id){
    try{
        const res = await axios.post(`http://127.0.0.1:8000/user-import-model/${model_id}/`, get_auth_header())

        if (res.status === 200) {
            return true
          } else {
            return false
          }

    }catch{
        return false
    }
};

export async function put_user_import_model(model_id){
    try{
        const res = await axios.put(`http://127.0.0.1:8000/user-import-model/${model_id}/`, get_auth_header())

        if (res.status === 201) {
            return res.data
          } else {
            return false
          }

    }catch{
        return false
    }
};

export async function delete_user_import_model(model_id){
    try{
        const res = await axios.post(`http://127.0.0.1:8000/user-import-model-delete/${model_id}/`, get_auth_header())

        if (res.status === 200) {
            return true
          } else {
            return false
          }

    }catch{
        return false
    }
};

export async function Login_Try(id, password) {

    try {
        const res = await axios.post('http://127.0.0.1:8000/login/', { "아이디":id, "비밀번호":password });
        if (res.status === 200) {
            const { access_token } = res.data;
            localStorage.setItem('access_token', access_token);
            console.log("저장완료")
            return true
          } else {
            console.log("Login Failed")
            return false
          }

    }catch (error) {
        console.error(error)
        localStorage.removeItem('access_token');
        console.log("삭제완료")
        return false
    }

}

export async function SignUp_Try(nickname, id, password) {
    
    try{
        const res = await axios.post('http://127.0.0.1:8000/signup/', { "닉네임":nickname, "아이디":id, "비밀번호":password });
        if (res.status === 200){
            return res.data["state"]
        }else{
            return res.data
        }
    }catch{
        console.log("Sign Up Failed")
    }

}