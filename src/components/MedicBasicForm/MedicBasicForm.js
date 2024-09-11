import './MedicBasicForm.css';

export default function MedicBasicForm(props) {

    const setNombres = (e) => {
        props.setNombres(e.target.value)
    };
    const setApellidos = (e) => {
        props.setApellidos(e.target.value)
    };
    const setTipo = (e) => {
        props.setTipo(e.target.value)
    };
    const setEmail = (e) => {
        props.setEmail(e.target.value)
    };
    const setTelefono = (e) => {
        props.setTelefono(e.target.value ? e.target.value.replace(/[^0-9]/gm,'') : e.target.value)
    };
    const setNumeroColegiado = (e) => {
        props.setNumeroColegiado(e.target.value ? e.target.value.replace(/[^0-9]/gm,'') : e.target.value)
    };

    return <div className='medicBasicForm'>
        <div className="medicBasicInputs">
            <div className="controlContainer">
                <span className="controlLabel">Nombres</span>
                <div className="inputSecundaryContainer">
                    <input className="textInput" value={props.nombres} onChange={setNombres}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Apellidos</span>
                <div className="inputSecundaryContainer">
                    <input className="textInput" value={props.apellidos} onChange={setApellidos}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Telefono</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" maxLength={8} value={props.telefono} onChange={setTelefono}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Email</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.email} onChange={setEmail}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Numero de colegiado</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" disabled={props.medicoId > 0} maxLength={13} value={props.numeroColegiado} onChange={setNumeroColegiado}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Tipo</span>
                <div className="inputSecundaryContainer">
                    <select className="comboBoxInput" value={props.tipo} onChange={setTipo}>
                        <option>Seleccione uno</option>
                        <option>Medico</option>
                        <option>Enfermero</option>
                    </select>
                </div>
            </div>
        </div>
        <div className='messageContainer'>
                <p>{props.mensaje}</p>
        </div>
        <div className="medicBasicFormControls">
            <button className="guardarBtn" onClick={props.guardarFn}><i class="bi bi-floppy"></i></button>
            <button className="cancelarBtn" onClick={props.cancelarFn}><i class="bi bi-x-lg"></i></button>
        </div>
    </div>
};
