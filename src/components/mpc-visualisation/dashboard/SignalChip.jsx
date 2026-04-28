import "reactflow/dist/style.css";
import {
  Chip,
  Typography,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import RemoveIcon from "@mui/icons-material/Remove";
 

export const SignalChip = ({ bl1, bl2 }) => {
  if (bl1 === null || bl2 === null)
    return (
      <Typography variant="caption" color="text.disabled">
        N/A
      </Typography>
    );
  if (bl1 > 0 && bl2 > 0)
    return (
      <Chip
        icon={<TrendingUpIcon />}
        label="Both ↑"
        color="success"
        size="small"
        sx={{ fontSize: 10 }}
      />
    );
  if (bl1 < 0 && bl2 < 0)
    return (
      <Chip
        icon={<TrendingDownIcon />}
        label="Both ↓"
        color="error"
        size="small"
        sx={{ fontSize: 10 }}
      />
    );
  return (
    <Chip
      icon={<RemoveIcon />}
      label="Mixed"
      size="small"
      sx={{ fontSize: 10 }}
    />
  );
}