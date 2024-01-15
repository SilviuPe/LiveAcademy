import edit from '../../assets/edit.png';
import add from '../../assets/add.png';


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NewChapter = ({title, id, callback, callback2, delete_callback,add_lecture_callback,lectures,updateLectureCallback, delete_lecture_callback}) => {
    const [editChapter, setEditChapter] = useState(false);
    const [lectureTitleOpen, setLectureTitleOpen] = useState(false);
    return (
        <div className={`LiveAcademy_course_chapter`}>
            <div className='Chapter'>
                {
                    editChapter
                    ? <>
                        <input
                            autoFocus = {true}
                            placeholder='Title of the chapter'
                            onKeyDown={(event)=>{
                                if (event.key === "Escape") 
                                    setEditChapter(!editChapter);
                                if(event.key === "Enter") {
                                    let value = event.target.value;
                                    if(value.length > 0) {
                                        setEditChapter(!editChapter)
                                        return callback(title,value);
                                    }
                                    else {
                                        setEditChapter(!editChapter);
                                        return delete_callback(title);
                                    }
                                    }
                        }}/>
                    </>
                    : <>
                        <h1
                        className= {`${ id === undefined ? 'unsaved_title' : ''}`} 
                        title = 'Edit Chapter Title'
                        onClick={() => {
                            callback2();
                            setEditChapter(!editChapter);
                        }}>{title}</h1>
                    </>
                }
            </div>
            {
                    Object.keys(lectures).map((lecture_key) => {
                        return <NewLecture
                                chapter = {title}
                                title = {lecture_key} 
                                lectureID={lectures[lecture_key].id}
                                callback = {updateLectureCallback}
                                delete_callback={delete_lecture_callback}    
                            />
                    })
            }
            <div id='new_lecture_input'>
            {
                lectureTitleOpen
                ? <input
                    onKeyDown = {(event) => {
                        if( event.key === 'Enter' && event.target.value.length > 0)
                        {
                            setLectureTitleOpen(!lectureTitleOpen);
                            add_lecture_callback(event.target.value,title);
                        }
                        if(event.key === "Escape") 
                            setLectureTitleOpen(!lectureTitleOpen);
                        }}
                    placeholder='Title of the lecture'
                    autoFocus = {true}
                />
                : <img src = {add} onClick={() => {
                    setLectureTitleOpen(!lectureTitleOpen);
                }}/>

            }
            </div>
        </div>
    );
}


export const NewLecture = ({chapter,title,callback, delete_callback,lectureID}) => {
    const [editLecture, setEditLecture] = useState(false);


    const navigate = useNavigate();
    console.log("RE RENDER", title,  lectureID == undefined)
    return <div className={`LiveAcademy_course_lecture`}>
    {
        editLecture 
        ? <>
            <input 
                autoFocus = {true}
                placeholder='Title of the lecture' 
                onKeyDown={(event)=> {
                    if (event.key === "Escape") 
                        setEditLecture(!editLecture)
                    if(event.key === "Enter") {
                        let value = event.target.value;
                        if(value.length > 0) {
                            setEditLecture(!editLecture);
                            return callback(chapter,title,value);
                        }
                        else {
                            setEditLecture(!editLecture);
                            return delete_callback(chapter,title);
                        }
                            
                    }}}
                />
        </>
        : <>
            <h1 
            className= {`${lectureID === undefined ? 'unsaved_lecture' : ''}`}
            onClick={() => {
                setEditLecture(!editLecture);
            }}>{title}</h1>

            <div className={`edit_img_holder ${lectureID == undefined ? 'unsaved_lecture' : ''}`}>
                <img src = {edit} onClick={() => {
                    if (lectureID != undefined)
                        navigate(`/createContent/${lectureID}`);
                }}/>
            </div>
        </>
    }
    </div>
}