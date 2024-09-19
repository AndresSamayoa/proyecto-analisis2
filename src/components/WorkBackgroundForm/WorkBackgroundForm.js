
export default function WorkBackgroundForm(props) {

    const setEmpresa = (e) => {
        props.setEmpresa(e.target.value)
    };

    const setPuesto = (e) => {
        props.setPuesto(e.target.value)
    };

    const setFechaInicio = (e) => {
        props.setFechaInicio(e.target.value)
    };

    const setFechaFin = (e) => {
        props.setFechaFin(e.target.value)
    };

    const setAccidenteLaboral = (e) => {
        props.setAccidenteLaboral(e.target.value)
    };

    const setEnfermedadLaboral = (e) => {
        props.setEnfermedadLaboral(e.target.value)
    };

    return <div className='crudForm'>
        <div className="crudInputs">
            <div className="controlContainer">
                <span className="controlLabel">Empresa</span>
                <div className="inputSecundaryContainer">
                    <input className="textInput" value={props.empresa} onChange={setEmpresa}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Puesto</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.puesto} onChange={setPuesto}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha inicio</span>
                <div className="inputSecundaryContainer">
                    <input type="date" className="dateInput" value={props.fechaInicio} onChange={setFechaInicio}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha fin</span>
                <div className="inputSecundaryContainer">
                    <input type="date" className="dateInput" value={props.fechaFin} onChange={setFechaFin}/>
                </div>
            </div>
            <div className="controlContainerWide">
                <span className="controlLabel">Accidentes laborales</span>
                <div className="inputSecundaryContainer">
                    <textarea type="text" className="textFieldInput" value={props.accidenteLaboral} onChange={setAccidenteLaboral}/>
                </div>
            </div>
            <div className="controlContainerWide">
                <span className="controlLabel">Enfermedades laborales</span>
                <div className="inputSecundaryContainer">
                    <textarea type="text" className="textFieldInput" value={props.enfermedadLaboral} onChange={setEnfermedadLaboral}/>
                </div>
            </div>
        </div>
        <div className="crudFormControls">
            <div className="guardarBtn" onClick={props.guardarFn}><i class="bi bi-floppy"></i></div>
            <div className="cancelarBtn" onClick={props.cancelarFn}><i class="bi bi-x-lg"></i></div>
        </div>
    </div>
};
