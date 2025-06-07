import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedin, FaGoogle } from 'react-icons/fa';

const socialIcons = [
    { id: 1, icon: <FaGoogle />, name: 'Google' },
    { id: 2, icon: <FaFacebookF />, name: 'Facebook' },
    { id: 3, icon: <FaLinkedin />, name: 'Linkedin' },
    { id: 4, icon: <FaTwitter />, name: 'Twitter' },
];


const Footer = () => {
    return (
        <div className='d-flex flex-column justify-content-center gap-3 align-items-center'>
            <div className='d-flex gap-3'>
                {socialIcons.map((icon) => (
                    <div
                        key={icon.id}
                        className='d-flex justify-content-center align-items-center rounded-circle text-dark border-1 border border-black'
                        style={{ width: '48px', height: '48px', cursor: 'pointer' }}
                    >
                        <span className='fs-6'>{icon.icon}</span>
                    </div>
                ))}
            </div>

            <div className='d-flex flex-column align-items-center justify-content-center mt-2'>
                <p className='fs-6 fw-normal'>Example@gmail.com</p>
                <p className='fs-6 fw-bold'>© 2023 TimesWorld. All rights reserved.</p>
            </div>

        </div>
    );
}

export default Footer;
