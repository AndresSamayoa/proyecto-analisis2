import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import DiseaseForm from '../../components/DiseaseForm/DiseaseForm';
import TableModal from '../../components/TableModal/TableModal';

const base_url = process.env.REACT_APP_NODE_API_BASE;

export default function DiseaseScreen () {
    const tableColumns = [
        {field: 'nombre', text: 'Nombres'},
        {field: 'tipo', text: 'Tipo'},
        {field: 'descripcion', text: 'Descripcion'},
        {field: 'acciones', text: 'Acciones'}
    ];

    const cancelarForm = () => {
        console.log('Limpio')
        setEnfermedadId(0)
        setNombre('')
        setTipo('')
        setDescripcion('')
        setMensaje('')
    };
    
    const guardarForm = async () => {
        try {
            const errores = [];
            let method;
            let url;

            if (enfermedadId > 0) {
                method = 'PUT';
                url = base_url + '/api/Enfermedades/'+enfermedadId
            } else {
                method = 'POST';
                url = base_url + '/api/Enfermedades'
            }

            if (!nombre || nombre.trim().length < 1) {
                errores.push('El nombre es un campo obligatorio.');
            }
            if (!tipo || tipo.trim().length < 1) {
                errores.push('El tipo es un campo obligatorio.');
            }
            if (!descripcion || descripcion.trim().length < 1) {
                errores.push('La descripcion es un campo obligatorio.');
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
                    nombre: nombre.trim(),
                    descripcion: descripcion.trim(),
                    tipoenfermedad: tipo.trim()
                },
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                cancelarForm();
                setMensaje('Exito al guardar');
                setTableData([]);
            } else {
                setMensaje(`Error al guardar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al guardar los datos: ' + error.message);
        }
    };

    const eliminarItem = async (enfermedadId, param, setMessageParam) => {
        try {
            const response = await axios({
                url: base_url + '/api/Enfermedades/'+enfermedadId,
                method: 'DELETE',
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                cancelarForm();
                setMensaje('Exito al guardar');
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
                url: base_url+'/api/Enfermedades/buscar',
                method: 'GET',
                params: {
                    parametro: param
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200 && response.data.status) {
                const data = [];
                for (const disease of response.data.data) {
                    data.push({
                        id: disease.ENF_id,
                        nombre: disease.ENF_nombre,
                        descripcion: disease.ENF_descripcion,
                        tipo: disease.ENF_tipo_enfermedad,
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setEnfermedadId(disease.ENF_id);
                                    setNombre(disease.ENF_nombre);
                                    setDescripcion(disease.ENF_descripcion);
                                    setTipo(disease.ENF_tipo_enfermedad);
                                    setIsTableModalOpen(false);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(disease.ENF_id, param, setMessageParam)} 
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
    const [enfermedadId, setEnfermedadId] = useState('');
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);

    return <div className="CRUDBasicScreen">
        <div className="TitleContainer">
            <h1>Enfermedades</h1>
            <i class="bi bi-search openModal" onClick={()=> setIsTableModalOpen(true)}/>
        </div>
        <DiseaseForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            setNombre={setNombre}
            setTipo={setTipo}
            setDescripcion={setDescripcion}

            nombre={nombre}
            tipo={tipo}
            descripcion={descripcion}
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

                placeHolder='Nombre o CUI de paciente o medico'
                tableColumns={tableColumns}
                tableData={tableData}
            />
        </Modal>
    </div>
};