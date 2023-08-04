import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseApp";
import 'bootstrap/dist/css/bootstrap.min.css';
let allmember = []
let data = ''
let id = ''
export default function Onemember() {


    const [addmembers, setaddmember] = useState([])
    const [currentData, setcurrentdata] = useState('')

    useEffect(() => {
        id = JSON.parse(localStorage.getItem('currentId12'))
        if (localStorage.getItem('user1')) {
            window.location.href = '/'
        }
        alldata()


    }, [])



    const alldata = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('addmember').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                x.push(doc.data())
                setaddmember(x)
                match(x)
            })
        }).catch(err => {
            console.error(err)
        });
    }


    const match = (x) => {
        let y = []
        let check = false

        for (let i = 0; i < x.length; i++) {
            if (x[i].id == Number(id)) {
                setcurrentdata(x[i])
            }
        }

    }



    const logout = () => {
        window.location.href = '/member'

    }
    return (
        <>
            <div className='container abc text-center'>
                <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                        <img className='img text-center' src={currentData.profile}></img><br></br>
                    </div>
                </div>
            </div>
            <div className='container abc text-center'>
                <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        NAME:<p className='red'>{currentData.fname}</p>
                        CONTACT NUMBER 1:<p className='red'>{currentData.contact}</p>
                        JOING DATE:<p className='red'>{currentData.date}</p>

                        AGE:<p className='red'>{currentData.age}</p>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        ADDRESS:<p className='red'>{currentData.address}</p>

                        OCCUPATION:<p className='red'>{currentData.occ}</p>
                        PENDDING AMMOUNT:<p className='red'>{currentData.total}</p>

                        DEPOSIT:<p className='red'>{currentData.deposit}</p>

                    </div>
                </div>
            </div>
            <div className='container abc1 text-center'>
                <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                        <button onClick={logout} className="btn btn-secondary">BACK</button>
                    </div>
                </div>
            </div>

        </>
    )
}