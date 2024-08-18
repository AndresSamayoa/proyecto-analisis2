import './WorkShiftForm.css';

import ComboboxSearch from '../ComboboxSearch/ComboboxSearch';

export default function WorkShiftForm(props) {

    const setHoraInicio = (e) => {
        props.setHoraInicio(e.target.value)
    };

    const setHoraFin = (e) => {
        props.setHoraFin(e.target.value)
    };

    const setFechaInicio = (e) => {
        props.setFechaInicio(e.target.value)
    };

    const setFechaFin = (e) => {
        props.setFechaFin(e.target.value)
    };

    const setLunes = (e) => {
        props.setLunes(e.target.checked)
    };

    const setMartes = (e) => {
        props.setMartes(e.target.checked)
    };

    const setMiercoles = (e) => {
        props.setMiercoles(e.target.checked)
    };

    const setJueves = (e) => {
        props.setJueves(e.target.checked)
    };

    const setViernes = (e) => {
        props.setViernes(e.target.checked)
    };

    const setSabado = (e) => {
        props.setSabado(e.target.checked)
    };

    const setDomingo = (e) => {
        props.setDomingo(e.target.checked)
    };

    return <div className='workShiftForm'>
        <div className="workShiftInputs">
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
                <span className="controlLabel">Hora de inicio (0-24)</span>
                <div className="inputSecundaryContainer">
                    <input type="number" className="textInput" value={props.horaInicio} onChange={setHoraInicio}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Hora de fin (0-24)</span>
                <div className="inputSecundaryContainer">
                    <input type="number" className="textInput" value={props.horaFin} onChange={setHoraFin}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha de inicio</span>
                <div className="inputSecundaryContainer">
                    <input type="date" className="dateInput" value={props.fechaInicio} onChange={setFechaInicio}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha de fin</span>
                <div className="inputSecundaryContainer">
                    <input type="date" className="dateInput" value={props.fechaFom} onChange={setFechaFin}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Lunes</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" value={props.lunes} onChange={setLunes}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Martes</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" value={props.martes} onChange={setMartes}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Miercoles</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" value={props.miercoles} onChange={setMiercoles}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Jueves</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" value={props.jueves} onChange={setJueves}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Viernes</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" value={props.lunes} onChange={setViernes}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Sabado</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" value={props.sabado} onChange={setSabado}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Domingo</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" value={props.domingo} onChange={setDomingo}/>
                </div>
            </div>
        </div>
        <div className="workShiftFormControls">
            <div className="guardarBtn" onClick={props.guardarFn}>Guardar</div>
            <div className="cancelarBtn" onClick={props.cancelarFn}>Cancelar</div>
        </div>
    </div>
};
