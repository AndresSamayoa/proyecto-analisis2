import './DateForm.css';

import ComboboxSearch from '../ComboboxSearch/ComboboxSearch';
import moment from 'moment';

export default function DateForm(props) {

    const setEstado = (e) => {
        props.setEstado(e.target.checked)
    };

    const setFecha = (e) => {
        props.setFecha(e.target.value)
    };

    const setHora = (e) => {
        props.setHora(e.target.value ? e.target.value.replace(/[^0-9]/gm,'') : e.target.value)
    };

    return <div className='dateForm'>
        <div className="dateInputs">
            <div className="controlContainer">
                <div className="inputLabelContainerSecundaryContainer">
                    <span className="controlLabel">Paciente</span>
                    <i class="bi bi-plus-circle openModal" onClick={props.abrirModal}/>
                </div>
                <div className="inputSecundaryContainer">
                    <ComboboxSearch 
                        setSearcher={props.setBuscadorPaciente}
                        searcher={props.buscadorPaciente}
                        elements={props.listaPacientes}
                        setValue={props.setPaciente}
                    />
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Medico</span>
                <div className="inputSecundaryContainer">
                    <ComboboxSearch 
                        setSearcher={props.setBuscadorMedico}
                        searcher={props.buscadorMedico}
                        elements={props.listaMedicos}
                        setValue={props.setMedico}
                    />
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Estado</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkBoxInput" checked={props.estado} onChange={setEstado}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha</span>
                <div className="inputSecundaryContainer">
                    <input className="dateInput" type="date" min={moment().add(1,'day').format('YYYY-MM-DD')} value={props.fecha} onChange={setFecha}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Hora</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.hora} onChange={setHora}/>
                </div>
            </div>
        </div>
        <div className='messageContainer'>
                <p>{props.mensaje}</p>
        </div>
        <div className="dateFormControls">
            <button className="guardarBtn" onClick={props.guardarFn}><i class="bi bi-floppy"></i></button>
            <button className="cancelarBtn" onClick={props.cancelarFn}><i class="bi bi-x-lg"></i></button>
        </div>
    </div>
};
