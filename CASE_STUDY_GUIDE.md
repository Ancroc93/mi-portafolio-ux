# Case Study System - Developer Guide

## 📖 Overview

This portfolio uses a **modular case study system** that allows you to create rich, interactive project detail pages with various sections. Each section is optional and can be enabled/disabled per project.

---

## 🏗️ Architecture

### Available Sections

1. **Hero Parallax** - Full-screen hero with parallax background
2. **Metadata Grid** - Role, Year, Team, Tools in a 4-column grid
3. **Challenge & Solution** - Two-column layout with sticky text
4. **Before/After Slider** - Interactive image comparison slider
5. **Bento Gallery** - Asymmetric grid of final designs
6. **Next Project Footer** - Preview and link to next project
7. **Content Blocks** - Flexible text/image/video sections

### File Structure

```
src/
├── types.ts                         # CaseStudyData interface
├── data/projects.ts                 # Project data with case studies
├── pages/ProjectPage.jsx            # Main template with conditional rendering
└── components/project/
    ├── HeroParallax.tsx
    ├── MetadataGrid.tsx
    ├── ChallengeSolution.tsx
    ├── BeforeAfterSlider.tsx
    ├── BentoGallery.tsx
    └── NextProjectFooter.tsx
```

---

## ✅ How to Add a New Case Study

### Step 1: Open `src/data/projects.ts`

Find your project or create a new one:

```typescript
{
  slug: "my-project",
  title: { es: "Mi Proyecto", en: "My Project" },
  year: "2024",
  role: { es: "UX Designer", en: "UX Designer" },
  featured: true,
  description: { es: "Descripción...", en: "Description..." },
  image: "https://...",
  tags: { es: ["Tag1"], en: ["Tag1"] },
  
  // 🆕 Add this field:
  caseStudy: {
    // See Step 2 for options
  }
}
```

### Step 2: Configure Sections (All Optional)

```typescript
caseStudy: {
  // Hero Section (always recommended)
  heroImage: "https://image-url.jpg",
  heroVideo: "https://video-url.mp4", // optional, replaces image
  
  // Challenge & Solution
  challenge: "The main challenge was...",
  solution: "We solved it by...",
  challengeImages: [
    "https://image1.jpg",
    "https://image2.jpg"
  ],
  
  // Before/After Comparison
  beforeImage: "https://before.jpg",
  afterImage: "https://after.jpg",
  comparisonLabel: { before: "Antes", after: "Después" },
  
  // Bento Gallery
  galleryImages: [
    "https://design1.jpg",
    "https://design2.jpg",
    "https://design3.jpg"
  ],
  
  // Project Theming
  accentColor: "#4F46E5", // CSS variable for custom colors
  
  // Next Project Navigation
  nextProjectSlug: "next-project-slug"
}
```

### Step 3: Save and Test

The system automatically detects `caseStudy` and renders the advanced template.

---

## 🎛️ Section Control Examples

### Example 1: Full Case Study (All Sections)

```typescript
{
  slug: "complete-study",
  caseStudy: {
    heroImage: "...",
    challenge: "...",
    solution: "...",
    challengeImages: [...],
    beforeImage: "...",
    afterImage: "...",
    galleryImages: [...],
    nextProjectSlug: "next"
  }
}
```

### Example 2: Minimal (Only Hero + Gallery)

```typescript
{
  slug: "minimal-study",
  caseStudy: {
    heroImage: "...",
    galleryImages: [...] // Only these 2 sections will render
  }
}
```

### Example 3: No Before/After, No Next Project

```typescript
{
  slug: "custom-study",
  caseStudy: {
    heroImage: "...",
    challenge: "...",
    solution: "...",
    // beforeImage/afterImage omitted → slider won't render
    galleryImages: [...]
    // nextProjectSlug omitted → footer won't render
  }
}
```

---

## 🔧 Adding Custom Sections

### Option A: Use Existing `blocks` (Quick)

For project-specific content, use the `blocks` array:

```typescript
{
  slug: "my-project",
  caseStudy: { /* ... */ },
  blocks: [
    {
      type: "text",
      title: { es: "Metodología", en: "Methodology" },
      content: { es: "Proceso...", en: "Process..." }
    },
    {
      type: "image",
      src: "https://diagram.png",
      alt: { es: "Diagrama", en: "Diagram" }
    },
    {
      type: "video",
      src: "https://video.mp4",
      embed: false
    }
  ]
}
```

### Option B: Create New Component (For Recurring Sections)

