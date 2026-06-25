import React from 'react';
import { Annotator } from '../components/Annotator/Annotator';
import { StyledAnnotatorPageDiv } from 'styledComponents/styledComponents';

const AnnotatorPage = props => {
    return (
        <StyledAnnotatorPageDiv>
            <Annotator />
        </StyledAnnotatorPageDiv>
    );
};

export default AnnotatorPage;
