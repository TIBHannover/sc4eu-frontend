import React from 'react';
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
import { PartnersGrid, PartnerCard, PartnerLogo } from 'styledComponents/styledComponents';
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
        url: 'https://www.imt.fr/'
    }
];

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
