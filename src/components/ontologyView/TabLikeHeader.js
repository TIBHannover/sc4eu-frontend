import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { ButtonContainer, IndicatorItem, CollapsableBodyContainer } from 'styledComponents/styledComponents';

const TabLikeHeader = props => {
    const [expand, setExpand] = useState(true);
    const toggle = () => setExpand(!expand);
    return (
        <div style={{ paddingRight: '10px' }}>
            {createHeader(props.position, props.title, props.collapsable, expand, toggle)}
            {createBody(props.title, props.position, props.children, props.collapsable, expand, props.minHeight, props.maxHeight)}
        </div>
    );
};

const createHeader = (pos, title, collapse = false, expand, toggleFunction) => {
    return (
        <div
            style={{
                width: '50%',
                color: '#fff',
                backgroundColor: '#e86161',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                marginLeft: pos === 'left' ? 0 : '50%'
            }}
            key={'containerHeaderKey' + title}
        >
            {title}
            {collapse ? (
                <ButtonContainer
                    key={'someKey' + title}
                    size="sm"
                    color="secondary"
                    className="btn-secondary"
                    expanded={expand}
                    duration={500}
                    style={{
                        margin: '0 0',
                        flexGrow: '1',
                        display: 'flex',
                        alignSelf: 'center',
                        width: '20px',
                        height: '20px',
                        borderRadius: '20px',
                        padding: 0,
                        border: 'solid 1px',
                        borderColor: '#525252',
                        float: 'right',
                        right: '10px',
                        top: '2px',
                        position: 'relative',
                        zIndex: 100
                    }}
                    onClick={toggleFunction}
                >
                    <Icon icon={faAngleLeft} className="align-self-center" style={{ marginLeft: '4px', fontSize: '20px' }} />
                </ButtonContainer>
            ) : (
                ''
            )}
        </div>
    );
};
const createBody = (title, pos, children, collapseable, expand, minHeight, maxHeight) => {
    return (
        <CollapsableBodyContainer
            id={'tlh_bodyOf' + title}
            collapsable={collapseable}
            expand={expand}
            minHeight={minHeight}
            maxHeight={maxHeight}
            style={{
                width: '100',
                backgroundColor: 'white',
                marginBottom: '10px',
                border: '1px solid gray',
                borderTopLeftRadius: pos === 'left' ? 0 : '10px',
                borderTopRightRadius: pos === 'left' ? '10px' : 0,
                borderBottomLeftRadius: pos === 'left' ? 0 : '10px',
                borderBottomRightRadius: pos === 'left' ? '10px' : 0,
                overflow: 'hidden',
                color: '#505565'
            }}
        >
            {children}
            {collapseable && !expand && (
                <IndicatorItem
                    expanded={expand}
                    style={{
                        position: 'relative',
                        float: 'right',
                        marginTop: -maxHeight + minHeight - 15 + 5,
                        height: '15px',
                        width: '100%',
                        backgroundColor: '#c4c4c4',
                        borderRadius: '15px'
                    }}
                />
            )}
        </CollapsableBodyContainer>
    );
};

TabLikeHeader.propTypes = {
    title: PropTypes.string.isRequired,
    position: PropTypes.string,
    collapsable: PropTypes.bool,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    children: PropTypes.any
};

export default TabLikeHeader;
