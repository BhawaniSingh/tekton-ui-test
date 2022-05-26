function getNodeData({ height, type, width }) {
  return [
    {
      id: 'git-clone',
      status: 'success',
      title: 'git-clone',
      height,
      width,
      type
    },
    {
      id: 'precheck',
      status: 'success',
      title: 'precheck',
      height,
      width,
      type
    },
    {
      id: 'build',
      status: 'success',
      title: 'build',
      height,
      width,
      type
    },
    {
      id: 'publish-images',
      status: 'success',
      title: 'publish-images',
      height,
      width,
      type
    },
    {
      id: 'publish-to-bucket',
      status: 'success',
      title: 'publish-to-bucket',
      height,
      width,
      type
    },
    {
      id: 'publish-to-bucket-latest',
      status: 'success',
      title: 'publish-to-bucket-latest',
      height,
      width,
      type
    },
    {
      id: 'report-bucket',
      status: 'success',
      title: 'report-bucket',
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
    { id: '1', source: 'git-clone', target: 'precheck' },
    { id: '2', source: 'precheck', target: 'build' },
    { id: '3', source: 'build', target: 'publish-images' },
    { id: '4', source: 'publish-images', target: 'publish-to-bucket' },
    { id: '5', source: 'publish-images', target: 'publish-to-bucket-latest' },
    { id: '6', source: 'publish-to-bucket', target: 'report-bucket' }
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
