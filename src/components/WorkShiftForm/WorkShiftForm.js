// import './WorkShiftForm.css';

import moment from 'moment';

import ComboboxSearch from '../ComboboxSearch/ComboboxSearch';

export default function WorkShiftForm(props) {

    const setHoraInicio = (e) => {
        props.setHoraInicio(e.target.value ? e.target.value.replace(/[^0-9]/gm,'') : e.target.value)
    };

    const setHoraFin = (e) => {
        props.setHoraFin(e.target.value ? e.target.value.replace(/[^0-9]/gm,'') : e.target.value)
    };

    const setFechaInicio = (e) => {
        props.setFechaInicio(e.target.value)
    };

    const setFechaFin = (e) => {
        props.setFechaFin(e.target.value)
    };

    const setDisponible = (e) => {
        props.setDisponible(e.target.checked)
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

    return <div className='crudForm'>
        <div className="crudInputs">
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
                    <input type="text" className="textInput" value={props.horaInicio} onChange={setHoraInicio}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Hora de fin (0-24)</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.horaFin} onChange={setHoraFin}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha de inicio</span>
                <div className="inputSecundaryContainer">
                    <input type="date" className="dateInput" min={moment().add(1,'day').format('YYYY-MM-DD')} value={props.fechaInicio} onChange={setFechaInicio}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha de fin</span>
                <div className="inputSecundaryContainer">
                    <input type="date" className="dateInput" min={moment().add(1,'day').format('YYYY-MM-DD')} value={props.fechaFin} onChange={setFechaFin}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Disponible</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" checked={props.disponible} onChange={setDisponible}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Lunes</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" checked={props.lunes} onChange={setLunes}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Martes</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" checked={props.martes} onChange={setMartes}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Miercoles</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" checked={props.miercoles} onChange={setMiercoles}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Jueves</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" checked={props.jueves} onChange={setJueves}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Viernes</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" checked={props.viernes} onChange={setViernes}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Sabado</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" checked={props.sabado} onChange={setSabado}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Domingo</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" checked={props.domingo} onChange={setDomingo}/>
                </div>
            </div>
        </div>
        <div className='messageContainer'>
                <p>{props.mensaje}</p>
        </div>
        <div className="crudFormControls">
            <button className="guardarBtn" onClick={props.guardarFn}><i class="bi bi-floppy"></i></button>
            <button className="cancelarBtn" onClick={props.cancelarFn}><i class="bi bi-x-lg"></i></button>
        </div>
    </div>
};
