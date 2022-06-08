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
        component: NotFound
    }
];

export default routes;
