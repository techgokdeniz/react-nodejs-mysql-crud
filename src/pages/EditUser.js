import React from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../components/Navbar'


function EditUser() {

    const {id}=useParams();

    return (
        <div>
            <Navigation/>
            <p>Edit Page : {id} </p>
        </div>
    )
}

export default EditUser
