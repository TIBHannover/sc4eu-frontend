import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Tooltip } from '@mui/material';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Edit, Delete } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { reverse } from 'named-urls';
import ROUTES from '../constants/routes';
import private_collection from '../assets/images/private_collection.png';
import theme from '../theme';
import { redux_addProject, redux_removeProject, redux_removeOntology, redux_removeAlreadyLoadedOntology } from '../redux/actions/rrm_actions';

const StyledTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)`
    & .MuiTooltip-tooltip {
        background-color: ${colorStyled.SECONDARY.dark};
        color: white;
        font-size: 14px;
        padding: 12px 16px;
        border-radius: 8px;
        max-width: 300px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
        margin: 8px;
    }
    & .MuiTooltip-arrow {
        color: ${colorStyled.SECONDARY.dark};
    }
`;

function ProjectCard({ project, onEdit, onDelete, redux_addProject, redux_removeProject, redux_removeOntology, redux_removeAlreadyLoadedOntology }) {
    const history = useHistory();

    const showOntologies = () => {
        redux_removeProject();
        redux_removeOntology();
        redux_removeAlreadyLoadedOntology();

        redux_addProject(project);
        history.push(reverse(ROUTES.ONTOLOGY));
    };

    const handleCardClick = () => {
        // Navigate to the ontology view
        showOntologies();
    };

    const handleEdit = e => {
        // Prevent onSelect from also firing if you click the edit button
        e.stopPropagation();
        onEdit(project);
    };

    const handleDelete = e => {
        e.stopPropagation();
        onDelete(project);
    };

    return (
        <StyledTooltip title={project.description} placement="top" arrow enterDelay={50} leaveDelay={200}>
            <StyledCard sx={{ maxWidth: 345, cursor: 'pointer' }}>
                <CardActionArea onClick={handleCardClick} style={{ height: '100%', position: 'relative' }}>
                    <CardMedia
                        component="img"
                        height="50"
                        image={private_collection}
                        style={{
                            objectFit: 'contain',
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            width: '50px',
                            zIndex: 1
                        }}
                        alt="semiconductor image"
                    />
                    <CardContent style={{ paddingTop: '45px', paddingLeft: '45px', paddingBottom: '60px' }}>
                        <Typography gutterBottom component="div" fontWeight={'bold'} marginBottom={theme.spacing(1)}>
                            {project.name}
                        </Typography>
                    </CardContent>
                    <CardActions
                        disableSpacing
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            padding: '8px'
                        }}
                    >
                        <IconButton aria-label="edit" onClick={handleEdit} disabled={!project.canDelete}>
                            <Edit />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleDelete} disabled={!project.canDelete}>
                            <Delete />
                        </IconButton>
                    </CardActions>
                </CardActionArea>
            </StyledCard>
        </StyledTooltip>
    );
}

const mapDispatchToProps = dispatch => ({
    redux_addProject: data => dispatch(redux_addProject(data)),
    redux_removeProject: () => dispatch(redux_removeProject()),
    redux_removeOntology: () => dispatch(redux_removeOntology()),
    redux_removeAlreadyLoadedOntology: () => dispatch(redux_removeAlreadyLoadedOntology())
});

export default connect(null, mapDispatchToProps)(ProjectCard);

const StyledCard = styled(Card)`
    && {
        background-color: ${colorStyled.PRIMARY.light};
        padding: 3px;
        border-radius: 20px;
        transition: transform 0.2s;
        width: 300px; // Set the width
        height: 300px; // Set the height
        &:hover {
            transform: scale(1.05);
        }
    }
`;
