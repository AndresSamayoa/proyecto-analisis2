
import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import MedicationForm from '../../components/MedicationForm/MedicationForm';
import TableModal from '../../components/TableModal/TableModal';

const base_url = process.env.REACT_APP_DOT_NET_API_BASE;


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
                url = base_url + '/Medicamentos/Update'
            } else {
                method = 'POST';
                url = base_url + '/Medicamentos/Create'
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
                    meD_id: medicamentoId ? medicamentoId : 0,
                    meD_nombre_medicamento: nombre.trim(),
                    meD_descripcion: descripcion.trim()
                },
                validateStatus: () => true
            });

            if (response.status == 200) {
                cancelarForm();
                setMensaje('Exito al guardar');
                setTableData([]);
            } else {
                setMensaje('Error al guardar, codigo: ' + response.status);
            }
        } catch (error) {
            setMensaje('Error al guardar los datos: ' + error.message);
        }
    };

    const eliminarItem = async (medicamentoId, searchParam, setMessageParam) => {
        try {
            const response = await axios({
                url: base_url + '/Medicamentos/Delete',
                method: 'DELETE',
                params: {
                    Id: medicamentoId
                },
                validateStatus: () => true
            });

            if (response.status == 200) {
                cancelarForm();
                setMessageParam('Exito al eliminar');
                await buscarData(searchParam, setMessageParam);
            } else {
                setMessageParam('Error al eliminar, codigo: ' + response.status);
            }
        } catch (error) {
            setMessageParam('Error al eliminar el cliente: ' + error.message);
        }
    };

    const buscarData = async (param, setMessageParam) => {
        try {
            const response = await axios({
                url: base_url+'/Medicamentos/fas_buscar_medicamentos',
                method: 'GET',
                params:{
                    buscar: param 
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200) {
                const data = [];
                for (const medication of response.data) {
                    data.push({
                        id: medication.meD_id,
                        nombre: medication.meD_nombre_medicamento,
                        descripcion: medication.meD_descripcion,
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setMedicamentoId(medication.meD_id);
                                    setNombre(medication.meD_nombre_medicamento);
                                    setDescripcion(medication.meD_descripcion);
                                    setIsTableModalOpen(false);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(medication.meD_id, param, setMessageParam)} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    });
                }

                setTableData(data);
            } else {
                setMessageParam('Error al obtener los datos de la tabla, codigo: ' + response.status);
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
            mensaje={mensaje}

            setNombre={setNombre}
            setDescripcion={setDescripcion}
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