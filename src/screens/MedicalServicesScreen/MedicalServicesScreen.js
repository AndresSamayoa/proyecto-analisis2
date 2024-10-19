import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import MedicalServicesForm from '../../components/MedicalServicesForm/MedicalServicesForm';
import DataTable from '../../components/DataTable/DataTable';
import Searcher from '../../components/Searcher/Searcher';
import TableModal from '../../components/TableModal/TableModal';

const base_url = process.env.REACT_APP_NODE_API_BASE;

export default function MedicalServicesScreen () {
    const tableColumns = [
        {field: 'nombre', text: 'Nombre'},
        {field: 'precio', text: 'Precio'},
        {field: 'local', text: 'Local'},
        {field: 'examen', text: 'Examen'},
        {field: 'acciones', text: 'Acciones'}
    ];

    const cancelarForm = () => {
        setServicioId(0);
        setNombre('');
        setPrecio(0);
        setLocal(true);
        setExamen(false);
        setMensaje('');
    };
    
    const guardarForm = async () => {
        try {
            const errores = [];
            let method;
            let url;

            if (servicioId > 0) {
                method = 'PUT';
                url = base_url + '/api/catalogoProcedimientos/'+servicioId
            } else {
                method = 'POST';
                url = base_url + '/api/catalogoProcedimientos'
            }

            if (!nombre || nombre.length < 1) {
                errores.push('El nombre es un campo obligatorio.');
            }
            if (!precio || precio < 0) {
                errores.push('El precio es un campo obligatorio.');
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
                    nombre: nombre, 
                    precio: Number(precio), 
                    local: local ? 1 : 0, 
                    examen: examen ? 1 : 0, 
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

    const eliminarItem = async (servicioId, buscador, setMensajeParam) => {
        try {
            const response = await axios({
                url: base_url + '/api/catalogoProcedimientos/'+servicioId,
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
            setMensajeParam('Error al eliminar: ' + error.message);
        }
    };

    const buscarData = async (buscador, setMensajeParam) => {
        try {
            const response = await axios({
                url: base_url+'/api/catalogoProcedimientos/buscar',
                method: 'GET',
                params: {
                    parametro: buscador
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200 && response.data.status) {
                const data = [];
                for (const service of response.data.data) {
                    data.push({
                        nombre: service.CPM_nombre,
                        precio: service.CPM_precio,
                        local: !!service.CPM_examen ? 'Si' : 'No',
                        examen: !!service.CPM_local ? 'Si' : 'No',
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setServicioId(service.CPM_id);
                                    setNombre(service.CPM_nombre);
                                    setPrecio(service.CPM_precio);
                                    setExamen(!!service.CPM_examen);
                                    setLocal(!!service.CPM_local);
                                    setIsTableModalOpen(false);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(service.CPM_id, buscador, setMensajeParam)} 
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

    const cerrarModalTabla = () => {
        setIsTableModalOpen(false);
    }

    const [tableData, setTableData] = useState([]);
    const [servicioId, setServicioId] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);
    const [local, setLocal] = useState(true);
    const [examen, setExamen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [buscador, setBuscador] = useState('');
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);

    return <div className="CRUDBasicScreen">
        <div className="TitleContainer">
            <h1>Procedimientos Medicos</h1>
            <i class="bi bi-search openModal" onClick={()=> setIsTableModalOpen(true)}/>
        </div>
        <MedicalServicesForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            setNombre={setNombre}
            setPrecio={setPrecio}
            setExamen={setExamen}
            setLocal={setLocal}

            nombre={nombre}
            precio={precio}
            examen={examen}
            local={local}
            mensaje={mensaje}
        />
        <Modal
            isOpen={isTableModalOpen}
            onRequestClose={cerrarModalTabla}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}

        >
            <TableModal 
                closeModal={cerrarModalTabla}

                setTableData={setTableData}
                buscarData={buscarData}

                placeHolder='Nombre del procedimiento'
                tableColumns={tableColumns}
                tableData={tableData}
            />
        </Modal>
    </div>
};