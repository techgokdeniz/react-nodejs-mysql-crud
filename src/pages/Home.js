import React from 'react'
import Datatable from '../components/Datatable'
import Navigation from '../components/Navbar'
import '../styles/Home.scss'

export default function Home() {
    return (
        <div>
            <Navigation/>
            <div className="container">
                <div className="datatable">
                    <Datatable />
                </div>
            </div>
        </div>
    )
}
