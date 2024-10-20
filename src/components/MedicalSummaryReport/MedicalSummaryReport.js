import { useState, useEffect } from 'react';
import { usePDF } from 'react-to-pdf';
import moment from 'moment';
import axios from 'axios';

import ComboboxSearch from '../ComboboxSearch/ComboboxSearch';
import MedicalSummaryItem from '../MedicalSummaryItem/MedicalSummaryItem';

const base_url = process.env.REACT_APP_NODE_API_BASE;

export default function MedicalSummaryReport () {
    const getData = async () => {
        try {
            const response = await axios({
                url: base_url+'/api/pacientes/ficha/medica/'+ pacienteId,
                method: 'GET',
                validateStatus: () => true,
                timeout: 30000
            });

            if (pacienteId < 1) {
                setMensaje('Debe seleccionar a un paciente')
                return ;
            }

            if (response.status == 200 && response.data.status) {
                const dates = []
                const data = response.data.data;

                setNombresPaciente(data.pac_nombre + ' ' + data.pac_apellido);
                setFechaNacimiento(data.pac_fecha_nacimiento ? moment(data.pac_fecha_nacimiento).format('DD-MM-YYYY') : '');
                setCui(data.pac_cui);

                for (const cita of data.citas) {
                    const services = [];
                    const diagnostics = [];

                    for (const service of cita.procedimientos) {
                        services.push({
                            nombre: service.CPM_nombre,
                            valor: 'Q.' + Number(service.PRO_valor).toFixed(2),
                        });
                    }
    
                    for (const diagnostic of cita.diagnosticos) {
                        const medications = [];
                        for (const detalle of diagnostic.DetalleRecetas) {
                            medications.push({
                                nombre: detalle.MED_nombre_medicamento,
                                comentario: detalle.DET_comentarios,
                                cantidad: detalle.DET_cantidad,
                                subtotal: 'Q.'+ Number(detalle.DET_subtotal).toFixed(2)
                            });
                        }

                        diagnostics.push({
                            diagnosticoId: diagnostic.DiagnosticoId,
                            enfermedad: diagnostic.Enfermedad,
                            observacion: diagnostic.Observacion,
                            medicamentos: medications,
                            totalRecetas: diagnostic.TotalRecetas
                        });
                    }

                    dates.push(
                        <MedicalSummaryItem 
                            nombresMedico={cita.MED_nombres}
                            fechaCita={moment(cita.CIT_fecha).format('DD-MM-YYYY hh:mm')}
                            totalCita={cita.CIT_costo_total}
                            presionArterial={cita.signosVitales.SIG_presion_arterial}
                            temperatura={cita.signosVitales.SIG_temperatura}
                            frecuenciaCardiaca={cita.signosVitales.SIG_frecuencia_cardiaca}
                            respiraciones={cita.signosVitales.SIG_respiraciones}
                            so2={cita.signosVitales.SIG_oxigenacion}
                            glucosa={cita.signosVitales.SIG_glucosa}
                            peso={cita.signosVitales.SIG_peso}
                            estatura={cita.signosVitales.SIG_estatura}
                            serviciosMedicos={services}
                            diagnosticos={diagnostics}
                        />
                    );
                }

                console.log(dates)
                setCitas(dates);
            } else {
                setMensaje(`Error al obtener los datos del reporte, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos del reporte: ' + error.message);
        }
    };

    const searchPatients = async (param) => {
        try {
            const response = await axios({
                url: `${base_url}/api/pacientes/buscar`,
                method: 'GET',
                params: {
                    parametro: param
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status === 200 && response.data.status) {
                const data = [];
                for (const patient of response.data.data) {
                    data.push({
                        value: patient.PAC_id,
                        label: patient.PAC_nombre + ' ' + patient.PAC_apellido,
                    });
                }

                setPacientes(data);
            } else {
                setMensaje(`Error al obtener los datos de pacientes, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos de pacientes: ' + error.message);
        }
    }

    const cancelarFn = () => {
        setNombresPaciente('');
        setFechaNacimiento('');
        setCui('');
        setCitas([])
        setMensaje('');
        setBuscador('');
        setPacientes([]);
        setPacienteId(0);
    };

    // Datos
    const [nombresPaciente, setNombresPaciente] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [cui, setCui] = useState('');
    const [citas, setCitas] = useState([]);
    // Mensaje
    const [mensaje, setMensaje] = useState('');
    // Buscador
    const [buscador, setBuscador] = useState('');
    const [pacientes, setPacientes] = useState([]);
    const [pacienteId, setPacienteId] = useState(0);

    const {toPDF, targetRef} = usePDF({filename: `Resumen ficha medica ${nombresPaciente} ${moment().format('YYYY-MM-DDThh:mi')}.pdf`});

    useEffect(()=> {
        if (buscador.length > 0) {
            searchPatients(buscador);   
        }
        }, 
        [buscador]
    );

    return <>
    <div className="modalDiv">
        <div className="reportSearcherInputs">
            <div className="controlContainer">
                <span className="controlLabel">Nombres del cliente</span>
                <div className="inputSecundaryContainer">
                    <ComboboxSearch 
                        setSearcher={setBuscador}
                        searcher={buscador}
                        elements={pacientes}
                        setValue={setPacienteId}
                    />
                </div>
            </div>
            <div className='messageContainer'>
                <p>{mensaje}</p>
            </div>
            <div className="crudFormControls">
                <button className="guardarBtn" onClick={getData}><i class="bi bi-search"></i></button>
                <button className="cancelarBtn" onClick={cancelarFn}><i class="bi bi-x-lg"></i></button>
                {nombresPaciente && <button className="guardarBtn" onClick={toPDF}><i class="bi bi-cloud-arrow-down"></i> PDF</button>}
            </div>
        </div>
        {nombresPaciente && <div className='TableModalComponent' ref={targetRef}>
            <div className='TitleContainer'>
                <h1>Ficha medica de {nombresPaciente}</h1>
            </div>
            <div className='TitleContainer'>
                <div  className='DiagnosticReportItemHead'>
                    <p>fecha de nacimiento: {fechaNacimiento}</p>
                    <br></br>
                    <p>CUI: {cui}</p>
                </div>
            </div>
            {citas}
        </div>}
    </div>
    </>
}
