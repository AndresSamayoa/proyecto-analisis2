import './PatientBasicScreen.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState, useEffect } from 'react';

import PatientForm from '../../components/PatientForm/PatientForm';
import DataTable from '../../components/DataTable/DataTable';

export default function PatientBasicScreen () {
    const tableColumns = [
        {field: 'nombres', text: 'Nombres'},
        {field: 'email', text: 'Email'},
        {field: 'telefono', text: 'Telefono'},
        {field: 'cui', text: 'CUI'},
        {field: 'fecha_nacimiento', text: 'Fecha de nacimiento'},
        {field: 'edad', text: 'Edad'},
        {field: 'medico_cabecera', text: 'Medico de cabecera'},
        {field: 'acciones', text: 'Acciones'}
    ];

    const cancelarForm = () => {
        console.log('Limpio')
        setNombres('')
        setEmail('')
        setTelefono('')
        setCui('')
        setFechaNacimiento('')
        setSexo('')
    };
    
    const guardarForm = () => {
        console.log(nombres,email,telefono,cui,fechaNacimiento,sexo);
    };

    const eliminarItem = (clienteId) => {
        console.log(clienteId)
    };

    const loadTableData = () => {
        setTableData([]);
    };

    const [tableData, setTableData] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [nombres, setNombres] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cui, setCui] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [sexo, setSexo] = useState('');

    useEffect(loadTableData, []);

    return <div className="PatientBasicScreen">
        <div className="TitleContainer">
            <h1>Pacientes</h1>
        </div>
        <PatientForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            setNombres={setNombres}
            setEmail={setEmail}
            setTelefono={setTelefono}
            setCui={setCui}
            setFechaNacimiento={setFechaNacimiento}
            setSexo={setSexo}

            nombres={nombres}
            email={email}
            telefono={telefono}
            cui={cui}
            fechaNacimiento={fechaNacimiento}
            sexo={sexo}
        />
        <DataTable headers={tableColumns} rows={tableData} />
    </div>
};