# Goal:

Fix triệt để các lỗi

## Context:

Phần frontend và backend đã hoàn thiện và cả 2 đều đã run được nhưng khi test thực tế trên web thì xảy ra lỗi khi chuyển sang phần Quiz và Writing. Cụ thể các lỗi được báo trong terminal như sau:

- frontend terminal:

```bash
[browser] Failed to fetch quiz: Error: [object Object]
    at apiClient (src/lib/api-client.ts:19:11)
    at async fetchQuiz (src/app/quiz/page.tsx:29:20)
  17 |   if (!response.ok) {
  18 |     const errorBody = await response.json().catch(() => ({}));
> 19 |     throw new Error(errorBody.detail || "Something went wrong");
     |           ^
  20 |   }
  21 |
  22 |   if (response.status === 204) { (src/app/quiz/page.tsx:37:15)
 GET /writing 200 in 530ms (next.js: 486ms, application-code: 43ms)
[browser] Failed to fetch writing practice: Error: [object Object]
    at apiClient (src/lib/api-client.ts:19:11)
    at async fetchWriting (src/app/writing/page.tsx:31:20)
  17 |   if (!response.ok) {
  18 |     const errorBody = await response.json().catch(() => ({}));
> 19 |     throw new Error(errorBody.detail || "Something went wrong");
     |           ^
  20 |   }
  21 |
  22 |   if (response.status === 204) { (src/app/writing/page.tsx:40:15)
```

- backend terminal:

```bash
INFO:     127.0.0.1:63156 - "GET /api/v1/flashcards/stats HTTP/1.1" 200 OK
INFO:     127.0.0.1:54099 - "GET /api/v1/flashcards/quiz HTTP/1.1" 422 Unprocessable Entity
INFO:     127.0.0.1:54099 - "GET /api/v1/flashcards/quiz HTTP/1.1" 422 Unprocessable Entity
INFO:     127.0.0.1:54099 - "OPTIONS /api/v1/flashcards/writing HTTP/1.1" 200 OK
INFO:     127.0.0.1:50023 - "OPTIONS /api/v1/flashcards/writing HTTP/1.1" 200 OK
INFO:     127.0.0.1:50023 - "GET /api/v1/flashcards/writing HTTP/1.1" 422 Unprocessable Entity
INFO:     127.0.0.1:54099 - "GET /api/v1/flashcards/writing HTTP/1.1" 422 Unprocessable Entity
```

### Request:

Kiểm tra xem lỗi cụ thể ở phần nào và tiến hành phân tích và fix lỗi phù hợp.

-> Sau khi đã fix lỗi hãy tóm tắt cho tôi nguyên nhân và các khắc phục đã thực hiện.

---

> Note:
>
> 1.  file @./docs/note.md chứa những lưu ý và những lỗi tôi từng mắc phải cũng như những gợi ý để tránh sai.
> 2.  file @./docs/project-requirements-document.md cho biết tổng quan dự án
> 3.  đọc file @SKILL_GUIDE.md để tìm skills phù hợp nếu cần.
