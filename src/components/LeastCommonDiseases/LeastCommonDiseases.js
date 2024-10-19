import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { usePDF } from 'react-to-pdf';

import DataTable from '../../components/DataTable/DataTable';
import ExportExcel from '../ExcelGenerator/ExcelGenerator';

const base_url = process.env.REACT_APP_NODE_API_BASE;

export default function LeastCommonDiseases () {
    const encabezadosEnfermedadesMenosComunes = [
        {field: 'enfermedad', text: 'Enfermedad'},
        {field: 'cantidad', text: 'Cantidad'}
    ];

    const consultarEnfermedadesMenosComunes = async () => {
        try {
            const response = await axios({
                url: `${base_url}/api/Enfermedades/menos/comunes`,
                method: 'GET',
                params: {
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin
                },
                validateStatus: () => true,
                timeout: 30000
            });

            if (response.status === 200 && response.data.status) {
                const data = [];
                for (const disease of response.data.data) {
                    data.push({
                        enfermedad: disease.ENF_nombre,
                        cantidad: disease.frecuencia,
                    });
                }
                setListaEnfermedadesMenosComunes(data);
                setListaLength(data.length);
            } else {
                setMensaje(`Error al obtener los datos del reporte, codigo: ${response.status}${response.data.message ? ' ' + response.data.message : ''}`);
            }
        } catch (error) {
            setMensaje('Error al obtener los datos del reporte: ' + error.message);
        }
    };

    const setFechaInicioFn = (e) => {
        setFechaInicio(moment(e.target.value).format('YYYY-MM-DD'));
    };

    const setFechaFinFn = (e) => {
        setFechaFin(moment(e.target.value).format('YYYY-MM-DD'));
    };

    const cancelarFn = () => {
        setFechaFin('');
        setFechaInicio('');
        setListaEnfermedadesMenosComunes([]);
        setListaLength(0)
    }

    const [fechaInicio, setFechaInicio] = useState(moment().format('YYYY-MM-DD'))
    const [fechaFin, setFechaFin] = useState(moment().format('YYYY-MM-DD'))
    const [mensaje, setMensaje] = useState('');
    const [listaEnfermedadesMenosComunes, setListaEnfermedadesMenosComunes] = useState([]);
    const [listaLength, setListaLength] = useState(0);

    const {toPDF, targetRef} = usePDF({filename: `Diagnosticos menos comunes ${fechaInicio} a ${fechaFin}-${moment().format('YYYY-MM-DD hh:mm')}.pdf`});

    return <div className='modalDiv'>
        <div className="reportSearcherInputs">
            <div className="controlContainer">
                <span className="controlLabel">Fecha de inicio</span>
                <div className="inputSecundaryContainer">
                    <input type="date" className="dateInput" value={fechaInicio} onChange={setFechaInicioFn}/>
                </div>
            </div>
            <div className="controlContainer">
                <span className="controlLabel">Fecha de inicio</span>
                <div className="inputSecundaryContainer">
                    <input type="date" className="dateInput" value={fechaFin} onChange={setFechaFinFn}/>
                </div>
            </div>
            <div className='messageContainer'>
                <p>{mensaje}</p>
            </div>
            <div className="crudFormControls">
                <button className="guardarBtn" onClick={consultarEnfermedadesMenosComunes}><i class="bi bi-search"></i></button>
                <button className="cancelarBtn" onClick={cancelarFn}><i class="bi bi-x-lg"></i></button>
                {listaLength > 0 && <button className="guardarBtn" onClick={toPDF}><i class="bi bi-cloud-arrow-down"></i> PDF</button>}
                {listaLength > 0 && <ExportExcel 
                        excelData={listaEnfermedadesMenosComunes} 
                        fileName={`Diagnosticos menos comunes ${fechaInicio} a ${fechaFin}-${moment().format('YYYY-MM-DD hh:mm')}`}
                        sheetName="Reporte"
                    />
                }
            </div>
        </div>
        <div className='TableModalComponent' ref={targetRef}>
            <h1>Diagnosticos menos comunes {fechaInicio} a {fechaFin}</h1>
            <DataTable 
                headers={encabezadosEnfermedadesMenosComunes}
                rows={listaEnfermedadesMenosComunes}
                wide={true}
            />
        </div>
    </div>
}