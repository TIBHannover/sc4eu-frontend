import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
//import Autocomplete from '@material-ui/lab/Autocomplete';
import Autocomplete from '@material-ui/core/Autocomplete';
import { createFilterOptions } from '@material-ui/core/Autocomplete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const filter = createFilterOptions();

class SearchAutocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preservedValue: this.props.preservedSearchFilterValue
        };
        this.count = 0;
        this.value = '';
    }
    componentDidMount() {}

    render() {
        return (
            <div style={{ width: '100%', height: '30px', padding: '0', marginLeft: '5px' }}>
                <Autocomplete
                    size={'small'}
                    id="free-solo-demo"
                    freeSolo
                    value={this.props.preservedSearchFilterValue}
                    onChange={() => {}}
                    onKeyDown={event => {
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
                        if (event === null && value !== '') {
                            this.count = 0;
                            return this.props.handleSearch(value, 0);
                        }
                        if (event === null && this.state.preservedValue !== '') {
                            this.count = 0;
                            return this.props.handleSearch(value, 0);
                        }
                        if (event.type === 'click') {
                            this.count = 0;
                            return this.props.handleSearch(value, 0);
                        }
                    }}
                    filterOptions={(options, params) => {
                        //strangely params.inputValue is empty when there there is value from selected option
                        if (this.value !== '') {
                            params.inputValue = this.value;
                        }
                        if (params.inputValue === undefined || params.inputValue === '') {
                            return [];
                        }
                        const filtered = filter(options, params);
                        const uniqueFiltered = [...new Set(filtered)];
                        if (uniqueFiltered.length > 5) {
                            return uniqueFiltered.slice(0, 5);
                        }
                        return uniqueFiltered;
                    }}
                    getOptionSelected={(option, value) => option === value}
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
    placeholder: PropTypes.string.isRequired,
    preservedSearchFilterValue: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchAutocomplete);
