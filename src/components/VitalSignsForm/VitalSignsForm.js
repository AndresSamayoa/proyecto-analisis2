
export default function VitalSignsForm(props) {

    const setPresionArterial = (e) => {
        props.setPresionArterial(e.target.value)
    };

    const setTemperatura = (e) => {
        props.setTemperatura(e.target.value)
    };

    const setFrecuenciaCardiaca = (e) => {
        props.setFrecuenciaCardiaca(e.target.value)
    };

    const setRespiraciones = (e) => {
        props.setRespiraciones(e.target.value)
    };

    const setSo2 = (e) => {
        props.setSo2(e.target.value)
    };

    const setGlucosa = (e) => {
        props.setGlucosa(e.target.value)
    };

    const setPeso = (e) => {
        props.setPeso(e.target.value)
    };

    const setEstatura = (e) => {
        props.setEstatura(e.target.value)
    };

    return <div className='crudForm'>
        <div className="crudInputs">
            <div className="controlContainer">
                <span className="controlLabel">Presion arterial</span>
                <div className="inputSecundaryContainer">
                    <input className="textInput" value={props.presionArterial} onChange={setPresionArterial}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Temperatura (C)</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.temperatura} onChange={setTemperatura}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Frecuencia Cardíaca</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.frecuenciaCardiaca} onChange={setFrecuenciaCardiaca}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Respiraciones por minuto</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.respiraciones} onChange={setRespiraciones}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">SO2</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.so2} onChange={setSo2}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Glucosa</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.glucosa} onChange={setGlucosa}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Peso en Lbs</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.peso} onChange={setPeso}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Estatura en m</span>
                <div className="inputSecundaryContainer">
                    <input type="text" className="textInput" value={props.estatura} onChange={setEstatura}/>
                </div>
            </div>
        </div>
        <div className="crudFormControls">
            <button className="guardarBtn" onClick={props.guardarFn}><i class="bi bi-floppy"></i></button>
        </div>
    </div>
};
