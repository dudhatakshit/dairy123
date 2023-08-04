import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseApp";
import 'bootstrap/dist/css/bootstrap.min.css';
import MUIDataTable from "mui-datatables";
import { Anchor, ThemeProvider } from 'react-bootstrap';
import { createTheme } from '@mui/system';
import { CacheProvider } from '@emotion/react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import createCache from '@emotion/cache';
import './App.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { toast } from "react-toastify";
import { db } from './FirebaseApp'; // Assuming you have already initialized Firestore
let allmember = []

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
})

export default function History1() {
    const [addmembers, setaddmember] = useState([])
    const [paid, setpaid] = useState(0)
    const [pending, setpending] = useState(0)


    const [historyData, setHistoryData] = useState([])
    const [id, setsId] = useState('')
    const [data, setData] = useState('')
    const [uid, setUid] = useState('')
    const [total1, settotal1] = useState('')




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

                allmember.push(doc.data())
                setaddmember(allmember)
                setHistoryData(doc.data().history)
                console.log("history", historyData)

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
            name: "product",
            label: "product",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        {
                            value == "30" ? <h5 className="a13">Shakti</h5> : value == "33" ? < h5 className="a12"> Gold</h5> : <h5 className="a14">Taaza</h5>

                        }
                    </>
                )
            }
        },

        {
            name: "quantity",
            label: "quantity",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "total",
            label: "total",
            options: {
                filter: true,
                sort: true,
            }
        },




    ]
    const result = historyData.reduce((total, historyData) => total = total + historyData.total, 0);
    const abcd = () => {
        const x = result - paid
        setpending(x)
    }
    console.log(result);
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
            {/* <div className="abc">
                <h3>YOUR TOTAL AMOUNT:{result}</h3>
                <input placeholder="PAID AMMOUNT" fdprocessedid="3t48q" type={'number'} value={paid} name='paid' onChange={changepaid} /><br></br><br></br>
                <button type="button" className="btn btn-outline-primary" onClick={abcd}>SUBMIT</button>

                <h3>YOUR PENDING AMOUNT:{pending}</h3>
            </div> */}






            <div className=''>
                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable
                            title={"History"}
                            data={historyData}
                            columns={columns}
                        />
                    </ThemeProvider>
                </CacheProvider>
            </div>

        </>
    )
}