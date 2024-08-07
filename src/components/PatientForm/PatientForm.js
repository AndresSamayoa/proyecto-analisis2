import './PatientForm.css';

export default function PatientForm(props) {

    const setNombres = (e) => {
        props.setNombres(e.target.value)
    };
    const setEmail = (e) => {
        props.setEmail(e.target.value)
    };
    const setTelefono = (e) => {
        props.setTelefono(e.target.value)
    };
    const setCui = (e) => {
        props.setCui(e.target.value)
    };
    const setFechaNacimiento = (e) => {
        props.setFechaNacimiento(e.target.value)
    };
    const setSexo = (e) => {
        props.setSexo(e.target.value)
    };

    return <div className='patientForm'>
        <div className="patientInputs">
            <div className="controlContainer">
                <span className="controlLabel">Nombre</span>
                <div className="inputSecundaryContainer">
                    <input className="textInput" value={props.nombres} onChange={setNombres}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Telefono</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.telefono} onChange={setTelefono}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Email</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.email} onChange={setEmail}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">CUI</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.cui} onChange={setCui}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha de nacimiento</span>
                <div className="inputSecundaryContainer">
                    <input className="dateInput" type="date" value={props.fechaNacimiento} onChange={setFechaNacimiento}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Sexo</span>
                <div className="inputSecundaryContainer">
                    <select className="comboBoxInput" value={props.sexo} onChange={setSexo}>
                        <option>Seleccione uno</option>
                        <option>M</option>
                        <option>F</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="patientFormControls">
            <div className="guardarBtn" onClick={props.guardarFn}>Guardar</div>
            <div className="cancelarBtn" onClick={props.cancelarFn}>Cancelar</div>
        </div>
    </div>
};
