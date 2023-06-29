import { useEffect, useState } from "react";
import firebaseApp from "./FirebaseApp";
import { type } from "@testing-library/user-event/dist/type";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

let allmember = []

export default function AddMember() {
    const [fname, setfname] = useState('')
    const [contact, setcontact] = useState('')
    const [address, setaddress] = useState('')
    const [age, setage] = useState('')
    const [profile, setprofile] = useState('')
    const [pass, setpass] = useState('')
    const [contact2, setcontact2] = useState('')
    const [occ, setocc] = useState('')
    const [date, setdate] = useState('')




    useEffect(() => {
        if (localStorage.getItem('user1')) {
            window.location.href = '/'
        }
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        console.log(today)
        setdate(today)
    }, [])

    const changeocc = (e) => {
        setocc(e.target.value)
    }
    const changepass = (e) => {
        setpass(e.target.value)
    }
    const changefname = (e) => {
        setfname(e.target.value)
    }

    const changecontact = (e) => {
        setcontact(e.target.value)
    }
    const changecontact2 = (e) => {
        setcontact2(e.target.value)
    }
    const changeaddress = (e) => {
        setaddress(e.target.value)
    }
    const changeage = (e) => {
        setage(e.target.value)
    }




    const changeprofile = (e) => {
        UploadImageTOFirebase(e.target.files[0])
    }
    const UploadImageTOFirebase = (file) => {
        const guid = () => {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return String(s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4());
        }
        let myPromise = new Promise((resolve, reject) => {
            const myGuid = guid();
            const storageUrl = firebaseApp.storage('gs://dairy-37cbb.appspot.com/')
            const storageRef = storageUrl.ref();
            console.log('ref : ', storageRef)
            const uploadTask = storageRef.child('dairy').child('profile').child(myGuid).put(file)
            uploadTask.on('state_changed',
                (snapShot) => {
                }, (err) => {
                    //catches the errors
                    console.log(err)
                    reject(err)
                }, () => {
                    firebaseApp
                        .storage('gs://dairy-37cbb.appspot.com/')
                        .ref()
                        .child('dairy')
                        .child('profile')
                        .child(myGuid)
                        .getDownloadURL()
                        .then(fireBaseUrl => {
                            resolve(fireBaseUrl)
                        }).catch(err => {
                            console.log('error caught', err)
                        })
                })
        })
        myPromise.then(url => {
            console.log(url)
            setprofile(url)
            // sendMessage(data)
        }).catch(err => {
            console.log('error caught', err)
        })
    }
    const handleSubmit = () => {
        let registerQuery = new Promise((resolve, reject) => {
            let db = firebaseApp.firestore();
            db.collection("addmember").add({
                fname: fname,
                contact: contact,
                contact2: contact2,
                address: address,
                occ: occ,
                age: age,
                deposit: 1000,
                profile: profile,
                id: Date.now(),
                pass: pass,
                history: [],
                date: date,



            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    resolve(docRef.id);

                })
                .catch((error) => {
                    console.error("Please check form again ", error);
                    reject(error);

                });
        });
        registerQuery.then(result => {
            console.warn('register successful')
        }).catch(error => {
            console.error(error)
        })

        setfname('')
        setaddress('')
        setage('')
        setcontact('')
        setprofile('')
        setpass('')
        setcontact2('')
        setocc('')
    }
    const getData = () => {

        const db = firebaseApp.firestore();
        db.collection('dairy').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                allmember.push(doc.data())
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
            <Navbar bg="light" expand="lg"  >
                <Container fluid className="n3">

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 n2"
                            style={{ maxHeight: '1000px' }}
                            navbarScroll
                        >
                            <Nav.Link className="n1" href="AddMember">AddMember</Nav.Link>
                        </Nav>
                        <button className="btn btn-secondary" onClick={logout}>LOG OUT</button>

                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-sm-6 col-12" >
                        <center>
                            <input className="form-control contact-form border-top-0 border-right-0 border-left-0 p-0 n2" fdprocessedid="3t48q" placeholder="First Name" type={'text'} value={fname} name='fname' onChange={changefname} /><br></br><br></br>
                            <input placeholder=" Contact Number-1" className="form-control contact-form border-top-0 border-right-0 border-left-0 p-0" fdprocessedid="3t48q" type={'tel'} value={contact} name='contact' onChange={changecontact} /><br></br><br></br>
                            <input placeholder=" Contact Number -2" className="form-control contact-form border-top-0 border-right-0 border-left-0 p-0" fdprocessedid="3t48q" type={'tel'} value={contact2} name='contact2' onChange={changecontact2} /><br></br><br></br>
                            <input placeholder="Age" className="form-control contact-form border-top-0 border-right-0 border-left-0 p-0" fdprocessedid="3t48q" type={'number'} value={age} name='age' onChange={changeage} /><br></br><br></br>
                        </center>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-12">
                        <center>
                            <input placeholder=" Password" className="form-control contact-form border-top-0 border-right-0 border-left-0 p-0" fdprocessedid="3t48q" type='password' value={pass} name='pass' onChange={changepass}></input><br></br><br></br>
                            <input placeholder=" Address" className="form-control contact-form border-top-0 border-right-0 border-left-0 p-0" fdprocessedid="3t48q" type={'text'} value={address} name='address' onChange={changeaddress} /><br></br><br></br>
                            <input placeholder=" Occupation" className="form-control contact-form border-top-0 border-right-0 border-left-0 p-0" fdprocessedid="3t48q" type={'text'} value={occ} name='occ' onChange={changeocc} /><br></br><br></br>
                            <input className="form-control contact-form border-top-0 border-right-0 border-left-0 p-0" fdprocessedid="3t48q" type={'file'} name='profile' onChange={changeprofile} /><br></br><br></br>
                        </center>
                    </div>
                </div>
                <center>
                    <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>SUBMIT</button>

                </center>


            </div>

        </>
    )
}