**1. Extend the Type** (`src/types.ts`):

```typescript
export interface CaseStudyData {
  // ...existing fields
  testimonials?: string[]; // 🆕 New field
}
```

**2. Create Component** (`src/components/project/Testimonials.tsx`):

```typescript
import { motion } from "framer-motion";

interface TestimonialsProps {
  quotes: string[];
}

const Testimonials = ({ quotes }: TestimonialsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="py-24 px-6"
  >
    <h2 className="text-4xl font-bold mb-12">Testimonials</h2>
    {quotes.map((quote, i) => (
      <blockquote key={i} className="text-xl italic mb-6">
        "{quote}"
      </blockquote>
    ))}
  </motion.div>
);

export default Testimonials;
```

**3. Integrate** (`src/pages/ProjectPage.jsx`):

```javascript
// Add import
import Testimonials from "../components/project/Testimonials";

// Add in the case study render section (around line 180):
{project.caseStudy?.testimonials && (
  <Testimonials quotes={project.caseStudy.testimonials} />
)}
```

**4. Use in Projects**:

```typescript
{
  slug: "project-with-testimonials",
  caseStudy: {
    heroImage: "...",
    testimonials: [
      "Amazing work! - Client A",
      "Best design ever - Client B"
    ]
  }
}
```

---

## 🎨 Theming with CSS Variables

Each project can define custom accent colors:

```typescript
caseStudy: {
  accentColor: "#FF6B6B" // Red accent
}
```

The system automatically applies:
```css
--project-accent-color: #FF6B6B
```

Use in your custom components:
```css
.custom-element {
  color: var(--project-accent-color);
}
```

---

## 🔄 Backward Compatibility

Projects **without** `caseStudy` will use the original simple template:
- Header with title
- Metadata row
- Video/Image
- Content blocks

This ensures existing projects continue to work without modification.

---

## 📱 Responsive Behavior

All components are mobile-first:
- **Hero:** Full-screen on all devices
- **Metadata Grid:** 2 columns (mobile) → 4 columns (desktop)
- **Challenge/Solution:** Stacked (mobile) → Side-by-side with sticky (desktop)
- **Bento Gallery:** 1 column (mobile) → 3-column asymmetric grid (desktop)

---

## 🧪 Testing Your Case Study

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Navigate to:
   ```
   http://localhost:5173/mi-portafolio-ux/#/projects/your-slug
   ```

3. Check:
   - ✅ Parallax scroll effect on hero
   - ✅ Before/After slider draggability
   - ✅ Scroll-triggered animations
   - ✅ Responsive layout (resize browser)
   - ✅ Next project navigation

---

## 📚 Reference: Complete `CaseStudyData` Interface

```typescript
export interface CaseStudyData {
  heroImage?: string;          // Hero background image
  heroVideo?: string;          // Hero background video (overrides image)
  challenge?: string;          // Challenge text
  solution?: string;           // Solution text
  challengeImages?: string[];  // Images for Challenge section
  beforeImage?: string;        // Before image for comparison
  afterImage?: string;         // After image for comparison
  comparisonLabel?: {          // Labels for before/after
    before: string;
    after: string;
  };
  galleryImages?: string[];    // Images for Bento Gallery
  accentColor?: string;        // Custom accent color (hex)
  nextProjectSlug?: string;    // Slug of next project
}
```

---

## 🚀 Quick Start Checklist

- [ ] Open `src/data/projects.ts`
- [ ] Find your project or create new entry
- [ ] Add `caseStudy: {}` object
- [ ] Add at least `heroImage` and one other section
- [ ] Save file
- [ ] Run `npm run dev`
- [ ] Visit `/#/projects/your-slug`

---

## 💡 Tips

- Start with Hero + Gallery (minimal viable case study)
- Add Before/After if you have comparison designs
- Use Challenge/Solution for storytelling
- Set `nextProjectSlug` to create a browsing flow
- Use custom `accentColor` to match project branding

---

## 🐛 Troubleshooting

**Sections not appearing?**
- Check that you provided the required fields (e.g., `galleryImages` array for gallery)
- Verify `caseStudy` object exists on your project

**Slider not working?**
- Ensure both `beforeImage` AND `afterImage` are provided
- Check browser console for errors

**Responsive issues?**
- All components use Tailwind's responsive classes (`md:`)
- Test at 375px, 768px, and 1440px widths

---

**Last Updated:** January 2026  
**Maintained by:** Andrés Cruz / Development Team
