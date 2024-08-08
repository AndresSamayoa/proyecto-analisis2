import './UserBasicScreen.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState, useEffect } from 'react';

import UserForm from '../../components/UserForm/UserForm';
import DataTable from '../../components/DataTable/DataTable';
import Searcher from '../../components/Searcher/Searcher'

export default function UserBasicScreen () {
    const tableColumns = [
        {field: 'nombres', text: 'Nombres'},
        {field: 'email', text: 'Email'},
        {field: 'telefono', text: 'Telefono'},
        {field: 'cui', text: 'CUI'},
        {field: 'tipo', text: 'Tipo'},
        {field: 'numero_colegiado', text: 'Numero de colegiado'},
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
        console.log(usuarioId,nombres,email,telefono,cui,fechaNacimiento,sexo,rol,numeroColegiado);
    };

    const eliminarItem = (clienteId) => {
        console.log(clienteId)
    };

    const loadTableData = () => {
        setTableData([]);
    };

    const buscarData = () => {
        console.log(buscador)
    }

    const [tableData, setTableData] = useState([]);
    const [usuarioId, setUsuarioId] = useState('');
    const [nombres, setNombres] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cui, setCui] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [sexo, setSexo] = useState('');
    const [rol, setRol] = useState('');
    const [numeroColegiado, setNumeroColegiado] = useState('');
    const [buscador, setBuscador] = useState('');

    useEffect(loadTableData, []);

    return <div className="UserBasicScreen">
        <div className="TitleContainer">
            <h1>Usuarios</h1>
        </div>
        <UserForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            setNombres={setNombres}
            setEmail={setEmail}
            setTelefono={setTelefono}
            setCui={setCui}
            setFechaNacimiento={setFechaNacimiento}
            setSexo={setSexo}
            setRol={setRol}
            setNumeroColegiado={setNumeroColegiado}

            nombres={nombres}
            email={email}
            telefono={telefono}
            cui={cui}
            fechaNacimiento={fechaNacimiento}
            sexo={sexo}
            rol={rol}
            numeroColegiado={numeroColegiado}
        />
        <Searcher 
            placeHolder='Nombre o CUI del usuario'

            param={buscador}
            setParam={setBuscador}

            searchFn={buscarData}
        />
        <DataTable headers={tableColumns} rows={tableData} />
    </div>
};