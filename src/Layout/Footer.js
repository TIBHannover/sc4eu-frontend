import React, { Component } from 'react';
import ChipsJu_logo from '../assets/images/chipsju.png';
import { withRouter } from 'react-router-dom';
import Logo from '../assets/images/sc4eu_logo.png';
import { StyledBodyDiv, StyledLeftDiv, StyledRightDiv, StyledFooterImage, StyledFooterText, StyledLogo } from 'styledComponents/styledComponents';
import { Box, Breadcrumbs, Link, List, ListItem } from '@mui/material';
import ROUTES from 'constants/routes';
import { withTheme } from '@emotion/react';
import { Link as RouterLink } from 'react-router-dom';

class Footer extends Component {
    render() {
        const { theme } = this.props;

        return (
            <StyledBodyDiv>
                <StyledLeftDiv>
                    <a href={'https://www.chips-ju.europa.eu/'} target="_blank" rel="noopener noreferrer">
                        <StyledFooterImage src={ChipsJu_logo} alt="DFG Logo" />
                    </a>
                    <StyledFooterText>
                        SC4EU is Supported by Chips JU <br />
                        Under Grant number 101139949
                    </StyledFooterText>
                    <StyledLogo src={Logo} alt="SC4 Logo" />
                </StyledLeftDiv>

                <Breadcrumbs>
                    <Link underline="hover" component={RouterLink} to={ROUTES.HOME} sx={{ color: theme.palette.text.primary, fontSize: '1.15rem' }}>
                        Home
                    </Link>
                    <Link underline="hover" component={RouterLink} to={ROUTES.TERMS_OF_USE} sx={{ color: theme.palette.text.primary, fontSize: '1.15rem' }}>
                        Terms of Use
                    </Link>
                    <Link underline="hover" component={RouterLink} to={ROUTES.LICENSE} sx={{ color: theme.palette.text.primary, fontSize: '1.15rem' }}>
                        License
                    </Link>
                    <Link underline="hover" component={RouterLink} to={ROUTES.DATA_POLICY} sx={{ color: theme.palette.text.primary, fontSize: '1.15rem' }}>
                        Data Policy
                    </Link>
                    <Link underline="hover" component={RouterLink} to={ROUTES.ACCESSABILITY_STATEMENT} sx={{ color: theme.palette.text.primary, fontSize: '1.15rem' }}>
                        Accessibility Statement
                    </Link>
                    <Link underline="hover" component={RouterLink} to={ROUTES.Imprint} sx={{ color: theme.palette.text.primary, fontSize: '1.15rem' }}>
                        Imprint
                    </Link>
                </Breadcrumbs>
            </StyledBodyDiv>
        );
    }
}

export default withRouter(withTheme(Footer));
