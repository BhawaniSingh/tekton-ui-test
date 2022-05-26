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
      id: 'npm-install',
      status: 'success',
      title: 'npm-install',
      height,
      width,
      type
    },
    {
      id: 'lint',
      status: 'success',
      title: 'lint',
      height,
      width,
      type
    },
    {
      id: 'unit-tests',
      status: 'success',
      title: 'unit-tests',
      height,
      width,
      type
    },
    {
      id: 'static-scan',
      status: 'success',
      title: 'static-scan',
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
      id: 'integration-tests',
      status: 'success',
      title: 'integration-tests',
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
    { id: '1', source: 'git-clone', target: 'npm-install' },
    { id: '2', source: 'npm-install', target: 'lint' },
    { id: '3', source: 'npm-install', target: 'unit-tests' },
    { id: '4', source: 'npm-install', target: 'static-scan' },
    { id: '5', source: 'lint', target: 'build' },
    { id: '6', source: 'unit-tests', target: 'build' },
    { id: '7', source: 'static-scan', target: 'build' },
    { id: '8', source: 'build', target: 'integration-tests' },
    { id: '9', source: 'integration-tests', target: 'publish-images' },
    { id: '10', source: 'publish-images', target: 'publish-to-bucket' },
    { id: '11', source: 'publish-images', target: 'publish-to-bucket-latest' },
    { id: '12', source: 'publish-to-bucket', target: 'report-bucket' }
  ];
}

export default function ({ height, type = 'card', width }) {
  return {
    edges: getEdgeData(),
    nodes: getNodeData({ height, type, width })
  };
}
