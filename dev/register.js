/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

/*
  This allows for fast development compilation by utilizing the faster compile mode
  of `transpileOnly`.  Since this doesn't support transformers, we utilize `tsconfig-paths` 
  to handle our path resolutions.  

  When using `ts-node` or `ts-node-dev` we simply register the tsconfig-paths hooks on require
  but if we are using `node` or `mocha` or similar we need to also require the `ts-node` hooks 
  and simulate `--script-mode` (-s) so we get the appropriate `compilerOptions`.

  ## ts-node-dev

  > ts-node-dev allows for fast compilations and respawns on file modifications:

  ```
  ts-node-dev -s -H -T -r ./register --respawn -- src/tests/quick.ts
  ```

  ## ts-node

  ```
  ts-node -s -H -T -r ./register -- src/tests/quick.ts
  ```

  ## Node

  ```
  node -r ./register -- src/tests/quick.ts
  ```

  ## Mocha

  ```
  mocha --timeout 10000 -r ./register -- src/tests/acceptance/api-deposits.ts
  ```
*/
const path = require('path');
const { loadConfig, register } = require('tsconfig-paths');

const scriptPath = path.resolve(
  process.cwd(),
  process.argv[process.argv.length - 1],
);

const dirName = path.dirname(require.resolve(scriptPath));

const config = loadConfig(dirName);

if (!process.argv[1].includes('ts-node')) {
  // eslint-disable-next-line global-require
  require('ts-node').register({
    dir: dirName,
    transpileOnly: true,
    compilerHost: true,
  });
}

// dev support for absolute path resolution while allowing transpileOnly to work
register({
  baseUrl: config.absoluteBaseUrl,
  paths: config.paths,
});
