import React from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../components/Navbar'
import {useState,useEffect} from 'react';
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function EditUser() {

    let navigate = useNavigate();
    const {id}=useParams();
    const [user, setUser] = useState({
        id:"",
        urunadi:"",
        adet:"",
        fiyat:"",
    });

    const [status, setstatus] = useState({
        type: ""
    });

    const{urunadi,fiyat,adet}=user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const loadUsers = async () => {
            const result = await axios.get("http://localhost:3001/product/" + id);
            setUser(result.data[0]);
        };
        loadUsers();
    }, [id]);


    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/product/${id}`, user).then(()=>{
            setstatus({ type: "success" });
            setTimeout(() => navigate(`/guncelle="success"`), 1000);
        })
        
    };
    

    return (
        <div>
            <Navigation/>
            <div className="container">
                    <div className="w-75 mx-auto shadow p-5 mt-4">
                        <h2 className="text-center mb-4">Ürün Güncelle</h2>
                        <form onSubmit={e=>onSubmit(e)}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-md mb-2"
                                    placeholder="Ürün İsmini Giriniz"
                                    name="urunadi"
                                    value={urunadi}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-md mb-2"
                                    placeholder="Ürün Adedi Giriniz"
                                    name="adet"
                                value={adet}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-md mb-2"
                                    placeholder="Ürün Fiyat Giriniz"
                                    name="fiyat"
                                    value={fiyat}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                            <button className="btn btn-primary btn-block">Ürün Ekle</button>
                        </form>
                    {
                        status.type === 'success' ?
                            <ReactBootStrap.Alert variant='success' className='mt-2 w-100'>
                                Kayıt Başarılı bir şekilde Güncellendi
                            </ReactBootStrap.Alert>
                            :
                            ""
                    }
                    </div>
            </div>
        </div>
    )
}

export default EditUser
