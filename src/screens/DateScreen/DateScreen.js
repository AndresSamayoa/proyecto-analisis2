import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import moment from 'moment';

import DateForm from '../../components/DateForm/DateForm';
import PatientBasicScreen from '../PatientBasic/PatientBasicScreen';
import TableModal from '../../components/TableModal/TableModal';

const base_url = process.env.REACT_APP_NODE_API_BASE;
const base_url_dot_net = process.env.REACT_APP_DOT_NET_API_BASE;

export default function DateScreen () {
    Modal.setAppElement('#root');

    const tableColumns = [
        {field: 'nombres_paciente', text: 'Pacientes'},
        {field: 'nombres_medico', text: 'Medicos'},
        {field: 'fecha_cita', text: 'Fecha de cita'},
        {field: 'estado', text: 'Estado'},
        {field: 'acciones', text: 'Acciones'}
    ];

    const searchPatients = async (param) => {
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

            if (response.status === 200 && response.data.status) {
                const data = [];
                for (const patient of response.data.data) {
                    data.push({
                        value: patient.PAC_id,
                        label: patient.PAC_nombre + ' ' + patient.PAC_apellido,
                    });
                }

                setListaPaciente(data);
            } else {
                setMensaje(`Error al obtener los datos de clientes, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos de clientes: ' + error.message);
        }
    }

    const searchMedics = async (param) => {
        try {
            const response = await axios({
                url: base_url+'/api/medicos/buscar',
                method: 'GET',
                params: {
                    parametro: param
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status === 200 && response.data.status) {
                const data = [];
                for (const patient of response.data.data) {
                    data.push({
                        value: patient.MED_id,
                        label: patient.MED_nombre + ' ' + patient.MED_apellido,
                    });
                }

                setListaMedicos(data);
            } else {
                setMensaje(`Error al obtener los datos de clientes, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos de clientes: ' + error.message);
        }
    }

    const cancelarForm = () => {
        setCitaId(0);
        setBuscadorPaciente('');
        setPaciente(0);
        setBuscadorMedico('');
        setMedico(0);
        setFecha('');
        setHora('');
        setMensaje('');
    };
    
    const guardarForm = async () => {
        try {
            const errores = [];
            let method;
            let url;
            let fechaEnvio ;

            if (citaId > 0) {
                method = 'PUT';
                url = base_url + '/api/citas/'+citaId
            } else {
                method = 'POST';
                url = base_url + '/api/citas'
            }

            if (!medico || medico < 1) {
                errores.push('El medico es un campo obligatorio.');
            }
            console.log(paciente);
            if (!paciente || paciente < 1) {
                errores.push('El paciente es un campo obligatorio.');
            }
            if (!fecha) {
                errores.push('La fecha de la cita es un campo obligatorio.');
            } else {
                fechaEnvio = (moment(start).add(remainder, "minutes").format("YYYY-MM-DD hh:mm:00"));
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
                    medico_id: medico,
                    paciente_id: paciente,
                    fecha: fechaEnvio,
                  },
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                cancelarForm();
                setMensaje('Exito al guardar');
            } else {
                setMensaje(`Error al guardar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al guardar los datos: ' + error.message);
        }
    };

    const eliminarItem = async (citaId, buscador, setMensajeParam) => {
        try {
            const response = await axios({
                url: base_url + '/api/citas/'+citaId,
                method: 'DELETE',
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                cancelarForm();
                setMensajeParam('Exito al eliminar');
                buscarData(buscador, setMensajeParam);
            } else {
                setMensajeParam(`'Error al eliminar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensajeParam('Error al eliminar la cita: ' + error.message);
        }
    };

    const buscarData = async (buscador, setMensajeParam) => {
        try {
            const response = await axios({
                url: base_url+'/api/citas/buscar',
                method: 'GET',
                params: {
                    parametro: buscador
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200 && response.data.status) {
                const data = [];
                for (const date of response.data.data) {
                    data.push({
                        id: date.CIT_id,
                        nombres_paciente: date.PAC_nombre + ' ' + date.PAC_apellido,
                        nombres_medico: date.MED_nombre + ' ' + date.MED_apellido,
                        fecha_cita: date.CIT_fecha ? moment(date.CIT_fecha).format('DD-MM-YYYY HH:mm') : '',
                        estado: date.CIT_estado,
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setCitaId(date.CIT_id);
                                    setBuscadorPaciente(date.PAC_nombre + ' ' + date.PAC_apellido);
                                    setPaciente(date.PAC_id);
                                    setBuscadorMedico(date.MED_nombre + ' ' + date.MED_apellido);
                                    setMedico(date.MED_id);
                                    setFecha(date.CIT_fecha ? moment(date.CIT_fecha).format('DD-MM-YYYY HH:mm') : '');
                                    setIsTableModalOpen(false);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(date.CIT_id, buscador, setMensajeParam)} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    });
                }

                setTableData(data);
            } else {
                setMensajeParam(`Error al obtener los datos de la tabla, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensajeParam('Error al obtener los datos de la tabla: ' + error.message);
        }
    }

    const abrirModalPacientes = () => {
        setIsPacientesModalOpen(true);
        console.log(isPacientesModalOpen);
    }

    const cerrarModalPacientes = () => {
        setIsPacientesModalOpen(false);
    }
    
    const cerrarModalTabla = () => {
        setIsTableModalOpen(false);
    }

    const [tableData, setTableData] = useState([]);
    const [listaPacientes, setListaPaciente] = useState([]);
    const [listaMedicos, setListaMedicos] = useState([]);
    const [citaId, setCitaId] = useState(0);
    const [buscadorPaciente, setBuscadorPaciente] = useState('');
    const [paciente, setPaciente] = useState(0);
    const [buscadorMedico, setBuscadorMedico] = useState('');
    const [medico, setMedico] = useState(0);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [isPacientesModalOpen, setIsPacientesModalOpen] = useState(false);
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    
    useEffect(()=> {
        if (buscadorMedico.length > 0) {
            searchMedics(buscadorMedico);
        }
        }, 
        [buscadorMedico]
    );
    
    useEffect(()=> {
        if (buscadorPaciente.length > 0) {
            searchPatients(buscadorPaciente);   
        }
        }, 
        [buscadorPaciente]
    );

    return <div className='CRUDBasicScreen'>
        <div className="TitleContainer">
            <h1>Citas</h1>
            <i class="bi bi-search openModal" onClick={()=> setIsTableModalOpen(true)}/>
        </div>
        <DateForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}
            abrirModal={abrirModalPacientes}

            buscadorMedico={buscadorMedico}
            listaMedicos={listaMedicos}
            buscadorPaciente={buscadorPaciente}
            listaPacientes={listaPacientes}
            fecha={fecha}
            hora={hora}
            mensaje={mensaje}

            setBuscadorMedico={setBuscadorMedico}
            setMedico={setMedico}
            setBuscadorPaciente={setBuscadorPaciente}
            setPaciente={setPaciente}
            setFecha={setFecha}
            setHora={setHora}
        />

        <Modal
            isOpen={isPacientesModalOpen}
            onRequestClose={cerrarModalPacientes}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}

        >
            <div className='modalDiv'>
                <div className='closeModalDiv'>
                    <i onClick={cerrarModalPacientes} class="bi bi-x closeIcon" />
                </div>
                <PatientBasicScreen />
            </div>
        </Modal>
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

                placeHolder='Nombre o CUI de paciente o medico'
                tableColumns={tableColumns}
                tableData={tableData}
            />
        </Modal>
    </div>
}