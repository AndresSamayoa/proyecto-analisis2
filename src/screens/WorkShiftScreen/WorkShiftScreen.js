import { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-modal';

import WorkShiftForm from '../../components/WorkShiftForm/WorkShiftForm';
import TableModal from '../../components/TableModal/TableModal';

const base_url = process.env.REACT_APP_NODE_API_BASE;

export default function WorkShiftScreen () {

    const tableColumns = [
        {field: 'nombre_medico', text: 'Medico'},
        {field: 'horario', text: 'Horario'},
        {field: 'fecha_inicio', text: 'Fecha inicio'},
        {field: 'fecha_fin', text: 'Fecha fin'},
        {field: 'dias', text: 'Dias'},
        {field: 'disponible', text: 'Disponible'},
        {field: 'acciones', text: 'Acciones'}
    ];

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
                setMensaje(`Error al obtener los datos de medico, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos de de medico: ' + error.message);
        }
    }

    const cancelarForm = () => {
        setMedico(0);
        setBuscadorMedico('');
        setTurno(0);
        setHoraInicio('0');
        setHoraFin('0');
        setFechaInicio('');
        setFechaFin('');
        setDisponible(true);
        setLunes(false);
        setMartes(false);
        setMiercoles(false);
        setJueves(false);
        setViernes(false);
        setSabado(false);
        setDomingo(false);
        setBuscador(false);
        setMensaje('');
        console.log('Limpio');
    };

    const cerrarModalTabla = () => {
        setIsTableModalOpen(false);
    }
    
    const guardarForm = async () => {
        try {
            const errores = [];
            let method;
            let url;

            if (turno > 0) {
                method = 'PUT';
                url = base_url + '/api/horarios/' + turno;
            } else {
                method = 'POST';
                url = base_url + '/api/horarios';
            }

            if (!medico || medico < 1) {
                errores.push('El medico es un campo obligatorio.');
            }
            if (!fechaInicio) {
                errores.push('La fecha de inicio es un campo obligatorio.');
            }
            if (!fechaFin) {
                errores.push('La fecha de fin es un campo obligatorio.');
            }
            if (!horaInicio || !(horaInicio >= 0 && horaInicio <= 23) ) {
                errores.push('La hora de inicio debe estar entre 0-23');
            }
            if (!horaFin || !(horaFin >= 0 && horaFin <= 23) ) {
                errores.push('La hora de fin debe estar entre 0-23');
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
                    medi_id: medico,
                    hora_inicio: fechaInicio,
                    hora_fin: fechaFin,
                    hora_hora_inicio: horaInicio,
                    hora_hora_fin: horaFin,
                    hora_disponibilidad: disponible ? 1 : 0,
                    hora_lunes: lunes ? 1 : 0,
                    hora_martes: martes ? 1 : 0,
                    hora_miercoles: miercoles ? 1 : 0,
                    hora_jueves: jueves ? 1 : 0,
                    hora_viernes: viernes ? 1 : 0,
                    hora_sabado: sabado ? 1 : 0,
                    hora_domingo: domingo ? 1 : 0
                  },
                validateStatus: () => true
            });

            if (response.status == 200) {
                cancelarForm();
                setMensaje('Exito al guardar');
            } else {
                setMensaje(`Error al guardar los datos, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al guardar los datos: ' + error.message);
        }
    };

    const eliminarItem = async (turnoId, buscador, setMensajeParam) => {
        try {
            const response = await axios({
                url: base_url + '/api/horarios/' + turnoId,
                method: 'DELETE',
                validateStatus: () => true
            });

            if (response.status == 200) {
                cancelarForm();
                setMensajeParam('Exito al eliminar');
                buscarData(buscador, setMensajeParam);
            } else {
                setMensajeParam('Error al eliminar, codigo: ' + response.status);
            }
        } catch (error) {
            setMensajeParam('Error al eliminar el horario: ' + error.message);
        }
    };

    const loadTableData = async () => {
        try {
            const response = await axios({
                url: base_url+'/HORARIO',
                method: 'GET',
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200) {
                const data = [];
                for (const workShift of response.data) {
                    data.push({
                        id: workShift.hoR_id,
                        nombre_medico: workShift.meD_id,
                        fecha_inicio: workShift.hoR_inicio ? moment(workShift.hoR_inicio).format('DD-MM-YYYY') : '',
                        fecha_fin: workShift.hoR_fin ? moment(workShift.hoR_fin).format('DD-MM-YYYY') : '',
                        horario: String(workShift.hoR_hora_inicio) + '-' + String(workShift.hoR_hora_fin),
                        disponible: workShift.hoR_disponibilidad ? 'Si' : 'No',
                        dias: (
                            (workShift.hoR_lunes ? 'lunes ' : '') +  
                            (workShift.hoR_martes ? 'martes ' : '') +  
                            (workShift.hoR_miercorles ? 'miercorles ' : '') +  
                            (workShift.hoR_jueves ? 'jueves ' : '') +  
                            (workShift.hoR_viernes ? 'viernes ' : '') +  
                            (workShift.hoR_sabado ? 'sabado ' : '') +  
                            (workShift.hoR_domingo ? 'domingo' : '')
                        ),
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setTurno(workShift.hoR_id);
                                    setBuscadorMedico(workShift.meD_id);
                                    setMedico(workShift.meD_id);
                                    setHoraInicio(String(workShift.hoR_hora_inicio));
                                    setHoraFin(String(workShift.hoR_hora_fin));
                                    setFechaInicio(workShift.hoR_inicio ? moment(workShift.hoR_inicio).format('YYYY-MM-DD') : '');
                                    setFechaFin(workShift.hoR_fin ? moment(workShift.hoR_fin).format('YYYY-MM-DD') : '');
                                    setDisponible(!!workShift.hoR_disponibilidad);
                                    setLunes(!!workShift.hoR_lunes);
                                    setMartes(!!workShift.hoR_martes);
                                    setMiercoles(!!workShift.hoR_miercorles);
                                    setJueves(!!workShift.hoR_jueves);
                                    setViernes(!!workShift.hoR_viernes);
                                    setSabado(!!workShift.hoR_sabado);
                                    setDomingo(!!workShift.hoR_domingo);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(workShift.hoR_id)} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    });
                }

                setTableData(data);
            } else {
                setMensaje(`Error al obtener los datos de la tabla, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos de la tabla: ' + error.message);
        }
    };

    const buscarData = async (buscador, setMensajeParam) => {
        try {
            const response = await axios({
                url: base_url+'/api/horarios/buscar',
                method: 'GET',
                params: {
                    parametro: buscador
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200 && response.data.status) {
                const data = [];
                for (const workShift of response.data.data) {
                    data.push({
                        id: workShift.HOR_id,
                        nombre_medico: workShift.MED_nombre + ' ' + workShift.MED_apellido,
                        horario: String(workShift.HOR_hora_inicio) + '-' + String(workShift.HOR_hora_fin),
                        fecha_inicio: workShift.HOR_inicio ? moment(workShift.HOR_inicio).format('DD-MM-YYYY') : '',
                        fecha_fin: workShift.HOR_fin ? moment(workShift.HOR_fin).format('DD-MM-YYYY') : '',
                        disponible: workShift.HOR_disponibilidad ? 'Si' : 'No',
                        dias: (
                            (workShift.HOR_lunes ? 'lunes ' : '') +  
                            (workShift.HOR_martes ? 'martes ' : '') +  
                            (workShift.HOR_miercoles ? 'miercoles ' : '') +  
                            (workShift.HOR_jueves ? 'jueves ' : '') +  
                            (workShift.HOR_viernes ? 'viernes ' : '') +  
                            (workShift.HOR_sabado ? 'sabado ' : '') +  
                            (workShift.HOR_domingo ? 'domingo' : '')
                        ),
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setTurno(workShift.HOR_id);
                                    setBuscadorMedico(workShift.MED_nombre + ' ' + workShift.MED_apellido);
                                    setMedico(workShift.MED_id);
                                    setHoraInicio(String(workShift.HOR_hora_inicio));
                                    setHoraFin(String(workShift.HOR_hora_fin));
                                    setFechaInicio(workShift.HOR_inicio ? moment(workShift.HOR_inicio).format('YYYY-MM-DD') : '');
                                    setFechaFin(workShift.HOR_fin ? moment(workShift.HOR_fin).format('YYYY-MM-DD') : '');
                                    setDisponible(!!workShift.HOR_disponibilidad);
                                    setLunes(!!workShift.HOR_lunes);
                                    setMartes(!!workShift.HOR_martes);
                                    setMiercoles(!!workShift.HOR_miercoles);
                                    setJueves(!!workShift.HOR_jueves);
                                    setViernes(!!workShift.HOR_viernes);
                                    setSabado(!!workShift.HOR_sabado);
                                    setDomingo(!!workShift.HOR_domingo);
                                    setIsTableModalOpen(false);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(workShift.HOR_id, buscador, setMensajeParam)} 
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


    const [tableData, setTableData] = useState([]);
    const [turno, setTurno] = useState(0);
    const [buscadorMedico, setBuscadorMedico] = useState('');
    const [medico, setMedico] = useState('');
    const [listaMedicos, setListaMedicos] = useState([]);
    const [horaInicio, setHoraInicio] = useState('0');
    const [horaFin, setHoraFin] = useState('0');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [disponible, setDisponible] = useState(true);
    const [lunes, setLunes] = useState(false);
    const [martes, setMartes] = useState(false);
    const [miercoles, setMiercoles] = useState(false);
    const [jueves, setJueves] = useState(false);
    const [viernes, setViernes] = useState(false);
    const [sabado, setSabado] = useState(false);
    const [domingo, setDomingo] = useState(false);
    const [buscador, setBuscador] = useState('');
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');

    useEffect(()=> {
        if (buscadorMedico.length > 0) {
            searchMedics(buscadorMedico);
        }
        }, 
        [buscadorMedico]
    );

    return <div className='CRUDBasicScreen'>
        <div className="TitleContainer">
            <h1>Turnos</h1>
            <i class="bi bi-search openModal" onClick={()=> setIsTableModalOpen(true)}/>
        </div>
        <WorkShiftForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            buscadorMedico={buscadorMedico}
            listaMedicos={listaMedicos}
            horaInicio={horaInicio}
            horaFin={horaFin}
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            disponible={disponible}
            lunes={lunes}
            martes={martes}
            miercoles={miercoles}
            jueves={jueves}
            viernes={viernes}
            sabado={sabado}
            domingo={domingo}
            mensaje={mensaje}

            setBuscadorMedico={setBuscadorMedico}
            setMedico={setMedico}
            setListaMedicos={setListaMedicos}
            setHoraInicio={setHoraInicio}
            setHoraFin={setHoraFin}
            setFechaInicio={setFechaInicio}
            setFechaFin={setFechaFin}
            setLunes={setLunes}
            setMartes={setMartes}
            setMiercoles={setMiercoles}
            setJueves={setJueves}
            setViernes={setViernes}
            setSabado={setSabado}
            setDomingo={setDomingo}
            setDisponible={setDisponible}
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

                placeHolder='Nombre o CUI del medico'
                tableColumns={tableColumns}
                tableData={tableData}
            />
        </Modal>
    </div>
}