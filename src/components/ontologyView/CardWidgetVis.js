import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class CardWidgetVis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFlipFlop: false
        };
    }

    componentDidMount() {}

    componentDidUpdate = (prevProps, prevState) => {
        // we initialize the card based on the target item id for rendering
    };

    componentWillUnmount() {}

    render() {
        return (
            <div style={{ backgroundColor: 'green', height: '250px', border: '1px solid black', borderTop: 'none' }}>
                {this.props.isExpanded && <div>HELLLO000000000</div>}
            </div>
        );
    }
}
CardWidgetVis.propTypes = {
    height: PropTypes.number,
    itemIdentifier: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    rrModel: PropTypes.object.isRequired,
    isExpanded: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        rrModel: state.ResourceRelationModelReducer
    };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CardWidgetVis);
