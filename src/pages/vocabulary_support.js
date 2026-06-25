import React from 'react';
import AddVocabulary from '../components/VocabularySupport/AddVocabularyModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyledVocabularySupportDiv } from '../styledComponents/styledComponents';
const Vocabulary_support = props => {
    return (
        <StyledVocabularySupportDiv>
            {props.user ? (
                <AddVocabulary currentUser={props.user} />
            ) : (
                <h3 style={{ textAlign: 'center', marginTop: '30px' }}> Please Login to use the Vocabulary Development Support Service </h3>
            )}
        </StyledVocabularySupportDiv>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

Vocabulary_support.propTypes = {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

export default connect(mapStateToProps)(Vocabulary_support);

