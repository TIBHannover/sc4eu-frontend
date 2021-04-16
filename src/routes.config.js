import LoggedIn from './pages/loggedIn';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PageA from './pages/PageA';
import PageB from './pages/PageB';
import ServiceStatus from './pages/ServiceStatus';

import ROUTES from './constants/routes';
import OntologyIndexing from './pages/OntologyIndexing';
import ViewOntology from './pages/ViewOntology';
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
        component: NotFound
    }
];

export default routes;
