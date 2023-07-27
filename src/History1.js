import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseApp";
import 'bootstrap/dist/css/bootstrap.min.css';
import MUIDataTable from "mui-datatables";
import { Anchor, ThemeProvider } from 'react-bootstrap';
import { createTheme } from '@mui/system';
import { CacheProvider } from '@emotion/react';
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


    const removefinal1 = () => {
        // console.log(this.state.tableMeta1.rowData)
        // let totaldata = this.state.totaldata
        // totaldata = totaldata.filter((item) => item.id !== this.state.value1)
        // console.log(this.state.totaldata)

        this.setState({ historyData }, () => {
            const db = firebaseApp.firestore();
            if (this.state.value1 == this.state.tableMeta1.rowData[4]) {
                const db = firebaseApp.firestore();
                db.collection('addmember').where("id", "==", id).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        db.collection("addmember").doc(doc.ref.id).delete().then(() => {


                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    })
                }).catch(err => {
                    console.error(err)
                });
            }
        })
    }

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
        {
            name: "id",
            label: "delete",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button onClick={() => removefinal1(value)} type="button" className="btn btn-secondary" >DELETE</button>
                )
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
            <div className='header'>
                <div className="q1">
                    <button className="btn btn-secondary" onClick={logout}>LOG OUT</button>

                </div>

            </div>
            <div className='sidebar'>

                <div className="side">
                    <div><a href={"/new/" + id} className="tag">PROFILE</a></div>

                    <div><a href={"/History1/" + id} className="tag">HISTORY</a></div>
                    <div><a href={"/payment/" + id} className="tag">PAYMENT</a></div>


                </div>
            </div>
            <div className="abc">
                <h3>YOUR TOTAL AMOUNT:{result}</h3>
                <input placeholder="PAID AMMOUNT" fdprocessedid="3t48q" type={'number'} value={paid} name='paid' onChange={changepaid} /><br></br><br></br>
                <button type="button" className="btn btn-outline-primary" onClick={abcd}>SUBMIT</button>

                <h3>YOUR PENDING AMOUNT:{pending}</h3>
            </div>






            <div className='abc'>
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