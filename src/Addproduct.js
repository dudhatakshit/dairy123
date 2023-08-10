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
let allmember = []
let data = ''
let id = ''
let total = ''
const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
})
export default function Addamount() {
    const [addmembers, setaddmember] = useState([])
    const [date, setdate] = useState('')
    const [quantity, setquantity] = useState(0)
    const [total, settotal] = useState('')
    const [dummy, setDummy] = useState([])

    const [product, setproduct] = useState('')

    const [currentData, setcurrentdata] = useState('')
    useEffect(() => {
        console.log(addmembers)
        if (localStorage.getItem('user1')) {
            window.location.href = '/'
        }
        getData()
        id = localStorage.getItem('currentId12')
        for (let i = 0; i < allmember.length; i++) {
            if (allmember[i].id == id) {
                data = allmember[i]
                setcurrentdata(data)
            }
        }

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        console.log(today)
        setdate(today)
    }, []);


    const getData = () => {

        console.log("getdata")
        const db = firebaseApp.firestore();
        db.collection('addmember').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                allmember.push(doc.data())
                setaddmember(allmember)
            })

            avvc()
        }).catch(err => {
            console.error(err)
        });
    }


    const avvc = () => {


    }

    const changequantity = (e) => {
        setquantity(e.target.value)
    }
    const changedate = (e) => {
        setdate(e.target.value)
    }

    const changeproduct = (e) => {
        setproduct(e.target.value)
    }
    const logout = () => {
        window.location.href = '/'
    }
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
            name: "Add Product",
            label: "Add Product",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <select onChange={changeproduct} className="a1">
                        <option className="a2" >SELECT PRODUCT</option>

                        <option value='33' className="a2" >GOLD</option>
                        <option value='30' className="a3">SHAKTI</option>
                        <option value='26' className="a4">TAZA</option>

                    </select>
                )
            }
        },
        {
            name: "Quantity",
            label: "Quantity",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <input type="number" className="a123" onChange={changequantity}></input>
                )
            }
        },
        {
            name: "date",
            label: "date",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <input type="date" className="a123" onChange={changedate}></input>
                )
            }
        },
        {
            name: "id",
            label: "Submit",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button type="button" className="btn btn-secondary" onClick={() => handleEdit1(value)}> ADD</button>
                )
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
        // {
        //     name: "id",
        //     label: "view",
        //     options: {
        //         filter: true,
        //         sort: true,
        //         customBodyRender: (value, tableMeta, updateValue) => (
        //             <button onClick={() => handleEdit2(value)} type="button" className="btn btn-secondary" >VIEW</button>
        //         )
        //     }
        // },
    ]
    const handleEdit2 = (id) => {
        localStorage.setItem('currentId12', id)
        window.location.href = '/Onemember'
    }



    const handleEdit1 = (id) => {
        localStorage.setItem('currentId12', id)
        console.log('quantity', quantity)
        console.log('quantity', product)

        console.log('id', localStorage.getItem('currentId12'))
        let x = Number(quantity) * Number(product)
        console.log("🚀 ~ file: Addproduct.js:171 ~ handleEdit1 ~ x:", x)


        const db = firebaseApp.firestore();

        db.collection('addmember').where('id', '==', id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("addmember").doc(doc.ref.id);

                return updateCollection.update({
                    total: doc.data().total + x,

                    history: [...doc.data().history,
                    {
                        date: date,
                        product: product,
                        quantity: quantity,
                        total: Number(x),
                        id: Date.now(),

                    }
                    ]
                })
                    .then(() => {
                        getData()
                        console.log("Document successfully updated!");
                        allmember = []
                        setaddmember([])

                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });

            })

        }).catch(err => {
            console.error(err)
        });
        setquantity('')
        settotal(total)
        console.log("aaa", total)
    }

    return (
        <>
            <Navbar bg="light" expand="lg"  >
                <Container fluid  >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR85IjuLCuZpb6XtGqASS2BS4h-wT9ngT040Q&usqp=CAU" width="216px" ></img>


                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 n2"
                            style={{ maxHeight: '1000px' }}
                            navbarScroll
                        >
                            <Nav.Link className="n1 " href="AddMember">AddMember</Nav.Link>
                            <Nav.Link className="n1 " href="Member">All Member</Nav.Link>
                            <Nav.Link className="n1 " href="Addproduct">Add Product</Nav.Link>
                            <Nav.Link className="n1 " href="payment1">CREDIT</Nav.Link>

                        </Nav>
                        <button className="btn btn-secondary " onClick={logout}>LOG OUT</button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CacheProvider value={muiCache}>
                <ThemeProvider theme={createTheme()}>
                    <MUIDataTable
                        title={"ADD PRODUCT"}
                        data={addmembers}
                        columns={columns}
                    />
                </ThemeProvider>
            </CacheProvider>
        </>
    )
}

