import { css } from 'styled-components';


const adapt = (
  property: string,
  minSizePx: number,
  maxSizePx: number,
  minViewportPx = 500,
  maxViewportPx = 1920
) => {
  const slope = (maxSizePx - minSizePx) / (maxViewportPx - minViewportPx);
  const yAxisIntersection = -minViewportPx * slope + minSizePx;

  return css`
    ${property}: clamp(
      ${minSizePx}px,
      ${yAxisIntersection.toFixed(4)}px + ${(slope * 100).toFixed(4)}vw,
      ${maxSizePx}px
    );
  `;
};

export default adapt