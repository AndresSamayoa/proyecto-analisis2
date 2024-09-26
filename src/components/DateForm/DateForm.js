import ComboboxSearch from '../ComboboxSearch/ComboboxSearch';
import moment from 'moment';

export default function DateForm(props) {

    const setFecha = (e) => {
        const start = moment(e.target.value, 'YYYY-MM-DDTHH:mm');
        const remainder = start.minute() == 0 ? 0 : 30 - (start.minute()%30);

        const fechaEnvio = (moment(start).add(remainder, "minutes").format("YYYY-MM-DD HH:mm:00"));

        props.setFecha(fechaEnvio);
    };


    return <div className='crudForm'>
        <div className="crudInputs">
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
                <span className="controlLabel">Fecha</span>
                <div className="inputSecundaryContainer">
                    <input className="dateInput" type="datetime-local" min={moment().add(1,'day').format('YYYY-MM-DDT00:00')} value={moment(props.fecha).format('YYYY-MM-DDTHH:mm')} onChange={setFecha}/>
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
