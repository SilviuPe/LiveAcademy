import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { StartPage, Register, Login, CourseCreator, CreateContent } from './containers';

const App = () => {
  return (
    <div className='LiveAcademy_APP'>
        <BrowserRouter>
            <Routes>
                <Route exact path = '/' element = {<StartPage/>} />
                <Route path = '/register' element = {<Register/>} />
                <Route path = '/login' element = {<Login/>} />
                <Route path = '/createCourse' element = {<CourseCreator/>} /> 
                <Route path = '/createContent'> 
                  <Route path = ":lectureID" element = {<CreateContent/>}> </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
