import { useState, useEffect } from 'react';

import MedicalServicesForm from '../../components/MedicalServicesForm/MedicalServicesForm';
import DataTable from '../../components/DataTable/DataTable';
import Searcher from '../../components/Searcher/Searcher'

export default function MedicalServicesScreen () {
    const tableColumns = [
        {field: 'nombre', text: 'Nombre'},
        {field: 'activo', text: 'Activo'},
        {field: 'local', text: 'Local'},
        {field: 'acciones', text: 'Acciones'}
    ];

    const cancelarForm = () => {
        setNombre('')
        setActivo(false)
        setLocal(true)
        console.log('Limpio');
    };
    
    const guardarForm = () => {
        console.log(nombre,activo,local);
    };

    const eliminarItem = (servicioId) => {
        console.log(servicioId)
    };

    const loadTableData = () => {
        setTableData([]);
    };

    const buscarData = () => {
        console.log(buscador)
    }

    const [tableData, setTableData] = useState([]);
    const [servicioId, setServicioId] = useState('');
    const [nombre, setNombre] = useState('');
    const [activo, setActivo] = useState(false);
    const [local, setLocal] = useState(true);
    const [buscador, setBuscador] = useState('');

    useEffect(loadTableData, []);

    return <div className="CRUDServiceScreen">
        <div className="TitleContainer">
            <h1>Servicios Medicos</h1>
        </div>
        <MedicalServicesForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            setNombre={setNombre}
            setActivo={setActivo}
            setLocal={setLocal}

            nombre={nombre}
            activo={activo}
            local={local}
        />
        <Searcher 
            placeHolder='Nombre'

            param={buscador}
            setParam={setBuscador}

            searchFn={buscarData}
        />
        <DataTable headers={tableColumns} rows={tableData} />
    </div>
};