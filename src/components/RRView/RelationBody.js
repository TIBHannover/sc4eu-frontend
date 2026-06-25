import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { transformRelationToTTL, calculateBodyRows } from '../../mappers/RelationToTTL';
import CardWidgetVis from '../ontologyView/CardWidgetVis';
import { withTheme } from '@emotion/react';
import { StyledRelationBody, StyledBodyInput } from 'styledComponents/styledComponents';

class RelationBody extends Component {
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
        const resDef = this.props.relationContext;
        const prefixList = this.props.metaInformation.prefixList.longToShort;
        const content = transformRelationToTTL(resDef, prefixList);
        const numRowsRequired = calculateBodyRows(content);
        const { theme } = this.props;
        return (
            <StyledRelationBody ref={this.bodyRef}>
                <CardWidgetVis
                    itemIdentifier={this.props.relationContext.itemIdentifier}
                    itemContext={this.props.relationContext}
                    isExpanded={this.props.isBodyExpanded}
                    itemType="Relation"
                />
                {numRowsRequired !== 0 && (
                    <div style={{ height: 'auto', display: 'flex', width: '100%', maxHeight: '100%', maxWidth: '100%' }}>
                        <StyledBodyInput
                            type="textarea"
                            display={'flex'}
                            width="100%"
                            readOnly
                            name="text"
                            id="ontologyContent"
                            rows={numRowsRequired}
                            value={content}
                            style={{ padding: '2px', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
                        />
                    </div>
                )}
            </StyledRelationBody>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        relations: state.ResourceRelationModelReducer.relations,
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};

RelationBody.propTypes = {
    relationContext: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isBodyExpanded: PropTypes.bool.isRequired,
    initialRendering: PropTypes.bool.isRequired,
    metaInformation: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(RelationBody));

