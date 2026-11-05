import defaultConfig from '../default/config';

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
    newTermsDays: 1
};

export default config;
