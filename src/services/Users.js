import { URL_EXPRESS_SERVER } from 'constants/services';
import { submitGetRequest } from '../network/networkRequests';
export const userUrl = `${URL_EXPRESS_SERVER}/user/`;
export const getUserInformation = () => {
    return submitGetRequest(`${userUrl}`, {}, true);
};
