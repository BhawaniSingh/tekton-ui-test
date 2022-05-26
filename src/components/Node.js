import React, { useState } from 'react';
import ShapeNode from '@carbon/charts-react/diagrams/ShapeNode/ShapeNode';
import CardNode, {
  CardNodeColumn,
  // CardNodeLabel,
  CardNodeTitle
  // CardNodeSubtitle
} from '@carbon/charts-react/diagrams/CardNode';
// import { ChevronDown16 } from '@carbon/icons-react';

import StatusIcon from './StatusIcon';

export default function Node({
  id,
  x,
  y,
  height,
  width,
  status,
  title,
  type = 'card'
}) {
  let shapeNode;
  // if (['start', 'end'].includes(id)) {
  //   shapeNode = <ShapeNode />;
  // } else
  if (type === 'icon') {
    shapeNode = (
      <ShapeNode
        renderIcon={<StatusIcon status={status} title={title} />}
        size={width}
      />
    );
  }

  const [expanded, setExpanded] = useState(false);
  return (
    <foreignObject
      transform={`translate(${x},${y})`}
      height={height}
      width={width}
      style={{ overflow: 'visible' }}
    >
      <div style={{ height, width }}>
        {shapeNode ? (
          shapeNode
        ) : (
          <CardNode
            // TODO: feature request - custom class so we can set color etc. in CSS
            // https://github.com/carbon-design-system/carbon-charts/issues/1221
            className={`card-status-${status}`}
            _href="#"
            _onClick={() => setExpanded(!expanded)}
          >
            <CardNodeColumn>
              <StatusIcon status={status} />
            </CardNodeColumn>
            <CardNodeColumn>
              <CardNodeTitle>
                <span title={title}>{title}</span>
              </CardNodeTitle>
              {/* <CardNodeSubtitle>Description</CardNodeSubtitle> */}
              {/* {expanded && <CardNodeLabel>Label</CardNodeLabel>} */}
            </CardNodeColumn>
            {/* <CardNodeColumn farsideColumn>
              <ChevronDown16 />
            </CardNodeColumn> */}
          </CardNode>
        )}
      </div>
    </foreignObject>
  );
}
