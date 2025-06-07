import React from 'react';

interface NavbarProps {
    selectedRegion: string;
    onRegionChange: (region: string) => void;
}
const Navbar: React.FC<NavbarProps> = ({ selectedRegion, onRegionChange }) => {

    const regions = ['All', 'Asia', 'Europe'];

    return (

        <div className='px-3 py-2'>

            <div className='d-flex justify-content-between align-items-center'>
                <h4 style={{ color: '#3D3D3D' }} className='fw-bold'>Countries</h4>
                <div className='d-flex gap-4'>
                    {regions.map(region => (
                        <button
                            key={region}
                            onClick={() => onRegionChange(region)}
                            className={`btn btn-link p-0 ${selectedRegion === region ? 'fw-bold text-decoration-underline' : ''}`}
                            style={{ color: '#3D3D3D', textDecoration: 'none' }}
                        >
                            {region}
                        </button>
                    ))}
                </div>
            </div>

            <div className="d-flex align-items-center mt-5">
                <div className="flex-grow-1 border-2 border-top border-black mb-3"></div>
                <span className="mx-3 fs-3 fw-bold">WELCOME</span>
                <div className="flex-grow-1 border-2 border-top border-black mt-3"></div>
            </div>

        </div>
    );
};

export default Navbar;
