import ComboboxSearch from '../ComboboxSearch/ComboboxSearch';


export default function MedicalServiceDateForm(props) {

    return <div className='crudFormModal'>
        <div className="crudInputs">
            <div className="controlContainerModal">
                <div className="inputLabelContainerSecundaryContainer">
                    <span className="controlLabel">Procedimiento</span>
                </div>
                <div className="inputSecundaryContainer">
                    <ComboboxSearch 
                        setSearcher={props.setBuscadorServicio}
                        searcher={props.buscadorServicio}
                        elements={props.listaServicios}
                        setValue={props.setServicio}
                    />
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
