import { styled } from '@mui/material';
import { SMALL_SCREEN_WIDTH } from '../../styledComponents/styledComponents';

export const ContentContainer = styled('div')(({ theme }) => ({
    width: '75%',
    margin: '0 auto',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    overflowY: 'visible',
    minHeight: 0,

    '.MuiPaper-root': {
        overflow: 'visible'
    },

    '.MuiTableContainer-root': {
        overflowX: 'auto'
    },
    
    [`@media (max-width: ${SMALL_SCREEN_WIDTH})`]: {
      width: '90vw',    
      maxWidth: '90vw'
    }
}));

export const HighlightedLabel = styled('span')(({ theme }) => ({
    backgroundColor: `${({ isHovered, color }) => (isHovered ? '#ffeb3b' : color)}`,
    cursor: 'pointer',
    padding: '2px 4px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',

    '&:hover': {
        backgroundColor: '#ffeb3b'
    }
}));

export const InputContainer = styled('div')(({ theme }) => ({
    marginBottom: '20px'
}));

export const HelperTextContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center'
}));

export const HelperText = styled('div')(({ theme }) => ({
    marginRight: '8px'
}));

export const AnnotatedText = styled('div')(({ theme }) => ({
    marginBottom: '20px'
}));

export const ScrollableText = styled('div')(({ theme }) => ({
    height: '180px',
    overflowY: 'auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: theme.palette.background.default
}));

export const ButtonContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    marginBottom: '10px'
}));

export const ErrorText = styled('div')(({ theme }) => ({
    color: theme.palette.error.main,
    marginRight: '8px'
}))

export const lightSelectStyles = styled('div')(({ theme }) => ({
    control: (base, state) => ({
        ...base,
        backgroundColor: theme.palette.background.default,
        borderColor: state.isFocused ? theme.palette.primary.light : theme.palette.secondary.light,
        boxShadow: state.isFocused ? `0 0 0 1px ${theme.palette.primary.light}` : 'none',
        '&:hover': {
            borderColor: theme.palette.primary.light,
        },
        minHeight: '28px',
        fontSize: '12px',
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '0 6px',
        height: '28px',
    }),
    input: (base) => ({
        ...base,
        margin: 0,
        padding: 0,
    }),
    dropdownIndicator: (base) => ({
        ...base,
        padding: '2px',
    }),
    indicatorsContainer: (base) => ({
        ...base,
        height: '28px',
    }),
    option: (base, state) => ({
        ...base,
        fontSize: '12px',
        padding: '4px 8px',
        backgroundColor: state.isSelected
            ? theme.palette.primary.light
            : state.isFocused
                ? `${theme.palette.secondary.light}`
                : theme.palette.background.default,
        color: state.isSelected
            ? theme.palette.primary.contrastText
            : theme.palette.text.primary,
        '&:active': {
            backgroundColor: theme.palette.primary.light,
        },
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: theme.palette.background.paper,
        zIndex: 9999,
    }),
}));

