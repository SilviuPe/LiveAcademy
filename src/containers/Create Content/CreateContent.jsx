import React from 'react';
import {Header} from '../../components';
import { useParams } from 'react-router-dom';

import './tools.css';
import './createContent.css';

import code from '../../assets/coding.png';
import image from '../../assets/image.png';
import paragraph from '../../assets/paragraph.png';
import title from '../../assets/title.png';
import video from '../../assets/video.png';



function Button({image, callback = NaN}) {
    return (
        <div className='LiveAcademy_tool_button'>
            <img src={image}/>
        </div>
    );
}


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
            <div className='LiveAcademy_content_tools'>
                <Button image = {title}/>
                <Button image = {paragraph}/>
                <Button image = {image}/>
                <Button image = {video}/>
                <Button image = {code}/>
            </div>
            <div className='LiveAcademy_content_editor'>
                <div className='LiveAcademy_objects_list'>
                </div>
                <div className='LiveAcademy_content_frame'>
                    asd
                </div>
            </div>
        </div>
    );
} 

export default CreateContent; 