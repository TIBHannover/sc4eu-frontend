import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OntologyCard from './OntologyCard';
import { withCookies } from 'react-cookie';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { checkFileUpdated } from '../network/GithubAPICalls';
import { getGitData } from '../network/ontologyIndexing';

class OntologyIndexCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ontologies: []
        };
    }
    componentDidMount() {
        this.setState({ ontologies: this.props.ontologies }, () => {
            this.getCommitHistory();
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    getCommitHistory = async () => {
        const { ontologies } = this.state;
        if (ontologies.length > 0) {
            const updatedOntologies = await Promise.all(
                ontologies.map(async singleOntology => {
                    if (singleOntology.lookup_type === 'online') {
                        try {
                            const lastCommit = await getGitData(singleOntology.uuid);
                            console.log(lastCommit);
                            const commitStatus = await checkFileUpdated(singleOntology.lookup_path, lastCommit);
                            if (commitStatus?.status === 'latest') {
                                singleOntology.commitStatus = 'latest';
                            } else if (commitStatus?.status === 'behind') {
                                singleOntology.commitStatus = `${commitStatus.commitsBehind} commits behind`;
                            } else {
                                console.log('An error occurred while checking the URL.');
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    return singleOntology;
                })
            );
            this.setState({ ontologies: updatedOntologies });
        }
    };

    renderOntologyCards() {
        if (this.state.ontologies.length === 0) {
            return (
                <div style={{ textAlign: 'center' }}> There are no ontologies in the data base. You can upload ontologies using the menu above </div>
            );
        } else if (this.state.ontologies.length > 0) {
            //  render the cards;
            return this.state.ontologies.map((item, index) => {
                return (
                    <OntologyCard
                        key={'OntologyCard_' + index}
                        inputData={item}
                        callback={param => {
                            this.props.reloadAfterUpdate(param);
                        }}
                        /*
                         * this is hardcoded for now, it needs to be changed.we need to add an entry to ontology Index about version
                         * */
                        ontologyVersion="Main"
                    />
                );
            });
        }
    }

    render() {
        return (
            <Scrollbars style={{ height: '67vh' }}>
                <div className="pl-1 pr-1">{this.renderOntologyCards()}</div>
            </Scrollbars>
        );
    }
}

OntologyIndexCards.propTypes = {
    ontologies: PropTypes.array.isRequired,
    reloadAfterUpdate: PropTypes.func.isRequired
};

export default withCookies(OntologyIndexCards);
