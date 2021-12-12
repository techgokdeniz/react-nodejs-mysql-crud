import React,{useState,useEffect} from 'react'
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootStrap from 'react-bootstrap'
import '../styles/custom.scss'
import { Link, useNavigate } from "react-router-dom";

export default function Datatable() {

    const Navigate=useNavigate();
    const [players, setPlayers] = useState([]);
    const [loading, setloading] = useState(false);
    const getPlayerData = async ()=>{
        try{
            const data = await axios.get("http://localhost:3001/product");
            setPlayers(data.data);
            setloading(true);
        } catch(e){
            console.log(e)
        }
    }

    const DeleteUser = (cell) =>{
        axios.delete(`http://localhost:3001/delete/${cell}`).then(()=>{
            getPlayerData();
            Navigate("/");
        })
        
        
    }

    function rankFormatter(cell, row) {
        return (
            <div>
                <ReactBootStrap.FormGroup className='flex'>
                    <Link class="btn btn-warning bt1" to={`/edit/${cell}`}>Update</Link>
                    <Link class="btn btn-danger" onClick={() => DeleteUser(cell)} to="/">Delete</Link>
                    {/*<ReactBootStrap.Button variant="danger" className='btn-md' value={cell} onClick={() => DeleteUser(cell)}>Delete</ReactBootStrap.Button> */}
                </ReactBootStrap.FormGroup>
            </div>
        );
    } 

    function SalesFormatter(cell, row, rowIndex) {
        return (
            <div>
                  {cell}
            </div>
        );
    }

    function Lira(cell, row, rowIndex) {
        return (
            <div>
                <strong style={{ color: 'red' }}>₺ {cell} </strong>
            </div>
        );
    }

    const columns=[
        { dataField: "id", text: "ID"},
        { dataField: "urunadi", text: "Ürün Adı", headerAlign: 'center'},
        { dataField: "adet", text: "Adet", headerAlign: 'center', formatter: SalesFormatter},
        { dataField: "fiyat", text: "Fiyat", headerAlign: 'center', formatter: Lira},
        { dataField: "id", text: "Etkileşim",formatter:rankFormatter}
    ]

    useEffect(() => {
        getPlayerData();
    }, [])

    return (
        <div className='Datatable'>
           {loading ? (
                <BootstrapTable
                    keyField="employeeNumber"
                    data={players}
                    columns={columns}
                    pagination={paginationFactory()}
                />
           ) : (
               <ReactBootStrap.Spinner animation="border"/>
           )}
        </div>
    )
}
