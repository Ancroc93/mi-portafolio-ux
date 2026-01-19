import { defineType, defineField } from 'sanity'

export const contentBlockSchema = defineType({
    name: 'contentBlock',
    title: 'Content Block',
    type: 'object',
    fields: [
        defineField({
            name: 'type',
            title: 'Block Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Text', value: 'text' },
                    { title: 'Image', value: 'image' },
                    { title: 'Video', value: 'video' },
                    { title: 'List', value: 'list' },
                    { title: 'GIF', value: 'gif' }
                ],
                layout: 'radio'
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
            hidden: ({ parent }) => parent?.type === 'image' || parent?.type === 'video'
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'object',
            fields: [
                { name: 'es', type: 'text', title: 'Español', rows: 5 },
                { name: 'en', type: 'text', title: 'English', rows: 5 }
            ],
            hidden: ({ parent }) => parent?.type !== 'text'
        }),
        defineField({
            name: 'src',
            title: 'Source URL (for video/external image)',
            type: 'url',
            hidden: ({ parent }) => parent?.type === 'text' || parent?.type === 'list'
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            hidden: ({ parent }) => parent?.type !== 'image' && parent?.type !== 'gif'
        }),
        defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'object',
            fields: [
                { name: 'es', type: 'string', title: 'Español' },
                { name: 'en', type: 'string', title: 'English' }
            ],
            hidden: ({ parent }) => parent?.type !== 'image' && parent?.type !== 'gif'
        }),
        defineField({
            name: 'poster',
            title: 'Video Poster URL',
            type: 'url',
            hidden: ({ parent }) => parent?.type !== 'video'
        }),
        defineField({
            name: 'embed',
            title: 'Is Embed (iframe)?',
            type: 'boolean',
            initialValue: false,
            hidden: ({ parent }) => parent?.type !== 'video'
        }),
        defineField({
            name: 'items',
            title: 'List Items',
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
            ],
            hidden: ({ parent }) => parent?.type !== 'list'
        })
    ],
    preview: {
        select: {
            type: 'type',
            titleEs: 'title.es',
            titleEn: 'title.en'
        },
        prepare({ type, titleEs, titleEn }) {
            return {
                title: titleEs || titleEn || type,
                subtitle: `Block Type: ${type}`
            }
        }
    }
})
