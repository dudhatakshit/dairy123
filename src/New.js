import React, { useState } from 'react'
import { useEffect } from 'react'
import firebaseApp from "./FirebaseApp";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function New() {
    const [id, setsId] = useState('')
    const [data, setData] = useState('')


    useEffect(() => {
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        console.log("first", id)

        console.log("fname", data.fname)


        setsId(id)
        getdata(id)

    }, [])


    const getdata = (id) => {

        const db = firebaseApp.firestore();
        db.collection('addmember').where('contact', '==', id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                setData(doc.data())

            })

        }).catch(err => {
            console.error(err)
        });
    }
    const logout = () => {
        window.location.href = '/'

    }
    return (
        <>
            {[false,].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                    <Container fluid>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR85IjuLCuZpb6XtGqASS2BS4h-wT9ngT040Q&usqp=CAU" width="216px" ></img>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    AMUL
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href={"/new/" + id}>PROFILE</Nav.Link>
                                    <Nav.Link href={"/History1/" + id}>HISTORY</Nav.Link>
                                    <Nav.Link href={"/payment/" + id}>PAYMENT</Nav.Link>
                                    <Nav.Link href={"/"}>LOG UOT</Nav.Link>
                                </Nav>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
            <div className='container  text-center'>
                <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                        <img className='img text-center ' src={data.profile}></img><br></br>
                    </div>
                </div>
            </div>
            <div className='container abc text-center'>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        NAME:<p className='red'>{data.fname}</p>
                        CONTACT NUMBER 1:<p className='red'>{data.contact}</p>
                        JOING DATE:<p className='red'>{data.date}</p>

                        AGE:<p className='red'>{data.age}</p>


                    </div>
                    <div className='col-md-6 col-sm-12'>
                        PASSWORD:<p className='red'>{data.pass}</p>
                        ADDRESS:<p className='red'>{data.address}</p>
                        PENDDING AMMOUNT:<p className='red'>{data.total}</p>

                        DEPOSIT:<p className='red'>{data.deposit}</p>

                    </div>
                </div>
            </div>
            <div className='container  text-center'>
                <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                        <button onClick={logout} className="btn btn-secondary">LOG OUT</button>
                    </div>
                </div>
            </div>

        </>
    )
}
