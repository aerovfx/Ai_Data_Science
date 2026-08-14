# Exercise — Tuần 9: Phân vùng ảnh

> **Khóa học:** Thị Giác Máy Tính (Computer Vision) với OpenCV & YOLO<br>
> **Bài học gốc:** [week09.md](../lessons/week09.md)<br>
> Hoàn thành cá nhân trước, sau đó đối chiếu và thảo luận theo nhóm.

## 4. Đánh giá mask

Pixel accuracy có thể cao dù bỏ sót vật thể nhỏ. Nên dùng IoU hoặc Dice giữa mask dự đoán và mask chuẩn, đồng thời xem riêng từng lớp.
