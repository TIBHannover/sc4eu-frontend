import { useCallback, memo } from "react";
import { Box, Slider, Typography, Tooltip, Stack } from "@mui/material";
import TimelineIcon              from "@mui/icons-material/Timeline";
import { colorStyled, sentimentColors, graphAccents } from "../config/theme";
import { LegendDot } from "../shared";
import { TIMELINE_POINTS } from "../data/surveys";

const FALLBACK_ACTIVE_INDEX = 1;

function resolveActiveIndex(timepointId) {
  const foundIndex = TIMELINE_POINTS.findIndex((point) => point.id === timepointId);
  return foundIndex >= 0 ? foundIndex : FALLBACK_ACTIVE_INDEX;
}

const STATUS_LEGEND_ENTRIES = [
  {
    label:  "Completed",
    fill:   graphAccents.demand.fill,
    stroke: sentimentColors.positive,
    shape:  "circle",
  },
  {
    label:  "Active",
    fill:   colorStyled.primaryContainer,
    stroke: colorStyled.primary,
    shape:  "circle",
  },
  {
    label:  "Projected",
    fill:   colorStyled.surfaceContainerLow,
    stroke: colorStyled.outline,
    shape:  "circle",
  },
];

const SLIDER_MARK_SIZE    = 10;
const SLIDER_THUMB_SIZE   = 18;
const SLIDER_THUMB_BORDER = 3;
const SLIDER_MARK_LABEL_TOP_OFFSET = 30;

const sliderStyles = {
  height: 4,
  color:  colorStyled.primary,

  "& .MuiSlider-rail": {
    bgcolor: colorStyled.surfaceDim,
    opacity: 1,
  },

  "& .MuiSlider-track": {
    border: "none",
  },

  "& .MuiSlider-thumb": {
    width:   SLIDER_THUMB_SIZE,
    height:  SLIDER_THUMB_SIZE,
    bgcolor: colorStyled.surfaceContainerLowest,
    border:  `${SLIDER_THUMB_BORDER}px solid ${colorStyled.primary}`,
    "&:hover": {
      boxShadow: `0 0 0 6px ${colorStyled.primary}22`,
    },
  },

  "& .MuiSlider-mark": {
    width:       SLIDER_MARK_SIZE,
    height:      SLIDER_MARK_SIZE,
    borderRadius: "50%",
    bgcolor:     colorStyled.surfaceContainerLowest,
    border:      `2px solid ${colorStyled.outlineVariant}`,
    transform:   "translate(-50%, -50%)",
    top:         "50%",
    "&.MuiSlider-markActive": {
      bgcolor:     colorStyled.primary,
      borderColor: colorStyled.primary,
    },
  },

  "& .MuiSlider-markLabel": {
    top: SLIDER_MARK_LABEL_TOP_OFFSET,
  },
};

function ThumbTooltip({ children, value }) {
  const point = TIMELINE_POINTS[value];

  if (!point) {
    return children;
  }

  return (
    <Tooltip
      enterTouchDelay={0}
      placement="top"
      arrow
      title={
        <Box sx={{ p: 0.5 }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
            {point.label}
          </Typography>
          <Typography sx={{ fontSize: 10, opacity: 0.8, mt: 0.25 }}>
            {point.description}
          </Typography>
        </Box>
      }
    >
      {children}
    </Tooltip>
  );
}

const MarkLabel = memo(function MarkLabel({ point, isActivePoint }) {

  return (
    <Box sx={{ textAlign: "center", mt: 0.5 }}>
      <Typography
        sx={{
          fontSize:   isActivePoint ? 10.5 : 9.5,
          fontWeight: isActivePoint ? 800 : 500,
          color:      isActivePoint ? colorStyled.onSurface : colorStyled.onSurfaceVariant,
        }}
      >
        {point.label}
      </Typography> 
    </Box>
  );
});

function StatusLegend() {
  return (
    <Stack direction="row" gap={2}>
      {STATUS_LEGEND_ENTRIES.map((entry) => (
        <LegendDot
          key={entry.label}
          label={entry.label}
          fill={entry.fill}
          stroke={entry.stroke}
          shape={entry.shape}
        />
      ))}
    </Stack>
  );
}

function TimelineDescription({ text }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 1 }}
    >
      <Typography sx={{ fontSize: 10.5, color: colorStyled.onSurfaceVariant }}>
        {text}
      </Typography>
    </Stack>
  );
}

const SurveyTimeline = memo(function SurveyTimeline({
  activeTimepoint,
  onTimepointChange,
}) {
  const activeIndex = resolveActiveIndex(activeTimepoint);

  const marks = TIMELINE_POINTS.map((point, index) => ({
    value: index,
    label: (
      <MarkLabel
        point={point}
        isActivePoint={index === activeIndex}
      />
    ),
  }));

  const handleSliderChange = useCallback(
    (changeEvent, newIndex) => {
      const selectedPoint = TIMELINE_POINTS[newIndex];
      if (selectedPoint) {
        onTimepointChange(selectedPoint.id);
      }
    },
    [onTimepointChange]
  );

  return (
    <Box
      sx={{
        width:        "100%",
        bgcolor:      colorStyled.surfaceContainerLow,
        borderBottom: `1px solid ${colorStyled.outlineVariant}`,
        px:           4,
        py:           2,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1.5 }}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <TimelineIcon sx={{ fontSize: 18, color: colorStyled.onSurfaceVariant }} />
          <Typography
            sx={{
              fontSize:      12,
              fontWeight:    700,
              color:         colorStyled.onSurface,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Survey Timeline - 
          </Typography>
          <Typography variant="body2">
            selecting new point - updates dashboard data
          </Typography>
        </Stack>

        <StatusLegend />
      </Stack>

      {/* Slider */}
      <Box sx={{ px: 3 }}>
        <Slider
          value={activeIndex}
          min={0}
          max={TIMELINE_POINTS.length - 1}
          step={1}
          marks={marks}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          slots={{ valueLabel: ThumbTooltip }}
          sx={sliderStyles}
        />
      </Box>

      <TimelineDescription text={TIMELINE_POINTS[activeIndex]?.description} />
    </Box>
  );
});

export default SurveyTimeline;