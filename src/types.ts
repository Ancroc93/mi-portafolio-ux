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

export interface CaseStudyData {
    // Hero Section
    heroImage?: string;
    heroVideo?: string;

    // Challenge & Solution
    challenge?: string;
    solution?: string;
    challengeImages?: string[];

    // Before/After Comparison
    beforeImage?: string;
    afterImage?: string;
    comparisonLabel?: { before: string; after: string };

    // Bento Gallery
    galleryImages?: string[];

    // Project Theme (CSS Variables)
    accentColor?: string;

    // Next Project
    nextProjectSlug?: string;
}

export interface Project {
    slug: string;
    title: string;
    year: string;
    location?: string;
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
    caseStudy?: CaseStudyData; // New: Advanced case study sections
}
