# Frontend Design Document - Mini-Flashcards (Apple Design System Redesign)

## 1. Visual Identity & Aesthetic

### 1.1 Tone: Apple-Inspired Cinematic Minimalism
The design philosophy is reductive to its core: every pixel exists in service of the vocabulary, and the interface itself retreats until it becomes invisible. This is minimalism as reverence for the learning object.

- **Conceptual Direction**: "Cinematic, Immersive, Controlled Drama."
- **Differentiation**: High-contrast alternating sections, translucent dark glass navigation, and tight, professional typography.

### 1.2 Typography
- **Heading/Display**: `SF Pro Display` (via `system-ui`). Used for main English vocabulary and page titles.
- **UI/Body**: `SF Pro Text` (via `system-ui`). Used for meanings, instructions, and UI elements.
- **Typography Rules**:
  - SF Pro Display at 20px+; SF Pro Text at 19px and below.
  - Negative letter-spacing: -0.28px at 56px, -0.374px at 17px.
  - Tight headline line-heights: 1.07 - 1.14.

### 1.3 Color Palette
A starkly binary palette for a high-end, cinematic feel.
- **Primary Background (Dark)**: `#000000` (Hero sections).
- **Secondary Background (Light Gray)**: `#f5f5f7` (Information/List sections).
- **Surface (Cards)**: `#ffffff` (Light) or `#1d1d1f` (Dark).
- **Text (Primary)**: `#1d1d1f` on light, `#ffffff` on dark.
- **Accent (Apple Blue)**: `#0071e3` - Used exclusively for primary actions and focus.
- **Link Blue**: `#0066cc` (Light) or `#2997ff` (Dark).
- **Success**: `Emerald-500` (Success feedback).
- **Error**: `Rose-500` (Error feedback).

### 1.4 Visual Elements
- **Radius**:
  - `8px` (Standard cards/buttons).
  - `11px` (Search/Filter/Select inputs).
  - `12px` (Topic category cards).
  - `14px` (Session selection elements).
  - `980px` (Pill CTAs).
- **Shadow**: `rgba(0, 0, 0, 0.22) 3px 5px 30px 0px` for elevated product cards.
- **Transitions**: 250ms `cubic-bezier(0.4, 0, 0.2, 1)` for all state changes.
- **Navigation Glass**: `rgba(0, 0, 0, 0.8)` with `backdrop-filter: saturate(180%) blur(20px)`.

---

## 2. Component Design & Interactions

### 2.1 The Flashcard (`Flashcard.tsx`)
- **Aesthetic**: Borderless card with deep, soft Apple shadow.
- **Front Side**: 
  - Large English word centered in semibold SF Pro Display.
  - **Topic Badge**: Subtle top-aligned badge for category context.
- **Back Side**: 
  - Vietnamese meaning centered.
  - **Example Sentence**: Italicized English example at the bottom, separated by a light divider (`border-foreground/5`).
- **Interaction**: Tactile 3D flip animation.

### 2.2 Navigation (`TopNav.tsx`)
- **Aesthetic**: Translucent dark glass sticky bar at the top (48px height).
- **Items**: Home, Topics, Add Flashcard, Quiz, Writing.
- **Active State**: Subtle white/50 opacity on the current link.

### 2.3 Searchable Combobox (`SearchableCombobox.tsx`)
- **Aesthetic**: Minimalist input-style trigger with a floating dropdown menu.
- **Features**: 
  - Real-time filtering.
  - **Quick Create**: Ability to create a new Topic inline without leaving the form.
  - Animation: `animate-in fade-in zoom-in` from the top.

### 2.4 Pre-session Screen
- **Aesthetic**: Immersive card-based modal before starting Quiz or Writing.
- **Purpose**: Allows users to select a specific Topic to practice or choose "All Topics".

---

## 3. Page Layouts (User Stories)

### 3.1 Dashboard (The Word List)
- **Hero Section**: Dark background with large "My Collection" title and stats.
- **Controls**: 
  - **Topic Filter**: Integrated dropdown for focused collection viewing.
  - **Search Bar**: 11px radius input with blue focus ring.
- **Word Grid**: Alternating light gray background with elevated product-style flashcards.

### 3.2 Topic Management (`/topics`)
- **Aesthetic**: Grid of cards on Apple Gray background.
- **Layout**: 
  - Dark header with Topic creation form (Searchable style).
  - Cards showing Topic name and "System" badge for predefined categories.
  - Interactive scale effect on hover.

### 3.3 Create Flashcard
- **Header**: Immersive dark header with semibold title.
- **Form**: 
  - Integrated Topic Combobox for categorization.
  - Large, semibold inputs for English and Vietnamese.
  - Textarea for Example Sentence.
- **Primary CTA**: Apple Blue button with 8px radius.

### 3.4 Learning Modules (Quiz & Writing)
- **Header**: Dark focus mode with progress bar and current question.
- **Body**: Light gray area for interaction (options or writing input).
- **Feedback**: Minimalistic notifications using Apple's color and shadow system.

---

## 4. Accessibility & Responsive Design
- **Touch Targets**: Minimum 44x44px.
- **SF Pro Optical Sizing**: Leverages OS-level optical sizing for readability.
- **Safe Areas**: Padding for mobile notches and system indicators.

---

## 5. Technology Implementation
- **Framework**: Next.js 16+ (App Router).
- **Styling**: Tailwind CSS 4+ (using Apple design tokens).
- **Animations**: Framer Motion / Motion.
- **Typography**: Native System UI (SF Pro fallback chain).
- **API Strategy**: Layered services (Flashcard, Topic, Learning) with a unified type-safe `apiClient`.
