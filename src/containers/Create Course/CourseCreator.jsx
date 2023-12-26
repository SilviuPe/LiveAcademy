import React, { useState } from 'react';
import './coursecreator.css';
import './courseTitle.css';

import { Header } from '../../components';

import add from '../../assets/add.png';
import edit from '../../assets/edit.png';


const NewChapter = ({title,callback, callback2}) => {
    const [editChapter, setEditChapter] = useState(false);
    return (
        <div className='LiveAcademy_course_chapter'>
            {
                editChapter
                ? <>
                    <input placeholder='Title of the chapter' onKeyDown={(event)=>{
                        if(event.key == "Enter") {
                            let value = event.target.value;
                            if(value.length > 0) {
                                setEditChapter(!editChapter)
                                return callback(title,value);
                            }
                        }
                    }}/>
                </>
                : <>
                    <h1>{title}</h1>
                    <div className='edit_img_holder'>
                        <img src = {edit} onClick={() => {
                            callback2();
                            setEditChapter(!editChapter);
                        }}/>
                    </div>
                </>
            }
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

    // Update an existing chapter 
    function updateChapter(chapterTitle, updatedTitle) {
        console.log(chapterTitle,updatedTitle);
        setCourseStructure(() => {

            let existing_chapters = Object.keys(courseStructure['Chapters']);
            let new_existing_chapters = {}
            existing_chapters.forEach((key) => {
                if(key == chapterTitle) {
                    new_existing_chapters[updatedTitle] = {
                        lectures : {

                        }
                    }
                }
                else 
                new_existing_chapters[key] = existing_chapters[key];
            })
            let newCourseStructure = {
                ...courseStructure,
                Chapters: {
                    ...new_existing_chapters
                }

            }
            return newCourseStructure;
        });
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
                            return <NewChapter title = {key} callback = {updateChapter} callback2 = {() => {setChartTitleOpen(false);}}/>
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
