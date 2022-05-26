import React, { useState, useEffect } from 'react';
import ELK from 'elkjs/lib/elk.bundled';

import { ArrowRightMarker } from '@carbon/charts-react/diagrams/Marker';

import Edge from './Edge';
import Node from './Node';

function buildEdges({ direction, edges }) {
  return edges.map((edge, i) => {
    return <Edge direction={direction} key={`edge_${i}`} edge={edge} />;
  });
}

function buildNodes(nodes) {
  return nodes.map((node, i) => {
    return (
      <Node
        id={node.id}
        key={`node_${i}`}
        x={node.x}
        y={node.y}
        height={node.height}
        width={node.width}
        status={node.status}
        title={node.title}
        type={node.type}
      />
    );
  });
}

export default function Graph({
  direction = 'RIGHT',
  id,
  nodes,
  edges,
  type = 'detailed'
}) {
  const elk = new ELK({
    defaultLayoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': direction,
      'elk.edgeRouting': 'ORTHOGONAL',
      'elk.layered.mergeEdges': true, // avoid multiple input ports / output ports per node
      // 'elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED',
      // 'elk.layered.nodePlacement.strategy': 'BRANDES_KOEPF',
      // 'elk.layered.spacing.edgeNodeBetweenLayers': '50',
      // 'elk.layered.unnecessaryBendpoints': true,
      // 'org.eclipse.elk.layered.layering.strategy': 'INTERACTIVE',
      // 'elk.padding': '[left=50, top=50, right=50, bottom=50]',
      // portConstraints: 'FIXED_ORDER',
      // 'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
      // 'elk.layered.considerModelOrder.crossingCounterNodeInfluence': 0.001,
      // 'elk.layered.considerModelOrder.crossingCounterPortInfluence': 0.001,
      separateConnectedComponents: false,
      'spacing.nodeNode': type === 'detailed' ? 20 : 5,
      'spacing.nodeNodeBetweenLayers': type === 'detailed' ? 50 : 20
    }
  });

  const [positions, setPositions] = useState(null);

  const graph = {
    id,
    children: nodes,
    edges
  };

  useEffect(() => {
    elk
      .layout(graph)
      .then((g) => setPositions(g))
      .catch(console.error);
  }, [direction]);

  if (!positions) return null;

  const {
    children: graphNodes,
    edges: graphEdges,
    height: graphHeight,
    width: graphWidth
  } = positions;

  const edgeElements = buildEdges({ direction, edges: graphEdges });
  const nodeElements = buildNodes(graphNodes);

  return (
    <div
      className="tkn--pipeline-graph"
      // style={{
      //   height: graphHeight,
      //   width: graphWidth
      // }}
    >
      <svg style={{ height: graphHeight, width: graphWidth }}>
        <defs>
          <ArrowRightMarker id="arrowRight" />
        </defs>
        {edgeElements}
        {nodeElements}
      </svg>
    </div>
  );
}
