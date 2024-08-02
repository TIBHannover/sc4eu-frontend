import React from 'react';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import styled from 'styled-components';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';
import AddVocabulary from '../components/VocabularySupport/AddVocabularyModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Vocabulary_support = props =>{
    console.log('Vocabulary_support');
    console.log(props.user);
    return (
        <StyledDiv>
            {/*<StyledHeadingDiv> Vocabulary Development Support </StyledHeadingDiv>*/}
            {props.user? <AddVocabulary /> : <h3 style={{textAlign: 'center', marginTop: '30px'}}> Please Login to use the Vocabulary Development Support Service </h3>}
        </StyledDiv>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

Vocabulary_support.propTypes = {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

export default connect(mapStateToProps)(Vocabulary_support);

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
