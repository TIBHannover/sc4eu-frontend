import styled from 'styled-components';
import { colorStyled } from '../../styledComponents/styledColor';
import { SMALL_SCREEN_WIDTH } from '../../styledComponents/styledComponents';

export const ContentContainer = styled.div`
    width: 75%;
    margin: 0 auto;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: visible;
    min-height: 0;

    & .MuiPaper-root {
        overflow: visible;
    }

    & .MuiTableContainer-root {
        overflow-x: auto;
    }
    
    @media (max-width: ${SMALL_SCREEN_WIDTH}) {
      width: 90vw;    
      max-width: 90vw;
    }
`;

export const HighlightedLabel = styled.span`
    background-color: ${({ isHovered, color }) => (isHovered ? '#ffeb3b' : color)};
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #ffeb3b;
    }
`;

export const InputContainer = styled.div`
    margin-bottom: 20px;
`;

export const HelperTextContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const HelperText = styled.div`
    margin-right: 8px;
`;

export const AnnotatedText = styled.div`
    margin-bottom: 20px;
`;

export const ScrollableText = styled.div`
    height: 180px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    background-color: #f9f9f9;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const ErrorText = styled.div`
    color: ${({ theme }) => theme.palette?.error?.main || '#f44336'};
    margin-right: 8px;
`;

export const lightSelectStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: colorStyled.surfaceContainerLow,
        borderColor: state.isFocused ? colorStyled.primary : colorStyled.outline,
        boxShadow: state.isFocused ? `0 0 0 1px ${colorStyled.primary}` : 'none',
        '&:hover': {
            borderColor: colorStyled.primary,
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
            ? colorStyled.primaryContainer
            : state.isFocused
                ? `${colorStyled.primary}1A`
                : colorStyled.surface,
        color: state.isSelected
            ? colorStyled.onPrimaryContainer
            : colorStyled.onSurface,
        '&:active': {
            backgroundColor: colorStyled.primaryContainer,
        },
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: colorStyled.surfaceContainerHigh,
        zIndex: 9999,
    }),
};

