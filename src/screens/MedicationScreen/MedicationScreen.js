import './MedicationScreen.css';

import { useState, useEffect } from 'react';

import MedicationForm from '../../components/MedicationForm/MedicationForm';
import DataTable from '../../components/DataTable/DataTable';
import Searcher from '../../components/Searcher/Searcher';


export default function MedicationScreen (props) {

    const tableColumns = [
        {field: 'nombre', text: 'Nombre'},
        {field: 'comentarios', text: 'Comentarios'},
        {field: 'activa', text: 'Activa'},
        {field: 'acciones', text: 'Acciones'},
    ]

    const cancelarForm = () => {
        setMedicamentoId(0)
        setNombre('')
        setComentario('')
        setActivo(true)
        console.log('Limpio');
    };
    
    const guardarForm = () => {
        console.log(medicamentoId,nombre,comentario,activo);
    };

    const buscarData = () => {
        console.log(buscador);
    }

    const loadTableData = () => {
        setTableData([]);
    };

    const [tableData, setTableData] = useState([]);
    const [medicamentoId, setMedicamentoId] = useState(0);
    const [nombre, setNombre] = useState('');
    const [comentario, setComentario] = useState('');
    const [activo, setActivo] = useState(true);
    const [buscador, setBuscador] = useState('');

    useEffect(loadTableData, []);

    return <div className='MedicationBasicScreen'>
        <div className="TitleContainer">
            <h1>Medicamentos</h1>
        </div>
        <MedicationForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            nombre={nombre}
            comentario={comentario}
            activo={activo}

            setNombre={setNombre}
            setComentario={setComentario}
            setActivo={setActivo}
        />

        <Searcher 
            placeHolder='Nombre'

            param={buscador}
            setParam={setBuscador}

            searchFn={buscarData}
        />

        <DataTable 
            headers={tableColumns}
            rows={tableData}
        />
    </div>
}