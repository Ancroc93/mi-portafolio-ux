export interface Metric {
    label: string;
    value: string;
}

export interface ContentBlock {
    type: 'text' | 'image' | 'video' | 'list' | 'gif';
    title?: string;
    content?: string;
    src?: string;
    alt?: string;
    poster?: string;
    embed?: boolean;
    items?: string[];
}

export interface Project {
    slug: string;
    title: string;
    year: string;
    role: string | string[];
    featured: boolean;
    description: string;
    image?: string;
    tags?: string[];
    video?: string;
    enableVideoPreview?: boolean;
    caseStudyUrl?: string; // Optional external link
    metrics?: Metric[];
    blocks?: ContentBlock[];
}
