import React, { Component } from 'react'
import Login from './Login'
import AddMember from './AddMember'
import Member from './Member'
import Onemember from './Onemember'
import New from './New'
import Addproduct from './Addproduct'

import History1 from './History1'
import { BrowserRouter, Route, Routes } from 'react-router-dom'



export default class RouterContainer extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/AddMember' element={<AddMember />} ></Route>
                    <Route path='/Member' element={<Member />} ></Route>
                    <Route path='/Onemember' element={<Onemember />} ></Route>
                    <Route path='/new' element={<New />} ></Route>
                    <Route path='/new/:contact' element={<New />} ></Route>
                    <Route path='/history/:contact' element={<History1 />} ></Route>
                    <Route path='/Addproduct' element={<Addproduct />} ></Route>



                </Routes>
            </BrowserRouter >
        )
    }
}
