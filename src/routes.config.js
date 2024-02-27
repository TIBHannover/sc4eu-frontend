import LoggedIn from './pages/loggedIn';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PageA from './pages/PageA';
import PageB from './pages/PageB';
import ServiceStatus from './pages/ServiceStatus';
import Dashboard from './pages/dashboard';
import UserProfile from './pages/UserProfile';
import UserSettings from './pages/UserSettings';

import ROUTES from './constants/routes';
import OntologyIndexing from './pages/OntologyIndexing';
import ViewOntology from './pages/ViewOntology';
import Documentations from './pages/Documentations';
import Dataprotections from './pages/Dataprotections';
import Imprint from './pages/Imprint';
import vocabulary_support from './pages/vocabulary_support';
import FAQ from './pages/FAQ';
import Training from './pages/Training';
import WebProtege from './pages/WebProtege';
import ProjectList from './pages/ProjectList';
import EmailVerify from './pages/EmailVerify';
import loginFailedRedirect from './pages/loginFailedRedirect';
import resetPassword from './pages/resetPassword';

const routes = [
    {
        path: ROUTES.HOME,
        exact: true,
        component: Home
    },
    {
        path: ROUTES.SERVICE_STATUS,
        exact: true,
        component: ServiceStatus
    },

    {
        path: ROUTES.ADMIN_DASHBOARD,
        exact: true,
        component: Dashboard
    },

    {
        path: ROUTES.WEBPROTEGE,
        exact: true,
        component: WebProtege
    },

    {
        path: ROUTES.USER_PROFILE,
        exact: true,
        component: UserProfile
    },
    {
        path: ROUTES.USER_SETTINGS,
        exact: true,
        component: UserSettings
    },

    // DUmmY CASES TO CHECK HISTORY IN REDUX STATE
    {
        path: ROUTES.PAGEA,
        exact: true,
        component: PageA
    },

    {
        path: ROUTES.VIEW_ONTOLOGY,
        exact: true,
        component: ViewOntology
    },

    {
        path: ROUTES.PAGEB,
        exact: true,
        component: PageB
    },

    {
        path: ROUTES.LOGGED_IN,
        exact: true,
        component: LoggedIn
    },

    {
        path: ROUTES.ONTOLOGY,
        exact: true,
        component: OntologyIndexing
    },

    {
        path: ROUTES.PROJECT,
        exact: true,
        component: ProjectList
    },
    {
        path: ROUTES.Documentations,
        exact: true,
        component: Documentations
    },
    {
        path: ROUTES.Dataprotections,
        exact: true,
        component: Dataprotections
    },
    {
        path: ROUTES.Imprint,
        exact: true,
        component: Imprint
    },
    {
        path: ROUTES.VOCABULARY_SUPPORT,
        exact: true,
        component: vocabulary_support
    },
    {
        path: ROUTES.FAQ,
        exact: true,
        component: FAQ
    },
    {
        path: ROUTES.TRAINING,
        exact: true,
        component: Training
    },
    {
        path: ROUTES.EMAIL_VERIFY,
        exact: true,
        component: EmailVerify
    },
    {
        path: ROUTES.LOGIN_FAILED,
        exact: true,
        component: loginFailedRedirect
    },
    {
        path: ROUTES.RESET_PASSWORD,
        exact: true,
        component: resetPassword
    },

    {
        component: NotFound
    }
];

export default routes;
