# Goal:

Phát triển feature mới trong phase 1 để hoàn thiện flashcard.

## Context:

- Đối với phần từ vựng nếu cứ add trực tiếp vào thì rất lớn và khó quản lý, khó học một chủ đề cụ thể nào đó. Nhất là đối với tôi đang ôn luyện.
- Vì vậy tôi nghĩ nên chia ra thành các topic khác nhau, và khi bước vào từng topic thì các flashcard sẽ chứa nhóm từ vựng của topic đó, chúng ta sẽ tạo sẵn loạt topic thông dụng, ngoài ra cho tạo các topic cá nhân. (các topic tạo sẵn sẽ trống hoàn toàn, user sẽ phải tự add các từ vựng vào.)
- Nhóm topic được tạo sẵn sẽ bao gồm:

1. SCHOOL
2. LEISURE ACTIVITIES
3. WORK
4. SPORT AND GAME
5. EDUCATION
6. FOOD AND DRINK
7. FAMILY
8. TOURISM
9. LIFESTYLE
10. TRANSPORTATION
11. GENDER EQUALITY
12. CULTURE
13. VOLUNTEERING
14. NATURE AND ENVIRONMENT
15. THE MEDIA
16. SCIENCE AND TECHNOLOGY
17. PHYSICAL APPEARRANCE AND PERSONALITY
18. URBANISATION
19. THE GREEN MOVEMENT
20. FILM
21. COUNTRY AND CITY LIFE
22. RELATIONSHIP
23. PLACES AND WONDERS
24. HEALTH
25. COMMUNITY SERVICE
26. MUSIC AND ART
27. SPACE AND OTHER PLANETS
28. CRIME AND PUNISHMENT
29. HOLIDAYS AND FESTIVALS
30. CUSTOMS AND TRADITIONS

- Ngoài ra, flashcard hiện tại cần thêm một dòng ở dưới để khi tạo flashcard có thể chèn thêm một câu bằng tiếng Anh có từ đó để làm ví dụ. Khi xem nghĩa tiếng Việt trên flashcard sẽ có câu ví dụ tiếng anh phía dưới như vậy sẽ trực quan hơn.

### Request:

_Lưu ý quan trọng: Cần bước vào `plan mode` nhưng chỉ thực hiện phân tích, lên kế hoạch và report kết quả. Không thực hiện implement code._
Ở feature tiếp theo tôi muốn thêm những tính năng như đã được đề cập ở trên. Nhưng trước hết tôi cần những phân tích kỹ lưỡng về hệ thống để xem xét trước khi quyết định triển khai.
-> Tôi cần bạn phân tích hệ thống hiện tại và trả lời những câu hỏi sau:

- Ở phía backend kế hoạch triển khai feature, các file cần chỉnh sửa, rủi ro tiềm ẩn, chiến lược test.
- Ở phía frontend kế hoạch triển khai feature, những phần UX-UI cần chỉnh sửa, rủi ro tiềm ẩn, chiến lược test.
- Ở phía database SQLite hiện tại kế hoạch triển khai feature, các bảng và cột cần chỉnh sửa, rủi ro tiềm ẩn về performance, SQLite có đủ gánh được hay không.

Hiện tại dự án vẫn đang ở Phase 1, thì vẫn đang scale chạy ở local, không thực hiện auth - tức không thực hiện tạo user hay phân quyền.

=> Báo cáo phân tích về feature này cần được viết vào file @./docs/features/topic-vocabulary.md . Tôi cũng đã edit file @todo.md để dễ nhìn hơn, các task của feature này sẽ được đặt trong phần feature 4.

---

> Note:
>
> 1.  file @./docs/note.md chứa những lưu ý và những lỗi tôi từng mắc phải cũng như những gợi ý để tránh sai.
> 2.  file @./docs/project-requirements-document.md cho biết tổng quan dự án
> 3.  đọc file @SKILL_GUIDE.md để tìm skills phù hợp nếu cần.
