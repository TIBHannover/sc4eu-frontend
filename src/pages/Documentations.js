import React, { Component } from 'react';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import UserRole from '../assets/images/UserRole.jpg';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';
import { fontStyled } from '../styledComponents/styledFont';

class Documentations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isreadmore: false,
            isreadmoreFrameworkText: false,
            isreadmoreUserGuidance: false
        };
    }

    toggleReadmore = () => {
        this.setState({ isreadmore: !this.state.isreadmore });
    };

    toggleReadmoreFrameworkText = () => {
        this.setState({ isreadmoreFrameworkText: !this.state.isreadmoreFrameworkText });
    };

    toggleReadmoreUserGuidance = () => {
        this.setState({ isreadmoreUserGuidance: !this.state.isreadmoreUserGuidance });
    };

    render() {

        const UserGuidance =
            'A commonly agreed terminology is essential for efficient communication in a project involving various stakeholders. ' +
            'In SC4EU, all project partners are therefore invited to collect relevant terms, required for consistent in- and external information exchange.';

        return (
            <div style={{ width: '100%', height: '100%', overflowY: 'auto', paddingBottom: '3%' }}>
                <StyledDiv>
                    <h3 style={{ textAlign: 'center', paddingBottom: '2%', paddingTop: '2%' }}>What the Portal will do for you</h3>
                    <h5>Connecting Domain Experts with Knowledge Engineers</h5>
                    <StyledText>
                        <>{UserGuidance}</>
                    </StyledText>
                    <h5>About Term structure</h5>
                    <StyledText>
                        A term consists of at least one Label (e.g., “Demand”) and a Definition (e.g., “Demand represents the quantity of products
                        requested by customers”), as well as optional additional details. Everyone is invited to add new terms to the portal. All such
                        collected term details can be next discussed via the portal and adjustments made accordingly. E.g. “The definition should be
                        revised to consider XYZ. I propose to change it to …..”. During such discussions, each term remains in a “Draft” status. The
                        discussion and revision of terms bring them after a while to a next level of maturity. We want to make this explicit by
                        changing its status indication. Possible values are “Accepted” and “Not-Accepted”. This status change can only be achieved
                        through a joint and transparent agreement process, which we call “Consensus”. To reach a consensus for changing the status a
                        given threshold of participants must be met and a 2/3 majority must be achieved.
                    </StyledText>
                    <h5>How to participate in a consensus</h5>
                    <StyledText>
                        <ol>
                            <li>Please visit the                         <a
                                style={{ color: colorStyled.SECONDARY.link }}
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://service.tib.eu/vocab/vocabulary_support"
                            >
                                Vocabulary Development
                            </a> and login. If you are not registered yet, please follow the instructions.</li>
                            <li>Open the Information Hub, by clicking on the respective button on the upper part of the window.</li>
                            <li>
                                Here you have two choices:
                                <ol type="a">
                                    <li>
                                        Terms with Discussion: here you find all terms that are currently under discussion. If you check the box “Only
                                        my mentions”, you will see only those where your input was directly requested.
                                    </li>
                                    <li>
                                        Terms with active Consensus: here you find entries where we are asking for your opinion to either Approve or
                                        Reject a request (see description below).
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </StyledText>
                    <h5>Consensus workflow: Do we only support these two types?</h5>
                    <StyledText>
                        <ol>
                            <li>
                                If the current consensus asks for <em>Change term status to Accept</em>:
                                <ol type="a">
                                    <li>
                                        Agree: means you agree to all Term Details. With a majority of this vote the general term Status will change
                                        to Accepted.
                                    </li>
                                    <li>
                                        Not Agree: you are not satisfied with the current Term Details. With a majority of this votes the general term
                                        status will stay Draft. Further discussion and refinement is needed before starting a new consensus.
                                    </li>
                                </ol>
                            </li>
                            <li>
                                If the current consensus asks for <em>Change term status to Not Accepted</em>:
                                <ol type="a">
                                    <li>Agree: means you are agreeing that the term Status is set to Not Accepted.</li>
                                    <li>
                                        Not Agree: you want to keep this Term for now. Its status will stay Draft and further discussion and
                                        refinement is needed before starting a new consensus.
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </StyledText>
                </StyledDiv>
            </div>
        );
    }
}

Documentations.propTypes = {};

export default Documentations;

const StyledDiv = styled.div`
    padding-left: 20%;
    padding-right: 20%;
    font-family: ${fontStyled.fontFamily};

    @media (max-width: ${MAX_WIDTH}) {
        padding-left: 10%;
        padding-right: 10%;
    }
`;

const StyledText = styled.p`
    color: ${colorStyled.TEXTCOLOR};
    white-space: pre-wrap;
    text-align: justify;
    font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};

    @media (max-width: ${MAX_WIDTH}) {
        font-size: ${fontStyled.fontSize.MobileViewNormalText};
    }
`;
