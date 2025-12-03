import './SocialMediaLogos.css'
import type React from "react";

interface MediaProps{
    logo: string;
    text: string;
}

const LogoMedia: React.FC<MediaProps> = ({logo, text}) =>{
    const getIcon = (platform: string) => {
        switch(platform) {
            case 'facebook':
                return '📘';
            case 'instagram':
                return '📷';
            case 'whatsapp':
                return '💬';
            default:
                return '🔗';
        }
    };

    return(
        <div className='social'>
            <a href="#">
                <span className='icon'>{getIcon(logo)}</span>
                <p>{text}</p>
            </a>
        </div>
    )
}

export default LogoMedia;