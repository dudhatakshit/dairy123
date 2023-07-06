import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseApp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form } from 'formik';
import video from './video.mp4'

let allmember = []
export default function Login() {
    const [contact, setcontact] = useState('')
    const [pass, setpass] = useState('')
    const [addmembers, setaddmember] = useState([])

    useEffect(() => {
        getData1()
    }, [])
    const changecontact = (e) => {
        setcontact(e.target.value)
    }
    const changepass = (e) => {
        setpass(e.target.value)
    }
    const getData1 = () => {
        const db = firebaseApp.firestore();
        db.collection('addmember').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                allmember.push(doc.data())
                setaddmember(allmember)
            })
        }).catch(err => {
            console.error(err)
        });
    }
    const handleSubmit = () => {
        let check = false
        let admmincheck = false
        for (let i = 0; i < addmembers.length; i++) {
            console.log('data', addmembers)
            if (contact == '123' & pass == '123') {
                admmincheck = true
            }
            if (contact == addmembers[i].contact && pass == addmembers[i].pass) {
                check = true
            }

        }
        if (admmincheck) {
            localStorage.setItem("user0", contact)
            if (localStorage.getItem('user0')) {
                localStorage.removeItem('user1')
            }
            window.location.href = '/Addmember'
        }
        if (check) {
            localStorage.setItem("user1", contact)
            if (localStorage.getItem('user1')) {
                localStorage.removeItem('user0')
            }
            window.location.href = "/new/" + contact

        } else {
            toast('ACCOUNT NOT FOUND')
        }
        console.log('1')

    }
    return (
        <>
            <div className="content text-center">
                <Formik
                    initialValues={{

                        email: '',
                        pass: '',
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        // alert(JSON.stringify(values, null, 2));
                    }}>
                    <Form>
                        <label htmlFor="contact" className="contact" >CONTACT</label><br></br>
                        <Field id="contact" name="contact" placeholder="Enter Your contact number" type="tel" value={contact} onChange={changecontact} />
                        <br>
                        </br>
                        <br></br>
                        <label htmlFor="pass" className="email">PASSWORD</label><br></br>
                        <Field type="password" value={pass} id="pass" name="pass" onChange={changepass} placeholder="Enter Your Password" /><br></br><br></br>
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary submit">Submit</button>
                    </Form>
                </Formik>
            </div>
            <div className="background-video">
                <video autoPlay muted loop className='videoTag' id="myVideo">
                    <source src={video} type="video/mp4" />
                </video>
            </div>
            <ToastContainer />
        </>
    )
}