# Backend Design Document - Mini-Flashcards

## 1. Overview
Hệ thống backend của Mini-Flashcards được xây dựng trên nền tảng **FastAPI**, tập trung vào hiệu suất cao, dễ dàng mở rộng và tính an toàn về kiểu dữ liệu (type-safety) với Pydantic và SQLAlchemy.

- **Framework**: FastAPI (Python 3.11+)
- **Database**: SQLite (Phase 1 - Local Development)
- **ORM**: SQLAlchemy 2.0+
- **Migration**: Alembic
- **Validation**: Pydantic v2

---

## 2. Architecture & Design Patterns

Hệ thống áp dụng kiến trúc phân lớp (Layered Architecture) để tách biệt trách nhiệm:

1.  **API Layer (Controller)**: Tiếp nhận request, validate input bằng Pydantic schemas và trả về response.
2.  **Service Layer (Business Logic)**: Xử lý logic nghiệp vụ chính (ví dụ: thuật toán chọn từ ngẫu nhiên cho Quiz, xử lý logic luyện viết).
3.  **Repository Layer (Data Access)**: Tương tác trực tiếp với Database qua SQLAlchemy. Giúp tách biệt logic truy vấn khỏi logic nghiệp vụ.
4.  **Models Layer**: Định nghĩa cấu trúc bảng Database.

---

## 3. Directory Structure

Cấu trúc thư mục được tổ chức theo tiêu chuẩn Production-ready:

```text
backend/app/
├── main.py                # Điểm khởi đầu của ứng dụng
├── core/                  # Cấu hình hệ thống, bảo mật, biến môi trường
│   ├── config.py          # Pydantic Settings
│   └── security.py        # Xử lý hashing, JWT (Future)
├── api/                   # Router layer
│   └── v1/
│       ├── endpoints/     # Chi tiết các route (flashcards.py, health.py)
│       └── router.py      # Tổng hợp các router của v1
├── schemas/               # Pydantic models (Request/Response)
│   ├── flashcard.py
│   └── common.py
├── models/                # SQLAlchemy models (DB Schema)
│   └── flashcard.py
├── services/              # Business logic layer
│   ├── flashcard_service.py
│   └── learning_service.py # Logic cho Quiz và Writing
├── repositories/          # Data access layer
│   └── flashcard_repo.py
├── exceptions/            # Custom exceptions & handlers
│   ├── base.py
│   └── flashcard.py
├── enums/                 # Định nghĩa các hằng số, Enum
│   └── common.py
├── db/                    # Cấu hình kết nối DB
│   ├── session.py         # SQLAlchemy engine & sessionmaker
│   └── base.py            # Base class cho models
└── utils/                 # Helper functions
```

---

## 4. Database Schema (Phase 1)

### Table: `flashcards`
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key, Default: uuid4 | Định danh duy nhất |
| `english` | String | Not Null, Index | Từ vựng tiếng Anh |
| `vietnamese` | String | Not Null | Nghĩa tiếng Việt |
| `created_at` | DateTime | Default: now() | Thời gian tạo |
| `updated_at` | DateTime | Default: now(), onupdate: now() | Thời gian cập nhật |

---

## 5. Logic Highlights

### 5.1 Quiz Generation (`LearningService`)
- Hệ thống sẽ lấy ngẫu nhiên 10 Flashcards từ database.
- Với mỗi câu hỏi, hệ thống sẽ tự động tạo 3 lựa chọn sai (distractors) từ các flashcards khác để tạo thành bộ 4 lựa chọn trắc nghiệm.

### 5.2 Writing Practice
- Trả về danh sách từ vựng kèm nghĩa tiếng Việt để người dùng luyện gõ lại tiếng Anh chính xác.

---

## 6. Error Handling Strategy
- Sử dụng **Custom Exceptions** định nghĩa trong `app/exceptions/`.
- Sử dụng **FastAPI Exception Handlers** để format lỗi theo chuẩn RFC 7807 (như đã quy định trong API Design).

---

## 7. Development Workflow
1.  Định nghĩa **Model** trong `app/models/`.
2.  Chạy migration bằng **Alembic**.
3.  Định nghĩa **Pydantic Schemas** trong `app/schemas/`.
4.  Viết **Repository** và **Service**.
5.  Tạo **Endpoint** trong `app/api/v1/endpoints/`.
