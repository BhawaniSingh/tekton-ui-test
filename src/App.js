import React, { useState } from 'react';
import { ContentSwitcher, Switch, Toggle } from 'carbon-components-react';

import Example from './components/Example';
import { cardWidth } from './constants';
import { getDAG } from './graph';

import data from './data';
import example7Pipeline from './data/example7_pipeline.json';
import releasePipeline from './data/release-pipeline.json';
import finallyPipeline from './data/finally-pipeline.json';
import whenExpressionsPipelineRun from './data/when-expressions-pipelinerun.json';

function Cards1() {
  return (
    <Example dataFn={data.example1} id="cards-1" title="Cards example 1" />
  );
}

function Cards2() {
  return (
    <Example dataFn={data.example2} id="cards-2" title="Cards example 2" />
  );
}

function Cards3() {
  return (
    <Example dataFn={data.example3} id="cards-3" title="Cards example 3" />
  );
}

function Icons1() {
  return (
    <Example
      dataFn={data.example1}
      graphType="condensed"
      id="icons-1"
      title="Icons example 1"
    />
  );
}

function Icons2() {
  return (
    <Example
      dataFn={data.example2}
      graphType="condensed"
      id="icons-2"
      title="Icons example 2"
    />
  );
}

function Icons3() {
  return (
    <Example
      dataFn={data.example3}
      graphType="condensed"
      id="icons-3"
      title="Icons example 3"
    />
  );
}

function PipelineExamples() {
  const [fakeStatus, setFakeStatus] = useState(true);
  return (
    <>
      <Toggle
        defaultToggled
        id="pipeline-toggle-status"
        labelA="No status"
        labelB="Show fake status"
        onToggle={(toggled) => setFakeStatus(toggled)}
        size="sm"
      />
      <Example
        dataFn={() =>
          getDAG({
            pipeline: example7Pipeline,
            pipelineRun: fakeStatus,
            trigger: { type: 'manual' }
          })
        }
        id="pipeline-1"
        key={`pipeline-1-${fakeStatus}`}
        title="Pipeline example 1"
      />
      <Example
        dataFn={() =>
          getDAG({
            pipeline: releasePipeline,
            pipelineRun: fakeStatus,
            trigger: { type: 'timer' }
          })
        }
        id="pipeline-2"
        key={`pipeline-2-${fakeStatus}`}
        title="Pipeline example 2"
      />
      <Example
        dataFn={() =>
          getDAG({
            pipeline: finallyPipeline,
            pipelineRun: fakeStatus,
            trigger: { type: 'git' }
          })
        }
        id="pipeline-3"
        key={`pipeline-3-${fakeStatus}`}
        title="Pipeline example 3"
      />
      <Example
        dataFn={() =>
          getDAG({
            pipeline: { spec: whenExpressionsPipelineRun.spec.pipelineSpec },
            pipelineRun: fakeStatus,
            trigger: { type: 'webhook' }
          })
        }
        id="pipeline-4"
        key={`pipeline-4-${fakeStatus}`}
        title="Pipeline example 4"
      />
      <Example
        dataFn={() =>
          getDAG({
            pipeline: example7Pipeline,
            pipelineRun: fakeStatus,
            trigger: { type: 'trigger' }
          })
        }
        id="pipeline-5"
        key={`pipeline-5-${fakeStatus}`}
        title="Pipeline example 5"
      />

      <Example
        dataFn={() =>
          getDAG({
            pipeline: example7Pipeline,
            pipelineRun: fakeStatus
          })
        }
        id="pipeline-6"
        key={`pipeline-6-${fakeStatus}`}
        title="Pipeline example 6"
      />
    </>
  );
}

function Order() {
  return (
    <>
      <Example
        dataFn={data.example8}
        description={
          <>
            <p>
              Uses data from{' '}
              <a href="https://reaflow.dev/?path=/story/demos-basic--many-nodes">
                reaflow 'many nodes' story
              </a>
              . See{' '}
              <a href="https://github.com/reaviz/reaflow/blob/b7a4e815e15a2dff0c9481e5841b4a1dd4bf5896/src/layout/elkLayout.ts">
                config
              </a>{' '}
              for comparison.
            </p>
          </>
        }
        defaultDirection="DOWN"
        id="order-1"
        nodeWidth={cardWidth / 2}
        title="Test node order"
      />
    </>
  );
}

const content = {
  card: (
    <>
      <Cards1 />
      <Cards2 />
      <Cards3 />
    </>
  ),
  icon: (
    <>
      <Icons1 />
      <Icons2 />
      <Icons3 />
    </>
  ),
  dag: (
    <>
      <PipelineExamples />
    </>
  ),
  debug: (
    <>
      <Order />
    </>
  )
};

export default () => {
  const [selectedTab, setSelectedTab] = useState('card');

  return (
    <>
      <h1>Graph exploration</h1>

      <ContentSwitcher
        onChange={({ name }) => setSelectedTab(name)}
        selectionMode="manual"
        size="sm"
      >
        <Switch name="card" text="Cards" />
        <Switch name="icon" text="Icons (compact)" />
        <Switch name="dag" text="Pipeline -&gt; DAG (work in progress)" />
        {/* <Switch name="debug" text="Test / Debug" /> */}
      </ContentSwitcher>

      {content[selectedTab]}
    </>
  );
};
