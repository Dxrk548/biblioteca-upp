import './Encabezado.css'
import logoPizza from '../assets/images/logo.webp'

function Encabezado(){
    return(
        <div className="encabezado">
            <div className="encabezado-content">
                <img src={logoPizza} alt="Logo" className='logo'/>
                <div className="encabezado-text">
                    <h1 className='titulo'>📚 Biblioteca UPP</h1>
                    <p className='slogan'>Sistema de Administración de Biblioteca</p>
                </div>
            </div>
        </div>
    )
}

export default Encabezado;