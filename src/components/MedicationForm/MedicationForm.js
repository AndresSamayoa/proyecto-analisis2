import './MedicationForm.css';

export default function MedicationForm(props) {

    const setNombre = (e) => {
        props.setNombre(e.target.value)
    };

    const setComentario = (e) => {
        props.setComentario(e.target.value)
    };

    const setActivo = (e) => {
        props.setActivo(e.target.checked)
    };

    return <div className='medicationForm'>
        <div className="medicationInputs">
            <div className="controlContainer">
                <span className="controlLabel">Nombre</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.nombre} onChange={setNombre}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Activo</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkboxInput" checked={props.activo} onChange={setActivo}/>
                </div>
            </div>
            <div className="controlContainerWide">
                <span className="controlLabel">Comentarios</span>
                <div className="inputSecundaryContainer">
                    <textarea type="text" className="textFieldInput" value={props.comentario} onChange={setComentario}/>
                </div>
            </div>
        </div>
        <div className="medicationFormControls">
            <div className="guardarBtn" onClick={props.guardarFn}>Guardar</div>
            <div className="cancelarBtn" onClick={props.cancelarFn}>Cancelar</div>
        </div>
    </div>
};
