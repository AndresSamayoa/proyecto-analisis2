import { useState } from 'react';
import Modal from 'react-modal';

import LeastCommonDiseases from '../../components/LeastCommonDiseases/LeastCommonDiseases';
import MedicalSummaryReport from '../../components/MedicalSummaryReport/MedicalSummaryReport';


export default function ScreenReport () {
    Modal.setAppElement('#root');

    const [leastCommonDiseasesModal, setLeastCommonDiseasesModal] = useState(false);
    const [medicalSummaryModal, setMedicalSummaryModal] = useState(false);

    return <div className='ReportScreen'>
        <div className="TitleContainer">
            <h1>Reportes</h1>
        </div>
        <div className='ReportOptions'>
            <button
                className='SearcherBtn'
                onClick={()=>{setLeastCommonDiseasesModal(true)}}
            >
                Diagnosticos menos comunes
            </button>
            <button
                className='SearcherBtn'
                onClick={()=>{setMedicalSummaryModal(true)}}
            >
                Ficha medica
            </button>
        </div>
        <Modal
            isOpen={medicalSummaryModal}
            onRequestClose={()=>{setMedicalSummaryModal(false)}}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <div className='modalDiv'>
                <div className='closeModalDiv'>
                    <i onClick={()=>{setMedicalSummaryModal(false)}} class="bi bi-x closeIcon" />
                </div>
            <MedicalSummaryReport />
            </div>
        </Modal>
        <Modal
            isOpen={leastCommonDiseasesModal}
            onRequestClose={()=>{setLeastCommonDiseasesModal(false)}}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <div className='modalDiv'>
                <div className='closeModalDiv'>
                    <i onClick={()=>{setLeastCommonDiseasesModal(false)}} class="bi bi-x closeIcon" />
                </div>
            <LeastCommonDiseases />
            </div>
        </Modal>
    </div>
}
