import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { StartPage } from './containers';

const App = () => {
  return (
    <div className='LiveAcademy_APP'>
        <BrowserRouter>
            <Routes>
                <Route exact path = '/' element = {<StartPage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
