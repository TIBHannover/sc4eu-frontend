import { Input } from 'reactstrap';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { fontStyled } from '../../styledComponents/styledFont';
import { styled } from '@mui/material';

export const StyledResourceBody = styled('div')(({ theme }) => ({
    backgroundColor: 'red',
    color: 'black',
    width: '100%',
    background: 'white',
    
    '&:focus': {
        outline: 'none'
    },

    '&::-moz-focus-inner': {
        border: 0
    },
    wordBreak: 'normal',
    whiteSpace: 'nowrap',
    padding: '2px',
    position: 'relative'
}));

export const StyledBodyInput = styled(Input)(({ theme }) => ({
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    outline: 0,
    wordBreak: 'normal',
    whiteSpace: 'pre',
    borderRadius: 0,
    padding: '2px',
    paddingBottom: 0,
    marginBottom: '1px',
    display: 'block',

    '&:focus': {
        background: theme.palette.background.paper,
        outline: 0,
        padding: '0 4px',
        borderRadius: 0,
        display: 'block'
    }
}));

export const StyledResourceAndRelationHeader = styled('div')(({ theme }) => ({
    padding: '5px',
    color: theme.palette.text.primary,
    backgroundColor: `${props => (props.experimentalLayout ? theme.palette.primary.main : props.isHighlighted === true ? theme.palette.text.primary : theme.palette.secondary.light)}`,
    '&:focus': {
        outline: 'none'
    },
    '&::-moz-focus-inner': {
        border: 0
    }
}));

export const StyledContentView = styled('div')(({ theme }) => ({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: fontStyled.fontSize.NormalText,

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSIze: fontStyled.fontSize.LaptopAndDesktopViewNormalText
    }
}));

export const HeaderValueInput = styled(Input)(({ theme }) => ({
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    outline: 0,
    border: 'dotted 2px red',
    borderRadius: 0,
    padding: '0 4px',
    display: 'block',
    height: '22px !important',

    minWidth: '150px',
    margin: '1px 1px',

    '&:focus': {
        background: theme.palette.background.paper,
        outline: 0,
        border: 'dotted 2px green',
        padding: '0 4px',
        borderRadius: 0,
        display: 'block'
    }
}));

export const StyledHeaderDiv = styled('div')(({ theme }) => ({
    margin: '10px 6px 10px 10px',
    borderRadius: '7px 7px 7px 7px',
    color: theme.palette.primary.contrastText,
    backgroundCOlor: theme.palette.primary.main,
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
