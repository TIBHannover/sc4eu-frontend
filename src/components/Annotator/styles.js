import styled from 'styled-components';
import { colorStyled } from '../../styledComponents/styledColor';


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
      backgroundColor: colorStyled.PRIMARY.lighter,
      borderColor: state.isFocused ? colorStyled.PRIMARY.lightMain : colorStyled.PRIMARY.light,
      boxShadow: state.isFocused ? `0 0 0 1px ${colorStyled.PRIMARY.lightMain}` : 'none',
      '&:hover': {
        borderColor: colorStyled.PRIMARY.lightMain,
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
        ? colorStyled.PRIMARY.lightMain
        : state.isFocused
        ? colorStyled.PRIMARY.light
        : '#FFFFFF',
      color: state.isSelected ? '#FFFFFF' : '#000000',
      '&:active': {
        backgroundColor: colorStyled.PRIMARY.lightMain,
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };
  
  