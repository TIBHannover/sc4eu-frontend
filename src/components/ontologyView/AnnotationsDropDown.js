import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import styled from 'styled-components';
import { fontStyled } from '../../styledComponents/styledFont';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';

class AnnotationsDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false,
            selectedPrefix: '',
            modelTextareaValue: '',
            annotationType: '',
            annotationLang: ''
        };
    }

    componentDidUpdate = (prevProps, prevState) => {};

    renderAnnotations = itemOfInterest => {
        const allAnnotations = [];
        for (const annotation in itemOfInterest.annotations) {
            if (itemOfInterest.annotations.hasOwnProperty(annotation)) {
                const subAnnotation = itemOfInterest.annotations[annotation];
                for (const sub in subAnnotation) {
                    if (subAnnotation.hasOwnProperty(sub)) {
                        subAnnotation[sub].forEach(item => {
                            allAnnotations.push({ prefix: annotation, type: item });
                        });
                    }
                }
            }
        }
        if (allAnnotations.length === 0) {
            return <StyledSpan>No Annotations Available</StyledSpan>;
        }
        const mappedAnnotations = allAnnotations.map(item => {
            return (
                /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
                <div
                    key={'itemId_' + item.prefix + item.type}
                    style={{ display: 'block', overflow: 'hidden' }}
                >
                    <StyledSpan>{item.prefix}</StyledSpan>
                    <div style={{ marginLeft: '1rem' }}>
                        <StyledSpan>{item.type}</StyledSpan>
                    </div>
                </div>
                /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
            );
        });

        return mappedAnnotations;
    };

    render() {
        return (
            <div key={'annotaions_' + this.props.itemIdentifier} className="root" style={{ padding: '2px 5px' }}>
                <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, paddingLeft: '1%', width: '100%' }}>
                    <StyledSpan style={{ fontWeight: 'bold' }}>Annotation :</StyledSpan>
                    <CardBody style={{ padding: '5px', width: '100%', overflow: 'hidden' }}>
                        {this.renderAnnotations(this.props.itemOfInterest)}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

AnnotationsDropDown.propTypes = {
    itemType: PropTypes.string.isRequired,
    itemIdentifier: PropTypes.string.isRequired,
    itemOfInterest: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        rrModel: state.ResourceRelationModelReducer
    };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationsDropDown);

const StyledSpan = styled.span`
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;
