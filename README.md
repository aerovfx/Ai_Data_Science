<div align="center">

# ◈ AI Data Science Academy

### Học từ dữ liệu · Xây dựng mô hình · Triển khai sản phẩm AI

[![Mở website](https://img.shields.io/badge/MỞ_WEBSITE-31F7FF?style=for-the-badge&logo=githubpages&logoColor=030508)](https://aerovfx.github.io/Ai_Data_Science/)
[![Khảo sát](https://img.shields.io/badge/KHẢO_SÁT-C6FF00?style=for-the-badge&logo=googleforms&logoColor=061000)](https://aerovfx.github.io/Ai_Data_Science/tools/khao-sat/portal.html)
[![Giáo viên](https://img.shields.io/badge/CHẤM_ĐIỂM-FF2BD6?style=for-the-badge&logo=googlesheets&logoColor=ffffff)](https://aerovfx.github.io/Ai_Data_Science/tools/khao-sat/admin.html)

[![Deploy GitHub Pages](https://github.com/aerovfx/Ai_Data_Science/actions/workflows/deploy-github-pages.yml/badge.svg)](https://github.com/aerovfx/Ai_Data_Science/actions/workflows/deploy-github-pages.yml)
![Courses](https://img.shields.io/badge/khóa_học-3-31F7FF)
![Lessons](https://img.shields.io/badge/bài_học-30-C6FF00)

**[Truy cập cổng học tập](https://aerovfx.github.io/Ai_Data_Science/)** ·
**[Xem mã nguồn](https://github.com/aerovfx/Ai_Data_Science)** ·
**[Báo lỗi / góp ý](https://github.com/aerovfx/Ai_Data_Science/issues)**

</div>

---

## Cổng học tập

| Khu vực | Dành cho | Chức năng | Truy cập |
|---|---|---|---|
| ◈ **Kho học liệu** | Mọi học viên | Đọc bài Markdown, code, bài tập và dự án | **[Mở website](https://aerovfx.github.io/Ai_Data_Science/)** |
| ◎ **Lớp học** | Học viên | Chọn khóa học, lớp, buổi học và hồ sơ | **[Mở portal](https://aerovfx.github.io/Ai_Data_Science/tools/khao-sat/portal.html)** |
| ▤ **Khảo sát** | Học viên | Phản hồi trải nghiệm theo từng buổi | **[Gửi khảo sát](https://aerovfx.github.io/Ai_Data_Science/tools/khao-sat/index.html)** |
| ◇ **Đánh giá đồng đẳng** | Nhóm học tập | Đánh giá thành viên theo thang 1–5 | **[Đánh giá](https://aerovfx.github.io/Ai_Data_Science/tools/khao-sat/danh-gia.html)** |
| ▥ **Kết quả** | Học viên và giáo viên | Theo dõi khảo sát, đánh giá và điểm số | **[Xem kết quả](https://aerovfx.github.io/Ai_Data_Science/tools/khao-sat/ket-qua.html)** |
| ⚙ **Quản lý giáo viên** | Giáo viên | Chấm điểm, nhận xét, xuất CSV và JSON | **[Quản lý điểm](https://aerovfx.github.io/Ai_Data_Science/tools/khao-sat/admin.html)** |

## Lộ trình khóa học

| Khóa học | Thời lượng | Công nghệ chính | Mở khóa học |
|---|---:|---|---|
| 📊 **Khoa học dữ liệu nền tảng** | 10 tuần | NumPy, Pandas, trực quan hóa | **[Bắt đầu](https://aerovfx.github.io/Ai_Data_Science/course.html?course=data-science-10weeks)** |
| 🧠 **Machine Learning & Deep Learning** | 10 tuần | Scikit-learn, TensorFlow, LLM | **[Bắt đầu](https://aerovfx.github.io/Ai_Data_Science/course.html?course=machine-learning-10weeks)** |
| 👁️ **Computer Vision** | 10 tuần | OpenCV, CNN, YOLO | **[Bắt đầu](https://aerovfx.github.io/Ai_Data_Science/course.html?course=computer-vision-10weeks)** |

Mỗi khóa học được tổ chức theo cùng một luồng:

```text
Lesson → Presentation → Exercise → Code → Project
```

## Giao diện

- Giao diện cyber-style tối ưu cho nội dung kỹ thuật.
- Sidebar mục lục được sinh tự động từ heading Markdown.
- Thanh tiến độ đọc, điều hướng tài liệu và liên kết nguồn.
- Code block, bảng, trích dẫn và cảnh báo có kiểu hiển thị riêng.
- Responsive cho máy tính, máy tính bảng và điện thoại.
- Nội dung bài học được đọc trực tiếp từ các file Markdown trong repository.

## Khảo sát và đánh giá

```text
Chọn khóa học → Chọn lớp → Chọn buổi → Chọn học viên
      ├── Khảo sát trải nghiệm
      ├── Đánh giá đồng đẳng 1–5
      └── Giáo viên chấm điểm và xuất báo cáo
```

> [!IMPORTANT]
> GitHub Pages là website tĩnh. Kết quả mặc định được lưu trong `localStorage` của trình duyệt. Giáo viên nên xuất CSV/JSON thường xuyên hoặc cấu hình Google Sheets để đồng bộ tập trung.

> [!NOTE]
> Danh sách học viên trong repository là dữ liệu demo. Không commit thông tin cá nhân hoặc kết quả đánh giá thật vào kho mã nguồn công khai.

## Chạy cục bộ

```bash
python3 -m http.server 4175 --directory docs
```

Sau đó mở <http://127.0.0.1:4175/>.

## Cấu trúc GitHub Pages

```text
docs/
├── index.html                  # Trang chủ và catalog
├── course.html                 # Trình đọc Markdown
├── assets/                     # CSS và JavaScript
├── courses/                    # Ba khóa học 10 tuần
└── tools/khao-sat/             # Khảo sát và hệ thống đánh giá
```

---

<div align="center">

**[Mở AI Data Science Academy →](https://aerovfx.github.io/Ai_Data_Science/)**

</div>
