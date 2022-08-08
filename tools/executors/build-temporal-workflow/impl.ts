import { ExecutorContext } from '@nrwl/devkit';
import { bundleWorkflowCode } from '@temporalio/worker';
import { exec } from 'child_process';
import { writeFile } from 'fs/promises';
import * as path from 'path';
import { promisify } from 'util';

interface BuildTemporalWorkflowOptions {
  textToEcho: string;
};

async function bundleWorkflow(sourcePath: string, outputPath: string) {
  console.log('sourcePath', sourcePath);
  console.log('outputPath', outputPath);
  const workflowsPath = path.join(sourcePath, 'workflows.ts');
  const { code, sourceMap } = await bundleWorkflowCode({
    workflowsPath,
    ignoreModules: ['browser'],
  });
  const bundlePath = path.join(outputPath, 'workflow-bundle.js');
  const sourceMapPath = `${bundlePath}.map`;

  console.log('bundlePath', bundlePath);
  await writeFile(bundlePath, code);
  await writeFile(sourceMapPath, sourceMap);

  console.log(`Bundle written to ${bundlePath}`);

  return bundlePath;
}

export default async function buildTemporalWorkflowExecutor(
  options: BuildTemporalWorkflowOptions,
  context: ExecutorContext
) {
  console.info(`Executing "build-temporal-workflow"...`);
  console.info(`Options: ${JSON.stringify(options, null, 2)}`);
  console.info('context.root', context.root)
  console.info('context.projectName', context.projectName);
  console.info('sourceRoot', context.workspace.projects[context.projectName].sourceRoot);

  const { stdout, stderr } = await promisify(exec)(
    `echo ${options.textToEcho}`
  );

  if (context.projectName) {
    const workflowPath = await bundleWorkflow(
      path.join(context.root, context.workspace.projects[context.projectName].sourceRoot),
      path.join(context.root, context.workspace.projects[context.projectName].targets['build'].options['outputPath']));
    console.log(workflowPath);
    return { success: true };
  }
  return { success: false };
}
