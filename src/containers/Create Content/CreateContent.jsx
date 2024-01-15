import React from 'react';
import {Header} from '../../components';
import { useParams } from 'react-router-dom';


const CreateContent = () => {
    const { lectureID } = useParams();
    const lecture = fetch(`http://localhost:3001/request_lecture?id=${lectureID}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
    console.log(lecture);

    return(
        <div className='LiveAcademy_create_content-container'>
            <Header/>
        </div>
    );
} 

export default CreateContent; 