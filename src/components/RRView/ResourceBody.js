import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyledResourceBody, StyledBodyInput, PRIMARY } from './StyledComponents';

import { transformResourceToTTL, calculateBodyRows } from '../../mappers/ResToTTL';
import CardWidgetVis from '../ontologyView/CardWidgetVis';
import AnnotationsDropDown from '../ontologyView/AnnotationsDropDown';

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

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        const resDef = this.props.resourceContext;
        const prefixList = this.props.metaInformation.prefixList.longToShort;
        const content = transformResourceToTTL(resDef, prefixList);
        const numRowsRequired = calculateBodyRows(content);
        // if (numRowsRequired === 0) {
        //     return <> </>;
        // } else {
        return (
            <StyledResourceBody ref={this.bodyRef}>
                <CardWidgetVis
                    itemIdentifier={this.props.resourceContext.identifier}
                    itemContext={this.props.resourceContext}
                    isExpanded={this.props.isBodyExpanded}
                    itemType="Resource"
                    // callback={this.updateSiblings}
                />
                {numRowsRequired !== 0 && (
                    <div style={{ height: 'auto', display: 'flex', width: '100%', maxHeight: '100%', maxWidth: '100%' }}>
                        <StyledBodyInput
                            style={{ background: PRIMARY.lighter }}
                            type="textarea"
                            display={'flex'}
                            width="100%"
                            readOnly
                            name="text"
                            id="ontologyContent"
                            rows={numRowsRequired}
                            value={content}
                        />
                    </div>
                )}
            </StyledResourceBody>
        );
    }
}

const mapStateToProps = state => {
    return {
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};

ResourceBody.propTypes = {
    resourceContext: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    metaInformation: PropTypes.object.isRequired,
    isBodyExpanded: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceBody);
