import React, { useState } from 'react'
import { useEffect } from 'react'
import firebaseApp from "./FirebaseApp";

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
            <div className='header'></div>
            <div className='sidebar'>

                <div className="side">
                    <div><a href={"/new/" + id} className="tag">PROFILE</a></div>

                    <div><a href={"/History1/" + id} className="tag">HISTORY</a></div>
                    <div><a href={"/payment/" + id} className="tag">PAYMENT</a></div>


                </div>
            </div>
            <div className='container abc text-center'>
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
                        OCCUPATION:<p className='red'>{data.occ}</p>
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
