import React,{useState,useEffect} from 'react'
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootStrap from 'react-bootstrap'
import '../styles/custom.scss'

export default function Datatable() {

    const [players, setPlayers] = useState([]);
    const [loading, setloading] = useState(false);
    const getPlayerData = async ()=>{
        try{
            const data = await axios.get("http://localhost:3001/product");
            console.log(data);
            setPlayers(data.data);
            setloading(true);
        } catch(e){
            console.log(e)
        }
    }

    const DeleteUser = (cell) =>{
        alert(`test ${cell}`);
    }

    function rankFormatter(cell, row) {
        return (
            <div className='buttons'>
                    <ReactBootStrap.Button variant="warning" href={`/edit/${cell}`} value={cell}>Edit</ReactBootStrap.Button>
                    <ReactBootStrap.Button variant="danger" href={`/delete/${cell}`} value={cell} onClick={()=>DeleteUser(cell)}>Delete</ReactBootStrap.Button>    
                
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

    const columns=[
        { dataField: "id", text: "ID"},
        { dataField: "urunadi", text: "Ürün Adı", headerAlign: 'center'},
        { dataField: "adet", text: "Adet", headerAlign: 'center', formatter: SalesFormatter},
        { dataField: "fiyat", text: "Fiyat", headerAlign: 'center'},
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
