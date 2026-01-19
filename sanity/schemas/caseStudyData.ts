import { defineType, defineField } from 'sanity'

export const caseStudyDataSchema = defineType({
    name: 'caseStudyData',
    title: 'Case Study Data',
    type: 'object',
    fields: [
        defineField({
            name: 'heroImage',
            title: 'Hero Background Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Main hero section background image'
        }),
        defineField({
            name: 'heroVideoUrl',
            title: 'Hero Video URL',
            type: 'url',
            description: 'YouTube/Vimeo/CDN URL for hero video (overrides image)'
        }),
        defineField({
            name: 'challenge',
            title: 'The Challenge',
            type: 'text',
            rows: 4,
            description: 'Description of the main challenge/problem'
        }),
        defineField({
            name: 'solution',
            title: 'The Solution',
            type: 'text',
            rows: 4,
            description: 'Description of how you solved it'
        }),
        defineField({
            name: 'challengeImages',
            title: 'Challenge Section Images',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true }
            }],
            description: 'Images that scroll on the right while text stays sticky'
        }),
        defineField({
            name: 'beforeImage',
            title: 'Before Image',
            type: 'image',
            options: { hotspot: true },
            description: 'For before/after comparison slider'
        }),
        defineField({
            name: 'afterImage',
            title: 'After Image',
            type: 'image',
            options: { hotspot: true },
            description: 'For before/after comparison slider'
        }),
        defineField({
            name: 'comparisonLabel',
            title: 'Comparison Labels',
            type: 'object',
            fields: [
                {
                    name: 'before',
                    type: 'string',
                    title: 'Before Label',
                    initialValue: 'Before'
                },
                {
                    name: 'after',
                    type: 'string',
                    title: 'After Label',
                    initialValue: 'After'
                }
            ]
        }),
        defineField({
            name: 'galleryImages',
            title: 'Gallery Images',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true }
            }],
            description: 'Final designs shown in Bento Grid layout'
        }),
        defineField({
            name: 'accentColor',
            title: 'Accent Color',
            type: 'color',
            options: {
                disableAlpha: true
            },
            description: 'Custom accent color for this project'
        }),
        defineField({
            name: 'nextProject',
            title: 'Next Project',
            type: 'reference',
            to: [{ type: 'project' }],
            description: 'Link to the next project in the navigation'
        })
    ]
})
