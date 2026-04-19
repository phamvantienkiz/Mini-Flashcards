# 🗂️ Mini-Flashcards

**Mini-Flashcards** là một ứng dụng hỗ trợ học tiếng Anh nhanh chóng và hiệu quả. Dự án được thiết kế theo triết lý "Local-First", tập trung vào tốc độ phản hồi và tính đơn giản trong việc quản lý và ghi nhớ từ vựng thông qua các thẻ flashcard tương tác.

---

## 🚀 Tính năng chính (Phase 1)

Dự án tập trung vào vòng lặp cốt lõi: **Tạo -> Quản lý -> Luyện tập**.

*   **Quản lý Flashcards**: Thêm, sửa, xóa và xem danh sách từ vựng dễ dàng.
*   **Học tập tương tác**:
    *   **Quiz**: Kiểm tra khả năng nhận diện từ với câu hỏi trắc nghiệm 4 đáp án.
    *   **Writing**: Luyện kỹ năng viết và nhớ mặt chữ bằng cách dịch từ tiếng Việt sang tiếng Anh.
*   **Trải nghiệm người dùng**: Giao diện hiện đại, tối giản, hỗ trợ cả máy tính và thiết bị di động.

---

## 🛠️ Công nghệ sử dụng

### Backend
*   **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11+)
*   **Quản lý gói**: [uv](https://github.com/astral-sh/uv)
*   **Database**: SQLite (Local-first)
*   **ORM**: SQLAlchemy 2.0 & Alembic (Migration)

### Frontend
*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Ngôn ngữ**: TypeScript
*   **Styling**: Tailwind CSS

---

## 📂 Cấu trúc dự án

```text
.
├── backend/            # FastAPI source code (Python)
│   ├── app/            # Logic chính (API, Services, Models,...)
│   └── migrations/     # Lịch sử thay đổi Database
├── frontend/           # Next.js source code (TypeScript)
│   ├── src/app/        # Các trang giao diện (Quiz, Writing, Create,...)
│   └── src/components/ # Các UI components dùng chung
└── docs/               # Tài liệu thiết kế và yêu cầu dự án
```

---

## 🏁 Hướng dẫn cài đặt & Khởi chạy

### 1. Khởi chạy Backend
Yêu cầu: Đã cài đặt [uv](https://github.com/astral-sh/uv).

```bash
cd backend
uv sync
cp .env.example .env
uv run alembic upgrade head
uv run uvicorn app.main:app --reload
```
*Tài liệu API sẽ có tại: http://localhost:8000/docs*

### 2. Khởi chạy Frontend
Yêu cầu: Đã cài đặt [Node.js](https://nodejs.org/).

```bash
cd frontend
npm install
npm run dev
```
*Truy cập ứng dụng tại: http://localhost:3000*

---

## 🗺️ Lộ trình phát triển (Phase 2+)
*   Hệ thống nhắc lại ngắt quãng (Spaced Repetition - SRS).
*   Đồng bộ hóa đám mây (PostgreSQL).
*   Hỗ trợ âm thanh (Phát âm từ vựng).
*   Tính năng Import/Export dữ liệu từ Excel/CSV.

---

## 📄 License
Dự án được phát hành dưới bản quyền [MIT License](LICENSE).
