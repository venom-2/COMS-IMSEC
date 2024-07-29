import React from 'react'
import Image from '../../assets/LandingPageImage.svg';
import Logo from '../../assets/IMSLogo.jpg';

const Loading = () => {
    return (
        <div>
            <div className="position-relative vh-100 vw-100">
                <img src={Image} alt="background" className="position-absolute top-0 start-0 w-100 h-100" style={{ objectFit: 'cover' }} />
                {/* <div className="position-absolute top-50 start-50 translate-middle">
                    <img src={Logo} alt="logo" className="img-fluid" style={{ maxHeight: '50%', maxWidth: '50%' }} />
                </div> */}
            </div>
        </div>
    )
}

export default Loading