import type { Locale } from '../i18n/types';

/**
 * Query principal para obtener todos los proyectos
 * Localiza automáticamente según el idioma especificado
 */
export const projectsQuery = (locale: Locale) => `
  *[_type == "project"] | order(year desc) {
    "slug": slug.current,
    "title": title.${locale},
    year,
    "role": role.${locale},
    featured,
    "description": description.${locale},
    "image": image.asset->url,
    "tags": tags.${locale},
    "video": videoUrl,
    enableVideoPreview,
    caseStudyUrl,
    metrics[] {
      "label": label.${locale},
      value
    },
    caseStudy {
      "heroImage": heroImage.asset->url,
      "heroVideo": heroVideoUrl,
      challenge,
      solution,
      "challengeImages": challengeImages[].asset->url,
      "beforeImage": beforeImage.asset->url,
      "afterImage": afterImage.asset->url,
      comparisonLabel,
      "galleryImages": galleryImages[].asset->url,
      "accentColor": accentColor.hex,
      "nextProjectSlug": nextProject->slug.current
    },
    blocks[] {
      type,
      "title": title.${locale},
      "content": content.${locale},
      src,
      "image": image.asset->url,
      "alt": alt.${locale},
      poster,
      embed,
      "items": items.${locale}
    }
  }
`;

/**
 * Query para obtener un solo proyecto por slug
 */
export const projectBySlugQuery = (slug: string, locale: Locale) => `
  *[_type == "project" && slug.current == "${slug}"][0] {
    "slug": slug.current,
    "title": title.${locale},
    year,
    "role": role.${locale},
    featured,
    "description": description.${locale},
    "image": image.asset->url,
    "tags": tags.${locale},
    "video": videoUrl,
    enableVideoPreview,
    caseStudyUrl,
    metrics[] {
      "label": label.${locale},
      value
    },
    caseStudy {
      "heroImage": heroImage.asset->url,
      "heroVideo": heroVideoUrl,
      challenge,
      solution,
      "challengeImages": challengeImages[].asset->url,
      "beforeImage": beforeImage.asset->url,
      "afterImage": afterImage.asset->url,
      comparisonLabel,
      "galleryImages": galleryImages[].asset->url,
      "accentColor": accentColor.hex,
      "nextProjectSlug": nextProject->slug.current
    },
    blocks[] {
      type,
      "title": title.${locale},
      "content": content.${locale},
      src,
      "image": image.asset->url,
      "alt": alt.${locale},
      poster,
      embed,
      "items": items.${locale}
    }
  }
`;

/**
 * Query para obtener solo proyectos destacados
 */
export const featuredProjectsQuery = (locale: Locale) => `
  *[_type == "project" && featured == true] | order(year desc) {
    "slug": slug.current,
    "title": title.${locale},
    year,
    "role": role.${locale},
    "description": description.${locale},
    "image": image.asset->url,
    "tags": tags.${locale},
    "video": videoUrl,
    enableVideoPreview
  }
`;
