import React, { useState } from 'react';
import './coursecreator.css';
import './courseTitle.css';
import { createChapter, openChapterInput } from './courseCreator.js';

import { Header } from '../../components';

import add from '../../assets/add.png';


const NewChapter = ({title}) => {
    return (
        <div className='LiveAcademy_course_chapter'>
            <h1>{title}</h1>
        </div>
    );
}
export const Chart = ({title}) => {
    return (
        <div className='LiveAcademy_course_chapter'>
            <h1>{title}</h1>
        </div>
    )
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
    return (
    <div className='LiveAcademy_createCourse_container'>
        <Header/>
        <main className='LiveAcademy_main_container'>
            <div className='LiveAcademy_content-course_title'>
                {
                    courseStructure.CourseTitle.length > 0
                    ? <h1 title = 'Edit Title'>{courseStructure.CourseTitle}</h1>
                    : <input id = "LiveAcademy_input_course_title" placeholder='Title of the course'
                      onKeyDown={(event) => {
                        if(event.key === 'Enter') {
                            updateCourseTitle(event.target.value);
                        }
                      }}></input>
                }
            </div>
            
            <h1 style={{color:'#fff'}}>{JSON.stringify(courseStructure)}</h1>
            
            <div id='LiveAcademy_course_template'>
                <div id='Add-New-Chapter'>
                    {
                        Object.keys(courseStructure).map(key => {
                            console.log(key,courseStructure[key]);
                            return <></>
                        })
                    }
                    {
                        chartTitleOpen
                        ? <input onKeyDown = {(event) => {
                            return (
                                event.key === 'Enter' && event.target.value.length > 0
                                ? <></>
                                : <></>
                            )
                        }}placeholder='Title of the chapter'></input>
                        : <img src = {add} onClick={() => {setChartTitleOpen(!chartTitleOpen)}}/>
                    }
                </div>
            </div>
        </main>
    </div>
    )
}

export default CourseCreator;
