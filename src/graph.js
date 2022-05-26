import { cardHeight, cardWidth, shapeSize } from './constants';

function addEdge({ edges, source, target }) {
  edges.push({
    id: `${source}::${target}`,
    source,
    target
  });
}

// https://tekton.dev/docs/pipelines/pipelines/#configuring-the-task-execution-order
export function getDAG({ pipeline, pipelineRun, trigger }) {
  // TODO: handle taskRun + pipelineRun status
  const edges = [];
  const nodes = [];
  const sourceNodes = [];
  let sinkNodes = new Set(pipeline.spec.tasks.map(({ name }) => name));

  pipeline.spec.tasks.forEach((task, index) => {
    nodes.push({
      id: task.name,
      status: pipelineRun ? 'success' : 'unknown',
      title: task.name,
      height: cardHeight,
      width: cardWidth
    });

    const taskDependencies = new Set();
    task.runAfter?.forEach((runAfter) => {
      taskDependencies.add(runAfter);
    });

    task.resources?.inputs?.forEach((resource) => {
      resource.from?.forEach((from) => taskDependencies.add(from));
    });

    /*
      TODO:
      - conditions (deprecated)
        - resources
        - results
      - params
        - results
      - when expressions
        - results

      see https://github.com/tektoncd/pipeline/blob/a343e755e4ea8f46050f19862fe3a5c788ad604a/pkg/apis/pipeline/v1beta1/pipeline_types.go#L420
    */

    if (taskDependencies.size === 0) {
      sourceNodes.push(task.name);
    } else {
      Array.from(taskDependencies).forEach((dependency) => {
        sinkNodes.delete(dependency);
        addEdge({
          edges,
          source: dependency,
          target: task.name
        });
      });
    }
  });

  sinkNodes = Array.from(sinkNodes).map((name) => ({ name }));

  const triggerNodeID = 'tkn-graph--trigger';
  const pipelineTasksEndNodeID = 'tkn-graph--pipelineTasksEnd';
  const endNodeID = 'tkn-graph--end';

  nodes.push({
    id: triggerNodeID,
    title: 'Trigger info TBD',
    height: shapeSize,
    width: shapeSize,
    status: trigger?.type || 'dummy',
    type: 'icon'
  });

  sourceNodes.forEach((sourceNode) => {
    addEdge({
      edges,
      source: triggerNodeID,
      target: sourceNode
    });
  });

  const finallyTasks = pipeline.spec.finally || [];

  if (finallyTasks.length) {
    nodes.push({
      id: pipelineTasksEndNodeID,
      title: '?',
      height: shapeSize,
      width: shapeSize,
      status: 'dummy',
      type: 'icon'
    });

    sinkNodes.forEach(({ name }) => {
      addEdge({
        edges,
        source: name,
        target: pipelineTasksEndNodeID
      });
    });

    finallyTasks.forEach(({ name }) => {
      nodes.push({
        id: name,
        status: pipelineRun ? 'success' : null,
        title: name,
        height: cardHeight,
        width: cardWidth
      });

      addEdge({
        edges,
        source: pipelineTasksEndNodeID,
        target: name
      });
    });
  }

  // TODO: only include end node for runs?
  nodes.push({
    id: endNodeID,
    title: 'Status TBD',
    height: shapeSize,
    width: shapeSize,
    status: pipelineRun ? 'success' : null,
    type: 'icon'
  });

  (finallyTasks.length ? finallyTasks : sinkNodes).forEach(({ name }) => {
    addEdge({
      edges,
      source: name,
      target: endNodeID
    });
  });

  return {
    nodes,
    edges
  };
}
