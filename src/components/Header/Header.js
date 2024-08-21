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
            <Link to='/patient/basic/crud' className='headerLink'><b>Pacientes</b></Link>
            <Link to='/user/basic/crud' className='headerLink'><b>Usuarios</b></Link>
            <Link to='/date/crud' className='headerLink'><b>Citas</b></Link>
            <Link to='/medicalServices/crud' className='headerLink'><b>Servicios Medicos</b></Link>
            <Link to='/workShifts/crud' className='headerLink'><b>Turnos</b></Link>
            <Link to='/medications/crud' className='headerLink'><b>Medicinas</b></Link>
        </div>
    </div>
}