/**
 * Settings of the default instance (the Ontology Curation Portal). Other instances import this file and
 * override what differs, see src/instances/vdst/config.js. Selected by REACT_APP_INSTANCE (see rsbuild.config.mjs).
 */
const config = {
    /** Name of the portal in e-mails that the browser composes (project access, role change requests). */
    portalName: 'SC4',

    /** Parts of the app that can be switched off for an instance (menu entries, buttons, texts). */
    features: {
        projects: true,
        webprotege: true,
        annotator: true,
        mpc: true,
        eurostat: true,
        partners: true,
        sapLogin: true
    },

    /** Sections of the documentation page, in the order they appear. See src/pages/Documentation.js. */
    documentationGroups: ['intro', 'ocp', 'vocabulary', 'outro'],

    /** Terms created within this many days are shown as "new" in the vocabulary table. */
    newTermsDays: 7
};

export default config;
