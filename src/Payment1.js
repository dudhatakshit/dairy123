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
let history12 = []
let pendding1 = 0
const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
})
export default function Payment1() {
    const [addmembers, setaddmember] = useState([])
    const [total, settotal] = useState('')
    const [payment, setpayment] = useState('')

    const [date, setdate] = useState('')
    const [ammount, setammount] = useState(0)
    const [historyData, setHistoryData] = useState([])
    const [totalAmount, setTotalAmount] = useState(0);
    const [pendding3, setpendding3] = useState(0);
    const [currentData, setcurrentdata] = useState('')

    useEffect(() => {
        console.log(addmembers)
        if (localStorage.getItem('user1')) {
            window.location.href = '/'
        }
        getData(id)
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


    const getData = (id) => {
        console.log("getdata")


        const db = firebaseApp.firestore();
        db.collection('addmember').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                history12.push(doc.data().history)
                setHistoryData(history12)
                allmember.push(doc.data())
                setaddmember(allmember)
            })

        }).catch(err => {
            console.error(err)
        });
    }
    const changepayment = (e) => {
        setpayment(e.target.value)
    }





    console.log("history", historyData)


    const changeammount = (e) => {
        setammount(e.target.value)
    }
    const pending2 = (e) => {
        setTotalAmount(total)
        pendding1 = total - ammount
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
            name: "total",
            label: "total",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "paid Ammount",
            label: "paid Ammount",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <input type="number" className="a1" onChange={changeammount}></input>
                )
            }
        },
        {
            name: "Payment Method",
            label: "Payment Method",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <select onChange={changepayment} className="a1">
                        <option className="a2" >SELECT PAYMENT METHOD</option>

                        <option value='cash' className="a2" >CASH</option>
                        <option value='online payment' className="a3">ONLINE PAYMENT</option>
                        <option value='check' className="a4">CHECK</option>

                    </select>
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
                    <button type="button" className="btn btn-secondary" onClick={() => handleEdit1(value)}> CREDIT</button>
                )
            }
        },
        // {
        //     name: "Pendding Amount ",
        //     label: "pendding3",
        //     options: {
        //         filter: true,
        //         sort: true,
        //     }
        // },
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
            name: "id",
            label: "view",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button onClick={() => handleEdit2(value)} type="button" className="btn btn-secondary" >VIEW</button>
                )
            }
        },
    ]
    const handleEdit2 = (id) => {
        localStorage.setItem('currentId12', id)
        window.location.href = '/Onemember'
    }



    const handleEdit1 = (id) => {
        localStorage.setItem('currentId12', id)
        console.log('total', total)

        console.log('ammount', ammount)

        let x = Number(total) - Number(ammount)


        const db = firebaseApp.firestore();

        db.collection('addmember').where('id', '==', id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("addmember").doc(doc.ref.id);

                return updateCollection.update({

                    total: doc.data().total - ammount,
                    pending: [...doc.data().pending,
                    {
                        date: date,
                        id: Date.now(),
                        paidamonut: ammount,
                        method: payment,

                    },

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
        setammount('')
        setpendding3(pendding3)
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
                        <button className="btn btn-secondary logout" onClick={logout}>LOG OUT</button>
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

