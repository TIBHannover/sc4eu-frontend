import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getServicesStatus } from '../network/serviceStatusCalls';

const SERVICE_LABELS = {
    backend: 'Backend Service',
    fastapi: 'Vocabulary Service (FastAPI)',
    processing: 'Ontology Processing Service'
};

const OAUTH_LABELS = {
    github: 'GitHub',
    gitlab: 'GitLab',
    google: 'Google',
    sap: 'SAP',
    linkedin: 'LinkedIn'
};

const STATE_COLORS = {
    up: 'green',
    configured: 'green',
    down: 'red',
    'not configured': 'gray'
};

const StatusRow = ({ label, state }) => (
    <div>
        {label}: <span style={{ color: STATE_COLORS[state] }}>{state}</span>
    </div>
);

StatusRow.propTypes = {
    label: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
};

const ServiceStatus = () => {
    // null while loading, 'unreachable' if the Express server does not answer (client-only build)
    const [status, setStatus] = useState(null);

    useEffect(() => {
        getServicesStatus()
            .then(setStatus)
            .catch(() => setStatus('unreachable'));
    }, []);

    return (
        <Container className="mt-3 p-0" style={{ border: '1px solid black', borderRadius: '10px' }}>
            <div style={{ padding: '10px' }}>
                <h1>Status:</h1>
                {status === null && <Icon icon={faSpinner} spin />}
                {status === 'unreachable' && <div>Frontend Build Type: Client only (no Express server)</div>}
                {status?.services && (
                    <>
                        <div>Frontend Build Type: Express</div>
                        <h5 className="mt-3">Services</h5>
                        {Object.entries(SERVICE_LABELS).map(([name, label]) => (
                            <StatusRow key={name} label={label} state={status.services[name] ?? 'not configured'} />
                        ))}
                        <h5 className="mt-3">Login providers</h5>
                        {Object.entries(OAUTH_LABELS).map(([name, label]) => (
                            <StatusRow key={name} label={label} state={status.oauth[name] ? 'configured' : 'not configured'} />
                        ))}
                    </>
                )}
            </div>
        </Container>
    );
};

export default ServiceStatus;
