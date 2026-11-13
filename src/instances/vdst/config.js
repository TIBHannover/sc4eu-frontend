import defaultConfig from '../default/config';
import logo from './logo.svg';

/** Vocabulary Development Support Tool: only the vocabulary part of the portal. */
const config = {
    ...defaultConfig,
    portalName: 'VDST',
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
    /** Logo on the home page (src/pages/VocabularyHome.js); logoDark is optional. */
    home: { logo, logoAlt: 'VDST Logo', logoWidth: { xs: '6rem', md: '8rem', xl: '10rem' } }
};

export default config;
