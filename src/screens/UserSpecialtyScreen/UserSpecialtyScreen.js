
import { useState, useEffect } from 'react';

import UserSpecialtyForm from '../../components/UserSpecialtyForm/UserSpecialtyForm';
import DataTable from '../../components/DataTable/DataTable';


export default function UserSpecialtyScreen (props) {

    const tableColumns = [
        {field: 'especialidad', text: 'Especialidad'},
        {field: 'activa', text: 'Activa'},
        {field: 'numero_colegiado', text: 'Numero Colegiado'},
        {field: 'comentarios', text: 'Comentarios'},
        {field: 'acciones', text: 'Acciones'},
    ]

    const cancelarForm = () => {
        setEspecialidadId(0)
        setEspecialidadSearcher('')
        setActiva('')
        setNumeroColegiado('')
        setComentarios('')
        console.log('Limpio');
    };
    
    const guardarForm = () => {
        console.log(especialidadId,especialidadSearcher,activa,numeroColegiado,comentarios);
    };

    const loadTableData = () => {
        setTableData([]);
    };

    const [tableData, setTableData] = useState([]);
    const [listaEspecialidades, setListaEspecialidades] = useState([]);
    const [especialidadId, setEspecialidadId] = useState(0);
    const [especialidadSearcher, setEspecialidadSearcher] = useState('');
    const [activa, setActiva] = useState('');
    const [numeroColegiado, setNumeroColegiado] = useState('');
    const [comentarios, setComentarios] = useState('');
    useEffect(loadTableData, []);

    return <div className='CRUDBasicScreen'>
        <div className="TitleContainer">
            <h1>Especialidades</h1>
        </div>
        <UserSpecialtyForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            especialidadId={especialidadId}
            especialidadSearcher={especialidadSearcher}
            activa={activa}
            numeroColegiado={numeroColegiado}
            comentario={comentarios}
            listaEspecialidades={listaEspecialidades}

            setEspecialidad={setEspecialidadId}
            setEspecialidadSearcher={setEspecialidadSearcher}
            setActiva={setActiva}
            setNumeroColegiado={setNumeroColegiado}
            setComentarios={setComentarios}
        />

        <DataTable 
            headers={tableColumns}
            rows={tableData}
        />
    </div>
}