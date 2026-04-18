# API Design Document - Mini-Flashcards (Phase 1)

## 1. Overview
Tài liệu này mô tả thiết kế REST API cho ứng dụng Mini-Flashcards. API được thiết kế theo nguyên tắc resource-oriented, sử dụng JSON làm định dạng trao đổi dữ liệu và tuân thủ chuẩn OpenAPI 3.1.

- **Base URL**: `/api/v1`
- **Versioning**: URI Versioning (`/v1`)
- **Format**: `application/json`
- **Error Format**: RFC 7807 (Problem Details for HTTP APIs)

---

## 2. Resource Model

### 2.1 Flashcard
| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | UUID | Định danh duy nhất (Server-generated) |
| `english` | String | Từ vựng tiếng Anh |
| `vietnamese` | String | Nghĩa tiếng Việt tương ứng |
| `created_at` | DateTime | Thời điểm tạo |
| `updated_at` | DateTime | Thời điểm cập nhật cuối cùng |

---

## 3. Endpoint Specifications

### 3.1 Flashcard Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/flashcards` | Danh sách flashcards (Pagination & Search) |
| `POST` | `/flashcards` | Tạo flashcard mới |
| `GET` | `/flashcards/{id}` | Chi tiết một flashcard |
| `PATCH` | `/flashcards/{id}` | Cập nhật một phần thông tin |
| `DELETE` | `/flashcards/{id}` | Xóa flashcard |

### 3.2 Learning & Stats
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/flashcards/stats` | Thống kê tổng số lượng card |
| `GET` | `/flashcards/quiz` | Lấy 10 câu hỏi trắc nghiệm ngẫu nhiên |
| `GET` | `/flashcards/writing` | Lấy 10 câu hỏi luyện viết ngẫu nhiên |

---

## 4. OpenAPI 3.1 Specification

```yaml
openapi: "3.1.0"
info:
  title: Mini-Flashcards API
  version: "1.0.0"
  description: API for managing flashcards and learning vocabulary.

servers:
  - url: /api/v1
    description: Local Development Server

paths:
  /flashcards:
    get:
      summary: List flashcards
      tags: [Flashcards]
      parameters:
        - name: q
          in: query
          schema: { type: string }
          description: Search by English or Vietnamese text
        - name: offset
          in: query
          schema: { type: integer, default: 0 }
        - name: limit
          in: query
          schema: { type: integer, default: 20, maximum: 100 }
      responses:
        "200":
          description: Paginated list of flashcards
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items: { $ref: "#/components/schemas/Flashcard" }
                  pagination:
                    $ref: "#/components/schemas/Pagination"
    post:
      summary: Create a new flashcard
      tags: [Flashcards]
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/FlashcardCreate" }
      responses:
        "201":
          description: Created
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Flashcard" }

  /flashcards/{id}:
    parameters:
      - name: id
        in: path
        required: true
        schema: { type: string, format: uuid }
    get:
      summary: Get flashcard details
      tags: [Flashcards]
      responses:
        "200":
          description: Success
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Flashcard" }
        "404": { $ref: "#/components/responses/NotFound" }
    patch:
      summary: Update flashcard
      tags: [Flashcards]
      requestBody:
        content:
          application/json:
            schema: { $ref: "#/components/schemas/FlashcardUpdate" }
      responses:
        "200":
          description: Updated
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Flashcard" }
    delete:
      summary: Delete flashcard
      tags: [Flashcards]
      responses:
        "204":
          description: Deleted successfully

  /flashcards/stats:
    get:
      summary: Get summary statistics
      tags: [Analytics]
      responses:
        "200":
          description: Stats found
          content:
            application/json:
              schema:
                type: object
                properties:
                  total_count: { type: integer }

  /flashcards/quiz:
    get:
      summary: Get randomized quiz questions
      tags: [Learning]
      responses:
        "200":
          description: List of quiz questions
          content:
            application/json:
              schema:
                type: array
                items: { $ref: "#/components/schemas/QuizQuestion" }

  /flashcards/writing:
    get:
      summary: Get randomized writing practice questions
      tags: [Learning]
      responses:
        "200":
          description: List of writing prompts
          content:
            application/json:
              schema:
                type: array
                items: { $ref: "#/components/schemas/WritingPrompt" }

components:
  schemas:
    Flashcard:
      type: object
      properties:
        id: { type: string, format: uuid, readOnly: true }
        english: { type: string }
        vietnamese: { type: string }
        created_at: { type: string, format: date-time, readOnly: true }
        updated_at: { type: string, format: date-time, readOnly: true }

    FlashcardCreate:
      type: object
      required: [english, vietnamese]
      properties:
        english: { type: string, minLength: 1 }
        vietnamese: { type: string, minLength: 1 }

    FlashcardUpdate:
      type: object
      properties:
        english: { type: string }
        vietnamese: { type: string }

    Pagination:
      type: object
      properties:
        total: { type: integer }
        offset: { type: integer }
        limit: { type: integer }

    QuizQuestion:
      type: object
      properties:
        flashcard_id: { type: string, format: uuid }
        word: { type: string, description: "The English word" }
        options:
          type: array
          items: { type: string }
          minItems: 4
          maxItems: 4
          description: "4 Vietnamese meanings"
        correct_answer: { type: string, description: "The correct Vietnamese meaning" }

    WritingPrompt:
      type: object
      properties:
        flashcard_id: { type: string, format: uuid }
        meaning: { type: string, description: "The Vietnamese meaning" }
        word: { type: string, description: "The English word to match" }

    Problem:
      type: object
      required: [type, title, status]
      properties:
        type: { type: string, format: uri }
        title: { type: string }
        status: { type: integer }
        detail: { type: string }

  responses:
    NotFound:
      description: Resource not found
      content:
        application/problem+json:
          schema: { $ref: "#/components/schemas/Problem" }
```

---

## 5. Error Handling
Sử dụng chuẩn **RFC 7807**. Tất cả các lỗi 4xx/5xx sẽ trả về body có dạng:

```json
{
  "type": "https://api.mini-flashcards.com/errors/not-found",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "Flashcard with ID 123-abc not found.",
  "instance": "/flashcards/123-abc"
}
```

---

## 6. Versioning Strategy
- Sử dụng **URI Versioning**: `/api/v1/...`
- Các thay đổi không gây break (Non-breaking changes) như thêm field vào response sẽ không tăng version.
- Các thay đổi gây break (Breaking changes) sẽ yêu cầu `/api/v2`.

---

## 7. Authentication (Future)
Trong Phase 1, hệ thống chạy local-first không yêu cầu auth. Tuy nhiên, kiến trúc sẵn sàng hỗ trợ **Bearer Token (JWT)** trong tương lai.
