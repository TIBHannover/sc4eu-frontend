import React from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, Link, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { colorStyled } from '../styledComponents/styledColor';
import { fontStyled } from '../styledComponents/styledFont';

const USER_ROLES = [
    {
        name: 'System Admin',
        role:
            '· Read and write permission on all ontologies\n\n' +
            '· Can create/remove Projects\n\n' +
            '· Add/remove all other users to projects\n\n' +
            '· Can grant to another user Project Admin rights\n\n' +
            '· Mark ontologies Public, or Not-Public'
    },
    {
        name: 'Project Admin',
        role:
            '· Read and write permission on project content\n\n' +
            '· Can add and remove *Users to his projects\n\n' +
            '· Mark ontologies Public, or Not-Public'
    },
    {
        name: 'Public User',
        role: '· Read permission on all public content\n\n· Write ontologies in public Projects'
    },
    {
        name: 'Member',
        role: '· Has read and write permission in his projects'
    }
];

const ISSUE_MANAGEMENT_LINK = 'https://gitlab.com/TIBHannover/sc3-project/sc3-issue-management/-/issues';
const PORTAL_LINK = 'https://service.tib.eu/sc3/';
const WEBPROTEGE_LINK = 'https://service.tib.eu/sc3/webprotege';

const accordionSx = {
    mb: 2,
    borderRadius: '10px',
    overflow: 'hidden',
    '&:before': { display: 'none' }
};

const accordionHeaderSx = {
    backgroundColor: colorStyled.primary,
    px: { xs: 1.5, sm: 2 },
    minHeight: '48px',
    '& .MuiAccordionSummary-content': {
        margin: 0,
        alignItems: 'center'
    },
    '&:hover': {
        backgroundColor: colorStyled.primaryContainer
    }
};

const accordionTitleSx = {
    color: colorStyled.onPrimary
};

const expandIconSx = {
    color: colorStyled.onPrimary
};

const bodyTextSx = {
    color: colorStyled.onSurfaceVariant,
    textAlign: 'justify',
    mt: 1,
    fontSize: {
        xs: fontStyled.fontSize.MobileViewNormalText,
        md: fontStyled.fontSize.LaptopAndDesktopViewNormalText
    }
};

const linkSx = {
    color: colorStyled.primary,
    textDecoration: 'none',
    '&:hover': {
        color: colorStyled.onPrimaryContainer,
        textDecoration: 'underline'
    }
};

const cardSx = {
    borderRadius: '8px',
    mb: 1.5,
    backgroundColor: colorStyled.surfaceContainerLowest,
    borderColor: colorStyled.outlineVariant
};

const cardContentSx = {
    p: 1.5,
    '&:last-child': { pb: 1.5 }
};

const cardTitleSx = {
    color: colorStyled.onSurface
};

const cardBodySx = {
    whiteSpace: 'pre-line',
    color: colorStyled.onSurfaceVariant
};

function AccordionHeader({ title }) {
    return (
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={expandIconSx} />} sx={accordionHeaderSx}>
            <Typography variant="h6" sx={accordionTitleSx}>
                {title}
            </Typography>
        </AccordionSummary>
    );
}

function ExternalLink({ href, children }) {
    return (
        <Link href={href} target="_blank" rel="noreferrer" sx={linkSx}>
            {children}
        </Link>
    );
}

function UserRoleCard({ name, role }) {
    return (
        <Card variant="outlined" sx={cardSx}>
            <CardContent sx={cardContentSx}>
                <Typography variant="h6" sx={cardTitleSx}>
                    {name}
                </Typography>
                <Typography variant="body1" sx={cardBodySx}>
                    {role}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default function Faq() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
                backgroundColor: colorStyled.surfaceContainerLowest
            }}
        >
            <Container
                sx={{
                    backgroundColor: colorStyled.surfaceContainerLowest,
                    borderRadius: '10px',
                    p: { xs: 1.5, sm: 2 }
                }}
            >
                <Accordion sx={accordionSx}>
                    <AccordionHeader title="Definition of User Roles" />
                    <AccordionDetails>
                        {USER_ROLES.map(item => (
                            <UserRoleCard key={item.name} name={item.name} role={item.role} />
                        ))}
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={accordionSx}>
                    <AccordionHeader title="Issue Management" />
                    <AccordionDetails>
                        <Typography sx={bodyTextSx}>
                            If you face any problems with our portal, face any issues with our running system or if you have any further questions,
                            please get in contact with us via our issue management system that you will find here:{' '}
                            <ExternalLink href={ISSUE_MANAGEMENT_LINK}>SC4EU Issue Management</ExternalLink>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </Box>
    );
}
