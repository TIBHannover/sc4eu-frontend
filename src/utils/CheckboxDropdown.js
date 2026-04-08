import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';
import PropTypes from 'prop-types';

const CheckboxDropdown = ({ options, defaultOptions = [], title, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
    const dropdownRef = useRef(null);

    // Notify parent of initial selection
    useEffect(() => {
        if (onChange && defaultOptions.length > 0) {
            onChange(defaultOptions);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = option => {
        let updatedSelection;

        if (selectedOptions.includes(option)) {
            updatedSelection = selectedOptions.filter(item => item !== option);
        } else {
            updatedSelection = [...selectedOptions, option];
        }

        setSelectedOptions(updatedSelection);

        if (onChange) {
            onChange(updatedSelection);
        }
    };

    return (
        <DropdownContainer ref={dropdownRef}>
            <DropdownButton onClick={handleToggleDropdown}>
                <span>
                    {title} ({selectedOptions.length} selected)
                </span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </DropdownButton>

            {isOpen && (
                <DropdownMenu>
                    {options.map((option, index) => (
                        <DropdownItem key={index}>
                            <Checkbox
                                type="checkbox"
                                id={`option-${index}`}
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleCheckboxChange(option)}
                            />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
        </DropdownContainer>
    );
};

export default CheckboxDropdown;

const DropdownContainer = styled.div`
    position: relative;
    width: 250px;
    margin: 10px;
`;

const DropdownButton = styled.button`
    width: 100%;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${colorStyled.background};
    border: 1px solid ${colorStyled.outline};
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: ${colorStyled.primary}1A;
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: ${colorStyled.background};
    border: 1px solid ${colorStyled.outline};
    border-radius: 4px;
    margin-top: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const DropdownItem = styled.div`
    padding: 8px 12px;
    border-bottom: 1px solid ${colorStyled.outlineVariant};
    display: flex;
    align-items: center;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: ${colorStyled.primary}1A;
    }
`;

const Checkbox = styled.input`
    margin-right: 8px;
    cursor: pointer;
`;

const Label = styled.label`
    cursor: pointer;
    flex-grow: 1;
    margin: 0;
`;

CheckboxDropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultOptions: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
