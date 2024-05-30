import { Breadcrumbs, Link } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { colorStyled } from '../../styledComponents/styledColor';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    breadcrumbContainer: {
        backgroundColor: colorStyled.CONTAINER_BACKGROUND_COLOR,
        borderRadius: '12px',
        padding: '8px 16px',
        display: 'inline-block',
        width: '100%'
    },
    link: {
        color: '#4285f4',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    current: {
        color: '#000000',
        textDecoration: 'none',
        cursor: 'default'
    },
    separator: {
        color: '#000000',
        fontWeight: 'bold'
    }
}));

const BreadcrumbBar = ({ setViewMode, isOntologyView = false, currentViewMode }) => {
    const classes = useStyles();
    return (
        <div className={classes.breadcrumbContainer}>
            <Breadcrumbs aria-label="breadcrumb" separator=">">
                <Link
                    className={classes.link}
                    onClick={event => {
                        event.preventDefault();
                        setViewMode('collections');
                    }}
                >
                    Collections
                </Link>
                <Link
                    className={currentViewMode === 'projects' ? classes.current : classes.link}
                    color="textPrimary"
                    onClick={event => {
                        event.preventDefault();
                        console.log('I am clicked');
                        if (currentViewMode !== 'projects') {
                            setViewMode('projects');
                        }
                    }}
                >
                    Projects
                </Link>
                {isOntologyView && (
                    <Link className={classes.current} color="textPrimary">
                        Ontologies
                    </Link>
                )}
            </Breadcrumbs>
        </div>
    );
};
BreadcrumbBar.propTypes = {
    setViewMode: PropTypes.func.isRequired,
    isOntologyView: PropTypes.bool.isRequired,
    currentViewMode: PropTypes.string.isRequired
};

export default BreadcrumbBar;
