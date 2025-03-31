import React from 'react';
import styled from 'styled-components';
import { fontStyled } from '../styledComponents/styledFont';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import { Annotator } from '../components/Annotator/Annotator';

const StyledDiv = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 5% 2%;
    font-family: ${fontStyled.fontFamily};
    overflow-y: auto;

    @media (max-width: ${MAX_WIDTH}) {
        padding-left: 5%;
        padding-right: 5%;
    }
`;

const AnnotatorPage = props => {
    return (
        <StyledDiv>
            <Annotator />
        </StyledDiv>
    );
};

export default AnnotatorPage;
