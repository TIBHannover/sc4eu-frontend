import React from 'react';
import styled from 'styled-components';

import TIB_Logo from '../assets/images/TIB_Logo_en.png';
import infinion_logo from '../assets/images/infineon.png';
import chipsju_logo from '../assets/images/chipsju.png';
import ASML_logo from '../assets/images/ASML_logo.png';
import sap_logo from '../assets/images/sap-logo.png';
import tilburg_logo from '../assets/images/tilburg_university_logo.png';
import hua_logo from '../assets/images/hua_logo_black.png';
import NXP_logo from '../assets/images/NXP-Logo.png';
import st_logo from '../assets/images/st-logo.png';
import Involvation_logo from '../assets/images/Involvation_logo.png';
import ftk_logo from '../assets/images/FTK.png';
import Mines_logo from '../assets/images/MINES.png';

// Sample data: Replace these with your actual partner logos and links
const partners = [
    {
        name: 'TIB',
        logo: TIB_Logo,
        url: 'https://www.tib.eu/de/'
    },
    {
        name: 'Infinion',
        logo: infinion_logo,
        url: 'https://www.infineon.com/'
    },
    {
        name: 'ChipsJU',
        logo: chipsju_logo,
        url: 'https://www.chips-ju.europa.eu/'
    },
    {
        name: 'ASML',
        logo: ASML_logo,
        url: 'https://www.asml.com/en'
    },
    {
        name: 'SAP',
        logo: sap_logo,
        url: 'https://www.sap.com/index.html'
    },
    {
        name: 'tilburg university',
        logo: tilburg_logo,
        url: 'https://www.tilburguniversity.edu/'
    },
    {
        name: 'HUA',
        logo: hua_logo,
        url: 'https://www.hua.gr/en/'
    },
    {
        name: 'NXP',
        logo: NXP_logo,
        url: 'https://www.nxp.com/'
    },
    {
        name: 'STMicroelectronics',
        logo: st_logo,
        url: 'https://www.st.com/'
    },
    {
        name: 'Involvation',
        logo: Involvation_logo,
        url: 'https://www.involvation.com/'
    },
    {
        name: 'FTK',
        logo: ftk_logo,
        url: 'https://www.ftk.de/'
    },
    {
        name: 'Mines',
        logo: Mines_logo,
        url: 'http://www.imt.fr/'
    }
];

const PartnersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 56px;
    padding: 70px 40px;
    justify-items: center;
    align-items: center;
    background: #f8f9fa;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
`;

const PartnerCard = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 38px 28px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    text-decoration: none;
    cursor: pointer;
    width: 260px;
    height: 200px;
    min-width: 260px;
    min-height: 200px;
    max-width: 260px;
    max-height: 200px;
    box-sizing: border-box;
    &:hover {
        transform: translateY(-12px) scale(1.09);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
    }
`;

const PartnerLogo = styled.img`
    width: 180px;
    height: 80px;
    margin-bottom: 22px;
    object-fit: contain;
    transition: filter 0.2s;
    display: block;
    ${PartnerCard}:hover & {
        filter: brightness(1.1) drop-shadow(0 2px 12px #aaa);
    }
`;

const PartnerName = styled.div`
    font-size: 1rem;
    color: #333;
    font-weight: 500;
    text-align: center;
`;

const Partners = () => (
    <div>
        <h3 style={{ textAlign: 'center', paddingBottom: '2%', paddingTop: '1%' }}>Our Project Partners </h3>
        <PartnersGrid>
            {partners.map((partner, idx) => (
                <PartnerCard key={idx} href={partner.url} target="_blank" rel="noopener noreferrer" title={partner.name}>
                    <PartnerLogo src={partner.logo} alt={partner.name + ' logo'} />
                    {/* <PartnerName>{partner.name}</PartnerName> */}
                </PartnerCard>
            ))}
        </PartnersGrid>
    </div>
);

export default Partners;
