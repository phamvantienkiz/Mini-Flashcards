# Project Requirements Document (PRD) - Phase 1: Mini-Flashcards

## 1. Product Overview

### 1.1 Purpose
The Mini-Flashcards application aims to provide a fast, efficient, and user-friendly way for English learners to manage and memorize vocabulary through interactive flashcards and exercises.

### 1.2 Target Audience
- English language learners of all levels.
- Students preparing for exams (IELTS, TOEFL, TOEIC, etc.).
- Anyone looking for a quick and simple way to store and test their vocabulary.

### 1.3 Core Value Proposition
- **Fast Creation**: Minimize friction when adding new words.
- **Local-First**: Fast response times and data privacy using local storage (SQLite).
- **Interactive Learning**: Move beyond simple reading with active recall through quizzes and writing practice.

---

## 2. Scope of Phase 1

Phase 1 focuses on the core "Loop": **Create -> Manage -> Practice**.

- **Flashcard Management**: Basic CRUD operations for vocabulary.
- **Vocabulary Dashboard**: A clear view of all stored words.
- **Learning Modules**: 
    - Multiple-choice (4-option) quiz.
    - Writing exercise (Vietnamese to English).

---

## 3. Functional Requirements

### 3.1 Flashcard Management (FR1)
- **FR1.1: Create Flashcard**: User can input an English word and its corresponding Vietnamese meaning.
- **FR1.2: View Flashcards**: User can view cards in a "Flip Card" format (Front: English, Back: Vietnamese).
- **FR1.3: Edit/Delete**: User can modify or remove vocabulary entries.

### 3.2 Vocabulary Dashboard (FR2)
- **FR2.1: List View**: Display all words in a table or grid format.
- **FR2.2: Search/Filter**: Simple search by English or Vietnamese text.
- **FR2.3: Summary Statistics**: Display total number of cards created.

### 3.3 Multiple-Choice Quiz (FR3)
- **FR3.1: Question Generation**: System randomly selects a word and presents 4 Vietnamese meanings.
- **FR3.2: Options**: Exactly 4 options (A, B, C, D), where only one is correct.
- **FR3.3: Immediate Feedback**: System highlights the correct/incorrect answer immediately after selection.

### 3.4 Writing Exercise (FR4)
- **FR4.1: Prompt**: System displays a Vietnamese meaning.
- **FR4.2: User Input**: User types the corresponding English word into a text field.
- **FR4.3: Verification**: System checks the input (case-insensitive) and provides success/failure feedback.

---

## 4. Non-Functional Requirements

### 4.1 Performance & Storage
- **Local-First**: All data should be stored in a local SQLite database (via FastAPI backend).
- **Low Latency**: CRUD and learning transitions should be near-instantaneous (< 100ms).

### 4.2 UI/UX Standards (Referencing ui-ux-designer agents)
- **Clean Aesthetic**: Modern, minimalist UI using Tailwind CSS.
- **Responsiveness**: Fully functional on both Desktop and Mobile (Tablet/Phone).
- **Interactive Feedback**: Smooth animations (Flip card) and clear visual cues for correct/incorrect answers.

### 4.3 Technical Stack
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS.
- **Backend**: FastAPI (Python), SQLite.

---

## 5. User Stories

1. **Addition**: "As a learner, I want to quickly add 'Strive' (Phấn đấu) so I can build my own word list."
2. **Review**: "As a learner, I want to see a list of my words so I can check my progress."
3. **Active Recall**: "As a learner, I want to do a multiple-choice quiz so I can test my word recognition."
4. **Writing Practice**: "As a learner, I want to type the English word from its meaning so I can memorize the spelling."

---

## 6. Future Considerations (Phase 2+)
- User Authentication & Cloud Sync (PostgreSQL).
- Spaced Repetition (SRS) algorithms (like Anki).
- Image/Audio support for flashcards.
- Export/Import CSV/Excel.
