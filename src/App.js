import './App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import PatientBasicScreen from './screens/PatientBasic/PatientBasicScreen';
import MedicBasicScreen from './screens/MedicBasicScreen/MedicBasicScreen';
import DateScreen from './screens/DateScreen/DateScreen';
import MedicalServices from './screens/MedicalServicesScreen/MedicalServicesScreen';
import WorkShiftScreen from './screens/WorkShiftScreen/WorkShiftScreen';
import MedicationScreen from './screens/MedicationScreen/MedicationScreen';
import DiseaseScreen from './screens/DiseaseScreen/DiseaseScreen';
import DateDetailScreen from './screens/DateDetailScreen/DateDetailScreen';
import DateReport from './components/DateReport/DateReport';
import ScreenReport from './screens/ReportsScreen/ReportsScreen';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/patient/basic/crud' element={<PatientBasicScreen />}/>
        <Route path='/medic/basic/crud' element={<MedicBasicScreen />}/>
        <Route path='/date/crud' element={<DateScreen />}/>
        <Route path='/date/detail/:citaId' element={<DateDetailScreen />}/>
        <Route path='/date/summary/:citaId' element={<DateReport />}/>
        <Route path='/medicalServices/crud' element={<MedicalServices />}/>
        <Route path='/workShifts/crud' element={<WorkShiftScreen />}/>
        <Route path='/medications/crud' element={<MedicationScreen />}/>
        <Route path='/diseases/crud' element={<DiseaseScreen />}/>
        <Route path='/reports' element={<ScreenReport />}/>
      </Routes>
    </>
  );
}

export default App;
