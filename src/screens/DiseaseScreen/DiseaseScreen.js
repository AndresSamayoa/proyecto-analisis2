import './DiseaseScreen.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import DiseaseForm from '../../components/DiseaseForm/DiseaseForm';
import DataTable from '../../components/DataTable/DataTable';
import Searcher from '../../components/Searcher/Searcher'

const base_url = process.env.REACT_APP_DOT_NET_API_BASE;

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
                url = base_url + '/Enfermedades/Update'
            } else {
                method = 'POST';
                url = base_url + '/Enfermedades/Guardar'
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
                    enF_id: enfermedadId ? enfermedadId : 0,
                    enF_nombre: nombre.trim(),
                    enF_descripcion: descripcion.trim(),
                    enF_tipo_enfermedad: tipo.trim()
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

    const eliminarItem = async (enfermedadId) => {
        try {
            const response = await axios({
                url: base_url + '/Enfermedades/Delete',
                method: 'DELETE',
                params: {
                    Id: enfermedadId
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
            setMensaje('Error al eliminar el cliente: ' + error.message);
        }
    };

    const loadTableData = async () => {
        try {
            const response = await axios({
                url: base_url+'/Enfermedades/listar',
                method: 'GET',
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200) {
                const data = [];
                for (const disease of response.data) {
                    data.push({
                        id: disease.enF_id,
                        nombre: disease.enF_nombre,
                        descripcion: disease.enF_descripcion,
                        tipo: disease.enF_tipo_enfermedad,
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setEnfermedadId(disease.enF_id);
                                    setNombre(disease.enF_nombre);
                                    setDescripcion(disease.enF_descripcion);
                                    setTipo(disease.enF_tipo_enfermedad);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(disease.enF_id)} 
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
                url: base_url+'/Enfermedades/fas_buscar_enfermedades',
                method: 'GET',
                params: {
                    buscar: buscador
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200) {
                const data = [];
                for (const disease of response.data) {
                    data.push({
                        id: disease.enF_id,
                        nombre: disease.enF_nombre,
                        descripcion: disease.enF_descripcion,
                        tipo: disease.enF_tipo_enfermedad,
                        acciones: <div className='ActionContainer'>
                            <i 
                                onClick={()=>{
                                    setEnfermedadId(disease.enF_id);
                                    setNombre(disease.enF_nombre);
                                    setDescripcion(disease.enF_descripcion);
                                    setTipo(disease.enF_tipo_enfermedad);
                                }} 
                                class="bi bi-pencil-square ActionItem"
                            ></i>
                            <i
                                onClick={()=>eliminarItem(disease.enF_id)} 
                                style={{color:"red"}} 
                                class="bi bi-trash ActionItem"
                            ></i>
                        </div>
                    });
                }

                setTableData(data);
            } else {
                setMensaje('Error al buscar los datos de la tabla, codigo: ' + response.status);
            }
        } catch (error) {
            setMensaje('Error al buscar los datos de la tabla: ' + error.message);
        }
    }

    const [tableData, setTableData] = useState([]);
    const [enfermedadId, setEnfermedadId] = useState('');
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [buscador, setBuscador] = useState('');

    useEffect(()=>loadTableData, []);

    return <div className="DiseaseScreen">
        <div className="TitleContainer">
            <h1>Enfermedades</h1>
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
        <Searcher 
            placeHolder='Nombre de la enfermedad'

            param={buscador}
            setParam={setBuscador}

            searchFn={buscarData}
            cancelFn={loadTableData}
        />
        <DataTable headers={tableColumns} rows={tableData} />
    </div>
};