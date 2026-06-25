import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import { StyledAnnotationsDropdownSpan } from 'styledComponents/styledComponents';
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
            return <StyledAnnotationsDropdownSpan>No Annotations Available</StyledAnnotationsDropdownSpan>;
        }
        const mappedAnnotations = allAnnotations.map(item => {
            return (
                /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
                <div
                    key={'itemId_' + item.prefix + item.type}
                    style={{ display: 'block', overflow: 'hidden' }}
                >
                    <StyledAnnotationsDropdownSpan>{item.prefix}</StyledAnnotationsDropdownSpan>
                    <div style={{ marginLeft: '1rem' }}>
                        <StyledAnnotationsDropdownSpan>{item.type}</StyledAnnotationsDropdownSpan>
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
                    <StyledAnnotationsDropdownSpan style={{ fontWeight: 'bold' }}>Annotation :</StyledAnnotationsDropdownSpan>
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

