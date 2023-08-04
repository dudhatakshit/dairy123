import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseApp";
import 'bootstrap/dist/css/bootstrap.min.css';
import MUIDataTable from "mui-datatables";
import { Anchor, ThemeProvider } from 'react-bootstrap';
import { createTheme } from '@mui/system';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './App.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { toast } from "react-toastify";
import { db } from './FirebaseApp'; // Assuming you have already initialized Firestore
let allmember = []

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
})

export default function Payment() {
    const [addmembers, setaddmember] = useState([])
    const [paid, setpaid] = useState(0)


    const [pending, setpending] = useState([])
    const [id, setsId] = useState('')
    const [data, setData] = useState('')
    const [uid, setUid] = useState('')
    const [total1, settotal1] = useState('')



    const setData1 = useState([]);
    const setSum = useState(0);

    useEffect(() => {
        toast("FDVEWRD")
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        console.log(id)

        setsId(id)

        getdata(id)

    }, []);




    const changepaid = (e) => {
        setpaid(e.target.value)
    }





    const getdata = (id) => {
        console.log(id)
        const db = firebaseApp.firestore();
        db.collection('addmember').where('contact', '==', id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setData(doc.data())
                // allmember.push(doc.data())
                // setaddmember(allmember)
                setpending(doc.data().pending)
                console.log("history", pending)

            })

        }).catch(err => {
            console.error(err)
        });
    }

    const columns = [
        {
            name: "date",
            label: "date",
            options: {
                filter: true,
                sort: true,
            }
        },


        {
            name: "paidamonut",
            label: "paidamonut",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "method",
            label: "Payment method",
            options: {
                filter: true,
                sort: true,
            }
        },





    ]


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



            <div className=''>
                <div className="total">
                    <span className="red2">PENDDING AMMOUNT:</span> <p className='red1'>{data.total}</p>

                </div>

                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable
                            title={"PAYMENT"}
                            data={pending}
                            columns={columns}
                        />
                    </ThemeProvider>
                </CacheProvider>
            </div>

        </>
    )
}