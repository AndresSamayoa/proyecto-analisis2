import './App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import PatientBasicScreen from './screens/PatientBasic/PatientBasicScreen';
import UserBasicScreen from './screens/UserBasicScreen/UserBasicScreen';
import DateScreen from './screens/DateScreen/DateScreen';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/patient/basic/crud' element={<PatientBasicScreen />}/>
        <Route path='/user/basic/crud' element={<UserBasicScreen />}/>
        <Route path='/date/crud' element={<DateScreen />}/>
      </Routes>
    </>
  );
}

export default App;
