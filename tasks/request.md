# Goal:

Fix bug và hoàn thiện feature 4.

## Context:

Frontend báo lỗi:

- Error Type
  Console Error

- Error Message
  A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

```html
  ...
    <HotReload globalError={[...]} webSocket={WebSocket} staticIndicatorState={{pathname:null, ...}}>
      <AppDevOverlayErrorBoundary globalError={[...]}>
        <ReplaySsrOnlyErrors>
        <DevRootHTTPAccessFallbackBoundary>
          <HTTPAccessFallbackBoundary notFound={<NotAllowedRootHTTPFallbackError>}>
            <HTTPAccessFallbackErrorBoundary pathname="/create" notFound={<NotAllowedRootHTTPFallbackError>} ...>
              <RedirectBoundary>
                <RedirectErrorBoundary router={{...}}>
                  <Head>
                  <__next_root_layout_boundary__>
                    <SegmentViewNode type="layout" pagePath="layout.tsx">
                      <SegmentTrieNode>
                      <link>
                      <script>
                      <script>
                      <script>
                      <RootLayout>
                        <html lang="en" className="h-full ant...">
                          <body
                            className="min-h-full flex flex-col bg-background text-foreground pt-12"
-                           data-new-gr-c-s-check-loaded="14.1284.0"
-                           data-gr-ext-installed=""
                          >
                  ...

```

```typescript
    at body (<anonymous>:null:null)
    at RootLayout (src\app\layout.tsx:20:7)
```

- Code Frame

```typescript
  18 |       className="h-full antialiased"
  19 |     >
> 20 |       <body className="min-h-full flex flex-col bg-background text-foreground pt-12">
     |       ^
  21 |         <TopNav />
  22 |         {children}
  23 |       </body>

Next.js version: 16.2.4 (Turbopack)
```

### Request:

Phân tích kiểm tra và tiến hành fix triệt đễ lỗi đang tồn tại.

---

> Note:
>
> 1.  file @./docs/api-design-document.md chứa những thông tin về api của dự án.
> 2.  file @./docs/project-requirements-document.md cho biết tổng quan dự án
> 3.  đọc file @SKILL_GUIDE.md để tìm skills phù hợp nếu cần.
