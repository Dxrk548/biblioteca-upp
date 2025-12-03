import './Pie.css'
import LogoMedia from "./SocialMediaLogos";

function Pie(){
    return(
        <div className="pie">
            <div className="media">
                <LogoMedia logo="facebook" text="Lee mas "></LogoMedia>
                <LogoMedia logo="instagram" text="comtactanos"></LogoMedia>
                <LogoMedia logo="whatsapp" text="+52 429 125 7289"></LogoMedia>
            </div>
            <div className="credits">
                <p>© 2025 Biblioteca. Todos los derechos reservados.</p>
                <p>Créditos del desarrollo para Yovani, Baldemar y JoseManuel.</p>
            </div>
        </div>
    )
}

export default Pie