
import { useState, useEffect } from 'react';

import WorkBackgroundForm from '../../components/WorkBackgroundForm/WorkBackgroundForm';
import DataTable from '../../components/DataTable/DataTable';


export default function WorkBackgroundScreen (props) {

    const tableColumns = [
        {field: 'empresa', text: 'Empresa'},
        {field: 'puesto', text: 'Puesto'},
        {field: 'fecha_inicio', text: 'Fecha inicio'},
        {field: 'fecha_fin', text: 'Fecha fin'},
        {field: 'accidente_laboral', text: 'Accidente laboral'},
        {field: 'enfermedad_laboral', text: 'Enfermedad laboral'},
        {field: 'acciones', text: 'Acciones'},
    ]

    const cancelarForm = () => {
        setEmpresa('');
        setPuesto('');
        setFechaInicio('');
        setFechaFin('');
        setAccidenteLaboral('');
        setEnfermedadLaboral('');
        console.log('Limpio');
    };
    
    const guardarForm = () => {
        console.log(empresa,puesto,fechaInicio,fechaFin,accidenteLaboral,enfermedadLaboral);
    };

    const loadTableData = () => {
        setTableData([]);
    };

    const [tableData, setTableData] = useState([]);
    const [empresa, setEmpresa] = useState('');
    const [puesto, setPuesto] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [accidenteLaboral, setAccidenteLaboral] = useState('');
    const [enfermedadLaboral, setEnfermedadLaboral] = useState('');

    useEffect(loadTableData, []);

    return <div className='CRUDBasicScreen'>
        <div className="TitleContainer">
            <h1>Historial laboral</h1>
        </div>
        <WorkBackgroundForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            empresa={empresa}
            puesto={puesto}
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            accidenteLaboral={accidenteLaboral}
            enfermedadLaboral={enfermedadLaboral}

            setEmpresa={setEmpresa}
            setPuesto={setPuesto}
            setFechaInicio={setFechaInicio}
            setFechaFin={setFechaFin}
            setAccidenteLaboral={setAccidenteLaboral}
            setEnfermedadLaboral={setEnfermedadLaboral}
        />

        <DataTable 
            headers={tableColumns}
            rows={[]}
        />
    </div>
}