// import './MedicBasicScreen.css'

import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import UserForm from '../../components/MedicBasicForm/MedicBasicForm';
import TableModal from '../../components/TableModal/TableModal';

const base_url = process.env.REACT_APP_NODE_API_BASE;

export default function UserBasicScreen () {
    const tableColumns = [
        {field: 'nombres_completos', text: 'Nombres'},
        {field: 'email', text: 'Email'},
        {field: 'telefono', text: 'Telefono'},
        {field: 'tipo', text: 'Tipo'},
        {field: 'numero_colegiado', text: 'Numero de colegiado'},
        {field: 'acciones', text: 'Acciones'}
    ];

    const cancelarForm = () => {
        console.log('Limpio')
        setMedicoId(0);
        setNombres('');
        setApellidos('');
        setEmail('');
        setTelefono('');
        setTipo('');
        setMensaje('');
        setNumeroColegiado('');
    };
    
    const guardarForm = async () => {
        try {
            const errores = [];
            let method;
            let url;

            if (medicoId > 0) {
                method = 'PUT';
                url = base_url + '/api/medicos/'+medicoId
            } else {
                method = 'POST';
                url = base_url + '/api/medicos'
            }

            if (!nombres || nombres.trim().length < 1) {
                errores.push('El nombre es un campo obligatorio.');
            }
            if (!apellidos || apellidos.trim().length < 1) {
                errores.push('El apellido es un campo obligatorio.');
            }
            if (!numeroColegiado || numeroColegiado.trim().length != 13) {
                errores.push('El numero de colegiado es un campo obligatorio y debe ser de 13 caracteres.');
            }
            if (!telefono || telefono.trim().length != 8) {
                errores.push('El telefono es un campo obligatorio y debe ser de 8 caracteres.');
            }
            if (!tipo) {
                errores.push('El tipo es un campo obligatorio.');
            }
            if (!email || !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))) {
                errores.push('El email debe tener un formato valido (xxx@xx.xx).');
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
                    nombres: nombres,
                    apellidos: apellidos,
                    tipo_medico: tipo,
                    numero_telefono: telefono,
                    correo_electronico: email,
                    numero_colegiado: numeroColegiado
                },
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                cancelarForm();
                setMensaje('Exito al guardar');
                setTableData([]);
            } else {
                setMensaje(`Error al obtener los datos de clientes, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al guardar los datos: ' + error.message);
        }
    };

    const eliminarItem = async (medicoId, param, setMessageParam) => {
        try {
            const response = await axios({
                url: base_url + '/api/medicos/' + medicoId,
                method: 'DELETE',
                validateStatus: () => true
            });

            if (response.status == 200 && response.data.status) {
                cancelarForm();
                setMessageParam('Exito al eliminar');
                await buscarData(param, setMessageParam);
            } else {
                setMessageParam(`Error al obtener los datos de clientes, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMessageParam('Error al eliminar el medico: ' + error.message);
        }
    };

    const buscarData = async (param, setMessageParam) => {
        try {
            const response = await axios({
                url: base_url+'/api/medicos/buscar',
                method: 'GET',
                params: {
                    parametro: param,
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200 && response.data.status) {
                const data = [];
                for (const medic of response.data.data) {
                    data.push({
                        id: medic.MED_id,
                        nombres_completos: medic.MED_nombre + ' ' + medic.MED_apellido,
                        nombres: medic.MED_nombre,
                        apellidos: medic.MED_apellido,
                        email: medic.MED_correo,
                        telefono: String(medic.MED_telefono),
                        tipo: medic.MED_tipo,
                        numero_colegiado: medic.MED_numero_colegiado,
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setMedicoId(medic.MED_id);
                                    setNombres(medic.MED_nombre);
                                    setApellidos(medic.MED_apellido);
                                    setEmail(medic.MED_correo);
                                    setTelefono(String(medic.MED_telefono));
                                    setTipo(medic.MED_tipo);
                                    setNumeroColegiado(medic.MED_numero_colegiado);
                                    setIsTableModalOpen(false);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(medic.MED_id, param, setMessageParam)} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    });
                }

                setTableData(data);
            } else {
                setMessageParam(`Error al obtener los datos de clientes, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMessageParam('Error al obtener los datos de la tabla: ' + error.message);
        }
    };

    const cerrarModalTabla = () => {
        setIsTableModalOpen(false);
    };

    const [tableData, setTableData] = useState([]);
    const [medicoId, setMedicoId] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipo, setTipo] = useState('');
    const [numeroColegiado, setNumeroColegiado] = useState('');
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');

    return <div className="CRUDBasicScreen">
        <div className="TitleContainer">
            <h1>Medicos</h1>
            <i class="bi bi-search openModal" onClick={()=> setIsTableModalOpen(true)}/>
        </div>
        <UserForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            setNombres={setNombres}
            setEmail={setEmail}
            setTelefono={setTelefono}
            setApellidos={setApellidos}
            setTipo={setTipo}
            setNumeroColegiado={setNumeroColegiado}

            medicoId={medicoId}
            nombres={nombres}
            apellidos={apellidos}
            email={email}
            telefono={telefono}
            tipo={tipo}
            numeroColegiado={numeroColegiado}
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

                placeHolder='Nombre o colegiado de medico'
                tableColumns={tableColumns}
                tableData={tableData}
            />
        </Modal>
    </div>
};