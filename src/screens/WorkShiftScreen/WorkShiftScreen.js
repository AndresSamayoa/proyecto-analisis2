import './WorkShiftScreen.css';

import { useState, useEffect } from 'react'

import WorkShiftForm from '../../components/WorkShiftForm/WorkShiftForm';
import DataTable from '../../components/DataTable/DataTable';
import Searcher from '../../components/Searcher/Searcher'


export default function WorkShiftScreen () {

    const tableColumns = [
        {field: 'nombre_medico', text: 'Medico'},
        {field: 'hora_inicio', text: 'Hora inicio'},
        {field: 'hora_fin', text: 'Hora fin'},
        {field: 'fecha_inicio', text: 'Fecha inicio'},
        {field: 'fecha_fin', text: 'Fecha fin'},
        {field: 'dias', text: 'Dias'},
        {field: 'acciones', text: 'Acciones'}
    ];

    const cancelarForm = () => {
        setMedico(0);
        setBuscadorMedico('');
        setTurno(0);
        setHoraInicio('0');
        setHoraFin('0');
        setFechaInicio('');
        setFechaFin('');
        setLunes(false);
        setMartes(false);
        setMiercoles(false);
        setJueves(false);
        setViernes(false);
        setSabado(false);
        setDomingo(false);
        setBuscador(false);
        console.log('Limpio');
    };
    
    const guardarForm = () => {
        console.log(horaInicio,horaFin,fechaInicio,fechaFin,lunes,martes,miercoles,jueves,viernes,sabado,domingo);
    };

    const eliminarItem = (turnoId) => {
        console.log(turnoId);
    };

    const loadTableData = () => {
        setTableData([]);
    };

    const buscarData = () => {
        console.log(buscador)
    }


    const [tableData, setTableData] = useState([]);
    const [turno, setTurno] = useState(0);
    const [buscadorMedico, setBuscadorMedico] = useState('');
    const [medico, setMedico] = useState('');
    const [listaMedicos, setListaMedicos] = useState([]);
    const [horaInicio, setHoraInicio] = useState('0');
    const [horaFin, setHoraFin] = useState('0');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [lunes, setLunes] = useState(false);
    const [martes, setMartes] = useState(false);
    const [miercoles, setMiercoles] = useState(false);
    const [jueves, setJueves] = useState(false);
    const [viernes, setViernes] = useState(false);
    const [sabado, setSabado] = useState(false);
    const [domingo, setDomingo] = useState(false);
    const [buscador, setBuscador] = useState('');
    
    useEffect(loadTableData, []);

    return <div className='WorkShiftBasicScreen'>
        <div className="TitleContainer">
            <h1>Turnos</h1>
        </div>
        <WorkShiftForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            buscadorMedico={buscadorMedico}
            listaMedicos={listaMedicos}
            horaInicio={horaInicio}
            horaFin={horaFin}
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            lunes={lunes}
            martes={martes}
            miercoles={miercoles}
            jueves={jueves}
            viernes={viernes}
            sabado={sabado}
            domingo={domingo}

            setBuscadorMedico={setBuscadorMedico}
            setMedico={setMedico}
            setListaMedicos={setListaMedicos}
            setHoraInicio={setHoraInicio}
            setHoraFin={setHoraFin}
            setFechaInicio={setFechaInicio}
            setFechaFin={setFechaFin}
            setLunes={setLunes}
            setMartes={setMartes}
            setMiercoles={setMiercoles}
            setJueves={setJueves}
            setViernes={setViernes}
            setSabado={setSabado}
            setDomingo={setDomingo}
        />
        <Searcher 
            placeHolder='Nombre o CUI'

            param={buscador}
            setParam={setBuscador}
            searchFn={buscarData}
        />
        <DataTable headers={tableColumns} rows={tableData} />
    </div>
}