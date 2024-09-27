import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import moment from 'moment';
import axios from 'axios';

import DataTable from '../../components/DataTable/DataTable';
import MedicalServiceDateForm from '../../components/MedicalServiceDateForm/MedicalServiceDateForm';

const base_url = process.env.REACT_APP_NODE_API_BASE;

export default function DateScreen () {
    const location = useLocation();
    const citaId = location.state.citaId;

    const servicesColumns = [
        {field: 'nombre', text: 'Nombre'},
        {field: 'valor', text: 'Valor'},
        {field: 'acciones', text: 'Acciones'},
    ]
    
    const clearService = () => {
        setServiceDateId(0);
        setServiceId(0);
        setServiceName('');
        setListaServicios([]);
    }

    const closeServiceModal = () => {
        clearService();
        setServicesModal(false);
    }

    const saveService = async () => {
        try {
            const errores = [];
            let method;
            let url;

            if (serviceDateId > 0) {
                method = 'PUT';
                url = base_url + '/api/procedimientos/'+serviceDateId
            } else {
                method = 'POST';
                url = base_url + '/api/procedimientos'
            }

            if (!serviceId || serviceId < 1) {
                errores.push('El el servicio es un campo obligatorio.');
            }

            if (errores.length > 0) {
                let mensajeError = errores.join(' ');
                setServiceMessage(mensajeError)
                return ;
            }

            const response = await axios({
                url,
                method,
                data: {
                    cita_id: citaId,
                    procedimiento_id: serviceId,
                  },
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                clearService();
                getDateInfo();
                setServiceMessage('Exito al guardar');
            } else {
                setServiceMessage(`Error al guardar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setServiceMessage('Error al guardar los datos: ' + error.message);
        }
    }

    const deleteService = async (serviceId) => {
        try {
            const response = await axios({
                url: base_url + '/api/procedimientos/'+serviceId,
                method: 'DELETE',
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                clearService();
                setMensaje('Exito al eliminar');
                getDateInfo();
            } else {
                setMensaje(`'Error al eliminar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al eliminar la cita: ' + error.message);
        }
    }

    const searchService = async () => {
        try {
            const response = await axios({
                url: `${base_url}/api/catalogoProcedimientos/buscar`,
                method: 'GET',
                params: {
                    parametro: serviceName
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status === 200 && response.data.status) {
                const data = [];
                for (const service of response.data.data) {
                    data.push({
                        value: service.CPM_id,
                        label: service.CPM_nombre,
                    });
                }

                setListaServicios(data);
            }
        } catch (error) {
            console.log('Error al obtener los datos de clientes: ' + error.message);
        }
    }

    const getDateInfo = async () => {
        try {
            const response = await axios({
                url: base_url+'/api/citas/detalle/'+citaId,
                method: 'GET',
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200 && response.data.status) {
                const servicesData = [];

                setNombresPaciente(response.data.data.PAC_nombres);
                setNombresMedico(response.data.data.MED_nombres);
                setFechaCita(response.data.data.CIT_fecha ? moment(response.data.data.CIT_fecha).format('DD-MM-YY HH:mm') : '')

                for (const service of response.data.data.procedimientos) {
                    servicesData.push({
                        nombre: service.CPM_nombre,
                        valor: String(service.PRO_valor),
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setServicesModal(true);
                                    setServiceDateId(service.PRO_id);
                                    setServiceId(service.CPM_id);
                                    setServiceName(service.CPM_nombre)
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>deleteService(service.PRO_id)} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    })
                }

                setServicesTable(servicesData);
            } else {
                setMensaje(`Error al obtener los datos de la pantalla, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos de la la pantalla: ' + error.message);
        }
    }

    // Datos general cita
    const [nombresPaciente, setNombresPaciente] = useState('');
    const [nombresMedico, setNombresMedico] = useState('');
    const [fechaCita, setFechaCita] = useState('');
    // Datos procedimientos medicos
    const [servicesTable, setServicesTable] = useState([]);
    const [servicesModal, setServicesModal] = useState(false);
    const [serviceDateId, setServiceDateId] = useState(0);
    const [serviceId, setServiceId] = useState(0);
    const [serviceName, setServiceName] = useState('');
    const [listaServicios, setListaServicios] = useState([]);
    const [serviceMessage, setServiceMessage] = useState('');
    // Signos vitales

    // General pantalla
    const [mensaje, setMensaje] = useState('');

    useEffect(()=>{
        getDateInfo();
    },[])

    useEffect(()=>{
        if (serviceName.length > 0) {
            searchService()
        }
    }, [serviceName]);

    return <div className='CRUDBasicScreen'>
        <div className="TitleContainer">
            <h1>Cita {nombresPaciente} con {nombresMedico} {fechaCita}</h1>
        </div>
        <div className='TableDetailContainer'>
            <div className="TitleContainer">
                <h2>Signos vitales</h2>
                <i class="bi bi-plus-circle openModal" />
            </div>
            <DataTable 
                headers={servicesColumns} rows={servicesTable}
            />
        </div>
        <div className='TableDetailContainer'>
            <div className="TitleContainer">
                <h2>Procedimientos realizados</h2>
                <i class="bi bi-plus-circle openModal" onClick={()=>setServicesModal(true)}/>
            </div>
            <DataTable 
                headers={servicesColumns} rows={servicesTable}
            />
        </div>
        <Modal
            isOpen={servicesModal}
            onRequestClose={closeServiceModal}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <div className='modalDiv'>
                <div className='closeModalDiv'>
                    <i onClick={closeServiceModal} class="bi bi-x closeIcon" />
                </div>
                <MedicalServiceDateForm 
                    setBuscadorServicio={setServiceName}
                    buscadorServicio={serviceName}
                    listaServicios={listaServicios}
                    setServicio={setServiceId}

                    mensaje={serviceMessage}

                    guardarFn={saveService}
                    cancelarFn={clearService}
                />
            </div>
        </Modal>
    </div>
}
