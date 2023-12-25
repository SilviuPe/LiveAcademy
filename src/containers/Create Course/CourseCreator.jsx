import React, { useState } from 'react';
import './coursecreator.css';
import './courseTitle.css';
import { createChapter, openChapterInput } from './courseCreator.js';

import { Header } from '../../components';

import add from '../../assets/add.png';
import edit from '../../assets/edit.png';


const NewChapter = ({title}) => {
    return (
        <div className='LiveAcademy_course_chapter'>
            <h1>{title}</h1>
            <div className='edit_img_holder'>
                <img src = {edit}/>
            </div>
        </div>
    );
}


const CourseCreator = () => {
    const [chartTitleOpen,setChartTitleOpen] = useState(false);
    const [courseStructure, setCourseStructure] = useState({
        CourseTitle : '',
        Chapters : {

        }
    });

    // Update the title of the course
    function updateCourseTitle(title) {
        setCourseStructure(() => {
            let newStructure = {
                ...courseStructure,
                CourseTitle : title
            }
            return newStructure;
        })
    }

    // Add new chapter 
    function addNewChapter(title) {
        setChartTitleOpen(!chartTitleOpen)
        setCourseStructure(() => {
            let existing_chapters = courseStructure['Chapters'];
            let newCourseStructure = {
                ...courseStructure,
                Chapters: {
                    ...existing_chapters,
                    [title]: {
                        lectures : {

                        }
                    }
                }
            }
            return newCourseStructure;
        })
    }
    return (
    <div className='LiveAcademy_createCourse_container'>
        <Header/>
        <main className='LiveAcademy_main_container'>
            <div className='LiveAcademy_content-course_title'>
                {
                    courseStructure.CourseTitle.length > 0
                    ? <h1 title = 'Edit Title' onClick = {()=> {updateCourseTitle('')}}>{courseStructure.CourseTitle}</h1>
                    : <input id = "LiveAcademy_input_course_title" placeholder='Title of the course'
                      onKeyDown={(event) => {
                        if(event.key === 'Enter') {
                            updateCourseTitle(event.target.value);
                        }
                      }}></input>
                }
            </div>
     
            
            <div id='LiveAcademy_course_template'>
                <div id='Add-New-Chapter'>
                    {
                        Object.keys(courseStructure['Chapters']).map(key => {
                            return <NewChapter title = {key}/>
                        })
                    }
                        <div id='new_chapter_input'>
                        {
                            chartTitleOpen
                            ? <input onKeyDown = {(event) => {
                                return (
                                    event.key === 'Enter' && event.target.value.length > 0
                                    ? addNewChapter(event.target.value) 
                                    : <></>
                                )
                            }}placeholder='Title of the chapter'></input>
                            : <img src = {add} onClick={() => {
                                if(courseStructure.CourseTitle.length > 0)
                                setChartTitleOpen(!chartTitleOpen)
                            }}/>

                        }
                        </div>
                </div>
            </div>
        </main>
    </div>
    )
}

export default CourseCreator;
