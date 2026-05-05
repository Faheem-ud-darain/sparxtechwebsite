import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import project from './sanity/schemas/project';

export default defineConfig({
  name: 'default',
  title: 'SPARX Studioz',

  projectId: 'mwicua0h',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [project],
  },
});
