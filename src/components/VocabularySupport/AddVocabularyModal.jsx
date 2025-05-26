import React, { useState } from 'react';
import { useGetTerms } from './hooks/useGetTerms';
import VocabularyMainTable from './components/VocabularyMainTable';
import { useGetDiscussion } from './hooks/useGetDiscussion';
import { useUpdateDiscussion } from './hooks/useUpdateDiscussion';
import { useDeleteDiscussion } from './hooks/useDeleteDiscussion';
import { Box, Typography } from '@material-ui/core';
import {Button, Fade, Modal} from '@mui/material';
import Cookies from 'js-cookie';
import { getMentionedDiscussions, RenderGroupedMentions } from './utils/Discussions';
import MaterialUIPopUp, { MaterialUIPopUpTypes } from '../ReusableComponents/MaterialUIPopUp';
import { colorStyled } from '../../styledComponents/styledColor';
import ExpandedRow from './components/ExpandedRow';
import PropTypes from "prop-types";

/**
 * `AddVocabulary` is a React component that renders the main table for displaying vocabulary terms.
 * It utilizes the `useGetTerms` custom hook to fetch terms from an external source.
 * The fetched terms, along with loading and error states, are passed as props to the `VocabularyMainTable` component.
 *
 * @returns {JSX.Element} The `VocabularyMainTable` component populated with the fetched terms and states.
 */
export default function AddVocabulary({ userName }) {
    // Destructuring the object returned by useGetTerms to extract data and states.
    const { data: fetchedTerms = [], refetch, isError: isLoadingTermsError, isFetching: isFetchingTerms, isLoading: isLoadingTerms } = useGetTerms();
    const { data: fetchedDiscussion = [] } = useGetDiscussion();
    const { mutateAsync: updateDiscussion } = useUpdateDiscussion();
    const { mutateAsync: deleteDiscussion } = useDeleteDiscussion();
    const [activeMUIPopUp, setActiveMUIPopUp] = useState(null);
    let allTermsDiscussion = fetchedDiscussion || [];

    const [selectedTerm, setSelectedTerm] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [termComments, setTermComments] = useState([]);

    const handleSaveDiscussion = async newDiscussion => {
        allTermsDiscussion = await updateDiscussion(newDiscussion);
    };
    const handleDeleteDiscussion = async resourceId => {
        allTermsDiscussion = await deleteDiscussion(resourceId);
    };

    const mentionedDiscussionsCookie = Cookies.get('mentionedDiscussionsSeen');

    const mentionedDiscussions = getMentionedDiscussions(fetchedTerms, allTermsDiscussion, userName);
    var inTenSeconds = new Date(new Date().getTime() + 10 * 1000);

    const handleNavigateToMentionedTerm = resourceId => {
        const term = fetchedTerms.find(t => t.identifier === resourceId);
        const discussion = allTermsDiscussion.find(d => d.resourceId === resourceId);
        setSelectedTerm(term);
        setTermComments(discussion?.comments || []);
        setOpenPopup(true);
    };

    //Read discussion json from github
    return (
        <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
                <VocabularyMainTable
                    isLoadingTerms={isLoadingTerms}
                    terms={fetchedTerms}
                    isLoadingTermsError={isLoadingTermsError}
                    refetch={refetch}
                    isFetchingTerms={isFetchingTerms}
                    discussions={allTermsDiscussion}
                    handleSaveDiscussion={handleSaveDiscussion}
                    handleDeleteDiscussion={handleDeleteDiscussion}
                />
            </Box>
            <Box sx={{ ml: 0.1 }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setActiveMUIPopUp(MaterialUIPopUpTypes.DISCUSSIONS);
                        Cookies.set('mentionedDiscussionsSeen', 'true', {
                            expires: inTenSeconds
                        });
                    }}
                    style={
                        mentionedDiscussionsCookie === undefined
                            ? { backgroundColor: colorStyled.PRIMARY.dark }
                            : { backgroundColor: '#ee7356' }
                    }
                >
                    <Typography sx={{ fontSize: '0.7rem' }}>Mentions</Typography>
                </Button>
            </Box>
            <MaterialUIPopUp
                open={activeMUIPopUp === MaterialUIPopUpTypes.DISCUSSIONS}
                onClose={() => setActiveMUIPopUp(null)}
                title="Mentioned discussions"
                message={<RenderGroupedMentions groupedMentioned={mentionedDiscussions} onNavigateToTerm={handleNavigateToMentionedTerm} />}
            />
            <Modal open={openPopup} onClose={() => setOpenPopup(false)} closeAfterTransition>
                <Fade in={openPopup} timeout={1000}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 2,
                            backgroundColor: 'white',
                            margin: 'auto',
                            width: '70%',
                            overflowY: 'auto',
                            position: 'fixed',
                            top: 0,
                            left: '15%',
                            outline: 'none'
                        }}
                    >
                        {selectedTerm && (
                            <ExpandedRow
                                term={selectedTerm}
                                updateTerm={[]}
                                termComments={termComments || []}
                                handleSaveDiscussion={handleSaveDiscussion}
                                setHasUncommittedChanges={false}
                                handleClosePopup={() => setOpenPopup(false)}
                            />
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

AddVocabulary.propTypes = {
    userName: PropTypes.string,
};

