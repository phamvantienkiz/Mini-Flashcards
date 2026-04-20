# Feature Analysis Report: Topic & Vocabulary Example

## 1. Backend (FastAPI)

### Kế hoạch triển khai
- **Model `Topic`**: Tạo mới model `Topic` với các trường: `id` (UUID), `name` (String, Unique), `is_predefined` (Boolean, default False để phân biệt topic hệ thống tạo và user tạo), `created_at`, `updated_at`.
- **Model `Flashcard`**: Cập nhật model hiện tại:
  - Thêm `topic_id` (UUID, ForeignKey trỏ tới `topics.id`, cho phép Null nếu cần).
  - Thêm `example_sentence` (String, cho phép Null).
- **API Endpoints**:
  - `GET /topics`: Lấy danh sách toàn bộ topic.
  - `POST /topics`: Tạo topic cá nhân mới.
  - Sửa đổi `POST /flashcards`, `PUT /flashcards/{id}`: Hỗ trợ nhận thêm `topic_id` và `example_sentence`.
  - Cập nhật `GET /flashcards` và các API Quiz/Writing: Thêm query parameter `topic_id` để lọc theo chủ đề.
- **Seeding & Migration**: 
  - Chạy script khi khởi động server (hoặc file Alembic migration) để tự động thêm 30 topic được cung cấp nếu chúng chưa tồn tại, gán cờ `is_predefined = True`.
  - Tạo một topic tên "VSTEP READING" (nếu chưa có).
  - Viết logic migration: Tất cả các flashcards hiện tại (chưa có topic) sẽ được tự động gán `topic_id` của topic "VSTEP READING".

### Các file cần chỉnh sửa
- `backend/app/models/topic.py` (Mới)
- `backend/app/models/flashcard.py`
- `backend/app/schemas/topic.py` (Mới)
- `backend/app/schemas/flashcard.py`
- `backend/app/repositories/topic_repo.py` (Mới)
- `backend/app/repositories/flashcard_repo.py`
- `backend/app/api/endpoints/topics.py` (Mới)
- `backend/app/api/endpoints/flashcards.py`
- `backend/app/main.py` (Đăng ký router `/topics`)
- Thêm file script cho việc seed 30 topic.

### Rủi ro tiềm ẩn & Chiến lược test
- **Rủi ro**: 
  - Việc sửa đổi schema có thể làm hỏng dữ liệu hiện tại nếu migration (Alembic) không xử lý tốt bước gán "VSTEP READING" cho các card cũ.
- **Chiến lược Test**:
  - Viết unit test cho các Repo mới.
  - Viết integration test (API test) cho việc tạo/chọn topic, và đảm bảo API query/filter flashcard theo `topic_id` hoạt động chính xác.
  - Test migration script cục bộ để đảm bảo 100% dữ liệu cũ chuyển sang "VSTEP READING" thành công.

---

## 2. Frontend (Next.js)

### Kế hoạch triển khai & UX/UI
- **Quản lý Topic**:
  - Thêm menu/trang `Topics` để xem danh sách 30 topic có sẵn + topic cá nhân.
- **Tạo/Chỉnh sửa Flashcard (Form)**:
  - Nâng cấp Dropdown chọn Topic: Vì số lượng topic lớn (hơn 30), cần thay UI select thông thường bằng một **Searchable Combobox** (có thể gõ để tìm kiếm tên topic).
  - Ngay trong phần Dropdown này, tích hợp nút **"+ Tạo Topic Mới"** để user có thể thêm topic cá nhân một cách nhanh chóng khi đang tạo Flashcard (không cần thoát khỏi màn hình hiện tại).
  - Thêm trường input văn bản dài (Textarea hoặc Input thường) để nhập `example_sentence` (Câu tiếng Anh ví dụ).
- **Giao diện thẻ Flashcard (Flip Card)**:
  - Cập nhật CSS/Layout để chứa đoạn văn bản mới.
  - Khi xem mặt sau (nghĩa Tiếng Việt), thêm một dòng kẻ ngang hoặc để chữ in nghiêng (italic) bên dưới hiển thị nội dung `example_sentence`. Giao diện cần trực quan, giúp người học đọc câu tiếng Anh có chứa từ vựng đó để nhớ lâu hơn.
- **Tính năng Học (Quiz / Writing)**:
  - Trước khi bắt đầu bài Quiz hoặc Writing, thêm một Modal/Dropdown yêu cầu user chọn "Topic muốn ôn". Nếu bỏ trống thì ôn toàn bộ.

### Rủi ro tiềm ẩn & Chiến lược test
- **Rủi ro**:
  - **UX Clutter**: Danh sách topic quá dài sẽ khiến việc cuộn chuột tìm kiếm trên Mobile khó khăn nếu không làm thanh tìm kiếm (searchable dropdown) đủ mượt.
  - **Layout Shift**: Câu ví dụ quá dài có thể làm vỡ layout của Flashcard nếu thẻ không linh hoạt chiều cao (auto-height) hoặc không tự động thu nhỏ chữ.
- **Chiến lược Test**:
  - Kiểm tra tính tương thích trên các thiết bị Mobile (đặc biệt khi mở dropdown chứa 30+ items).
  - Nhập những câu ví dụ rất dài (edge cases) để kiểm tra xem CSS của Flip Card có bị hỏng (overflow) không.

---

## 3. Database (SQLite)

### Bảng và Cột cần chỉnh sửa
- **Tạo bảng mới `topics`**:
  - `id`: UUID (Primary Key)
  - `name`: TEXT (Unique, Not Null)
  - `is_predefined`: BOOLEAN (Default 0 - Phân biệt 30 topic hệ thống và topic người dùng tự tạo)
  - `created_at`: DATETIME
  - `updated_at`: DATETIME
- **Sửa bảng `flashcards` (Dùng Alembic)**:
  - `topic_id`: UUID (Foreign Key trỏ đến `topics.id`, có thể Null hoặc Not Null sau khi đã gán hết dữ liệu cũ về "VSTEP READING").
  - `example_sentence`: TEXT (Nullable).

### Rủi ro hiệu năng & SQLite có đủ gánh hay không?
- **Rủi ro hiệu năng (Performance)**:
  - Việc query thêm thông tin `topic_id` và JOIN giữa 2 bảng `flashcards` và `topics` về mặt lý thuyết sẽ tốn kém hơn so với đọc từ 1 bảng.
- **Đánh giá về SQLite (Phase 1)**:
  - SQLite hoàn toàn **dư sức gánh** cấu trúc này. Ở mức độ chạy Local hoặc Phase 1 với 1 User, ngay cả khi bạn có 50.000 flashcards, tốc độ thực thi các câu lệnh JOIN hoặc lọc `WHERE topic_id = ...` trên SQLite vẫn chỉ diễn ra trong vòng < 5ms. Hoàn toàn đảm bảo yêu cầu < 100ms của ứng dụng.
  - Giải pháp tối ưu: Chỉ cần đảm bảo cột `topic_id` trong bảng `flashcards` được đánh Index (tạo index `ix_flashcards_topic_id`) là truy vấn sẽ luôn mượt mà.
