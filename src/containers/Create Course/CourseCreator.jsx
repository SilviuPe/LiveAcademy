import React, { useEffect, useState } from 'react';
import './coursecreator.css';
import './courseTitle.css';

import { Header, NewChapter } from '../../components';

import add from '../../assets/add.png';

import { errorsHandle } from './errorsHandling';
import { course_structure_funcs } from './functionsHandling';
import { json } from 'react-router-dom';







const CourseCreator = () => {
    const [titleSaved, setTitleSaved] = useState(true);
    const [chartTitleOpen,setChartTitleOpen] = useState(false);
    const [courseStructure, setCourseStructure] = useState({
        CourseTitle : '',
        Author : sessionStorage.getItem('username'),
        Chapters : {

        },
        CourseID : ''
    });
    const [titleBefore, setTitleBefore] = useState('');
    const [errors,setErrors] = useState({
        title: false
    });


    const errorsOptions = errorsHandle(errors);
    const structureFunctions = course_structure_funcs(courseStructure);
    if (!sessionStorage.getItem('username')) window.location.href = '/login'; 
    
    
    // Update the title of the course
    function updateCourseTitle(title,title_before = '') {
        setCourseStructure(() => {
            let newStructure = {
                ...courseStructure,
                CourseTitle : title
            }
            return newStructure;
        })
        setTitleBefore(title_before);
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

                        },
                        id : undefined
                    }
                }
            }
            return newCourseStructure;
        })
    }

    // Update an existing chapter 
    function updateChapter(chapterTitle, updatedTitle) {
        setCourseStructure(() => {

            let existing_chapters = Object.keys(courseStructure['Chapters']);
            let new_existing_chapters = {}
            
            let lectures = courseStructure['Chapters'][chapterTitle]['lectures'];
            existing_chapters.forEach((key) => {
                if(key == chapterTitle) {
                    new_existing_chapters[updatedTitle] = {
                        lectures : {
                            ...lectures
                        }
                    }
                }
                else
                new_existing_chapters[key] = courseStructure['Chapters'][key];
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


    // Add new lecture
    function addNewLecture(lectureTitle,chapterTitle) {
        setCourseStructure(() => {
            let existing_chapters = courseStructure['Chapters'];
            let lectures = existing_chapters[chapterTitle]['lectures'];
            lectures[lectureTitle] = {
                lectureType : '',
                path : '',
                id : undefined
            }
            let newCourseStructure = {
                ...courseStructure,
                Chapters: {
                    ...existing_chapters,
                    [chapterTitle] : {
                        lectures : {
                            ...lectures
                        }
                    }
                }
            }
            return newCourseStructure;
        })
    }

    // Update an existing lecture 
    function updateSpecificLecture(chapterTitle,lectureTitle,updatedTitle) {
        setCourseStructure(() => {
            let existing_chapters = courseStructure['Chapters'];
            let lectures = existing_chapters[chapterTitle]['lectures'];
            let new_lectures = {}
            console.log(existing_chapters)
            Object.keys(lectures).forEach((key) => {
                if (key == lectureTitle) {
                    new_lectures[updatedTitle] = lectures[key];
                    new_lectures[updatedTitle].id = undefined;
                }
                else
                    new_lectures[key] = lectures[key];
            })
            let newCourseStructure = {
                ...courseStructure,
                Chapters : {
                    ...existing_chapters,
                    [chapterTitle] : {
                        lectures : {
                            ...new_lectures
                        },
                        id : courseStructure['Chapters'][chapterTitle].id
                    }
                }
            }
            console.log(newCourseStructure)
            return newCourseStructure;

        })
    }


    // Delete lecture 
    function deleteLecture(chapterTitle,lectureTitle) {
        setCourseStructure(() => {
            let existing_chapters = courseStructure['Chapters'];
            let existing_lectures = existing_chapters[chapterTitle]['lectures'];
            let new_lectures = {}
            Object.keys(existing_lectures).forEach((key) => {
                if (key != lectureTitle) new_lectures[key] = existing_lectures[key];
            })
            let newCourseStructure = {
                ...courseStructure,
                Chapters : {
                    ...existing_chapters,
                    [chapterTitle] : {
                        lectures : {
                            ...new_lectures
                        }
                    }
                }
            }
            return newCourseStructure;
        })
    }
    // Delete chapter 
    function deleteChapter(chapterTitle) {
        setCourseStructure(() => {
            let existing_chapters = courseStructure['Chapters'];
            let newChapters = {}
            Object.keys(existing_chapters).forEach((key) => {
                if (key != chapterTitle) newChapters[key] = existing_chapters[key];
            })
            let newCourseStructure = {
                ...courseStructure,
                Chapters: {
                    ...newChapters 
                }
            }
            return newCourseStructure;
        })
    }

    function requestCourse() {
        let json_data = {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        fetch(`http://localhost:3001/course_request?username=${sessionStorage.getItem('username')}`,json_data).then(response => {
            return response.json();
        })
        .then((data) => { 
            if (data.CourseStructure) 
            {
                console.log(data.CourseStructure);
                return setCourseStructure(data.CourseStructure);
            }
        })
    }

    function sendCourseRequest() {
        let json_data = {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify(courseStructure)
        }
        fetch('http://localhost:3001/create_course', json_data).then(response => {
            if (response.status === 201) {
                console.log("SAVED")
                return response.json()
            }
        })
        .then(data => {
            setCourseStructure({
                ...courseStructure,
                CourseID : data.CourseID
            })
            requestCourse();
            setTitleSaved(true);
        })
    }

    function deleteCourseRequest() {
        fetch(`http://localhost:3001/deleteCourse?CourseID=${courseStructure.CourseID}`)
        .then(response => {
            if(response.ok) {
                console.log("Course Succesfully Deleted!")
                return setCourseStructure(structureFunctions.setTheCourseStructureDefault());
            }
        })
    }

    useEffect(requestCourse,[]);
    return (
    <div className='LiveAcademy_createCourse_container'>
        <Header 
            save_callback = {sendCourseRequest}
            delete_callback = {deleteCourseRequest}
        />
        <main className='LiveAcademy_main_container'>
            <div className={`LiveAcademy_content-course_title ${ errors.title[0] ? "close" : "" }`}>
                {
                    courseStructure.CourseTitle.length > 0
                    ?<h1 className = {`${titleSaved ? '' : 'unsaved'}`} title = 'Edit Title' onClick = {()=> {updateCourseTitle('',courseStructure.CourseTitle)}}>{courseStructure.CourseTitle}</h1>
                    : <>
                    <input 
                        autoFocus = {true}
                        id = "LiveAcademy_input_course_title" 
                        placeholder='Title of the course'
                        onFocus = {() => {
                            setErrors(errorsOptions.titleError(false));
                        }}
                        onKeyDown={(event) => {
                        if(event.key === 'Enter') {
                            if (event.target.value.length <= 0) 
                                return setErrors(errorsOptions.titleError(true));
                            setTitleSaved(false);
                            return updateCourseTitle(event.target.value);
                            
                        }
                        if (event.key === "Escape") {
                            updateCourseTitle(titleBefore);
                        }
                      }}></input>
                      <p className={`error ${ errors.title[0] ? "show" : "unshow" }`}>Course title required!</p>
                    </> 
                    
                }
            </div>
     
            
            <div id='LiveAcademy_course_template'>
                <div id='Add-New-Chapter'>
                    {
                        Object.keys(courseStructure['Chapters']).map(key => {
                            return (
                                <>
                                    <NewChapter
                                        title = {key}
                                        id = {courseStructure['Chapters'][key].id}
                                        callback = {updateChapter} 
                                        callback2 = {() => {setChartTitleOpen(false)}}
                                        add_lecture_callback = {addNewLecture}
                                        lectures = {courseStructure['Chapters'][key]['lectures']}
                                        delete_callback = {deleteChapter}
                                        updateLectureCallback={updateSpecificLecture}
                                        delete_lecture_callback={deleteLecture}
                                        key = {key} 
                                    />
                                </>
                            )
                        })
                    }
                        <div id='new_chapter_input'>
                        {
                            chartTitleOpen
                            ? <input 
                                autoFocus = {true}
                                onKeyDown = {(event) => {
                                    if (event.key === 'Enter' && event.target.value.length > 0)
                                        return  addNewChapter(event.target.value) 
                                    if (event.key === 'Escape') 
                                        return setChartTitleOpen(!chartTitleOpen);
                                    }}
                                placeholder='Title of the chapter'></input>
                            : <img src = {add} onClick={() => {
                                if(courseStructure.CourseTitle.length > 0)
                                    setChartTitleOpen(!chartTitleOpen)
                                else 
                                    setErrors(errorsOptions.titleError(true));
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
