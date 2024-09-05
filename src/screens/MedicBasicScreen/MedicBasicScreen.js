import './MedicBasicScreen.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import UserForm from '../../components/MedicBasicForm/MedicBasicForm';
import DataTable from '../../components/DataTable/DataTable';
import Searcher from '../../components/Searcher/Searcher'

const base_url = process.env.REACT_APP_DOT_NET_API_BASE;

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
        setNumeroColegiado('');
    };
    
    const guardarForm = async () => {
        try {
            const errores = [];
            let method;
            let url;

            if (medicoId > 0) {
                method = 'PUT';
                url = base_url + '/Medicos/Update'
            } else {
                method = 'POST';
                url = base_url + '/Medicos/Guardar'
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
                    meD_id: medicoId > 0 ? medicoId : 0,
                    usR_id: 0,
                    meD_nombre: nombres,
                    meD_apellido: apellidos,
                    meD_tipo: tipo,
                    meD_telefono: telefono,
                    meD_correo: email,
                    meD_numero_colegiado: numeroColegiado
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

    const eliminarItem = async (medicoId) => {
        try {
            const response = await axios({
                url: base_url + '/Medicos/Delete',
                method: 'DELETE',
                params: {
                    Id: medicoId
                },
                validateStatus: () => true
            });

            if (response.status == 200) {
                cancelarForm();
                setMensaje('Exito al guardar');
                await loadTableData();
            } else {
                setMensaje('Error al eliminar, codigo: ' + response.status);
            }
        } catch (error) {
            setMensaje('Error al eliminar el medico: ' + error.message);
        }
    };

    const loadTableData = async () => {
        try {
            const response = await axios({
                url: base_url+'/Medicos/Read',
                method: 'GET',
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200) {
                const data = [];
                for (const medic of response.data) {
                    data.push({
                        id: medic.meD_id,
                        nombres_completos: medic.meD_nombre + ' ' + medic.meD_apellido,
                        nombres: medic.meD_nombre,
                        apellidos: medic.meD_apellido,
                        email: medic.meD_correo,
                        telefono: medic.meD_telefono,
                        tipo: medic.meD_tipo,
                        numero_colegiado: medic.meD_numero_colegiado,
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setMedicoId(medic.meD_id);
                                    setNombres(medic.meD_nombre);
                                    setApellidos(medic.meD_apellido);
                                    setEmail(medic.meD_correo);
                                    setTelefono(String(medic.meD_telefono));
                                    setTipo(medic.meD_tipo);
                                    setNumeroColegiado(medic.meD_numero_colegiado);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(medic.meD_id)} 
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
    };

    const buscarData = async () => {
        try {
            const response = await axios({
                url: base_url+'/Medicos/fas_buscar_medicos',
                method: 'GET',
                params: {
                    buscar: buscador,
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200) {
                const data = [];
                for (const medic of response.data) {
                    data.push({
                        id: medic.meD_id,
                        nombres_completos: medic.meD_nombre + ' ' + medic.meD_apellido,
                        nombres: medic.meD_nombre,
                        apellidos: medic.meD_apellido,
                        email: medic.meD_correo,
                        telefono: medic.meD_telefono,
                        tipo: medic.meD_tipo,
                        numero_colegiado: medic.meD_numero_colegiado,
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setMedicoId(medic.meD_id);
                                    setNombres(medic.meD_nombre);
                                    setApellidos(medic.meD_apellido);
                                    setEmail(medic.meD_correo);
                                    setTelefono(medic.meD_telefono);
                                    setTipo(medic.meD_tipo);
                                    setNumeroColegiado(medic.meD_numero_colegiado);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(medic.meD_id)} 
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

    const [tableData, setTableData] = useState([]);
    const [medicoId, setMedicoId] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipo, setTipo] = useState('');
    const [numeroColegiado, setNumeroColegiado] = useState('');
    const [buscador, setBuscador] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(()=>loadTableData, []);

    return <div className="UserBasicScreen">
        <div className="TitleContainer">
            <h1>Medicos</h1>
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
        <Searcher 
            placeHolder='Nombre o colegiado del medico'

            param={buscador}
            setParam={setBuscador}

            searchFn={buscarData}
            cancelFn={loadTableData}
        />
        <DataTable headers={tableColumns} rows={tableData} />
    </div>
};