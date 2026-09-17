# Recruitment Page Redesign

## Overview

A premium, responsive recruitment experience for 180 Degrees Consulting VIT Chennai. The page showcases the organization's departments, application process, and available career opportunities in a polished, modern interface designed for both dark and light modes.

**Route:** `/recruitments`

## Features

### Design & Theming
- **Dark and Light Mode Support**: Intentionally designed themes for both modes, not simple color inversions
  - Light mode: Clean off-white backgrounds, subtle green accents, soft borders, readable text
  - Dark mode: Deep charcoal/black backgrounds, green accents with glow effects, soft borders
- **Glassmorphism**: Glass effect cards with backdrop blur and theme-aware transparency
- **Premium Typography**: Hierarchical, clean typography with gradient accents
- **Smooth Transitions**: All color changes respect theme transitions for seamless switching

### Interactive Components
- **Mouse-Reactive 3D Department Cards**: 
  - Subtle 3D perspective tilt based on mouse position
  - Cursor-position-based glow effect for premium feel
  - Smooth reset when mouse leaves the card
  - Disabled for touch devices (no nausea-inducing animation)
  - Uses CSS `transform-style: preserve-3d` perspective, no canvas

- **Animated Statistics**: Viewport-triggered counter animations
  - Numbers count from 0 to target when section becomes visible
  - Uses `useInView` with `once: true` to prevent repeated animations
  - Smooth easing for visual appeal

- **Sticky Navigation**: Glassmorphism navbar
  - Increases blur and background opacity on scroll
  - Readable in both dark and light modes
  - Smooth transitions

### Page Sections

1. **Hero Section**
   - Status badge showing "Recruitment Active"
   - Large, modern heading with gradient text
   - Supporting description
   - Dual CTA buttons (Apply Now, Explore Departments)

2. **Why Join Us Section**
   - Brief introduction to 180 Degrees Consulting
   - Three highlight cards with icons and descriptions
   - Smooth entrance animations

3. **Animated Statistics**
   - 6 Departments
   - 5+ Technical Roles
   - 180° Global Network
   - 100% Impact Driven
   - Counters animate on viewport entry

4. **Department Cards Grid**
   - Six departments: Technical, Marketing, Operations, Finance, CRM, Business Strategy
   - Mouse-reactive 3D tilt effect
   - Department description
   - List of available roles with status (Open/Closed)
   - Learn More link

5. **Recruitment Journey Timeline**
   - Four-step process: Application Opens, Shortlist Review, Interview Round, Offer
   - Glass-effect cards with icons
   - Staggered animations

6. **Application Status Section**
   - Current recruitment status
   - Visual indicators for open/closed positions
   - Information about ongoing cycles

7. **Final CTA**
   - Call-to-action to start the application
   - Linked to recruitment portal

## Tech Stack

### Framework & Libraries
- **Next.js**: 16.3.5 (App Router)
- **React**: 19.1.0 with hooks
- **TypeScript**: Fully typed component and props
- **Framer Motion**: 12.23.12
  - Entrance animations with `motion.div` and `initial`/`animate`/`whileInView`
  - `useInView` hook for viewport-triggered animations
  - Smooth transitions and staggered delays

- **Lucide React**: 0.468.0
  - All icons sourced from Lucide, no Unicode arrows or emojis
  - Used for: Briefcase, Users, Zap, TrendingUp, ArrowRight, ExternalLink, CheckCircle2, Clock, Target, Code2, Lightbulb, BarChart3, MessageSquare

### Styling
- **Tailwind CSS**: 4.1.14 (used in app, but CSS modules for recruitment page)
- **CSS Modules**: `RecruitmentsPage.css`
  - Theme-aware CSS variables
  - Both light and dark mode styles defined
  - No global conflicts

## CSS Variables & Theming

### Light Mode (`:root`)
```css
--recruit-bg: #f6faf4
--recruit-surface-primary: #ffffff
--recruit-text-primary: #14301f
--recruit-accent-glow: rgba(141, 198, 63, 0.15)
```

