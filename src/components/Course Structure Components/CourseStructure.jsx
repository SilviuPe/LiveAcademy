import edit from '../../assets/edit.png';
import { useState } from 'react';

export const NewChapter = ({title,callback, callback2}) => {
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