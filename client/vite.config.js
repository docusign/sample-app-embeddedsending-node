import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, path.join(process.cwd(), '..'), '');

  return {
    plugins: [react()],
    define: {
      'global': 'globalThis',
      'process.env': env,
    },
    server: (() => {
      if (command === 'build') {
        return null;
      }
      const portEnvKey = 'REACT_DEV_SERVER_PORT';
      const port = Number(env[portEnvKey]);
      if (!Number.isInteger(port)) {
        throw new Error(`"port" is undefined or invalid. Provided value for '${portEnvKey}' is '${env[portEnvKey]}'.`);
      }

      return {
        hmr: {
          host: 'localhost',
          port,
        },
        port,
      };
    })(),
  };
});
