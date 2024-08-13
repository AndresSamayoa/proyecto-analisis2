import './DateForm.css';

import ComboboxSearch from '../ComboboxSearch/ComboboxSearch';

export default function DateForm(props) {

    const setAtendida = (e) => {
        props.setAtendida(e.target.checked)
    };

    const setFecha = (e) => {
        props.setFecha(e.target.value)
    };

    const setRazon = (e) => {
        props.setRazon(e.target.value)
    };

    const setDuracion = (e) => {
        props.setDuracion(e.target.value)
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
                <span className="controlLabel">Atendida</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkBoxInput" value={props.atendida} onChange={setAtendida}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha</span>
                <div className="inputSecundaryContainer">
                    <input className="dateInput" type="date" value={props.fecha} onChange={setFecha}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Razon</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.razon} onChange={setRazon}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Duracion</span>
                <div className="inputSecundaryContainer">
                    <input type="number" className="textInput" value={props.duracion} onChange={setDuracion}/>
                </div>
            </div>
        </div>
        <div className="dateFormControls">
            <div className="guardarBtn" onClick={props.guardarFn}>Guardar</div>
            <div className="cancelarBtn" onClick={props.cancelarFn}>Cancelar</div>
        </div>
    </div>
};
