import './SelectModel.css';
import { createRef, useEffect, useRef, useState } from 'react';
import { delete_user_import_model, get_user_import_model_list } from '../func/utils';


function SelectModelModal(props) {
    const { updateParentState } = props;
      
    function handleButtonClick(new_state){
        updateParentState(new_state);
    };
      
    const [model_dict, set_model_dict] = useState({"모델_id":[], "모델이름": [],})

    const modelRefs = useRef([]);

    useEffect(() => {
    get_user_import_model_list().then(res => {
        if (res) {
        set_model_dict(res);
        modelRefs.current = res["모델_id"].map(() => createRef());
        } else {
        set_model_dict({"모델_id":[], "모델이름": ["임포트 된 모델이 없습니다."]});
        }
    });
    }, []);

    return (
        <body className='SelectModelModal'>
            <div className='page_contents'>
                <div>
                    {
                        model_dict["모델_id"].map((item, index) => (
                            
                                <div key={item} ref={modelRefs.current[index]}>
                                    <label onClick={()=>handleButtonClick([model_dict["모델이름"][index],item])}>{model_dict["모델이름"][index]}</label>
                                    <span
                                        className="delete_button"
                                            onClick={() => {
                                                modelRefs.current[index].current.remove();
                                                delete_user_import_model(item);
                                            }}
                                    >
                                        X
                                    </span>
                                    <hr/>
                                </div>

                        ))
                    }
                </div>
            </div>
        </body>
    );
}

export default SelectModelModal;