### Dark Mode (`.dark`)
```css
--recruit-bg: #0c120e
--recruit-surface-primary: rgba(22, 40, 30, 0.5)
--recruit-text-primary: #eaf4e8
--recruit-accent-glow: rgba(141, 198, 63, 0.25)
```

All CSS is scoped to `.recruit-*` classes, preventing global style pollution.

## Key Implementation Details

### Mouse-Reactive Cards
- Uses `ref` and mouse event handlers (no canvas)
- Calculates rotation based on distance from card center
- Applies CSS `perspective(1200px)` and `rotateX`/`rotateY`
- Smooth 0.1s transition on mouse move, immediate reset on mouse leave
- Includes cursor-position-based radial glow

### Animated Counters
```typescript
function AnimatedCounter({ target, suffix }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    // Count animation logic using requestAnimationFrame
  }, [inView, target]);
}
```

- Respects `once: true` to animate only on first viewport entry
- Uses `margin: "-80px"` to trigger animation slightly before full visibility

### Accessibility
- All buttons are semantic `<button>` or `<a>` elements
- Focus states visible with 2px outline
- External links use `target="_blank"` and `rel="noopener noreferrer"`
- Animations respect `prefers-reduced-motion` media query
- Sufficient text contrast in both themes
- No animated GIFs or rapidly flashing elements

### Responsive Design
Tested breakpoints:
- Desktop: 1440px
- Laptop: 1280px
- Tablet: 1024px, 768px
- Mobile: 480px, 390px

Key responsive behaviors:
- Hero heading: `clamp(2.5rem, 7vw, 4.5rem)`
- Department grid: `repeat(auto-fit, minmax(320px, 1fr))`
- CTA buttons: `flex-wrap: wrap` on mobile
- Section padding: Adjusted for smaller screens
- Typography scales with viewport

## Files Changed

### New Files
- `src/app/recruitments/page.tsx` - Recruitments route wrapper
- `src/components/RecruitmentsPage.tsx` - Main component with all sections
- `src/components/RecruitmentsPage.css` - All styling with theme variables

### Modified Files
- `src/data/event.ts` - Added recruitment link to NAV_LINKS

## Application Portal

Applications are managed through the official recruitment portal:
- **URL**: https://vitc-180dc.org/portal
- All CTA buttons and links point to this portal

## Departments & Roles

### Technical
- Technical Director (Senior) - Closed
- DevOps Senior Consultant (Senior) - Closed
- Product Senior Consultant (Senior) - Closed
- AI/ML Senior Consultant (Senior) - Closed
- Technical Member (Entry) - **Open**

### Marketing, Operations, Finance, CRM, Business Strategy
- Various senior, mid-level, and entry-level positions
- Status shown on cards and in role badges

## Testing Performed

- **TypeScript Compilation**: ✓ No errors
- **Next.js Build**: ✓ Successful build with route `/recruitments` recognized
- **Theme Switching**: Both light and dark modes render correctly
- **Responsiveness**: Verified on multiple breakpoints
- **Accessibility**: Focus states, color contrast, semantic HTML verified
- **No Canvas**: Confirmed no canvas particles or canvas rendering used
- **Lucide Icons**: All icons use Lucide React components

## Future Enhancements

Possible additions (not currently implemented):
- Department filtering by job level
- Application status tracking
- FAQ section specific to recruitment
- Integration with ATS for real-time job postings
- Video testimonials from team members
- Live application count display

## Development & Maintenance

### Running Locally
```bash
npm run dev
# Visit http://localhost:3000/recruitments
```

### Building
```bash
npm run build
# Verifies no TypeScript errors
```

### Theme System Integration
The page uses the existing `next-themes` system from the app's Providers. No additional theme setup required.

## Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

Backdrop blur may gracefully degrade in older browsers, but content remains readable.

## Performance Notes

- All animations use GPU-accelerated transforms
- No layout thrashing (animations use `transform` and `opacity` only)
- Viewport-triggered animations don't restart on scroll
- Images are optimized through Next.js Image component
- CSS is minified in production builds
