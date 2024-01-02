import edit from '../../assets/edit.png';
import add from '../../assets/add.png';


import { useState } from 'react';

export const NewChapter = ({title,callback, callback2,add_lecture_callback,lectures}) => {
    const [editChapter, setEditChapter] = useState(false);
    const [lectureTitleOpen, setLectureTitleOpen] = useState(false);

    return (
        <div className='LiveAcademy_course_chapter'>
            <div className='Chapter'>
                {
                    editChapter
                    ? <>
                        <input
                            autoFocus = {true}
                            placeholder='Title of the chapter' 
                            onKeyDown={(event)=>{
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
            {
                    Object.keys(lectures).map(lecture_key => {
                        return <NewLecture title = {lecture_key}/>
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


export const NewLecture = ({title,callback}) => {
    const [editLecture, setEditLecture] = useState(false);

    return <div className='LiveAcademy_course_lecture'>
    {
        editLecture 
        ? <>
            <input 
                autoFocus = {true}
                placeholder='Title of the lecture' 
                onKeyDown={(event)=> {
                    if(event.key == "Enter") {
                        let value = event.target.value;
                        if(value.length > 0) {
                            setEditLecture(!editLecture);
                            return callback(title,value);
                        }
                    }}}
                />
        </>
        : <>
            <h1>{title}</h1>
            <div className='edit_img_holder'>
                <img src = {edit} onClick={() => {
                    setEditLecture(!editLecture);
                }}/>
            </div>
        </>
    }
    </div>
}