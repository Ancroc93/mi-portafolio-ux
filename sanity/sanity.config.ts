import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './schemas'

export default defineConfig({
    name: 'default',
    title: 'Mi Portafolio UX - Content Studio',

    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '6vuugxn1',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',

    plugins: [
        deskTool(),
        visionTool(),
        colorInput()
    ],

    schema: {
        types: schemaTypes,
    },
})
