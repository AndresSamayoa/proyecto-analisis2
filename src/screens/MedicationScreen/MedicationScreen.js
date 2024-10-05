
import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import MedicationForm from '../../components/MedicationForm/MedicationForm';
import TableModal from '../../components/TableModal/TableModal';

const base_url = process.env.REACT_APP_NODE_API_BASE;


export default function MedicationScreen (props) {

    const tableColumns = [
        {field: 'nombre', text: 'Nombre'},
        {field: 'descripcion', text: 'Descripcion'},
        {field: 'acciones', text: 'Acciones'},
    ]

    const cancelarForm = () => {
        setMedicamentoId(0)
        setNombre('')
        setDescripcion('')
        setPrecio(0)
        setMensaje('')
        console.log('Limpio');
    };
    
    const guardarForm = async () => {
        try {
            const errores = [];
            let method;
            let url;

            if (medicamentoId > 0) {
                method = 'PUT';
                url = base_url + '/api/medicamentos/'+medicamentoId
            } else {
                method = 'POST';
                url = base_url + '/api/medicamentos'
            }

            if (!nombre || nombre.trim().length < 1) {
                errores.push('El nombre es un campo obligatorio.');
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
                    nombre_medicamento: nombre.trim(),
                    descripcion: descripcion.trim(),
                    med_precio: Number(precio).toFixed(2)
                },
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                cancelarForm();
                setMensaje('Exito al guardar');
                setTableData([]);
            } else {
                setMensaje(`Error al guardar, codigo:  ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al guardar los datos: ' + error.message);
        }
    };

    const eliminarItem = async (medicamentoId, searchParam, setMessageParam) => {
        try {
            const response = await axios({
                url: base_url + '/api/medicamentos/' + medicamentoId,
                method: 'DELETE',
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                cancelarForm();
                setMessageParam('Exito al eliminar');
                await buscarData(searchParam, setMessageParam);
            } else {
                setMessageParam(`Error al eliminar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMessageParam('Error al eliminar el cliente: ' + error.message);
        }
    };

    const buscarData = async (param, setMessageParam) => {
        try {
            const response = await axios({
                url: base_url+'/api/medicamentos/buscar',
                method: 'GET',
                params:{
                    parametro: param 
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status === 200 && response.data.status) {
                const data = [];
                for (const medication of response.data.data) {
                    data.push({
                        id: medication.MED_id,
                        nombre: medication.MED_nombre_medicamento,
                        descripcion: medication.MED_descripcion,
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setMedicamentoId(medication.MED_id);
                                    setNombre(medication.MED_nombre_medicamento);
                                    setDescripcion(medication.MED_descripcion);
                                    setIsTableModalOpen(false);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(medication.MED_id, param, setMessageParam)} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    });
                }

                setTableData(data);
            } else {
                setMessageParam(`Error al obtener los datos de la tabla, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMessageParam('Error al obtener los datos de la tabla: ' + error.message);
        }
    }

    const cerrarModalTabla = () => {
        setIsTableModalOpen(false);
    }

    const [tableData, setTableData] = useState([]);
    const [medicamentoId, setMedicamentoId] = useState(0);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');

    return <div className='CRUDBasicScreen'>
        <div className="TitleContainer">
            <h1>Medicamentos</h1>
            <i class="bi bi-search openModal" onClick={()=> setIsTableModalOpen(true)}/>
        </div>
        <MedicationForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            nombre={nombre}
            descripcion={descripcion}
            precio={precio}
            mensaje={mensaje}

            setNombre={setNombre}
            setDescripcion={setDescripcion}
            setPrecio={setPrecio}
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

                placeHolder='Nombre de la medicina'
                tableColumns={tableColumns}
                tableData={tableData}
            />
        </Modal>
    </div>
}