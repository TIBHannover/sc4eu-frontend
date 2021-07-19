import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const filter = createFilterOptions();

class SearchAutocomplete extends Component {
    constructor(props) {
        super(props);
        this.value = '';
        this.count = 0;
    }

    render() {
        return (
            <div style={{ width: '100%', height: '30px', padding: '0', marginLeft: '5px' }}>
                <Autocomplete
                    size={'small'}
                    id="free-solo-demo"
                    freeSolo
                    onKeyPress={event => {
                        const value = event.target.value;
                        if (event.key === 'Enter') {
                            if (value === this.value) {
                                this.count = this.count + 1;
                            } else {
                                this.value = value;
                                this.count = 0;
                            }
                            return this.props.handleSearch(value, this.count);
                        }
                    }}
                    onInputChange={(event, value) => {
                        this.value = value;
                        if (event.type === 'click') {
                            return this.props.handleSearch(value, 0);
                        }
                    }}
                    filterOptions={(options, params) => {
                        //strangly params.inputValue is empty when there there is value from selected option
                        if (this.value !== '') {
                            params.inputValue = this.value;
                        }
                        const filtered = filter(options, params);
                        if (params.inputValue === undefined || params.inputValue === '') {
                            return [];
                        }
                        if (filtered.length > 5) {
                            return filtered.slice(0, 5);
                        }
                        return filtered;
                    }}
                    options={this.props.lookupList}
                    renderInput={params => (
                        <TextField style={{ marginTop: '0px' }} placeholder={this.props.placeholder} {...params} margin="normal" variant="outlined" />
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({});

SearchAutocomplete.propTypes = {
    lookupList: PropTypes.array.isRequired,
    handleSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchAutocomplete);
