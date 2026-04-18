# Frontend Design Document - Mini-Flashcards

## 1. Visual Identity & Aesthetic

### 1.1 Tone: Refined Minimalism
The design prioritizes clarity, focus, and rapid interaction. By using a minimalist aesthetic with high-quality typography and subtle motion, we create an environment that minimizes cognitive load during learning.

- **Conceptual Direction**: "Clean, Immersive, Focused."
- **Differentiation**: High-quality typography pairings and fluid, 3D card-flip animations that make the digital experience feel tactile.

### 1.2 Typography
- **Heading/Display**: `Instrument Serif` (or `Space Grotesk` for a more modern feel). Used for the main English vocabulary.
- **UI/Body**: `Geist Sans` or `Inter`. Used for Vietnamese meanings, instructions, and UI elements.
- **Size Scale**:
  - English Word (Main): 3rem (48px) - 4rem (64px)
  - Vietnamese Meaning: 1.5rem (24px)
  - UI Text: 0.875rem (14px) - 1rem (16px)

### 1.3 Color Palette
A "Soft Neutral" palette with a high-impact primary accent.
- **Background**: `Stone-50` (`#fafaf9`)
- **Surface (Cards)**: `White` (`#ffffff`)
- **Text (Primary)**: `Stone-950` (`#0c0a09`)
- **Text (Secondary)**: `Stone-500` (`#78716c`)
- **Accent (Primary)**: `Indigo-600` (`#4f46e5`) - Used for primary actions and highlights.
- **Success**: `Emerald-500` (`#10b981`)
- **Error**: `Rose-500` (`#f43f5e`)
- **Border**: `Stone-200` (`#e7e5e4`)

### 1.4 Visual Elements
- **Radius**: `rounded-2xl` (16px) for cards and buttons.
- **Shadow**: `shadow-sm` for normal state, `shadow-xl` for active/floating states.
- **Transitions**: 250ms `cubic-bezier(0.4, 0, 0.2, 1)` for all state changes.

---

## 2. Component Design & Interactions

### 2.1 The Flashcard (`Flashcard.tsx`)
- **Front Side**: Large English word centered. Subtle "English" label.
- **Back Side**: Vietnamese meaning centered. Subtle "Vietnamese" label.
- **Interaction**: 3D flip animation on tap.
- **Motion**: Use `framer-motion` for `rotateY` transitions.

### 2.2 Navigation (`BottomNav.tsx`)
- **Items**: Home (Dashboard), Add (Create), Quiz (Learning), Writing (Practice).
- **Aesthetic**: Floating glassmorphism bar at the bottom or a clean white bar with a top border.
- **Active State**: Indigo icon with a subtle dot indicator.

### 2.3 Quiz Interface
- **Progress Bar**: Thin indigo line at the top.
- **Options**: Large buttons with `border-2 border-transparent`.
- **Feedback**:
  - Correct: Button border/background turns Emerald, 50ms vibration.
  - Incorrect: Button border/background turns Rose, subtle shake animation.

---

## 3. Page Layouts (User Stories)

### 3.1 Dashboard (The Word List)
- **Top**: Welcome message + Stats (Total Words).
- **Search Bar**: Minimalist input with a "Command" (K) shortcut indicator.
- **Word List**: A clean vertical list or grid of mini-cards.
- **Empty State**: "You haven't added any words yet. Start by adding your first flashcard."

### 3.2 Create Flashcard
- **Modal or Full-screen**: Focus mode.
- **Inputs**: Large, borderless inputs for English and Vietnamese.
- **Hint**: Show recent cards added below for context.
- **Keyboard Shortcut**: `Cmd/Ctrl + Enter` to save and create another.

### 3.3 Learning Modules (Quiz & Writing)
- **Immersive Mode**: Hide navigation to focus.
- **Centerpiece**: The card being tested.
- **Exit**: "X" button in the top right to return to Dashboard.

---

## 4. Accessibility & Responsive Design

- **Touch Targets**: All buttons/cards minimum `48x48px`.
- **Safe Areas**: Padding for mobile notches and home indicators.
- **Dark Mode**: Soft charcoal background (`Stone-950`) with stone-800 surfaces.
- **Screen Readers**: Clear `aria-label` for flashcard actions and results.

---

## 5. Technology Implementation

- **Framework**: Next.js 14 (App Router).
- **Styling**: Tailwind CSS.
- **Animations**: Framer Motion.
- **Components**: Shadcn/UI (adapted to the Stone/Indigo palette).
