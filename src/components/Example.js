import React, { useState } from 'react';
import { Toggle } from 'carbon-components-react';

import Graph from './Graph';
import { cardHeight, cardWidth, shapeSize } from '../constants';

export default function Example({
  dataFn,
  defaultDirection = 'RIGHT',
  description,
  graphType = 'detailed',
  id,
  nodeHeight = cardHeight,
  nodeWidth = cardWidth,
  title
}) {
  const [direction, setDirection] = useState(defaultDirection);
  return (
    <>
      {title && <h2>{title}</h2>}
      {description}
      <Toggle
        defaultToggled={defaultDirection === 'RIGHT'}
        id={`${id}-toggle-direction`}
        labelA="Vertical"
        labelB="Horizontal"
        // labelText="Direction"
        onToggle={(toggled) => setDirection(toggled ? 'RIGHT' : 'DOWN')}
        size="sm"
      />

      <Graph
        direction={direction}
        id={id}
        {...dataFn({
          height: graphType === 'detailed' ? nodeHeight : shapeSize,
          type: graphType === 'detailed' ? 'card' : 'icon',
          width: graphType === 'detailed' ? nodeWidth : shapeSize
        })}
        type={graphType}
      />
    </>
  );
}
