import './PatientBasicScreen.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import PatientForm from '../../components/PatientForm/PatientForm';
import DataTable from '../../components/DataTable/DataTable';
import Searcher from '../../components/Searcher/Searcher'

const base_url = process.env.REACT_APP_DOT_NET_API_BASE;

export default function PatientBasicScreen () {
    const tableColumns = [
        {field: 'nombresCompletos', text: 'Nombres'},
        {field: 'email', text: 'Email'},
        {field: 'telefono', text: 'Telefono'},
        {field: 'cui', text: 'CUI'},
        {field: 'fecha_nacimiento', text: 'Fecha de nacimiento'},
        {field: 'edad', text: 'Edad'},
        {field: 'acciones', text: 'Acciones'}
    ];

    const cancelarForm = () => {
        console.log('Limpio')
        setPacienteId(0)
        setNombres('')
        setApellidos('')
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

    const loadTableData = async () => {
        try {
            const response = await axios({
                url: base_url+'/api/CLI_PACIENTES',
                method: 'GET',
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200) {
                const data = [];
                for (const patient of response.data) {
                    data.push({
                        id: patient.paC_id,
                        nombresCompletos: patient.paC_nombre + ' ' + patient.paC_apellido,
                        nombres: patient.paC_nombre,
                        apellidos: patient.paC_apellido,
                        cui: patient.paC_CUI,
                        fecha_nacimiento: patient.paC_fecha_nacimiento ? moment(patient.paC_fecha_nacimiento).format('DD-MM-YYYY') : '',
                        edad: patient.paC_fecha_nacimiento ? moment().diff(moment(patient.paC_fecha_nacimiento), 'years') : '',
                        telefono: patient.paC_numero_telefonico,
                        email: patient.paC_correo_electronico,
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setPacienteId(patient.paC_id);
                                    setNombres(patient.paC_nombre);
                                    setApellidos(patient.paC_apellido);
                                    setEmail(patient.paC_correo_electronico);
                                    setTelefono(patient.paC_numero_telefonico);
                                    setCui(patient.paC_CUI);
                                    setFechaNacimiento(patient.paC_fecha_nacimiento ? moment(patient.paC_fecha_nacimiento).format('YYYY-MM-DD') : '');
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(patient.paC_id)} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    });
                }

                setTableData(data);
            } else {
                setMensaje('Error al obtener los datos de la tabla, codigo: ' + response.status);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos de la tabla: ' + error.message);
        }
    };

    const buscarData = () => {
        console.log(buscador)
    }

    const [tableData, setTableData] = useState([]);
    const [pacienteId, setPacienteId] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cui, setCui] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [sexo, setSexo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [buscador, setBuscador] = useState('');

    useEffect(()=>loadTableData, []);

    return <div className="PatientBasicScreen">
        <div className="TitleContainer">
            <h1>Pacientes</h1>
        </div>
        <PatientForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            setNombres={setNombres}
            setApellidos={setApellidos}
            setEmail={setEmail}
            setTelefono={setTelefono}
            setCui={setCui}
            setFechaNacimiento={setFechaNacimiento}
            setSexo={setSexo}

            nombres={nombres}
            apellidos={apellidos}
            email={email}
            telefono={telefono}
            cui={cui}
            fechaNacimiento={fechaNacimiento}
            sexo={sexo}
            mensaje={mensaje}
        />
        <Searcher 
            placeHolder='Nombre o CUI de paciente'

            param={buscador}
            setParam={setBuscador}

            searchFn={buscarData}
        />
        <DataTable headers={tableColumns} rows={tableData} />
    </div>
};