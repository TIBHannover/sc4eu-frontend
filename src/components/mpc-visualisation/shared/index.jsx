import { memo } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  ListItem,
} from "@mui/material";
import TrendingUpIcon   from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import RemoveIcon       from "@mui/icons-material/Remove";
import {
  colorStyled,
  sentimentColors,
  selectionColors,
  graphAccents,
} from '../config/theme';

const FONT_SIZE_MICRO  = 8.5;   
const FONT_SIZE_LABEL  = 10;    
const FONT_SIZE_BODY   = 13;    
const FONT_SIZE_KPI    = 20;    
const FONT_SIZE_DETAIL = 12;    

export const GlassPanel = memo(function GlassPanel({ children, sx, ...rest }) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor:        colorStyled.surfaceContainerLowest,
        backdropFilter: "blur(10px)",
        border:         `1px solid ${colorStyled.outlineVariant}`,
        borderRadius:   2,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
});

export const MetaItem = memo(function MetaItem({ label, value }) {
  return (
    <ListItem
      disablePadding
      sx={{ mb: 1.5, flexDirection: "column", alignItems: "flex-start" }}
    >
      <Typography
        sx={{
          fontSize:      FONT_SIZE_LABEL,
          fontWeight:    700,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          color:         colorStyled.onSurfaceVariant,
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: FONT_SIZE_BODY, color: colorStyled.onSurface, mt: 0.25 }}>
        {value}
      </Typography>
    </ListItem>
  );
});

export const LegendDot = memo(function LegendDot({
  label,
  fill,
  stroke,
  shape = "solid",
}) {
  const isCircle = shape === "circle";
  const isDashed = shape === "dashed";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Box
        sx={{
          width:        isCircle ? 10 : 14,
          height:       10,
          borderRadius: isCircle ? "50%" : 1.5,
          bgcolor:      fill,
          border:       `1.5px ${isDashed ? "dashed" : "solid"} ${stroke}`,
          flexShrink:   0,
        }}
      />
      <Typography sx={{ fontSize: FONT_SIZE_MICRO, color: colorStyled.onSurfaceVariant }}>
        {label}
      </Typography>
    </Box>
  );
});

export const NavChip = memo(function NavChip({
  label,
  isActive,
  accentColor,
  onClick,
}) {
  const activeStyles = {
    bgcolor:     accentColor ?? colorStyled.primary,
    color:       colorStyled.onPrimary,
    border:      `1px solid ${accentColor ?? colorStyled.primary}`,
    "&:hover":   { bgcolor: accentColor ?? colorStyled.primary },
  };

  const inactiveStyles = {
    bgcolor:   "transparent",
    color:     colorStyled.onSurfaceVariant,
    border:    `1px solid ${colorStyled.outlineVariant}`,
    "&:hover": { bgcolor: colorStyled.surfaceContainerHigh },
  };

  return (
    <Chip
      label={label}
      size="small"
      onClick={onClick}
      sx={{
        fontSize:   FONT_SIZE_LABEL,
        fontWeight: 700,
        cursor:     "pointer",
        ...(isActive ? activeStyles : inactiveStyles),
      }}
    />
  );
});

export const SignalChip = memo(function SignalChip({ bl1, bl2 }) {
  if (bl1 === null || bl2 === null) {
    return (
      <Typography variant="caption" sx={{ color: colorStyled.outline }}>
        N/A
      </Typography>
    );
  }

  const bothUp   = bl1 > 0 && bl2 > 0;
  const bothDown = bl1 < 0 && bl2 < 0;

  if (bothUp) {
    return (
      <TrendSignalChip
        icon={<TrendingUpIcon />}
        label="Both up"
        backgroundColor={graphAccents.demand.fill}
        textColor={sentimentColors.positive}
      />
    );
  }

  if (bothDown) {
    return (
      <TrendSignalChip
        icon={<TrendingDownIcon />}
        label="Both down"
        backgroundColor={colorStyled.errorContainer}
        textColor={sentimentColors.negative}
      />
    );
  }

  return (
    <TrendSignalChip
      icon={<RemoveIcon />}
      label="Mixed"
      backgroundColor={colorStyled.surfaceContainerHigh}
      textColor={colorStyled.onSurfaceVariant}
    />
  );
});

function TrendSignalChip({ icon, label, backgroundColor, textColor }) {
  return (
    <Chip
      icon={icon}
      label={label}
      size="small"
      sx={{
        bgcolor:            backgroundColor,
        color:              textColor,
        fontWeight:         600,
        "& .MuiChip-icon":  { color: textColor },
      }}
    />
  );
}

export const KpiCard = memo(function KpiCard({
  label,
  primaryValue,
  secondaryLabel,
  secondaryValue,
  isSelected,
  onClick,
}) {
  const primaryColor   = primaryValue  >= 0 ? sentimentColors.positive : sentimentColors.negative;
  const secondaryColor = secondaryValue >= 0 ? sentimentColors.positive : sentimentColors.negative;

  const selectedStyles = {
    borderColor: selectionColors.border,
    borderWidth: 2,
    bgcolor:     selectionColors.background,
  };

  const defaultStyles = {
    borderColor: colorStyled.outlineVariant,
    borderWidth: 1,
    bgcolor:     colorStyled.surfaceContainerLowest,
  };

  return (
    <Paper
      variant="outlined"
      onClick={onClick}
      sx={{
        flex:         1,
        minWidth:     120,
        cursor:       "pointer",
        p:            2,
        borderRadius: 2,
        transition:   "all 0.2s",
        "&:hover": {
          borderColor: colorStyled.primary,
          boxShadow:   "0 2px 8px rgba(0,0,0,0.06)",
        },
        ...(isSelected ? selectedStyles : defaultStyles),
      }}
    >
      <Typography
        sx={{
          fontSize:      FONT_SIZE_LABEL,
          fontWeight:    700,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          color:         colorStyled.onSurfaceVariant,
          mb:            0.5,
        }}
      >
        {label}
      </Typography>

      {primaryValue != null && (
        <Typography sx={{ fontSize: FONT_SIZE_KPI, fontWeight: 700, color: primaryColor }}>
          {formatPercent(primaryValue)}
        </Typography>
      )}

      {secondaryValue != null && (
        <Typography sx={{ fontSize: FONT_SIZE_DETAIL, color: secondaryColor, mt: 0.25 }}>
          {secondaryLabel}: {formatPercent(secondaryValue)}
        </Typography>
      )}
    </Paper>
  );
});

export function formatPercent(value) {
  if (value == null) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}