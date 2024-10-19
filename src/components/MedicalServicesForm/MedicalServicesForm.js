
export default function MedicalServicesForm(props) {

    const setNombre = (e) => {
        props.setNombre(e.target.value)
    };
    
    const setPrecio = (e) => {
        props.setPrecio(e.target.value)
    };

    const setExamen = (e) => {
        props.setExamen(e.target.checked)
    };

    const setLocal = (e) => {
        props.setLocal(e.target.checked)
    };

    return <div className='crudForm'>
        <div className="crudInputs">
            <div className="controlContainer">
                <span className="controlLabel">Nombre</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.nombre} onChange={setNombre}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Precio</span>
                <div className="inputSecundaryContainer">
                    <input type="number" className="textInput" value={props.precio} onChange={setPrecio}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Examen</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkBoxInput" checked={props.examen} onChange={setExamen}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Servicio Local</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="checkBoxInput" checked={props.local} onChange={setLocal}/>
                </div>
            </div>
        </div>
        <div className='messageContainer'>
                <p>{props.mensaje}</p>
        </div>
        <div className="crudControls">
            <button className="guardarBtn" onClick={props.guardarFn}><i class="bi bi-floppy"></i></button>
            <button className="cancelarBtn" onClick={props.cancelarFn}><i class="bi bi-x-lg"></i></button>
        </div>
    </div>
};
