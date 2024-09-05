import './DateScreen.css';

import { useState, useEffect } from 'react'
import Modal from 'react-modal';
import axios from 'axios';
import moment from 'moment';

import DateForm from '../../components/DateForm/DateForm';
import PatientBasicScreen from '../PatientBasic/PatientBasicScreen';
import DataTable from '../../components/DataTable/DataTable';
import Searcher from '../../components/Searcher/Searcher'

const base_url = process.env.REACT_APP_DOT_NET_API_BASE;

export default function DateScreen () {
    Modal.setAppElement('#root');

    const tableColumns = [
        {field: 'nombres_paciente', text: 'Pacientes'},
        {field: 'nombres_medico', text: 'Medicos'},
        {field: 'fecha_cita', text: 'Fecha de cita'},
        {field: 'hora_cita', text: 'Hora de cita'},
        {field: 'estado', text: 'Estado'},
        {field: 'acciones', text: 'Acciones'}
    ];

    const searchPatients = async (param) => {
        try {
            const response = await axios({
                url: base_url+'/Pacientes/fas_buscar_pacientes',
                method: 'GET',
                params: {
                    buscar: param
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status === 200) {
                const data = [];
                for (const patient of response.data) {
                    data.push({
                        value: patient.paC_id,
                        label: patient.paC_nombre + ' ' + patient.paC_apellido,
                    });
                }

                setListaPaciente(data);
            } else {
                setMensaje('Error al obtener los datos de clientes, codigo: ' + response.status);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos de clientes: ' + error.message);
        }
    }

    const searchMedics = async (param) => {
        try {
            const response = await axios({
                url: base_url+'/Medicos/fas_buscar_medicos',
                method: 'GET',
                params: {
                    buscar: param
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status === 200) {
                const data = [];
                for (const patient of response.data) {
                    data.push({
                        value: patient.meD_id,
                        label: patient.meD_nombre + ' ' + patient.meD_apellido,
                    });
                }

                setListaMedicos(data);
            } else {
                setMensaje('Error al obtener los datos de clientes, codigo: ' + response.status);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos de clientes: ' + error.message);
        }
    }

    const listPatients = async () => {
        try {
            const response = await axios({
                url: base_url+'/Pacientes',
                method: 'GET',
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status === 200) {
                const data = [];
                for (const patient of response.data) {
                    data.push({
                        value: patient.paC_id,
                        label: patient.paC_nombre + ' ' + patient.paC_apellido,
                    });
                }

                setListaPaciente(data);
            } else {
                setMensaje('Error al obtener los datos de clientes, codigo: ' + response.status);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos de clientes: ' + error.message);
        }
    }

    const listMedics = async () => {
        try {
            const response = await axios({
                url: base_url+'/Medicos/Read',
                method: 'GET',
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status === 200) {
                const data = [];
                for (const patient of response.data) {
                    data.push({
                        value: patient.meD_id,
                        label: patient.meD_nombre + ' ' + patient.meD_apellido,
                    });
                }

                setListaMedicos(data);
            } else {
                setMensaje('Error al obtener los datos de clientes, codigo: ' + response.status);
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
        setEstado(true);
        setFecha('');
        setHora('');
    };
    
    const guardarForm = async () => {
        try {
            const errores = [];
            let method;
            let url;

            if (citaId > 0) {
                method = 'PUT';
                url = base_url + '/CITAS/Update'
            } else {
                method = 'POST';
                url = base_url + '/CITAS/Create'
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
            }
            console.log((hora >= 0 && hora <= 23))
            if (!hora || !(hora >= 0 && hora <= 23) ) {
                errores.push('La hora debe estar entre 0-23');
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
                    ciT_id: citaId > 0 ? citaId : 0,
                    meD_id: medico,
                    paC_id: paciente,
                    ciT_fecha: moment(fecha).format('YYYY-MM-DD'),
                    ciT_hora: Number(hora),
                    ciT_estado: estado ? 1 : 0
                  },
                validateStatus: () => true
            });

            if (response.status == 200) {
                cancelarForm();
                setMensaje('Exito al guardar');
                await loadTableData();
            } else {
                setMensaje('Error al guardar, codigo: ' + response.status);
            }
        } catch (error) {
            setMensaje('Error al guardar los datos: ' + error.message);
        }
    };

    const eliminarItem = async (citaId) => {
        try {
            const response = await axios({
                url: base_url + '/CITAS/Delete',
                method: 'DELETE',
                params: {
                    Id: citaId
                },
                validateStatus: () => true
            });

            if (response.status == 200) {
                cancelarForm();
                setMensaje('Exito al eliminar');
                await loadTableData();
            } else {
                setMensaje('Error al eliminar, codigo: ' + response.status);
            }
        } catch (error) {
            setMensaje('Error al eliminar la cita: ' + error.message);
        }
    };

    const loadTableData = async () => {
        try {
            const response = await axios({
                url: base_url+'/CITAS',
                method: 'GET',
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200) {
                const data = [];
                for (const date of response.data) {
                    data.push({
                        id: date.ciT_id,
                        nombres_paciente: date.paC_id,
                        nombres_medico: date.meD_id,
                        fecha_cita: date.ciT_fecha ? moment(date.ciT_fecha).format('DD-MM-YYYY') : '',
                        hora_cita: String(date.ciT_hora),
                        estado: date.ciT_estado ? 'Activo' : 'Inactivo',
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setCitaId(date.ciT_id);
                                    setBuscadorPaciente(date.paC_id);
                                    setPaciente(date.paC_id);
                                    setBuscadorMedico(date.meD_id);
                                    setMedico(date.meD_id);
                                    setEstado(date.ciT_estado);
                                    setFecha(date.ciT_fecha ? moment(date.ciT_fecha).format('DD-MM-YYYY') : '');
                                    setHora(String(date.ciT_hora));
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(date.ciT_id)} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    });
                }

                setTableData(data);
                listPatients();
                listMedics();
            } else {
                setMensaje('Error al obtener los datos de la tabla, codigo: ' + response.status);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos de la tabla: ' + error.message);
        }
    };

    const buscarData = async () => {
        try {
            const response = await axios({
                url: base_url+'/CITAS/buscar_citas',
                method: 'GET',
                params: {
                    buscar: buscador
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200) {
                const data = [];
                for (const date of response.data) {
                    data.push({
                        id: date.ciT_id,
                        nombres_paciente: date.paC_id,
                        nombres_medico: date.meD_id,
                        fecha_cita: date.ciT_fecha ? moment(date.ciT_fecha).format('DD-MM-YYYY') : '',
                        hora_cita: String(date.ciT_hora),
                        estado: date.ciT_estado ? 'Activo' : 'Inactivo',
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setCitaId(date.ciT_id);
                                    setBuscadorPaciente(date.paC_id);
                                    setPaciente(date.paC_id);
                                    setBuscadorMedico(date.meD_id);
                                    setMedico(date.meD_id);
                                    setEstado(date.ciT_estado);
                                    setFecha(date.ciT_fecha ? moment(date.ciT_fecha).format('DD-MM-YYYY') : '');
                                    setHora(String(date.ciT_hora));
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(date.ciT_id)} 
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
    }

    const abrirModal = () => {
        setIsModelOpen(true);
    }

    const cerrarModal = () => {
        setIsModelOpen(false);
        loadTableData();
    }

    const [tableData, setTableData] = useState([]);
    const [listaPacientes, setListaPaciente] = useState([]);
    const [listaMedicos, setListaMedicos] = useState([]);
    const [citaId, setCitaId] = useState(0);
    const [buscadorPaciente, setBuscadorPaciente] = useState('');
    const [paciente, setPaciente] = useState(0);
    const [buscadorMedico, setBuscadorMedico] = useState('');
    const [medico, setMedico] = useState(0);
    const [estado, setEstado] = useState(true);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [isModalOpen, setIsModelOpen] = useState(false);
    const [buscador, setBuscador] = useState('');
    const [mensaje, setMensaje] = useState('');
    
    useEffect(()=> {
        loadTableData();
        }, 
        []
    );
    
    useEffect(()=> {
        if (buscadorMedico.length > 0) {
            searchMedics(buscadorMedico);
        } else {
            listMedics()
        }
        }, 
        [buscadorMedico]
    );
    
    useEffect(()=> {
        if (buscadorPaciente.length > 0) {
            searchPatients(buscadorPaciente);   
        } else {
            listPatients()
        }
        }, 
        [buscadorPaciente]
    );

    return <div className='DateBasicScreen'>
        <div className="TitleContainer">
            <h1>Citas</h1>
        </div>
        <DateForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}
            abrirModal={abrirModal}

            buscadorMedico={buscadorMedico}
            listaMedicos={listaMedicos}
            buscadorPaciente={buscadorPaciente}
            listaPacientes={listaPacientes}
            estado={estado}
            fecha={fecha}
            hora={hora}
            mensaje={mensaje}

            setBuscadorMedico={setBuscadorMedico}
            setMedico={setMedico}
            setBuscadorPaciente={setBuscadorPaciente}
            setPaciente={setPaciente}
            setEstado={setEstado}
            setFecha={setFecha}
            setHora={setHora}
        />
        <Searcher 
            placeHolder='Nombre o CUI de paciente o medico'

            param={buscador}
            setParam={setBuscador}

            searchFn={buscarData}
            cancelFn={loadTableData}
        />
        <DataTable headers={tableColumns} rows={tableData} />

        <Modal
            isOpen={isModalOpen}
            onRequestClose={cerrarModal}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}

        >
            <div className='modalDiv'>
                <div className='closeModalDiv'>
                    <i onClick={cerrarModal} class="bi bi-x closeIcon" />
                </div>
                <PatientBasicScreen />
            </div>
        </Modal>
    </div>
}