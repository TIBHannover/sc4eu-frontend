import { URL_EXPRESS_SERVER } from 'constants/services';
import { submitGetRequest } from '../network/networkRequests';
export const userUrl = `${URL_EXPRESS_SERVER}/user/header`;
export const getUserInformation = () => {
    return submitGetRequest(`${userUrl}`, {}, true);
};
