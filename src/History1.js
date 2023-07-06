import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseApp";
import 'bootstrap/dist/css/bootstrap.min.css';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from 'react-bootstrap';
import { createTheme } from '@mui/system';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import './App.css';
let allmember = []

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
})
export default function History1() {
    const [historyData, setHistoryData] = useState([])
    const [id, setsId] = useState('')
    const [data, setData] = useState('')

    useEffect(() => {
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        console.log(id)
        setsId(id)
        getdata(id)

    }, [])


    const getdata = (id) => {
        console.log(id)
        const db = firebaseApp.firestore();
        db.collection('addmember').where('email', '==', id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                setData(doc.data())

                setHistoryData(doc.data().history)
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
    const logout = () => {
        window.location.href = '/new'

    }
    return (
        <>

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