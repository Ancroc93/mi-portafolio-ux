import { defineType, defineField } from 'sanity'

export const projectSchema = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title.en',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'object',
            fields: [
                { name: 'es', type: 'string', title: 'Español' },
                { name: 'en', type: 'string', title: 'English' }
            ],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'object',
            fields: [
                { name: 'es', type: 'string', title: 'Español' },
                { name: 'en', type: 'string', title: 'English' }
            ],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'object',
            fields: [
                { name: 'es', type: 'text', title: 'Español', rows: 3 },
                { name: 'en', type: 'text', title: 'English', rows: 3 }
            ],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Main project thumbnail'
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'object',
            fields: [
                {
                    name: 'es',
                    type: 'array',
                    title: 'Español',
                    of: [{ type: 'string' }]
                },
                {
                    name: 'en',
                    type: 'array',
                    title: 'English',
                    of: [{ type: 'string' }]
                }
            ]
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            description: 'YouTube/Vimeo/CDN URL for main video'
        }),
        defineField({
            name: 'enableVideoPreview',
            title: 'Enable Video Preview on Hover',
            type: 'boolean',
            initialValue: true
        }),
        defineField({
            name: 'caseStudyUrl',
            title: 'External Case Study URL',
            type: 'url',
            description: 'Optional link to external case study (Behance, etc.)'
        }),
        defineField({
            name: 'metrics',
            title: 'Metrics',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'label',
                        title: 'Label',
                        type: 'object',
                        fields: [
                            { name: 'es', type: 'string', title: 'Español' },
                            { name: 'en', type: 'string', title: 'English' }
                        ]
                    },
                    {
                        name: 'value',
                        title: 'Value',
                        type: 'string'
                    }
                ],
                preview: {
                    select: {
                        labelEs: 'label.es',
                        value: 'value'
                    },
                    prepare({ labelEs, value }) {
                        return {
                            title: `${labelEs}: ${value}`
                        }
                    }
                }
            }]
        }),
        defineField({
            name: 'caseStudy',
            title: 'Advanced Case Study',
            type: 'caseStudyData',
            description: 'Enable advanced case study sections'
        }),
        defineField({
            name: 'blocks',
            title: 'Content Blocks',
            type: 'array',
            of: [{ type: 'contentBlock' }],
            description: 'Additional content blocks (text, images, videos)'
        })
    ],
    preview: {
        select: {
            titleEs: 'title.es',
            titleEn: 'title.en',
            year: 'year',
            media: 'image'
        },
        prepare({ titleEs, titleEn, year, media }) {
            return {
                title: titleEs || titleEn,
                subtitle: year,
                media
            }
        }
    }
})
