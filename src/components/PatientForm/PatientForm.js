import './PatientForm.css';

export default function PatientForm(props) {
    return <div className='patientForm'>
        <div className="patientInputs">
            <div className="controlContainer">
                <span className="controlLabel">Nombre</span>
                <div className="inputSecundaryContainer">
                    <input className="textInput" value={props.nombres}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Telefono</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.telefono}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Email</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.correo}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">CUI</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" />
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha de nacimiento</span>
                <div className="inputSecundaryContainer">
                    <input className="dateInput" type="date" />
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Sexo</span>
                <div className="inputSecundaryContainer">
                    <select className="comboBoxInput">
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
