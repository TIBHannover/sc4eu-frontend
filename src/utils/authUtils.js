import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../reducers/auth';

export const useIsAuthenticated = () => {
    return useSelector(selectIsAuthenticated);
};

