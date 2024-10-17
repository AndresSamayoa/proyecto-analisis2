import { useState } from 'react';
import Modal from 'react-modal';

import LeastCommonDiseases from '../../components/LeastCommonDiseases/LeastCommonDiseases';


export default function ScreenReport () {
    Modal.setAppElement('#root');

    const [leastCommonDiseasesModal, setLeastCommonDiseasesModal] = useState(false);

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
        </div>
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
