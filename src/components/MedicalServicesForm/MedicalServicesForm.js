import './MedicalServicesForm.css';

export default function MedicalServicesForm(props) {

    const setNombre = (e) => {
        props.setNombre(e.target.value)
    };

    const setActivo = (e) => {
        props.setActivo(e.target.checked)
    };

    const setLocal = (e) => {
        props.setLocal(e.target.checked)
    };

    return <div className='medicalServicesForm'>
        <div className="medicalServicesInputs">
            <div className="controlContainer">
                <span className="controlLabel">Nombre</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.nombre} onChange={setNombre}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Activo</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkBoxInput" checked={props.activo} onChange={setActivo}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Servicio Local</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkBoxInput" checked={props.local} onChange={setLocal}/>
                </div>
            </div>
        </div>
        <div className="medicalServicesControls">
            <div className="guardarBtn" onClick={props.guardarFn}>Guardar</div>
            <div className="cancelarBtn" onClick={props.cancelarFn}>Cancelar</div>
        </div>
    </div>
};
