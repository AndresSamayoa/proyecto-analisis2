import DataTable from '../DataTable/DataTable';

export default function MedicalSummaryItem (props) {
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
    const diagnosticos = [];

    for (const diagnostic of props.diagnosticos) {
        diagnosticos.push(
            <div className='DiagnosticReportItem'>
                <div className="TitleContainer" key={'diagnostic-'+diagnostic.diagnosticoId}>
                    <h3>Diagnostico: {diagnostic.enfermedad}</h3>
                </div>
                <div className='DiagnosticReportItemHead'>
                    <p className='DiagnosticReportItemHeadComment'>{diagnostic.observacion}</p>
                    {Number(diagnostic.totalRecetas).length > 0 && <h4 className='DiagnosticReportItemHeadComment'>Total receta: Q.{Number(diagnostic.totalRecetas).toFixed(2)}</h4>}
                </div>
                {diagnostic.medicamentos.length > 0 && <DataTable 
                    headers={medicationsColumns}
                    rows={diagnostic.medicamentos}
                    wide={true}
                />}
            </div>
        );
    };

    console.log(diagnosticos)
    
    return <>
    <div className='CRUDBasicScreen'>
        <div className="TitleContainer">
            <h1>Cita con {props.nombresMedico} {props.fechaCita}</h1>
        </div>
        <div className="TitleContainer">
            <h3>Total a pagar: Q.{props.totalCita.toFixed(2)}</h3>
        </div>
        <div className='VitalSignsReportObject'>
            <div className='VitalSignsReportTable'>
                <div className="VitalSignsReportTitle">
                    <h2>Signos vitales</h2>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>PA: {props.presionArterial}</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>T: {props.temperatura} C</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>FC: {props.frecuenciaCardiaca} LPM</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>FR: {props.respiraciones} RPM</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>SO2: {props.so2} RPM</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>GTM: {props.glucosa} mg/dl</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>Peso: {props.peso} lbs</p>
                </div>
                <div className='VitalSignsReportItem'>
                    <p>Estatura: {props.estatura} m</p>
                </div>
            </div>
        </div>
        {
            props.serviciosMedicos.length > 0 && (<>
                <div className="TitleContainer">
                    <h2>Servicios medicos</h2>
                </div>
                <DataTable 
                    headers={servicesColumns}
                    rows={props.serviciosMedicos}
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

