import { Worker } from '@temporalio/worker';
import * as path from 'path';
import * as activities from './activities';

async function run() {
  const workflowsPath = path.join(__dirname, 'workflow-bundle.js');
  const workflowsSourceMapPath = path.join(__dirname, 'workflow-bundle.js.map');

  const worker = await Worker.create({
    activities,
    taskQueue: 'tutorial',
    workflowBundle: {
      codePath:  workflowsPath,
      sourceMapPath: workflowsSourceMapPath,
    },
  });

  console.log('Starting worker');
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
