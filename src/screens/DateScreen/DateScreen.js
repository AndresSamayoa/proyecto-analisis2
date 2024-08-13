import './DateScreen.css';

import { useState, useEffect } from 'react'
import Modal from 'react-modal';

import DateForm from '../../components/DateForm/DateForm';
import PatientBasicScreen from '../PatientBasic/PatientBasicScreen';
import DataTable from '../../components/DataTable/DataTable';
import Searcher from '../../components/Searcher/Searcher'


export default function DateScreen () {
    Modal.setAppElement('#root');

    const tableColumns = [
        {field: 'nombres_paciente', text: 'Pacientes'},
        {field: 'nombre_medico', text: 'Medicos'},
        {field: 'razon', text: 'Razon'},
        {field: 'duracion', text: 'Duracion (h)'},
        {field: 'fecha_cita', text: 'Fecha de cita'},
        {field: 'acciones', text: 'Acciones'}
    ];

    const cancelarForm = () => {
        console.log('Limpio');
    };
    
    const guardarForm = () => {
        console.log(buscadorPaciente,buscadorMedico,atendida,fecha,razon,duracion);
    };

    const eliminarItem = (clienteId) => {
        console.log(clienteId);
    };

    const loadTableData = () => {
        setTableData([]);
    };

    const buscarData = () => {
        console.log(buscador)
    }

    const abrirModal = () => {
        setIsModelOpen(true)
    }

    const cerrarModal = () => {
        setIsModelOpen(false)
    }

    const [tableData, setTableData] = useState([]);
    const [citaId, setCitaId] = useState('');
    const [buscadorPaciente, setBuscadorPaciente] = useState('');
    const [paciente, setPaciente] = useState('');
    const [listaPacientes, setListaPaciente] = useState([]);
    const [buscadorMedico, setBuscadorMedico] = useState('');
    const [medico, setMedico] = useState('');
    const [listaMedicos, setListaMedicos] = useState([]);
    const [atendida, setAtendida] = useState(false);
    const [fecha, setFecha] = useState('');
    const [razon, setRazon] = useState('');
    const [duracion, setDuracion] = useState('');
    const [isModalOpen, setIsModelOpen] = useState(false);
    const [buscador, setBuscador] = useState('');
    
    useEffect(loadTableData, []);

    return <div className='DateBasicScreen'>
        <div className="TitleContainer">
            <h1>Citas</h1>
        </div>
        <DateForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}
            abrirModal={abrirModal}

            buscadorMedico={buscadorMedico}
            listaMedicos={listaMedicos}
            buscadorPaciente={buscadorPaciente}
            listaPacientes={listaPacientes}
            atendida={atendida}
            fecha={fecha}
            razon={razon}
            duracion={duracion}

            setBuscadorMedico={setBuscadorMedico}
            setMedico={setMedico}
            setBuscadorPaciente={setBuscadorPaciente}
            setPaciente={setPaciente}
            setAtendida={setAtendida}
            setFecha={setFecha}
            setRazon={setRazon}
            setDuracion={setDuracion}
        />
        <Searcher 
            placeHolder='Nombre o CUI de paciente o medico'

            param={buscador}
            setParam={setBuscador}

            searchFn={buscarData}
        />
        <DataTable headers={tableColumns} rows={tableData} />

        <Modal
            isOpen={isModalOpen}
            onRequestClose={cerrarModal}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}

        >
            <div className='modalDiv'>
                <div className='closeModalDiv'>
                    <i onClick={cerrarModal} class="bi bi-x closeIcon" />
                </div>
                <PatientBasicScreen />
            </div>
        </Modal>
    </div>
}