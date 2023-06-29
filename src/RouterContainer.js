import React, { Component } from 'react'
import Login from './Login'
import AddMember from './AddMember'

import { BrowserRouter, Route, Routes } from 'react-router-dom'



export default class RouterContainer extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/AddMember' element={<AddMember />} ></Route>


                </Routes>
            </BrowserRouter >
        )
    }
}
