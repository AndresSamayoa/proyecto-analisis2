
import { useState, useEffect } from 'react';
import axios from 'axios';

import PrescriptionDetailForm from '../../components/PrescriptionDetailForm/PrescriptionDetailForm';
import DataTable from '../../components/DataTable/DataTable';

const base_url = process.env.REACT_APP_NODE_API_BASE;

export default function PrescriptionDiagnosticScreen (props) {

    const prescriptionId = props.prescriptionId;

    const prescriptionDetailColumns = [
        {field: 'nombre', text: 'Nombre'},
        {field: 'valor', text: 'Valor'},
        {field: 'cantidad', text: 'Cantidad'},
        {field: 'acciones', text: 'Acciones'},
    ];

    const cancelarForm = () => {
        setPrescriptionDetailId(0);
        setComment('');
        setQuantity(0);
        setMedicationName('');
        setMedicationId(0);
        setMedicationList([]);
    };
    
    const guardarForm = async () => {
        try {
            const errores = [];
            let method;
            let url;

            if (prescriptionDetailId > 0) {
                method = 'PUT';
                url = base_url + '/api/detallereceta/'+prescriptionDetailId
            } else {
                method = 'POST';
                url = base_url + '/api/detallereceta'
            }

            if (!comment || comment.length < 1) {
                errores.push('El comentario es un campo obligatorio.');
            }

            if (!quantity || isNaN(quantity) ) {
                errores.push('La cantidad es un campo obligatorio y debe ser numerico.');
            } else if (Number(quantity) < 1){
                errores.push('La cantidad debe ser mayor a 0.');
            }

            if (!medicationId || medicationId < 1) {
                errores.push('La medicina es un campo obligatorio.');
            }

            if (errores.length > 0) {
                let mensajeError = errores.join(' ');
                setMessage(mensajeError)
                return ;
            }

            const response = await axios({
                url,
                method,
                data: {
                    medicamento_id: medicationId,
                    receta_id: prescriptionId,
                    comentario: comment.trim(),
                    cantidad: Number(quantity)
                  },
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                getInfo();
                cancelarForm();
                setMessage('Exito al guardar el detalle');
            } else {
                setMessage(`Error al guardar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMessage('Error al guardar los datos: ' + error.message);
        }
    };

    const deleteDetail = async (detailId) => {
        try {
            const response = await axios({
                url: base_url + '/api/detallereceta/'+detailId,
                method: 'DELETE',
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                setMessage('Exito al eliminar');
                getInfo();
            } else {
                setMessage(`'Error al eliminar, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMessage('Error al eliminar la cita: ' + error.message);
        }
    };

    const getInfo = async () => {
        try {
            const response = await axios({
                url: base_url+'/api/detallereceta/buscar/',
                method: 'GET',
                params: {
                    parametro: prescriptionId
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200 && response.data.status) {
                const detailData = [];

                console.log(response.data.data)
                for (const detail of response.data.data) {
                    detailData.push({
                        nombre: detail.MED_nombre_medicamento,
                        valor: String(detail.DET_subtotal),
                        cantidad: String(detail.DET_cantidad),
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                        setPrescriptionDetailId(detail.DET_id)
                                        setComment(detail.DET_comentarios);
                                        setQuantity(String(detail.DET_cantidad));
                                        setMedicationName(detail.MED_nombre_medicamento);
                                        setMedicationId(detail.MED_id);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>{
                                    deleteDetail(detail.DET_id)
                                }} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    })
                }
                setPrescriptionDetailList(detailData)
            } else {
                setMessage(`Error al obtener los datos de la pantalla, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMessage('Error al obtener los datos de la pantalla: ' + error.message);
        }
    };

    const searchMedication = async () => {
        try {
            const response = await axios({
                url: `${base_url}/api/medicamentos/buscar`,
                method: 'GET',
                params: {
                    parametro: medicationName
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status === 200 && response.data.status) {
                const data = [];
                for (const service of response.data.data) {
                    data.push({
                        value: service.MED_id,
                        label: service.MED_nombre_medicamento,
                    });
                }

                setMedicationList(data);
            }
        } catch (error) {
            console.log('Error al obtener los datos de clientes: ' + error.message);
        }
    };

    const [prescriptionDetailId, setPrescriptionDetailId] = useState(0);
    const [comment, setComment] = useState('');
    const [quantity, setQuantity] = useState('0');
    const [medicationName, setMedicationName] = useState('');
    const [medicationId, setMedicationId] = useState(0);
    const [medicationList, setMedicationList] = useState('');
    const [prescriptionDetailList, setPrescriptionDetailList] = useState([])
    const [message, setMessage] = useState('');

    useEffect(() => {
        getInfo();
    },[]);

    useEffect(()=>{
        if (medicationName.length > 0) {
            searchMedication()
        }
    }, [medicationName]);

    return <div className='CRUDBasicScreen'>
        <div className="TitleContainer">
            <h1>Recetas</h1>
        </div>
        <PrescriptionDetailForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}
            mensaje={message}

            setBuscadorMedicina={setMedicationName}
            buscadorMedicina={medicationName}
            listaMedicina={medicationList}
            setMedicina={setMedicationId}

            cantidad={quantity}
            comentario={comment}

            setComentario={setComment}
            setCantidad={setQuantity}
        />
        <DataTable 
            headers={prescriptionDetailColumns} rows={prescriptionDetailList}
        />
    </div>
}