import defaultConfig from '../default/config';
import logo from './sc4eu_logo.png';

/** Vocabulary Development Support Tool: only the vocabulary part of the portal. */
const config = {
    ...defaultConfig,
    portalName: 'VDST SC4EU',
    features: {
        ...defaultConfig.features,
        projects: false,
        webprotege: false,
        annotator: false,
        mpc: false,
        eurostat: false,
        partners: false,
        sapLogin: false
    },
    documentationGroups: ['vocabulary'],
    newTermsDays: 1,
    home: { logo, logoAlt: 'SC4EU Logo', logoWidth: { xs: '10rem', md: '12rem', xl: '15rem' } }
};

export default config;
