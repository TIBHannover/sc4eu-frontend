import defaultConfig from '../default/config';
import logo from './public/logo.svg';
import logoDark from './public/logo-dark.svg';

/** Vocabulary Development Support Tool: only the vocabulary part of the portal. */
const config = {
    ...defaultConfig,
    portalName: 'VDST NFDI4ING',
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
    home: { logo, logoDark, logoAlt: 'NFDI4Ing Logo', logoWidth: { xs: '10rem', md: '15rem', xl: '20rem' } }
};

export default config;
