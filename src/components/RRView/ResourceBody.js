import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { Input } from 'reactstrap';

import { transformResourceToTTL, calculateBodyRows } from '../../mappers/ResToTTL';

class ResourceBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vb_width: 0,
            vb_height: 0
        };

        this.bodyRef = createRef();
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        // compute the refence height;
        console.log(' Resource body updates');
    }

    render() {
        const resDef = this.props.resourceContext;
        const prefixList = this.props.metaInformation.prefixList.longToShort;
        const content = transformResourceToTTL(resDef, prefixList);
        const numRowsRequired = calculateBodyRows(content);
        // console.log('CONTENT', content, 'requires', numRowsRequired);
        // check if we have a body;
        if (numRowsRequired === 0) {
            return <> </>;
        } else {
            return (
                <StyledResourceBody ref={this.bodyRef}>
                    <StyledBodyInput
                        type="textarea"
                        readOnly
                        name="text"
                        id="ontologyContent"
                        rows={numRowsRequired}
                        value={content}
                        style={{ padding: '2px' }}
                    />
                </StyledResourceBody>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        resources: state.ResourceRelationModelReducer.resources,
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};

ResourceBody.propTypes = {
    resourceContext: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    metaInformation: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceBody);

const StyledResourceBody = styled.div`
    background-color: red;
    padding: 5px;
    border: 1px solid black;
    border-top: none;
    padding: 5px;
    color: black;
    width: 100%;
    background: white;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
    word-break: none;
    white-space: nowrap;
`;

export const StyledBodyInput = styled(Input)`
    background: #fff;
    color: black;
    outline: 0;
    word-break: none;
    white-space: pre;

    border-radius: 0;
    padding: 0;
    display: block;

    &:focus {
        background: #fff;
        color: black;
        outline: 0;
        padding: 0 4px;
        border-radius: 0;
        display: block;
    }
`;
