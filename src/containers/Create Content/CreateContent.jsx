import React from 'react';
import {Header} from '../../components';
import { useParams } from 'react-router-dom';

const CreateContent = () => {
    const { lectureID } = useParams();
    console.log(lectureID);
    return(
        <div className='LiveAcademy_create_content-container'>
            <Header/>
        </div>
    );
}

export default CreateContent;