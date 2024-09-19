
import ComboboxSearch from '../ComboboxSearch/ComboboxSearch';

export default function UserSpecialtyForm(props) {

    const setActiva = (e) => {
        props.setActiva(e.target.checked)
    };

    const setNumeroColegiado = (e) => {
        props.setNumeroColegiado(e.target.value)
    };

    const setComentarios = (e) => {
        props.setComentarios(e.target.value)
    };

    return <div className='crudForm'>
        <div className="crudInputs">
            <div className="controlContainer">
                <span className="controlLabel">Especialidades</span>
                <div className="inputSecundaryContainer">
                    <ComboboxSearch 
                        setSearcher={props.setEspecialidadSearcher}
                        searcher={props.especialidadSearcher}
                        elements={props.listaEspecialidades}
                        setValue={props.setEspecialidad}
                    />
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Activa</span>
                <div className="inputSecundaryContainer">
                    <input type="checkbox" className="textInput" value={props.activa} onChange={setActiva}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Numero de colegiado</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.numeroColegiado} onChange={setNumeroColegiado}/>
                </div>
            </div>
            <div className="controlContainerWide">
                <span className="controlLabel">Comentarios</span>
                <div className="inputSecundaryContainer">
                    <textarea type="text" className="textFieldInput" value={props.comentario} onChange={setComentarios}/>
                </div>
            </div>
        </div>
        <div className="crudControls">
            <div className="guardarBtn" onClick={props.guardarFn}><i class="bi bi-floppy"></i></div>
            <div className="cancelarBtn" onClick={props.cancelarFn}><i class="bi bi-x-lg"></i></div>
        </div>
    </div>
};
