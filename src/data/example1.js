function getNodeData({ height, type, width }) {
  return [
    {
      id: 'skaffold-unit-tests',
      status: 'success-warning',
      title: 'skaffold-unit-tests',
      height,
      width,
      type
    },
    {
      id: 'build-skaffold-web',
      status: 'success',
      title: 'build-skaffold-web',
      height,
      width,
      type
    },
    {
      id: 'build-skaffold-app',
      status: 'success',
      title: 'build-skaffold-app',
      height,
      width,
      type
    },
    {
      id: 'deploy-app',
      status: 'success',
      title: 'deploy-app',
      height,
      width,
      type
    },
    {
      id: 'deploy-web',
      status: 'failed',
      title: 'deploy-web',
      height,
      width,
      type
    }
    // { id: "start", title: "start", height: 50, width: 50 },
    // { id: "end", title: "end", height: 50, width: 50 }
  ];
}

function getEdgeData() {
  return [
    { id: '1', source: 'skaffold-unit-tests', target: 'build-skaffold-app' },
    { id: '2', source: 'skaffold-unit-tests', target: 'build-skaffold-web' },
    { id: '3', source: 'build-skaffold-app', target: 'deploy-app' },
    { id: '4', source: 'build-skaffold-web', target: 'deploy-web' }
    // { id: "5", source: "start", target: "skaffold-unit-tests" },
    // { id: "6", source: "deploy-app", target: "end" },
    // { id: "7", source: "deploy-web", target: "end" }
  ];
}

export default function ({ height, type = 'card', width }) {
  return {
    edges: getEdgeData(),
    nodes: getNodeData({ height, type, width })
  };
}
