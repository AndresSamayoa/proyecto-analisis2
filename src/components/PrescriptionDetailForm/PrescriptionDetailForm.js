import ComboboxSearch from '../ComboboxSearch/ComboboxSearch';


export default function PrescriptionDetailForm(props) {

    const setComentario = (e) => {
        props.setComentario(e.target.value)
    }
    
    const setCantidad = (e) => {
        props.setCantidad(e.target.value)
    }

    return <div className='crudFormModal'>
        <div className="crudInputs">
            <div className="controlContainerModal">
                <div className="inputLabelContainerSecundaryContainer">
                    <span className="controlLabel">Medicina</span>
                </div>
                <div className="inputSecundaryContainer">
                    <ComboboxSearch 
                        setSearcher={props.setBuscadorMedicina}
                        searcher={props.buscadorMedicina}
                        elements={props.listaMedicina}
                        setValue={props.setMedicina}
                    />
                </div>
            </div>
            <div className="controlContainerModal">
                <span className="controlLabel">Cantidad</span>
                <div className="inputSecundaryContainer">
                    <input type="number" className="textInput" value={props.cantidad} onChange={setCantidad}/>
                </div>
            </div>
            <div className="controlContainerWide">
                <span className="controlLabel">Comentarios</span>
                <div className="inputSecundaryContainer">
                    <textarea type="text" className="textFieldInput" value={props.comentario} onChange={setComentario}/>
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
