import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { StartPage } from './containers';
const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route exact path = '/' element = {<StartPage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
