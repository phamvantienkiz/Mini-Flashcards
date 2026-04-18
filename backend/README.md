# Mini-Flashcards Backend

Phần backend của dự án Mini-Flashcards, được xây dựng với FastAPI, tập trung vào hiệu suất, tính an toàn kiểu dữ liệu và kiến trúc bền vững.

## 🚀 Công nghệ sử dụng

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11+)
- **Quản lý gói & môi trường**: [uv](https://github.com/astral-sh/uv)
- **Database**: SQLite (Local-first)
- **ORM**: SQLAlchemy 2.0
- **Migration**: Alembic
- **Validation**: Pydantic v2
- **Tiêu chuẩn lỗi**: RFC 7807 (Problem Details for HTTP APIs)

## 🏗️ Kiến trúc dự án (Layered Architecture)

Dự án được tổ chức theo các lớp để dễ dàng bảo trì và mở rộng:

- **API Layer**: Định nghĩa các endpoints và xử lý request/response.
- **Service Layer**: Chứa logic nghiệp vụ (ví dụ: tạo quiz, xử lý luyện tập).
- **Repository Layer**: Tương tác trực tiếp với cơ sở dữ liệu.
- **Models Layer**: Định nghĩa cấu trúc bảng Database.
- **Schemas Layer**: Pydantic models để validate dữ liệu.
- **Core**: Cấu hình hệ thống và các cài đặt môi trường.

## 🛠️ Cài đặt & Khởi chạy

### 1. Yêu cầu hệ thống
Đảm bảo bạn đã cài đặt `uv`. Nếu chưa, hãy cài đặt qua lệnh:
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 2. Thiết lập môi trường
```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
uv sync

# Tạo file .env từ template
cp .env.example .env
```

### 3. Khởi tạo Database
```bash
# Thực thi migration để tạo bảng
uv run alembic upgrade head
```

### 4. Chạy ứng dụng
```bash
uv run uvicorn app.main:app --reload
```

## 📖 Tài liệu API

Sau khi khởi chạy server, bạn có thể truy cập các tài liệu API tương tác tại:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 📁 Cấu trúc thư mục

```text
app/
├── api/v1/         # Route layer (Controller)
├── core/           # Cấu hình & Bảo mật
├── db/             # Kết nối & Khởi tạo Database
├── enums/          # Các hằng số, Enum
├── exceptions/     # Xử lý lỗi tùy chỉnh
├── models/         # SQLAlchemy models (DB Schema)
├── repositories/   # Tầng truy cập dữ liệu
├── schemas/        # Pydantic models (Validation)
├── services/       # Logic nghiệp vụ
└── main.py         # Entry point của ứng dụng
```

## 🧪 Tính năng nổi bật

- **CRUD Flashcard**: Quản lý từ vựng linh hoạt.
- **Learning Engine**:
  - **Quiz**: Tự động tạo câu hỏi trắc nghiệm với các đáp án sai được lấy ngẫu nhiên từ database.
  - **Writing**: Hỗ trợ luyện viết từ vựng theo nghĩa tiếng Việt.
- **Standardized Errors**: Phản hồi lỗi chi tiết và nhất quán theo chuẩn quốc tế.
