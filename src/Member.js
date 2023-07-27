import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseApp";
import 'bootstrap/dist/css/bootstrap.min.css';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from 'react-bootstrap';
import { createTheme } from '@mui/system';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';


const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
})
export default function Member() {
    const [historyData, setHistoryData] = useState([])

    const [addmembers, setaddmember] = useState([])
    useEffect(() => {
        if (localStorage.getItem('user1')) {
            window.location.href = '/'
        }
        getData()
    }, [])
    const result = historyData.reduce((total, historyData) => total = total + historyData.total, 0);

    console.log('result', result)


    const columns = [
        {
            name: "fname",
            label: "fname",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "contact",
            label: "contact",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "age",
            label: "age",
            options: {
                filter: true,
                sort: true,

            }
        },
        {
            name: "address",
            label: "address",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "profile",
            label: "profile",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img className='img1' src={value} width={"100px"}></img>
                )
            }
        },
        {
            name: "result",
            label: "padding amount",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "id",
            label: "view",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button type="button" className="btn btn-outline-secondary" onClick={() => handleEdit2(value)}>VIEW</button>
                )
            }
        },
    ]
    const logout = () => {
        window.location.href = '/'
    }
    const handleEdit2 = (id) => {
        localStorage.setItem('currentId12', id)
        window.location.href = '/Onemember'
    }
    const getData = () => {
        let allmember = []
        let abc = []

        const db = firebaseApp.firestore();
        db.collection('addmember').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log("1", doc.data().history)
                abc.push(doc.data().history)
                setHistoryData(abc)

                // console.log("history", historyData)
                allmember.push(doc.data())
                setaddmember(allmember)
                // console.log("add", addmembers)
            })

        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className="" >
                <Container fluid >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR85IjuLCuZpb6XtGqASS2BS4h-wT9ngT040Q&usqp=CAU" width="216px" ></img>


                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 n2"
                            style={{ maxHeight: '1000px' }}
                            navbarScroll
                        >
                            <Nav.Link className="n1" href="AddMember">AddMember</Nav.Link>
                            <Nav.Link className="n1" href="Member">All Member</Nav.Link>
                            <Nav.Link className="n1 " href="Addproduct">Add Product</Nav.Link>
                            <Nav.Link className="n1 " href="payment1">CREDIT</Nav.Link>


                        </Nav>
                        <button className="btn btn-secondary" onClick={logout}>LOG OUT</button>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CacheProvider value={muiCache}>
                <ThemeProvider theme={createTheme()}>
                    <MUIDataTable
                        title={"ALL MEMBER"}
                        data={addmembers}
                        columns={columns}
                    />
                </ThemeProvider>
            </CacheProvider>
        </>
    )
}