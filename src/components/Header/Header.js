import './Header.css';

import { Link } from 'react-router-dom';

import Logo from '../../assets/Logo.jpg'

export default function Header () {
    return <div className='headerContainer'>
        <div className='headerLogoContainer'>
            <img src={Logo} className='headerLogo' />
            <h1 className='headerTitle'>Medical Register</h1>
        </div>
        <div className='headerLinks'>
            <Link to='/patient/basic/crud' className='headerLink'>Pacientes</Link>
            <Link to='/user/basic/crud' className='headerLink'>Usuarios</Link>
            <Link to='/date/crud' className='headerLink'>Citas</Link>
            <Link to='/medicalServices/crud' className='headerLink'>Servicios Medicos</Link>
            <Link to='/workShifts/crud' className='headerLink'>Turnos</Link>
        </div>
    </div>
}