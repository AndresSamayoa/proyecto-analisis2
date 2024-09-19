
export default function DiseaseForm(props) {

    const setNombre = (e) => {
        props.setNombre(e.target.value)
    };

    const setDescripcion = (e) => {
        props.setDescripcion(e.target.value)
    };
    
    const setTipo = (e) => {
        props.setTipo(e.target.value)
    };

    return <div className='crudForm'>
        <div className="crudInputs">
            <div className="controlContainer">
                <span className="controlLabel">Nombre</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" maxLength={45} value={props.nombre} onChange={setNombre}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Tipo</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" maxLength={45} value={props.tipo} onChange={setTipo}/>
                </div>
            </div>
            <div className="controlContainerWide">
                <span className="controlLabel">Descripcion</span>
                <div className="inputSecundaryContainer">
                    <textarea type="text" className="textFieldInput" maxLength={150} value={props.descripcion} onChange={setDescripcion}/>
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
