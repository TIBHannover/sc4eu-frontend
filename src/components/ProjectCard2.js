import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material';
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
        <StyledCard sx={{ maxWidth: 345, cursor: 'pointer' }}>
            <CardActionArea onClick={handleCardClick} style={{ height: '100%' }}>
                <CardMedia component="img" height="100" image={private_collection} style={{ objectFit: 'contain' }} alt="semiconductor image" />
                <CardContent>
                    <Typography gutterBottom component="div" fontWeight={'bold'} marginBottom={theme.spacing(1)}>
                        {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {project.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="edit" onClick={handleEdit} disabled={!project.canDelete}>
                        <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleDelete} disabled={!project.canDelete}>
                        <Delete />
                    </IconButton>
                </CardActions>
            </CardActionArea>
        </StyledCard>
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
