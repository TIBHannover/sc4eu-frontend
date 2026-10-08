import { Badge, Button, Divider, List, ListItemButton, ListItemText, Popover, Tooltip, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ToolbarNavBar = ({ items, isMobileScreen }) => {
    const [listPopoverAnchorEl, setListPopoverAnchorEl] = useState(null);
    const [openListItemKey, setOpenListItemKey] = useState(null);

    const visibleItems = removeRedundantDividers(items.filter(item => !item.hidden));
    const itemWithOpenList = visibleItems.find(item => item.key === openListItemKey);

    if (visibleItems.length === 0) {
        return null;
    }

    const openListPopover = (item, anchorEl) => {
        setListPopoverAnchorEl(anchorEl);
        setOpenListItemKey(item.key);
    };

    const closeListPopover = () => setListPopoverAnchorEl(null);

    return (
        <>
            {visibleItems.map(item =>
                item.divider ? (
                    <Divider key={item.key} orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                ) : (
                    <ToolbarNavItem
                        key={item.key}
                        item={item}
                        onClick={e => (item.listItems ? openListPopover(item, e.currentTarget) : item.onClick?.(e))}
                    />
                )
            )}
            <ToolbarNavListPopover
                anchorEl={listPopoverAnchorEl}
                item={itemWithOpenList}
                isMobileScreen={isMobileScreen}
                onClose={closeListPopover}
            />
        </>
    );
};

ToolbarNavBar.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            divider: PropTypes.bool,
            icon: PropTypes.node,
            label: PropTypes.node,
            tooltip: PropTypes.node,
            colorRole: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'error']),
            active: PropTypes.bool,
            hidden: PropTypes.bool,
            badgeContent: PropTypes.number,
            onClick: PropTypes.func,
            listItems: PropTypes.array,
            getListItemKey: PropTypes.func,
            getListItemLabel: PropTypes.func,
            getListItemSecondary: PropTypes.func,
            renderListItemExtra: PropTypes.func,
            onSelectListItem: PropTypes.func
        })
    ).isRequired,
    isMobileScreen: PropTypes.bool
};

function removeRedundantDividers(items) {
    const withoutDuplicates = items.reduce((result, item) => {
        const previousItem = result[result.length - 1];
        const isRedundant = item.divider && (!previousItem || previousItem.divider);
        return isRedundant ? result : [...result, item];
    }, []);

    const endsWithDivider = withoutDuplicates[withoutDuplicates.length - 1]?.divider;
    return endsWithDivider ? withoutDuplicates.slice(0, -1) : withoutDuplicates;
}

function ToolbarNavItem({ item, onClick }) {
    const theme = useTheme();
    const role = theme.palette[item.colorRole] || theme.palette.secondary;
    const restingBackground = role.light || role.main;
    const restingTextColor = role.onContainer || role.contrastText;

    const button = (
        <Button
            variant="contained"
            disableElevation
            startIcon={item.icon}
            onClick={onClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                textTransform: 'none',
                whiteSpace: 'nowrap',
                minWidth: 50,
                fontWeight: 600,
                borderRadius: '20px',
                backgroundColor: item.active ? role.main : restingBackground,
                color: item.active ? role.contrastText : restingTextColor,
                '&:hover': {
                    backgroundColor: role.main,
                    color: role.contrastText
                }
            }}
        >
            {item.label}
        </Button>
    );

    return (
        <Tooltip title={item.tooltip}>
            {item.badgeContent > 0 ? (
                <Badge
                    badgeContent={item.badgeContent}
                    sx={{
                        '& .MuiBadge-badge': {
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.error.contrastText
                        }
                    }}
                >
                    {button}
                </Badge>
            ) : (
                button
            )}
        </Tooltip>
    );
}

ToolbarNavItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

function ToolbarNavListPopover({ anchorEl, item, isMobileScreen, onClose }) {
    return (
        <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
            <List dense sx={{ minWidth: '20vw', maxWidth: isMobileScreen ? '80vw' : '40vw', maxHeight: '40vh', overflowY: 'auto' }}>
                {item?.listItems.map(entry => (
                    <ListItemButton
                        key={item.getListItemKey(entry)}
                        onClick={() => {
                            onClose();
                            item.onSelectListItem(entry);
                        }}
                    >
                        <ListItemText primary={item.getListItemLabel(entry)} secondary={item.getListItemSecondary?.(entry)} />
                        {item.renderListItemExtra?.(entry)}
                    </ListItemButton>
                ))}
            </List>
        </Popover>
    );
}

ToolbarNavListPopover.propTypes = {
    anchorEl: PropTypes.instanceOf(Element),
    item: PropTypes.object,
    isMobileScreen: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};
