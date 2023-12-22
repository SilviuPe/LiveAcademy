import React from 'react';
import './coursecreator.css';

import { Header } from '../../components';

import add from '../../assets/add.png';


const ChapterButton = () => {
    return (
        <div className='LiveAcademy-new_chapter'>

        </div>
    );
}

const CourseCreator = () => {
  return (
    <div className='LiveAcademy_createCourse_container'>
        <Header/>
        <main className='LiveAcademy_main_container'>
            <div className='LiveAcademy_content-course_title'>
                <input placeholder='Title of the course'></input>
            </div>
            <div className='LiveAcademy_content-course-template'>
            </div>
            <div id='LiveAcademy_course_template'>
                <div className='Add-New-Chapter'>
                    <img src = {add}/>
                </div>
            </div>
        </main>
    </div>
  )
}

export default CourseCreator;
