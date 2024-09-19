import moment from 'moment';

export default function PatientForm(props) {

    const setNombres = (e) => {
        props.setNombres(e.target.value)
    };
    const setApellidos = (e) => {
        props.setApellidos(e.target.value)
    };
    const setEmail = (e) => {
        props.setEmail(e.target.value)
    };
    const setTelefono = (e) => {
        props.setTelefono(e.target.value ? e.target.value.replace(/[^0-9]/gm,'') : e.target.value)
    };
    const setCui = (e) => {
        props.setCui(e.target.value ? e.target.value.replace(/[^0-9]/gm,'') : e.target.value)
    };
    const setFechaNacimiento = (e) => {
        props.setFechaNacimiento(e.target.value)
    };

    return <div className='crudForm'>
        <div className="crudInputs">
            <div className="controlContainer">
                <span className="controlLabel">Nombre</span>
                <div className="inputSecundaryContainer">
                    <input className="textInput" value={props.nombres} onChange={setNombres}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Apellido</span>
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
                    <input type="email" className="textInput" value={props.email} onChange={setEmail}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">CUI</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" disabled={props.pacienteId > 0} maxLength={13} value={props.cui} onChange={setCui}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha de nacimiento</span>
                <div className="inputSecundaryContainer">
                    <input className="dateInput" type="date" max={moment().format('YYYY-MM-DD')} value={props.fechaNacimiento} onChange={setFechaNacimiento}/>
                </div>
            </div>
            {/* <div className="controlContainer">
                <span className="controlLabel">Sexo</span>
                <div className="inputSecundaryContainer">
                    <select className="comboBoxInput" value={props.sexo} onChange={setSexo}>
                        <option>Seleccione uno</option>
                        <option>M</option>
                        <option>F</option>
                    </select>
                </div>
            </div> */}
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
