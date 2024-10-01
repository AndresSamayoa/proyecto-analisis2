import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Modal from 'react-modal';
import moment from 'moment';
import axios from 'axios';

import DataTable from '../../components/DataTable/DataTable';
import MedicalServiceDateForm from '../../components/MedicalServiceDateForm/MedicalServiceDateForm';
import VitalSignsForm from '../../components/VitalSignsForm/VitalSignsForm';

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

    const saveSignosVitales = async () => {
        try {
            if (estadoCita != 'Atendida') {
                return setMensaje('No se puede modificar la cita si no ha sido atendida o fue cerrada.');
            }

            const errores = [];
            let method;
            let url;

            if (signoVitalId > 0) {
                method = 'PUT';
                url = base_url + '/api/Signosvitales/'+signoVitalId
            } else {
                method = 'POST';
                url = base_url + '/api/Signosvitales'
            }

            if (!presionArterial || presionArterial.length < 1) {
                errores.push('La presion arterial es un campo obligatorio.');
            }

            if (!temperatura || temperatura.length < 1) {
                errores.push('La temperatura es un campo obligatorio.');
            }

            if (!frecuenciaCardiaca || frecuenciaCardiaca.length < 1) {
                errores.push('La frecuencia cardiaca es un campo obligatorio.');
            }

            if (!respiraciones || respiraciones.length < 1) {
                errores.push('Las respiraciones por minuto es un campo obligatorio.');
            }

            if (!so2 || so2.length < 1) {
                errores.push('La oxigenacion es un campo obligatorio.');
            }

            if (!glucosa || glucosa.length < 1) {
                errores.push('La glucosa es un campo obligatorio.');
            }

            if (!peso || peso.length < 1) {
                errores.push('El peso es un campo obligatorio.');
            }

            if (!estatura || estatura.length < 1) {
                errores.push('La estatura es un campo obligatorio.');
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
                    presion_arterial: presionArterial,
                    temperatura: temperatura,
                    frecuenciacardiaca: frecuenciaCardiaca,
                    respiraciones: respiraciones,
                    oxigenacion: so2,
                    glucosa: glucosa,
                    peso: peso,
                    estatura: estatura,
                  },
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                getDateInfo();
                setMensaje('Exito al guardar los signos vitales');
            } else {
                setMensaje(`Error al guardar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al guardar los datos: ' + error.message);
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

    const updateNextState = async () => {
        try {
            let url;

            if (estadoCita === 'Programada') {
                url = base_url + '/api/citas/atender/'+ citaId
            } else if (estadoCita === 'Atendida') {
                url = base_url + '/api/citas/cerrar/'+ citaId
            }

            const response = await axios({
                url,
                method: 'PUT',
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                getDateInfo();
                setMensaje('Exito al actualizar el estado');
            } else {
                setMensaje(`Error al actualizar el estado, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al actualizar el estado: ' + error.message);
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
                setEstadoCita(response.data.data.CIT_estado);
                setTotalCita(response.data.data.CIT_costo_total);

                // Generate service table
                for (const service of response.data.data.procedimientos) {
                    servicesData.push({
                        nombre: service.CPM_nombre,
                        valor: String(service.PRO_valor),
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    if (estadoCita == 'Atendida') {
                                        setServicesModal(true);
                                        setServiceDateId(service.PRO_id);
                                        setServiceId(service.CPM_id);
                                        setServiceName(service.CPM_nombre);
                                    } else 
                                        setMensaje('No se puede modificar la cita si no ha sido atendida o fue cerrada.');
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>{
                                    if (estadoCita == 'Atendida')
                                        deleteService(service.PRO_id)
                                    else
                                        setMensaje('No se puede modificar la cita si no ha sido atendida o fue cerrada.');
                                }} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    })
                }

                setServicesTable(servicesData);

                // Get vital signs data
                if (response.data.data.signosVitales) {
                    setSignoVitalId(response.data.data.signosVitales.SIG_id);
                    setPresionArterial(response.data.data.signosVitales.SIG_presion_arterial);
                    setTemperatura(response.data.data.signosVitales.SIG_temperatura);
                    setFrecuenciaCardiaca(response.data.data.signosVitales.SIG_frecuencia_cardiaca);
                    setRespiraciones(response.data.data.signosVitales.SIG_respiraciones);
                    setSo2(response.data.data.signosVitales.SIG_oxigenacion);
                    setGlucosa(response.data.data.signosVitales.SIG_glucosa);
                    setPeso(response.data.data.signosVitales.SIG_peso);
                    setEstatura(response.data.data.signosVitales.SIG_estatura);
                }
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
    const [estadoCita, setEstadoCita] = useState('');
    const [totalCita, setTotalCita] = useState(0);
    // Datos procedimientos medicos
    const [servicesTable, setServicesTable] = useState([]);
    const [servicesModal, setServicesModal] = useState(false);
    const [serviceDateId, setServiceDateId] = useState(0);
    const [serviceId, setServiceId] = useState(0);
    const [serviceName, setServiceName] = useState('');
    const [listaServicios, setListaServicios] = useState([]);
    const [serviceMessage, setServiceMessage] = useState('');
    // Signos vitales
    const [signoVitalId, setSignoVitalId] = useState(0)
    const [presionArterial, setPresionArterial] = useState('')
    const [temperatura, setTemperatura] = useState('')
    const [frecuenciaCardiaca, setFrecuenciaCardiaca] = useState('')
    const [respiraciones, setRespiraciones] = useState('')
    const [so2, setSo2] = useState('')
    const [glucosa, setGlucosa] = useState('')
    const [peso, setPeso] = useState('')
    const [estatura, setEstatura] = useState('')
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
        <div className="TableDetailContainer">
            <p>Estado: {estadoCita}</p>
            <button
                className='SearcherBtn' 
                onClick={updateNextState}
            >
                {estadoCita == 'Programada' ? 'Atendida': 'Completada'}
            </button>
            {
                estadoCita === 'Completada' &&
                <div>
                    <p>Total a pagar: {totalCita}</p>
                    <Link to='/' target='_blank'>Ver detalle del pago</Link>
                </div>
            }
        </div>
        <div className='messageContainer'>
                <p>{mensaje}</p>
        </div>
        <div className='TableDetailContainer'>
            <div className="TitleContainer">
                <h2>Signos vitales</h2>
            </div>
            <VitalSignsForm
                guardarFn={saveSignosVitales}

                presionArterial={presionArterial}
                temperatura={temperatura}
                frecuenciaCardiaca={frecuenciaCardiaca}
                respiraciones={respiraciones}
                so2={so2}
                glucosa={glucosa}
                peso={peso}
                estatura={estatura}

                setPresionArterial={setPresionArterial}
                setTemperatura={setTemperatura}
                setFrecuenciaCardiaca={setFrecuenciaCardiaca}
                setRespiraciones={setRespiraciones}
                setSo2={setSo2}
                setGlucosa={setGlucosa}
                setPeso={setPeso}
                setEstatura={setEstatura}
            />
        </div>
        <div className='TableDetailContainer'>
            <div className="TitleContainer">
                <h2>Procedimientos realizados</h2>
                <i 
                    class="bi bi-plus-circle openModal"
                    onClick={()=>{
                        if (estadoCita == 'Atendida') 
                            setServicesModal(true);
                        else 
                        setMensaje('No se puede modificar la cita si no ha sido atendida o fue cerrada.');
                    }}
                />
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
