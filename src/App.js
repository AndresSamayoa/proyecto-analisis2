import './App.css';

import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('./components/Header/Header'));
const PatientBasicScreen = lazy(() => import('./screens/PatientBasic/PatientBasicScreen'));
const MedicBasicScreen = lazy(() => import('./screens/MedicBasicScreen/MedicBasicScreen'));
const DateScreen = lazy(() => import('./screens/DateScreen/DateScreen'));
const MedicalServices = lazy(() => import('./screens/MedicalServicesScreen/MedicalServicesScreen'));
const WorkShiftScreen = lazy(() => import('./screens/WorkShiftScreen/WorkShiftScreen'));
const MedicationScreen = lazy(() => import('./screens/MedicationScreen/MedicationScreen'));
const DiseaseScreen = lazy(() => import('./screens/DiseaseScreen/DiseaseScreen'));
const DateDetailScreen = lazy(() => import('./screens/DateDetailScreen/DateDetailScreen'));
const DateReport = lazy(() => import('./components/DateReport/DateReport'));
const ScreenReport = lazy(() => import('./screens/ReportsScreen/ReportsScreen'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </>
  );
}

export default App;
