import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import moment from 'moment';
import axios from 'axios';

import DataTable from '../../components/DataTable/DataTable';

const base_url = process.env.REACT_APP_NODE_API_BASE;

export default function DateReport () {
    const {citaId} = useParams();
    const servicesColumns = [
        {field: 'nombre', text: 'Nombre'},
        {field: 'valor', text: 'Valor'},
    ];
    const medicationsColumns = [
        {field: 'nombre', text: 'Nombre'},
        {field: 'comentario', text: 'Comentario'},
        {field: 'cantidad', text: 'Cantidad'},
        {field: 'subtotal', text: 'Subtotal'},
    ];

    const getData = async () => {
        try {
            const response = await axios({
                url: base_url+'/api/citas/ficha/medica/'+ citaId,
                method: 'GET',
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status == 200 && response.data.status) {
                const servicesData = [];
                const diagnosticsData = [];
                const data = response.data.data;

                setNombresPaciente(data.PAC_nombres);
                setNombresMedico(data.MED_nombres);
                setFechaCita(data.CIT_fecha ? moment(response.data.data.CIT_fecha).format('DD-MM-YY HH:mm') : '');
                setTotalCita(data.CIT_costo_total);

                if (data.signosVitales) {
                    setPresionArterial(data.signosVitales.SIG_presion_arterial);
                    setTemperatura(data.signosVitales.SIG_temperatura);
                    setFrecuenciaCardiaca(data.signosVitales.SIG_frecuencia_cardiaca);
                    setRespiraciones(data.signosVitales.SIG_respiraciones);
                    setSo2(data.signosVitales.SIG_oxigenacion);
                    setGlucosa(data.signosVitales.SIG_glucosa);
                    setPeso(data.signosVitales.SIG_peso);
                    setEstatura(data.signosVitales.SIG_estatura);
                }

                for (const service of data.procedimientos) {
                    servicesData.push({
                        nombre: service.CPM_nombre,
                        valor: 'Q.' + Number(service.PRO_valor).toFixed(2),
                    });
                }

                setServiciosMedicos(servicesData);

                for (const diagnostic of data.diagnosticos) {
                    const medications = [];
                    for (const detalle of diagnostic.DetalleRecetas) {
                        medications.push({
                            nombre: detalle.MED_nombre_medicamento,
                            comentario: detalle.DET_comentarios,
                            cantidad: detalle.DET_cantidad,
                            subtotal: 'Q.'+ Number(detalle.DET_subtotal).toFixed(2)
                        });
                    }
                    diagnosticsData.push(
                        <div className='DiagnosticReportItem'>
                            <div className="TitleContainer" key={'diagnostic-'+diagnostic.DiagnosticoId}>
                                <h3>Diagnostico: {diagnostic.Enfermedad}</h3>
                            </div>
                            <div className='DiagnosticReportItemHead'>
                                <p className='DiagnosticReportItemHeadComment'>{diagnostic.Observacion}</p>
                                {medications.length > 0 && <h4 className='DiagnosticReportItemHeadComment'>Total receta: Q.{Number(diagnostic.TotalRecetas).toFixed(2)}</h4>}
                            </div>
                            {medications.length > 0 && <DataTable 
                                headers={medicationsColumns}
                                rows={medications}
                                wide={true}
                            />}
                        </div>
                    );
                }

                setDiagnosticos(diagnosticsData);
            } else {
                setMensaje(`Error al obtener los datos del reporte, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos del reporte: ' + error.message);
        }
    };

    // Datos Cita
    const [nombresPaciente, setNombresPaciente] = useState('');
    const [nombresMedico, setNombresMedico] = useState('');
    const [fechaCita, setFechaCita] = useState('');
    const [totalCita, setTotalCita] = useState(0);
    // Signos vitales
    const [presionArterial, setPresionArterial] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [frecuenciaCardiaca, setFrecuenciaCardiaca] = useState('');
    const [respiraciones, setRespiraciones] = useState('');
    const [so2, setSo2] = useState('');
    const [glucosa, setGlucosa] = useState('');
    const [peso, setPeso] = useState('');
    const [estatura, setEstatura] = useState('');
    // Servicios Medicos
    const [serviciosMedicos, setServiciosMedicos] = useState([]);
    // Diagnosticos
    const [diagnosticos, setDiagnosticos] = useState([]);
    // Mensaje
    const [mensaje, setMensaje] = useState('');

    const {toPDF, targetRef} = usePDF({filename: `Resumen cita ${nombresPaciente} con ${nombresMedico} ${fechaCita}.pdf`});

    useEffect(()=> {getData()},[]);

    return <>
    <div className="crudFormControls">
        <button className="guardarBtn" onClick={toPDF}><i class="bi bi-cloud-arrow-down"></i> PDF</button>
    </div>
    <div className='CRUDBasicScreen' ref={targetRef}>
        <div className="TitleContainer">
            <h1>Cita {nombresPaciente} con {nombresMedico} {fechaCita}</h1>
        </div>
        <div className="TitleContainer">
            <h3>Total a pagar: Q.{totalCita.toFixed(2)}</h3>
        </div>
        <div className='VitalSignsReportObject'>
            <div className='VitalSignsReportTable'>
                <div className="VitalSignsReportTitle">
                    <h2>Signos vitales</h2>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>PA: {presionArterial}</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>T: {temperatura} C</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>FC: {frecuenciaCardiaca} LPM</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>FR: {respiraciones} RPM</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>SO2: {so2} RPM</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>GTM: {glucosa} mg/dl</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>Peso: {peso} lbs</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>Estatura: {estatura} m</p>
                </div>
            </div>
        </div>
        {
            serviciosMedicos.length > 0 && (<>
                <div className="TitleContainer">
                    <h2>Servicios medicos</h2>
                </div>
                <DataTable 
                    headers={servicesColumns}
                    rows={serviciosMedicos}
                    wide={true}
                />
                </>
            )
        }
        <div className='DiagnosticReportList'>
            <div className="TitleContainer">
                <h2>Diagnosticos</h2>
            </div>
            {diagnosticos}
        </div>
    </div>
    </>
}

