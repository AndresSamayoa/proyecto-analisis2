import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import moment from 'moment';

import PatientForm from '../../components/PatientForm/PatientForm';
import TableModal from '../../components/TableModal/TableModal';

const base_url = process.env.REACT_APP_NODE_API_BASE;

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
        setMensaje('')
    };
    
    const guardarForm = async () => {
        try {
            const errores = [];
            let method;
            let url;

            if (pacienteId > 0) {
                method = 'PUT';
                url = base_url + '/api/pacientes/'+pacienteId;
            } else {
                method = 'POST';
                url = base_url + '/api/pacientes'
            }

            if (!nombres || nombres.trim().length < 1) {
                errores.push('El nombre es un campo obligatorio.');
            }
            if (!apellidos || apellidos.trim().length < 1) {
                errores.push('El apellido es un campo obligatorio.');
            }
            if (!cui || cui.trim().length != 13) {
                errores.push('El cui es un campo obligatorio y debe ser de 13 caracteres.');
            }
            console.log(typeof telefono)
            if (!telefono || telefono.trim().length != 8) {
                errores.push('El telefono es un campo obligatorio y debe ser de 8 caracteres.');
            }
            if (!fechaNacimiento) {
                errores.push('La fecha de nacimiento es un campo obligatorio.');
            }
            if (!email || !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))) {
                errores.push('El email debe tener un formato valido (xxx@xx.xx).');
            }

            if (errores.length > 0) {
                let mensajeError = errores.join(' ');
                setMensaje(mensajeError)
                return ;
            }

            const response = await axios({
                url,
                method,
                data: {
                    nombres: nombres.trim(),
                    apellidos: apellidos.trim(),
                    cui: cui.trim(),
                    fecha_nacimiento: fechaNacimiento,
                    numero_telefono: telefono.trim(),
                    correo_electronico: email.trim().toLowerCase()
                },
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                cancelarForm();
                setMensaje(response.data.message);
                setTableData([]);
            } else {
                setMensaje(`Error al guardar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al guardar los datos: ' + error.message);
        }
    };

    const eliminarItem = async (clienteId, param, setMessageParam) => {
        try {
            const response = await axios({
                url: `${base_url}/api/pacientes/${clienteId}`,
                method: 'DELETE',
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                cancelarForm();
                setMessageParam('Exito al eliminar');
                await buscarData(param, setMessageParam);
            } else {
                setMessageParam(`Error al guardar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMessageParam('Error al eliminar el cliente: ' + error.message);
        }
    };

    const buscarData = async (param, setMessageParam) => {
        try {
            const response = await axios({
                url: `${base_url}/api/pacientes/buscar`,
                method: 'GET',
                params: {
                    parametro: param
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200 && response.data.status) {
                const data = [];
                for (const patient of response.data.data) {
                    data.push({
                        id: patient.PAC_id,
                        nombresCompletos: patient.PAC_nombre + ' ' + patient.PAC_apellido,
                        nombres: patient.PAC_nombre,
                        apellidos: patient.PAC_apellido,
                        cui: patient.PAC_CUI,
                        fecha_nacimiento: patient.PAC_fecha_nacimiento ? moment(patient.PAC_fecha_nacimiento).format('DD-MM-YYYY') : '',
                        edad: patient.PAC_fecha_nacimiento ? moment().diff(moment(patient.PAC_fecha_nacimiento), 'years').toString() : '',
                        telefono: String(patient.PAC_numero_telefonico),
                        email: patient.PAC_correo_electronico,
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setPacienteId(patient.PAC_id);
                                    setNombres(patient.PAC_nombre);
                                    setApellidos(patient.PAC_apellido);
                                    setEmail(patient.PAC_correo_electronico);
                                    setTelefono(String(patient.PAC_numero_telefonico));
                                    setCui(patient.PAC_CUI);
                                    setFechaNacimiento(patient.PAC_fecha_nacimiento ? moment(patient.PAC_fecha_nacimiento).format('YYYY-MM-DD') : '');
                                    setIsTableModalOpen(false);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(patient.PAC_id, param, setMessageParam)} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    });
                }

                setTableData(data);
            } else {
                setMessageParam(`Error al guardar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMessageParam('Error al buscar los datos de la tabla: ' + error.message);
        }
    }

    const cerrarModalTabla = () => {
        setIsTableModalOpen(false);
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
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);

    return <div className="CRUDBasicScreen">
        <div className="TitleContainer">
            <h1>Pacientes</h1>
            <i class="bi bi-search openModal" onClick={()=> setIsTableModalOpen(true)}/>
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

            pacienteId={pacienteId}
            nombres={nombres}
            apellidos={apellidos}
            email={email}
            telefono={telefono}
            cui={cui}
            fechaNacimiento={fechaNacimiento}
            sexo={sexo}
            mensaje={mensaje}
        />
        <Modal
            isOpen={isTableModalOpen}
            onRequestClose={cerrarModalTabla}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}

        >
            <TableModal 
                closeModal={() => setIsTableModalOpen(false)}

                setTableData={setTableData}
                buscarData={buscarData}

                placeHolder='Nombre o CUI de paciente'
                tableColumns={tableColumns}
                tableData={tableData}
            />
        </Modal>
    </div>
};