import './MedicationForm.css';

export default function MedicationForm(props) {

    const setNombre = (e) => {
        props.setNombre(e.target.value)
    };

    const setDescripcion = (e) => {
        props.setDescripcion(e.target.value)
    };

    return <div className='medicationForm'>
        <div className="medicationInputs">
            <div className="controlContainer">
                <span className="controlLabel">Nombre</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.nombre} onChange={setNombre}/>
                </div>
            </div>
            <div className="controlContainerWide">
                <span className="controlLabel">Descripcion</span>
                <div className="inputSecundaryContainer">
                    <textarea type="text" className="textFieldInput" value={props.descripcion} onChange={setDescripcion}/>
                </div>
            </div>
        </div>
        <div className='messageContainer'>
                <p>{props.mensaje}</p>
        </div>
        <div className="medicationFormControls">
            <div className="guardarBtn" onClick={props.guardarFn}>Guardar</div>
            <div className="cancelarBtn" onClick={props.cancelarFn}>Cancelar</div>
        </div>
    </div>
};
