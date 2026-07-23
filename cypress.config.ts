import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://vadlrid.github.io/r_and_m/',
    supportFile: false
  }
});
