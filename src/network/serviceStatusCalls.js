import { URL_SERVICES_STATUS } from '../constants/services';
import { submitGetRequest } from './networkRequests';

/**
 * Asks the Express server what is configured and running.
 * @returns {Promise<{services: Object<string, 'up'|'down'|'not configured'>, oauth: Object<string, boolean>}>}
 */
export const getServicesStatus = () => submitGetRequest(URL_SERVICES_STATUS);
