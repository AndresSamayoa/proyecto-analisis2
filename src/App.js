import './App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import PatientBasicScreen from './screens/PatientBasic/PatientBasicScreen';
import MedicBasicScreen from './screens/MedicBasicScreen/MedicBasicScreen';
import DateScreen from './screens/DateScreen/DateScreen';
import MedicalServices from './screens/MedicalServicesScreen/MedicalServicesScreen';
import WorkShiftScreen from './screens/WorkShiftScreen/WorkShiftScreen';
import MedicationScreen from './screens/MedicationScreen/MedicationScreen';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/patient/basic/crud' element={<PatientBasicScreen />}/>
        <Route path='/medic/basic/crud' element={<MedicBasicScreen />}/>
        <Route path='/date/crud' element={<DateScreen />}/>
        <Route path='/medicalServices/crud' element={<MedicalServices />}/>
        <Route path='/workShifts/crud' element={<WorkShiftScreen />}/>
        <Route path='/medications/crud' element={<MedicationScreen />}/>
      </Routes>
    </>
  );
}

export default App;
