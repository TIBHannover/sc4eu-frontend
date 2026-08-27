import { styled } from '@mui/material';
import { Collapse, Button } from 'reactstrap';

export const CollapsibleItem = styled(Collapse)(({ theme }) => ({
    width: '100%',
}));

export const GraphVisButton = styled(Button)(({ theme }) => ({
    padding: 0,
    width: '49%',
    backgroundColor: '#ad2f38',
    textAlign: 'center',
    position: 'relative',
    borderRadius: '5px',
    marginRight: '1%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTop: 'none',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
}));

export const WidgetVisButton = styled(Button)(({ theme }) => ({
    padding: 0,
    width: '50%',
    backgroundColor: '#cccccc',
    color: 'black',
    textAlign: 'center',
    position: 'relative',
    borderRadius: '5px',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTop: 'none',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
}));