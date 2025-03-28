import styled from 'styled-components';

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
