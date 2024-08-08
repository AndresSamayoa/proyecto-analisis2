import './App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import PatientBasicScreen from './screens/PatientBasic/PatientBasicScreen';
import UserBasicScreen from './screens/UserBasicScreen/UserBasicScreen';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/patient/basic/crud' element={<PatientBasicScreen />}/>
        <Route path='/user/basic/crud' element={<UserBasicScreen />}/>
      </Routes>
    </>
  );
}

export default App;
