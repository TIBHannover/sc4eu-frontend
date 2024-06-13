import React from 'react';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import styled from 'styled-components';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';
import AddVocabulary from '../components/VocabularySupport/AddVocabularyModal';

export default function Vocabulary_support() {
    return (
        <StyledDiv>
            {/*<StyledHeadingDiv> Vocabulary Development Support </StyledHeadingDiv>*/}
            <AddVocabulary />
        </StyledDiv>
    );
}

const StyledHeadingDiv = styled.div`
    border-radius: 10px 10px 0 0;
    color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    background-color: ${colorStyled.PRIMARY.dark};
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const StyledDiv = styled.div`
    padding-top: 10px;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 2%;
    font-family: ${fontStyled.fontFamily};
    overflow-y: auto;

    @media (max-width: ${MAX_WIDTH}) {
        padding-left: 5%;
        padding-right: 5%;
    }
`;
