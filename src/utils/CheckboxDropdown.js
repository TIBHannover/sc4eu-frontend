import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DropdownSpan, DropdownContainer, DropdownButton, StyledCheckdropdownDropdownMenu, StyledDropdownItem, Checkbox, StyledCheckDropdownLabel } from 'styledComponents/styledComponents';

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
                <DropdownSpan>
                    {title} ({selectedOptions.length} selected)
                </DropdownSpan>
                <DropdownSpan>{isOpen ? '▲' : '▼'}</DropdownSpan>
            </DropdownButton>

            {isOpen && (
                <StyledCheckdropdownDropdownMenu>
                    {options.map((option, index) => (
                        <StyledDropdownItem key={index}>
                            <Checkbox
                                type="checkbox"
                                id={`option-${index}`}
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleCheckboxChange(option)}
                            />
                            <StyledCheckDropdownLabel htmlFor={`option-${index}`}>{option}</StyledCheckDropdownLabel>
                        </StyledDropdownItem>
                    ))}
                </StyledCheckdropdownDropdownMenu>
            )}
        </DropdownContainer>
    );
};

export default CheckboxDropdown;

CheckboxDropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultOptions: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
