import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configuración del cliente de Sanity
export const sanityClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    useCdn: true, // `false` si quieres datos frescos siempre
    apiVersion: '2024-01-01'
});

// Helper para construir URLs de imágenes con transformaciones
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}

// Helper para obtener URL optimizada de imagen
export function getImageUrl(source: any, options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
}) {
    let imageBuilder = urlFor(source);

    if (options?.width) imageBuilder = imageBuilder.width(options.width);
    if (options?.height) imageBuilder = imageBuilder.height(options.height);
    if (options?.quality) imageBuilder = imageBuilder.quality(options.quality);
    if (options?.format) imageBuilder = imageBuilder.format(options.format);

    return imageBuilder.url();
}
