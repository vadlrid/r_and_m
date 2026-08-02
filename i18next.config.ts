import { defineConfig } from 'i18next-cli';

export default defineConfig({
  locales: ['en', 'ru'],
  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'public/locales/{{language}}/{{namespace}}.json',
    defaultNS: 'translation',
    primaryLanguage: 'en',
    secondaryLanguages: ['ru'],
    keySeparator: '.',
    nsSeparator: ':',
    sort: true,
    indentation: 2,
    defaultValue: '',
    removeUnusedKeys: true,
    warnOnConflicts: true,
    extractFromComments: true
  },
  types: {
    input: ['public/locales/en/**/*.json'],
    basePath: 'public/locales/en',
    output: 'src/types/i18next.d.ts',
    resourcesFile: 'src/types/i18next-resources.d.ts'
  }
});
