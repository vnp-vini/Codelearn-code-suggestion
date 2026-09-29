# 💡 CodeLearn Snippets Helper (Chuẩn VS Code Extension)

Tiện ích mở rộng cho Google Chrome hoạt động **giống như các extension Snippets / IntelliSense trong VS Code**, được tích hợp sâu vào trình soạn thảo **Monaco Editor** trên trang [https://codelearn.io](https://codelearn.io).

---

## ⚡ Các tính năng chuẩn VS Code

### 1. 🎯 Tự Động Gợi Ý Khi Gõ (Monaco IntelliSense Autocomplete)
Khi bạn đang làm bài trong khung soạn thảo của CodeLearn, bạn chỉ cần gõ các **tiền tố (prefix)**, hộp thoại gợi ý chuẩn VS Code sẽ lập tức xuất hiện ngay tại con trỏ soạn thảo:
- Nhấn **`Tab`** hoặc **`Enter`** để tự động chèn code mẫu.
- Hỗ trợ **Tab-stops (`$1`, `$2`, `$0`)**: Sau khi chèn, bấm phím `Tab` để nhảy nhanh qua các biến cần sửa (Ví dụ: đổi kiểu dữ liệu `int` -> `long long`, đổi tên mảng, đổi biến đếm vòng lặp), cực kỳ tiện lợi!

#### 🐍 Một số tiền tố Python 3 thông dụng:
| Tiền tố (Gõ + `Tab`) | Kết quả chèn |
| :--- | :--- |
| `fastio` | Tăng tốc độ nhập với `sys.stdin.readline` |
| `inp` / `inpi` | Nhập 1 số nguyên: `n = int(input())` |
| `inpm` / `map` | Nhập nhiều số 1 dòng: `a, b = map(int, input().split())` |
| `inparr` | Nhập danh sách số: `arr = list(map(int, input().split()))` |
| `fori` | Vòng lặp `for i in range(n):` |
| `forrev` | Vòng lặp lùi `for i in range(n - 1, -1, -1):` |
| `forenum` | Duyệt chỉ số & giá trị `for i, val in enumerate(arr):` |
| `matrix` | Khởi tạo ma trận `[[0] * cols for _ in range(rows)]` |
| `sort` / `sortdesc` | Sắp xếp danh sách tăng/giảm dần |
| `counter` | Đếm tần suất phần tử với `Counter(arr)` |
| `bisect` / `bsearch` | Tìm kiếm nhị phân `bisect.bisect_left(...)` |
| `gcd` / `lcm` | Tính UCLN & BCNN với thư viện `math` |

#### ⚡ Một số tiền tố C++ thông dụng:
| Tiền tố (Gõ + `Tab`) | Kết quả chèn |
| :--- | :--- |
| `cpp` / `template` | Khung chương trình C++ chuẩn tối ưu Fast I/O |
| `fastio` | 2 dòng tăng tốc `ios_base::sync_with_stdio(false); cin.tie(NULL);` |
| `cin` / `cin2` | `cin >> a >> b;` |
| `getline` | Nhập cả dòng `getline(cin >> ws, s);` |
| `fori` / `for` | Vòng lặp `for (int i = 0; i < n; i++)` |
| `forr` | Vòng lặp lùi `for (int i = n - 1; i >= 0; i--)` |
| `fore` | Range-based for `for (const auto &x : v)` |
| `vec` / `vector` | Khai báo `vector<int> v(n, 0);` |
| `mat` / `matrix` | Ma trận 2D `vector<vector<int>> matrix(r, vector<int>(c, 0));` |
| `pb` | `v.push_back(x);` |
| `sort` / `sortdesc` | Sắp xếp vector `sort(v.begin(), v.end());` |
| `sortcmp` | Sắp xếp với lambda custom `[](const auto &a, const auto &b){ ... }` |
| `map` / `unmap` | `map<string, int>` hoặc `unordered_map<int, int>` |
| `set` | `set<int> st;` |
| `pq` / `minheap` | Hàng đợi ưu tiên Max-Heap và Min-Heap |
| `bsearch` / `lower_bound` | Tìm kiếm nhị phân trên vector đã sắp xếp |
| `gcd` | `__gcd(a, b)` |

---

### 2. 🟦 VS Code Status Bar (Góc dưới màn hình)
- Hiển thị ngôn ngữ đang chọn: **`🐍 Python 3`** hoặc **`⚡ C++`**.
- **Tự động nhận diện ngôn ngữ**: Khi bạn chuyển bài tập giữa Python và C++ trên CodeLearn, thanh trạng thái sẽ tự động đồng bộ theo ngôn ngữ của bài tập!
- Bấm trực tiếp vào thanh trạng thái để đổi ngôn ngữ hoặc mở Quick Pick.

---

### 3. 🔍 VS Code Quick Pick / Command Palette (`Alt + P` hoặc `Ctrl + Shift + P`)
- Xuất hiện thanh tìm kiếm ở giữa trên cùng màn hình giống hệt **`Ctrl + Shift + P`** trong VS Code.
- Gõ từ khóa để lọc lệnh hoặc đổi ngôn ngữ tức thì.
- Dùng phím **`↑` / `↓`** và bấm **`Enter`** để chèn trực tiếp câu lệnh vào vị trí con trỏ trong khung code!

---

### 4. 📦 VS Code Extension Sidebar Panel (`Alt + K`)
- Bảng tra cứu bên hông theo phong cách **VS Code Dark+ Theme** (`#1e1e1e`).
- Có thể **kéo thả** vị trí tự do để không che khuất màn hình.
- Có nút **"⚡ Chèn vào Editor"** và **"📋 Sao chép"** cho từng câu lệnh.

---

## ⌨️ Bảng Phím Tắt Tiện Dụng

| Phím tắt | Chức năng |
| :--- | :--- |
| **`Tab`** (sau khi gõ prefix) | Mở rộng Snippet và di chuyển giữa các trường `${1:var}` |
| **`Ctrl + Space`** | Bật danh sách gợi ý IntelliSense tại con trỏ soạn thảo |
| **`Alt + P`** hoặc **`Ctrl + Shift + P`** | Mở bảng **VS Code Quick Pick** để tìm và chèn lệnh |
| **`Alt + K`** | Mở / Đóng bảng **Sidebar Snippets** |
| **`Esc`** | Đóng nhanh Quick Pick hoặc Sidebar |

---

## 📦 Hướng dẫn cài đặt vào Google Chrome (30 giây)

1. Mở trình duyệt **Google Chrome** (hoặc Cốc Cốc, Edge, Brave).
2. Truy cập vào: `chrome://extensions/` và nhấn **Enter**.
3. Ở góc trên bên phải, **BẬT công tắc "Chế độ dành cho nhà phát triển" (Developer mode)**.
4. Nhấn nút **"Tải tiện ích đã giải nén" (Load unpacked)** ở góc trên bên trái.
5. Chọn thư mục dự án:
   ```
   C:\Users\sypho\OneDrive\Máy tính\Nhắc code
   ```
6. Vào trang bài tập bất kỳ trên [https://codelearn.io](https://codelearn.io) để trải nghiệm việc gõ code với gợi ý IntelliSense tự động như trong VS Code!
