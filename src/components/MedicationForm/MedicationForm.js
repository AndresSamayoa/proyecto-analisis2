
export default function MedicationForm(props) {

    const setNombre = (e) => {
        props.setNombre(e.target.value)
    };

    const setDescripcion = (e) => {
        props.setDescripcion(e.target.value)
    };
    
    const setPrecio = (e) => {
        props.setPrecio(e.target.value)
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
        <div className="crudFormControls">
            <button className="guardarBtn" onClick={props.guardarFn}><i class="bi bi-floppy"></i></button>
            <button className="cancelarBtn" onClick={props.cancelarFn}><i class="bi bi-x-lg"></i></button>
        </div>
    </div>
};
