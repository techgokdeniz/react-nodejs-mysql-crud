import React from 'react'
import Navigation from '../components/Navbar'
import { useState } from 'react'
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap'
import { useNavigate  } from "react-router-dom";

export default function Add() {
    let navigate=useNavigate();
    const [User, setUser] = useState({
        pname: "",
        pnumber: "",
        pprice: ""
    })

    const [status, setstatus] = useState({
        type:""
    });

    const { pname, pnumber, pprice} = User;

    const onInputChange = e => {
        setUser({...User,[e.target.name]:e.target.value})
    };

    const onSubmit = async e => {
        e.preventDefault();
        axios.post("http://localhost:3001/insert",User)
        .then(()=>{
            setstatus({type:"success"});
            setTimeout(()=>navigate("/"),1000);
        })
        .catch(()=>{
            setstatus({type:"error"});
        })
    };

    return (
        <div>
            <Navigation/>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5 mt-4">
                    <h2 className="text-center mb-4">Ürün Ekle</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-md mb-2"
                                placeholder="Ürün İsmini Giriniz"
                                name="pname"
                                value={pname}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-md mb-2"
                                placeholder="Ürün Adedi Giriniz"
                                name="pnumber"
                                value={pnumber}
                                onChange={e=>onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-md mb-2"
                                placeholder="Ürün Fiyat Giriniz"
                                name="pprice"
                                value={pprice}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <button className="btn btn-primary btn-block">Ürün Ekle</button>
                    </form>
                    {
                        status.type === 'success' ? 
                        <ReactBootStrap.Alert variant='success' className='mt-2 w-100'>
                            Kayıt Başarılı Bir Şekilde Eklendi
                        </ReactBootStrap.Alert> 
                        : 
                        ""
                    }
                </div>
                
            </div>
        </div>
    )
}
