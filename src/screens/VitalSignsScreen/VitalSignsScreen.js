
import { useState } from 'react';

import VitalSignsForm from '../../components/VitalSignsForm/VitalSignsForm';


export default function VitalSignsScreen (props) {

    const cancelarForm = () => {
        setPresionArterial('');
        setTemperatura('');
        setFrecuenciaCardiaca('');
        setRespiraciones('');
        setSo2('');
        setGlucosa('');
        setPeso('');
        setTalla('');
        setMasaCorporal('');
        console.log('Limpio');
    };
    
    const guardarForm = () => {
        props.saveVitalSigns(presionArterial,temperatura,frecuenciaCardiaca,respiraciones,so2,glucosa,peso,talla,masaCorporal);
    };

    const [presionArterial, setPresionArterial] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [frecuenciaCardiaca, setFrecuenciaCardiaca] = useState('');
    const [respiraciones, setRespiraciones] = useState('');
    const [so2, setSo2] = useState('');
    const [glucosa, setGlucosa] = useState('');
    const [peso, setPeso] = useState('');
    const [talla, setTalla] = useState('');
    const [masaCorporal, setMasaCorporal] = useState('');
    
    return <div className='CRUDBasicScreen'>
        <div className="TitleContainer">
            <h1>Signos vitales</h1>
        </div>
        <VitalSignsForm 
            cancelarFn={cancelarForm}
            guardarFn={guardarForm}

            presionArterial={presionArterial}
            temperatura={temperatura}
            frecuenciaCardiaca={frecuenciaCardiaca}
            respiraciones={respiraciones}
            so2={so2}
            glucosa={glucosa}
            peso={peso}
            talla={talla}
            masaCorporal={masaCorporal}

            setPresionArterial={setPresionArterial}
            setTemperatura={setTemperatura}
            setFrecuenciaCardiaca={setFrecuenciaCardiaca}
            setRespiraciones={setRespiraciones}
            setSo2={setSo2}
            setGlucosa={setGlucosa}
            setPeso={setPeso}
            setTalla={setTalla}
            setMasaCorporal={setMasaCorporal}
        />
    </div>
}