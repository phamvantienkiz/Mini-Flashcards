# Goal:

Fix bug và hoàn thiện feature 4.

## Context:

- Error Type
  Console Error

- Error Message
  Method Not Allowed

      at apiClient (src/lib/api-client.ts:31:11)
      at async Dashboard.useEffect.fetchData (src/app/page.tsx:35:43)

- Code Frame

```typescript
  29 |     }
  30 |
> 31 |     throw new Error(errorMessage);
     |           ^
  32 |   }
  33 |
  34 |   if (response.status === 204) {

Next.js version: 16.2.4 (Turbopack)
```

### Request:

Phân tích kiểm tra và tiến hành fix triệt đễ các lỗi đang tồn tại.

---

> Note:
>
> 1.  file @./docs/api-design-document.md chứa những thông tin về api của dự án.
> 2.  file @./docs/project-requirements-document.md cho biết tổng quan dự án
> 3.  đọc file @SKILL_GUIDE.md để tìm skills phù hợp nếu cần.
