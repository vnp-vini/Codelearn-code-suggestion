/**
 * Dữ liệu nhắc code cho Python 3 và C++ chuẩn VS Code Snippets
 * Hỗ trợ tiền tố kích hoạt (prefix), tab-stop (${1:var}, ${2:condition}, $0), và mô tả chi tiết
 */

var CODE_SNIPPETS = {
  python: {
    id: "python",
    name: "Python 3",
    icon: "🐍",
    color: "#3572A5",
    monacoLangs: ["python", "python3", "py"],
    categories: [
      "Tất cả",
      "Nhập / Xuất (I/O)",
      "Kiểu dữ liệu & Ép kiểu",
      "Điều kiện & Vòng lặp",
      "Danh sách (List)",
      "Chuỗi ký tự (String)",
      "Từ điển & Tập hợp (Dict & Set)",
      "Hàm & Toán học (Math)"
    ],
    snippets: [
      // 1. Nhập / Xuất
      {
        id: "py-fast-io",
        prefix: ["fastio", "sysin", "fio"],
        title: "Tăng tốc độ nhập (Fast I/O)",
        category: "Nhập / Xuất (I/O)",
        desc: "Dùng sys.stdin.readline để đọc dữ liệu siêu nhanh khi đề bài có nhiều test case lớn.",
        code: `import sys\ninput = sys.stdin.readline\n`,
        body: `import sys\ninput = sys.stdin.readline\n\$0`,
        tags: ["fast", "io", "sys", "stdin", "readline", "nhap nhanh"]
      },
      {
        id: "py-input-single-int",
        prefix: ["inp", "inpi", "input_int"],
        title: "Nhập một số nguyên",
        category: "Nhập / Xuất (I/O)",
        desc: "Đọc 1 số nguyên từ bàn phím.",
        code: `n = int(input())`,
        body: `\${1:n} = int(input())\$0`,
        tags: ["input", "nhap", "so nguyen", "int"]
      },
      {
        id: "py-input-multiple-int",
        prefix: ["inpm", "map", "input_map"],
        title: "Nhập nhiều số trên 1 dòng",
        category: "Nhập / Xuất (I/O)",
        desc: "Dùng map và split để đọc 2 hoặc nhiều biến cách nhau bởi dấu cách.",
        code: `a, b = map(int, input().split())`,
        body: `\${1:a}, \${2:b} = map(int, input().split())\$0`,
        tags: ["input", "map", "split", "nhieu so", "nhap"]
      },
      {
        id: "py-input-list-int",
        prefix: ["inparr", "inplist", "input_list"],
        title: "Nhập danh sách (List) số nguyên trên 1 dòng",
        category: "Nhập / Xuất (I/O)",
        desc: "Chuyển toàn bộ các số trên 1 dòng thành danh sách số nguyên.",
        code: `arr = list(map(int, input().split()))`,
        body: `\${1:arr} = list(map(int, input().split()))\$0`,
        tags: ["input", "list", "mang", "danh sach", "arr"]
      },
      {
        id: "py-input-multiple-lines",
        prefix: ["inplines", "input_lines"],
        title: "Nhập N dòng tiếp theo vào danh sách",
        category: "Nhập / Xuất (I/O)",
        desc: "Đọc N số hoặc chuỗi ký tự trên N dòng.",
        code: `n = int(input())\narr = [int(input()) for _ in range(n)]`,
        body: `\${1:n} = int(input())\n\${2:arr} = [int(input()) for _ in range(\${1:n})]\$0`,
        tags: ["nhap", "n dong", "list comprehension", "lines"]
      },
      {
        id: "py-output-fstring",
        prefix: ["prf", "fstring", "printf"],
        title: "Xuất dữ liệu định dạng f-string",
        category: "Nhập / Xuất (I/O)",
        desc: "In chuỗi kết hợp biến dễ nhìn và hỗ trợ định dạng số thập phân.",
        code: `print(f"Kết quả là: {ans:.2f}")`,
        body: `print(f"\${1:Kết quả}: {\${2:ans}:\${3:.2f}}")\$0`,
        tags: ["print", "f-string", "format", "xuat", "thap phan"]
      },
      {
        id: "py-output-list-inline",
        prefix: ["prarr", "print_arr", "unpack"],
        title: "In danh sách cách nhau bởi dấu cách",
        category: "Nhập / Xuất (I/O)",
        desc: "Toán tử giải nén (*) giúp in các phần tử cách nhau khoảng trắng mà không cần for.",
        code: `print(*arr)`,
        body: `print(*\${1:arr})\$0`,
        tags: ["print", "unpack", "sao", "list", "xuat"]
      },
      {
        id: "py-output-no-newline",
        prefix: ["prsame", "print_end"],
        title: "In không xuống dòng (end=' ')",
        category: "Nhập / Xuất (I/O)",
        desc: "Sử dụng tham số end=' ' trong hàm print.",
        code: `print(x, end=" ")`,
        body: `print(\${1:x}, end="\${2: }")\$0`,
        tags: ["print", "end", "khong xuong dong"]
      },

      // 2. Kiểu dữ liệu & Ép kiểu
      {
        id: "py-type-casting",
        prefix: ["cast", "epkieu"],
        title: "Ép kiểu dữ liệu thông dụng",
        category: "Kiểu dữ liệu & Ép kiểu",
        desc: "Chuyển đổi giữa số nguyên, số thực, chuỗi và boolean.",
        code: `x_int = int("123")\nx_float = float("3.14")\ns = str(100)`,
        body: `\${1:x_int} = int(\${2:"123"})\n\${3:x_float} = float(\${4:"3.14"})\n\${5:s} = str(\${6:100})\$0`,
        tags: ["ep kieu", "cast", "int", "float", "str", "bool"]
      },
      {
        id: "py-check-type",
        prefix: ["isinstance", "checktype"],
        title: "Kiểm tra kiểu dữ liệu",
        category: "Kiểu dữ liệu & Ép kiểu",
        desc: "Hàm isinstance() an toàn và chuẩn mực.",
        code: `if isinstance(x, int):\n    pass`,
        body: `if isinstance(\${1:x}, \${2:int}):\n    \${0:pass}`,
        tags: ["isinstance", "type", "kiem tra kieu"]
      },

      // 3. Điều kiện & Vòng lặp
      {
        id: "py-if-elif-else",
        prefix: ["ifelse", "ifelif"],
        title: "Cấu trúc rẽ nhánh if - elif - else",
        category: "Điều kiện & Vòng lặp",
        desc: "So sánh điều kiện trong Python.",
        code: `if condition:\n    pass\nelif condition2:\n    pass\nelse:\n    pass`,
        body: `if \${1:condition}:\n    \${2:pass}\nelif \${3:condition2}:\n    \${4:pass}\nelse:\n    \${0:pass}`,
        tags: ["if", "elif", "else", "dieu kien"]
      },
      {
        id: "py-ternary",
        prefix: ["ternary", "if1line", "inlineif"],
        title: "Toán tử 3 ngôi (If-else rút gọn 1 dòng)",
        category: "Điều kiện & Vòng lặp",
        desc: "Gán giá trị theo điều kiện trên một dòng duy nhất.",
        code: `max_val = a if a > b else b`,
        body: `\${1:val} = \${2:a} if \${3:\${2:a} > \${4:b}} else \${4:b}\$0`,
        tags: ["ternary", "3 ngoi", "rut gon", "1 dong", "inline if"]
      },
      {
        id: "py-chained-comparison",
        prefix: ["rangecheck", "so-sanh-kep"],
        title: "So sánh kép (Chained Comparison)",
        category: "Điều kiện & Vòng lặp",
        desc: "Python cho phép viết điều kiện kép tự nhiên như toán học.",
        code: `if 0 <= x < 100:\n    pass`,
        body: `if \${1:0} <= \${2:x} < \${3:100}:\n    \${0:pass}`,
        tags: ["so sanh kep", "khoang", "comparison"]
      },
      {
        id: "py-for-range",
        prefix: ["fori", "forr", "forrange"],
        title: "Vòng lặp for với range(n)",
        category: "Điều kiện & Vòng lặp",
        desc: "Lặp từ 0 đến n-1.",
        code: `for i in range(n):\n    pass`,
        body: `for \${1:i} in range(\${2:n}):\n    \${0:pass}`,
        tags: ["for", "range", "vong lap"]
      },
      {
        id: "py-for-step",
        prefix: ["forstep"],
        title: "Vòng lặp for có bước nhảy (step)",
        category: "Điều kiện & Vòng lặp",
        desc: "Lặp từ start đến stop-1 với bước nhảy step.",
        code: `for i in range(start, stop, step):\n    pass`,
        body: `for \${1:i} in range(\${2:start}, \${3:stop}, \${4:step}):\n    \${0:pass}`,
        tags: ["for", "step", "buoc nhay"]
      },
      {
        id: "py-for-reverse",
        prefix: ["forrev", "forlùi"],
        title: "Vòng lặp for lùi (từ n-1 về 0)",
        category: "Điều kiện & Vòng lặp",
        desc: "Lặp ngược từ n-1 về 0.",
        code: `for i in range(n - 1, -1, -1):\n    pass`,
        body: `for \${1:i} in range(\${2:n} - 1, -1, -1):\n    \${0:pass}`,
        tags: ["for", "reverse", "lui", "nguoc"]
      },
      {
        id: "py-for-enumerate",
        prefix: ["forenum", "enum"],
        title: "Duyệt danh sách lấy cả chỉ số (Index) và giá trị",
        category: "Điều kiện & Vòng lặp",
        desc: "enumerate() giúp lấy vị trí i và giá trị val tiện lợi.",
        code: `for i, val in enumerate(arr):\n    pass`,
        body: `for \${1:i}, \${2:val} in enumerate(\${3:arr}):\n    \${0:pass}`,
        tags: ["for", "enumerate", "index", "chi so", "gia tri"]
      },
      {
        id: "py-for-zip",
        prefix: ["forzip", "zip"],
        title: "Duyệt song song nhiều danh sách (zip)",
        category: "Điều kiện & Vòng lặp",
        desc: "Ghép các danh sách lại để duyệt đồng thời.",
        code: `for a, b in zip(list1, list2):\n    pass`,
        body: `for \${1:a}, \${2:b} in zip(\${3:list1}, \${4:list2}):\n    \${0:pass}`,
        tags: ["zip", "duyet song song", "2 mang"]
      },
      {
        id: "py-while-loop",
        prefix: ["while"],
        title: "Vòng lặp while",
        category: "Điều kiện & Vòng lặp",
        desc: "Lặp khi điều kiện còn đúng.",
        code: `while condition:\n    pass`,
        body: `while \${1:condition}:\n    \${0:pass}`,
        tags: ["while", "vong lap", "break", "continue"]
      },

      // 4. Danh sách (List)
      {
        id: "py-init-list",
        prefix: ["initarr", "initlist"],
        title: "Khởi tạo mảng 1D gồm N phần tử 0",
        category: "Danh sách (List)",
        desc: "Tạo mảng n phần tử 0.",
        code: `arr = [0] * n`,
        body: `\${1:arr} = [\${2:0}] * \${3:n}\$0`,
        tags: ["khoi tao", "list", "mang"]
      },
      {
        id: "py-init-matrix",
        prefix: ["matrix", "mat2d", "initmatrix"],
        title: "Khởi tạo ma trận 2D kích thước R x C",
        category: "Danh sách (List)",
        desc: "Tạo ma trận rows hàng cols cột an toàn tránh lỗi tham chiếu.",
        code: `matrix = [[0] * cols for _ in range(rows)]`,
        body: `\${1:matrix} = [[\${2:0}] * \${3:cols} for _ in range(\${4:rows})]\$0`,
        tags: ["matrix", "ma tran", "mang 2d", "list"]
      },
      {
        id: "py-list-crud",
        prefix: ["append", "pop", "insert"],
        title: "Thao tác thêm, chèn, xoá List",
        category: "Danh sách (List)",
        desc: "append, insert, pop, remove.",
        code: `arr.append(x)\narr.insert(0, x)\nval = arr.pop()`,
        body: `\${1:arr}.append(\${2:x})\n\$0`,
        tags: ["append", "insert", "pop", "remove", "them", "xoa"]
      },
      {
        id: "py-list-sort",
        prefix: ["sort", "sortasc", "sortdesc"],
        title: "Sắp xếp danh sách (Sort)",
        category: "Danh sách (List)",
        desc: "Sắp xếp tăng dần, giảm dần.",
        code: `arr.sort()\n# Giảm dần: arr.sort(reverse=True)`,
        body: `\${1:arr}.sort(\${2:reverse=True})\$0`,
        tags: ["sort", "sorted", "sap xep", "reverse"]
      },
      {
        id: "py-list-sort-key",
        prefix: ["sortkey", "sortlambda"],
        title: "Sắp xếp theo key/lambda tuỳ chọn",
        category: "Danh sách (List)",
        desc: "Sắp xếp danh sách tuple/cặp theo tiêu chí tự chọn.",
        code: `pairs.sort(key=lambda x: (x[0], -x[1]))`,
        body: `\${1:pairs}.sort(key=lambda x: \${2:x[1]})\$0`,
        tags: ["sort", "lambda", "key", "sap xep"]
      },
      {
        id: "py-list-slice",
        prefix: ["reverse", "daomang", "slice"],
        title: "Đảo ngược danh sách & Cắt lát (Slicing)",
        category: "Danh sách (List)",
        desc: "Đảo mảng cực nhanh với arr[::-1] hoặc arr.reverse().",
        code: `rev = arr[::-1]\n# Hoặc tại chỗ: arr.reverse()`,
        body: `\${1:rev} = \${2:arr}[::-1]\$0`,
        tags: ["slice", "cat lat", "dao nguoc", "reverse"]
      },
      {
        id: "py-list-stats",
        prefix: ["stats", "minmax", "sumlen"],
        title: "Thống kê: Max, Min, Sum, Len, Count",
        category: "Danh sách (List)",
        desc: "Các hàm thống kê cơ bản có sẵn.",
        code: `total = sum(arr)\nmax_v = max(arr)\nmin_v = min(arr)\nn = len(arr)`,
        body: `total = sum(\${1:arr})\nmax_v = max(\${1:arr})\nmin_v = min(\${1:arr})\$0`,
        tags: ["sum", "max", "min", "len", "count"]
      },
      {
        id: "py-list-comprehension",
        prefix: ["comp", "listcomp"],
        title: "List Comprehension (Lọc / Biến đổi mảng ngắn gọn)",
        category: "Danh sách (List)",
        desc: "Tạo danh sách mới theo điều kiện lọc.",
        code: `evens = [x for x in arr if x % 2 == 0]`,
        body: `\${1:res} = [\${2:x} for \${2:x} in \${3:arr} if \${4:\${2:x} % 2 == 0}]\$0`,
        tags: ["comprehension", "loc", "danh sach", "ngan gon"]
      },

      // 5. Chuỗi ký tự (String)
      {
        id: "py-str-split-join",
        prefix: ["split", "join"],
        title: "Tách chuỗi (split) và Ghép chuỗi (join)",
        category: "Chuỗi ký tự (String)",
        desc: "Chuyển chuỗi thành danh sách từ và ngược lại.",
        code: `words = s.split(" ")\nres = " ".join(words)`,
        body: `words = \${1:s}.split("\${2: }")\nres = "\${3: }".join(words)\$0`,
        tags: ["split", "join", "tach chuoi", "ghep chuoi"]
      },
      {
        id: "py-str-case",
        prefix: ["strip", "upper", "lower"],
        title: "Hoa, thường, cắt khoảng trắng thừa & Thay thế",
        category: "Chuỗi ký tự (String)",
        desc: "strip, upper, lower, replace.",
        code: `s = s.strip().lower()\ns = s.replace("cũ", "mới")`,
        body: `\${1:s} = \${1:s}.strip()\$0`,
        tags: ["strip", "upper", "lower", "title", "replace"]
      },
      {
        id: "py-str-search",
        prefix: ["strfind", "startswith"],
        title: "Tìm kiếm & Kiểm tra tiền tố chuỗi",
        category: "Chuỗi ký tự (String)",
        desc: "s.find(), s.startswith(), s.isdigit().",
        code: `if "abc" in s:\n    idx = s.find("abc")`,
        body: `if "\${1:sub}" in \${2:s}:\n    idx = \${2:s}.find("\${1:sub}")\$0`,
        tags: ["find", "startswith", "endswith", "isdigit"]
      },

      // 6. Từ điển & Tập hợp (Dict & Set)
      {
        id: "py-dict-basic",
        prefix: ["dict", "hashmap"],
        title: "Dictionary (Từ điển / Bảng băm)",
        category: "Từ điển & Tập hợp (Dict & Set)",
        desc: "Lưu cặp key-value tra cứu O(1).",
        code: `d = {}\nd[key] = value\nval = d.get(key, 0)`,
        body: `\${1:d} = {}\n\${1:d}[\${2:key}] = \${3:value}\nval = \${1:d}.get(\${2:key}, \${4:0})\$0`,
        tags: ["dict", "dictionary", "key", "value"]
      },
      {
        id: "py-counter",
        prefix: ["counter", "demtanso"],
        title: "Đếm tần suất xuất hiện với Counter",
        category: "Từ điển & Tập hợp (Dict & Set)",
        desc: "collections.Counter đếm số lần xuất hiện của các phần tử.",
        code: `from collections import Counter\ncnt = Counter(arr)`,
        body: `from collections import Counter\n\${1:cnt} = Counter(\${2:arr})\$0`,
        tags: ["counter", "dem tan suat", "collections"]
      },
      {
        id: "py-set-operations",
        prefix: ["set", "unique", "taphop"],
        title: "Set (Tập hợp không trùng & Phép toán tập hợp)",
        category: "Từ điển & Tập hợp (Dict & Set)",
        desc: "Loại bỏ phần tử trùng và giao (&), hợp (|), hiệu (-).",
        code: `unique_items = list(set(arr))\ns = set()\ns.add(x)`,
        body: `\${1:st} = set(\${2:arr})\n\${1:st}.add(\${3:x})\$0`,
        tags: ["set", "tap hop", "loai bo trung"]
      },

      // 7. Hàm & Toán học
      {
        id: "py-def-function",
        prefix: ["def", "func"],
        title: "Định nghĩa hàm (Function)",
        category: "Hàm & Toán học (Math)",
        desc: "Khai báo hàm với tham số và giá trị trả về.",
        code: `def solve(n):\n    return n`,
        body: `def \${1:solve}(\${2:n}):\n    \${0:return \${2:n}}`,
        tags: ["def", "function", "ham"]
      },
      {
        id: "py-recursion-limit",
        prefix: ["recurlimit", "syslimit"],
        title: "Mở rộng giới hạn đệ quy (Recursion Limit)",
        category: "Hàm & Toán học (Math)",
        desc: "Tránh lỗi RecursionError khi làm bài DFS hoặc đệ quy sâu.",
        code: `import sys\nsys.setrecursionlimit(200000)`,
        body: `import sys\nsys.setrecursionlimit(\${1:200000})\$0`,
        tags: ["recursion", "de quy", "limit", "dfs"]
      },
      {
        id: "py-math-utils",
        prefix: ["gcd", "lcm", "sqrt", "math"],
        title: "Toán học: GCD, LCM, isqrt, ceil, floor",
        category: "Hàm & Toán học (Math)",
        desc: "Thư viện math tính ước chung, bội chung, căn.",
        code: `import math\ng = math.gcd(a, b)\nl = math.lcm(a, b)\nsq = math.isqrt(n)`,
        body: `import math\n\${1:g} = math.gcd(\${2:a}, \${3:b})\n\${4:l} = math.lcm(\${2:a}, \${3:b})\$0`,
        tags: ["math", "gcd", "lcm", "sqrt", "ucln", "bcnn"]
      },
      {
        id: "py-binary-search",
        prefix: ["bisect", "bsearch", "lowerbound"],
        title: "Tìm kiếm nhị phân (bisect)",
        category: "Hàm & Toán học (Math)",
        desc: "bisect_left và bisect_right trên mảng đã sắp xếp O(logN).",
        code: `import bisect\nidx = bisect.bisect_left(arr, x)`,
        body: `import bisect\n\${1:idx} = bisect.bisect_left(\${2:arr}, \${3:x})\$0`,
        tags: ["bisect", "binary search", "tim kiem nhi phan"]
      },
      {
        id: "py-deque",
        prefix: ["deque", "queue", "bfs"],
        title: "Hàng đợi hai đầu Deque (Dùng cho BFS)",
        category: "Hàm & Toán học (Math)",
        desc: "Thêm xoá ở 2 đầu O(1).",
        code: `from collections import deque\nq = deque()\nq.append(x)\nx = q.popleft()`,
        body: `from collections import deque\n\${1:q} = deque()\n\${1:q}.append(\${2:x})\n\${3:val} = \${1:q}.popleft()\$0`,
        tags: ["deque", "queue", "bfs", "hang doi"]
      },
      {
        id: "py-heapq",
        prefix: ["heap", "heapq", "pq", "dijkstra"],
        title: "Hàng đợi ưu tiên (Min-Heap / Max-Heap)",
        category: "Hàm & Toán học (Math)",
        desc: "heapq lấy ra phần tử nhỏ nhất O(logN).",
        code: `import heapq\npq = []\nheapq.heappush(pq, x)\nmin_v = heapq.heappop(pq)`,
        body: `import heapq\n\${1:pq} = []\nheapq.heappush(\${1:pq}, \${2:x})\n\${3:min_v} = heapq.heappop(\${1:pq})\$0`,
        tags: ["heap", "priority queue", "dijkstra", "min heap"]
      }
    ]
  },

  cpp: {
    id: "cpp",
    name: "C++",
    icon: "⚡",
    color: "#00599C",
    monacoLangs: ["cpp", "c++", "c_cpp", "c"],
    categories: [
      "Tất cả",
      "Khung & Nhập / Xuất (I/O)",
      "Kiểu dữ liệu & Ép kiểu",
      "Điều kiện & Vòng lặp",
      "Mảng & Vector",
      "Chuỗi ký tự (std::string)",
      "Cấu trúc dữ liệu STL",
      "Thuật toán & Toán học (Algorithm)"
    ],
    snippets: [
      // 1. Khung & Nhập / Xuất
      {
        id: "cpp-template-fast-io",
        prefix: ["cpp", "template", "main", "fastio_main"],
        title: "Khung chương trình chuẩn & Tăng tốc I/O",
        category: "Khung & Nhập / Xuất (I/O)",
        desc: "Khung cơ bản tối ưu cho C++ giúp tránh TLE (Time Limit Exceeded).",
        code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Code here

    return 0;
}`,
        body: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    \${0}

    return 0;
}`,
        tags: ["template", "fast io", "cin", "cout", "khung", "main"]
      },
      {
        id: "cpp-fast-io-line",
        prefix: ["fastio", "fio"],
        title: "2 dòng tăng tốc độ cin/cout",
        category: "Khung & Nhập / Xuất (I/O)",
        desc: "Đặt ở đầu hàm main để cin/cout chạy nhanh ngang ngửa scanf/printf.",
        code: `ios_base::sync_with_stdio(false);\ncin.tie(NULL);`,
        body: `ios_base::sync_with_stdio(false);\ncin.tie(NULL);\n\$0`,
        tags: ["fast io", "sync_with_stdio", "cin.tie"]
      },
      {
        id: "cpp-cin-multiple",
        prefix: ["cin", "cin2", "cin3"],
        title: "Nhập biến với cin",
        category: "Khung & Nhập / Xuất (I/O)",
        desc: "Nhập 2 hoặc nhiều biến cách nhau bởi dấu cách.",
        code: `cin >> a >> b;`,
        body: `cin >> \${1:a} >> \${2:b};\$0`,
        tags: ["cin", "nhap", "bien", "input"]
      },
      {
        id: "cpp-getline-string",
        prefix: ["getline", "cinws"],
        title: "Nhập cả dòng chuỗi có khoảng trắng (getline)",
        category: "Khung & Nhập / Xuất (I/O)",
        desc: "Dùng `cin >> ws` trước khi getline để xoá ký tự xuống dòng trong bộ đệm.",
        code: `string s;\ngetline(cin >> ws, s);`,
        body: `string \${1:s};\ngetline(cin >> ws, \${1:s});\$0`,
        tags: ["getline", "cin", "ws", "khoang trang", "chuoi"]
      },
      {
        id: "cpp-cout-precision",
        prefix: ["prec", "fixed", "setprecision"],
        title: "In số thực có N chữ số thập phân",
        category: "Khung & Nhập / Xuất (I/O)",
        desc: "Sử dụng fixed và setprecision từ thư viện <iomanip>.",
        code: `#include <iomanip>\ncout << fixed << setprecision(2) << ans << "\\n";`,
        body: `cout << fixed << setprecision(\${1:2}) << \${2:ans} << "\\n";\$0`,
        tags: ["setprecision", "fixed", "iomanip", "thap phan", "in so thuc"]
      },

      // 2. Kiểu dữ liệu & Ép kiểu
      {
        id: "cpp-type-casting-mul",
        prefix: ["1ll", "longlong", "overflow"],
        title: "Ép kiểu 1LL tránh tràn số khi nhân",
        category: "Kiểu dữ liệu & Ép kiểu",
        desc: "Nhân 2 số int có thể vượt quá 2*10^9, nhân với 1LL để ép sang long long.",
        code: `long long res = 1LL * a * b;`,
        body: `long long \${1:res} = 1LL * \${2:a} * \${3:b};\$0`,
        tags: ["ep kieu", "1LL", "tran so", "long long"]
      },
      {
        id: "cpp-type-casting-div",
        prefix: ["castdiv", "doublediv"],
        title: "Ép kiểu chia lấy số thực",
        category: "Kiểu dữ liệu & Ép kiểu",
        desc: "Chia 2 số nguyên cần ép kiểu double để ra số thập phân.",
        code: `double avg = (double)sum / n;`,
        body: `double \${1:avg} = (double)\${2:sum} / \${3:n};\$0`,
        tags: ["ep kieu", "double", "chia", "so thuc"]
      },
      {
        id: "cpp-infinity-constants",
        prefix: ["inf", "lnf", "mod"],
        title: "Hằng số Vô cực (INF) & Modulo",
        category: "Kiểu dữ liệu & Ép kiểu",
        desc: "Các hằng số thường dùng trong thuật toán và modulo 10^9+7.",
        code: `const int INF = 1e9 + 7;\nconst long long LNF = 1e18;\nconst int MOD = 1e9 + 7;`,
        body: `const int INF = 1e9 + 7;\nconst long long LNF = 1e18;\nconst int MOD = 1e9 + 7;\$0`,
        tags: ["inf", "lnf", "mod", "hang so", "vo cuc"]
      },

      // 3. Điều kiện & Vòng lặp
      {
        id: "cpp-ternary",
        prefix: ["ternary", "3ngoi"],
        title: "Toán tử 3 ngôi (Ternary Operator)",
        category: "Điều kiện & Vòng lặp",
        desc: "Rút gọn câu lệnh gán theo điều kiện.",
        code: `int max_val = (a > b) ? a : b;`,
        body: `\${1:int} \${2:max_val} = (\${3:\${4:a} > \${5:b}}) ? \${4:a} : \${5:b};\$0`,
        tags: ["ternary", "3 ngoi", "dieu kien"]
      },
      {
        id: "cpp-for-loop",
        prefix: ["fori", "for", "loop"],
        title: "Vòng lặp for từ 0 đến n-1",
        category: "Điều kiện & Vòng lặp",
        desc: "Duyệt theo chỉ số index thông thường.",
        code: `for (int i = 0; i < n; i++) {\n    \n}`,
        body: `for (int \${1:i} = 0; \${1:i} < \${2:n}; \${1:i}++) {\n    \${0}\n}`,
        tags: ["for", "loop", "vong lap"]
      },
      {
        id: "cpp-for-reverse",
        prefix: ["forr", "forrev"],
        title: "Vòng lặp for lùi (từ n-1 về 0)",
        category: "Điều kiện & Vòng lặp",
        desc: "Duyệt lùi từ cuối mảng về đầu.",
        code: `for (int i = n - 1; i >= 0; i--) {\n    \n}`,
        body: `for (int \${1:i} = \${2:n} - 1; \${1:i} >= 0; \${1:i}--) {\n    \${0}\n}`,
        tags: ["for", "reverse", "lui"]
      },
      {
        id: "cpp-range-for",
        prefix: ["fore", "rangefor"],
        title: "Range-based for (C++11 duyệt qua phần tử)",
        category: "Điều kiện & Vòng lặp",
        desc: "Duyệt qua từng phần tử của vector/mảng.",
        code: `for (const auto &x : v) {\n    \n}`,
        body: `for (const auto &\${1:x} : \${2:v}) {\n    \${0}\n}`,
        tags: ["range-based", "auto", "vong lap"]
      },

      // 4. Mảng & Vector
      {
        id: "cpp-vector-init",
        prefix: ["vec", "vector"],
        title: "Khai báo Vector 1D gồm N phần tử 0",
        category: "Mảng & Vector",
        desc: "Mảng động tự co giãn của C++ STL.",
        code: `vector<int> v(n, 0);`,
        body: `vector<\${1:int}> \${2:v}(\${3:n}, \${4:0});\$0`,
        tags: ["vector", "khoi tao"]
      },
      {
        id: "cpp-matrix-2d",
        prefix: ["mat", "matrix", "vec2d"],
        title: "Khai báo Ma trận 2D kích thước R x C",
        category: "Mảng & Vector",
        desc: "Vector lồng vector tạo ma trận 2 chiều.",
        code: `vector<vector<int>> matrix(rows, vector<int>(cols, 0));`,
        body: `vector<vector<\${1:int}>> \${2:matrix}(\${3:rows}, vector<\${1:int}>(\${4:cols}, \${5:0}));\$0`,
        tags: ["matrix", "ma tran", "mang 2d", "vector"]
      },
      {
        id: "cpp-vector-push-pop",
        prefix: ["pb", "push_back", "pop_back"],
        title: "push_back & pop_back",
        category: "Mảng & Vector",
        desc: "Thêm vào cuối và xoá phần tử cuối O(1).",
        code: `v.push_back(x);`,
        body: `\${1:v}.push_back(\${2:x});\$0`,
        tags: ["vector", "push_back", "pop_back", "them"]
      },
      {
        id: "cpp-vector-sort",
        prefix: ["sort", "sortasc", "sortdesc"],
        title: "Sắp xếp Vector (Tăng dần / Giảm dần)",
        category: "Mảng & Vector",
        desc: "sort() trong <algorithm> O(N log N).",
        code: `sort(v.begin(), v.end());\n// Giảm dần: sort(v.rbegin(), v.rend());`,
        body: `sort(\${1:v}.begin(), \${1:v}.end());\$0`,
        tags: ["sort", "tang dan", "giam dan", "sap xep"]
      },
      {
        id: "cpp-vector-sort-custom",
        prefix: ["sortcmp", "sortlambda"],
        title: "Sắp xếp theo hàm so sánh Lambda",
        category: "Mảng & Vector",
        desc: "Sắp xếp cặp pair hoặc struct theo điều kiện tuỳ ý.",
        code: `sort(v.begin(), v.end(), [](const auto &a, const auto &b) {\n    return a < b;\n});`,
        body: `sort(\${1:v}.begin(), \${1:v}.end(), [](const auto &\${2:a}, const auto &\${3:b}) {\n    return \${4:\${2:a} < \${3:b}};\n});\$0`,
        tags: ["sort", "lambda", "cmp", "pair", "custom"]
      },
      {
        id: "cpp-vector-min-max-sum",
        prefix: ["minmax", "min_element", "accumulate"],
        title: "Tìm Min, Max, Tổng, Đảo ngược Vector",
        category: "Mảng & Vector",
        desc: "min_element, max_element, reverse, accumulate.",
        code: `int min_v = *min_element(v.begin(), v.end());\nint max_v = *max_element(v.begin(), v.end());\nlong long sum = accumulate(v.begin(), v.end(), 0LL);`,
        body: `int \${1:min_v} = *min_element(\${2:v}.begin(), \${2:v}.end());\nint \${3:max_v} = *max_element(\${2:v}.begin(), \${2:v}.end());\nlong long \${4:sum} = accumulate(\${2:v}.begin(), \${2:v}.end(), 0LL);\$0`,
        tags: ["min_element", "max_element", "reverse", "accumulate", "sum"]
      },
      {
        id: "cpp-vector-unique",
        prefix: ["unique", "loaitrung"],
        title: "Lọc bỏ phần tử trùng lặp trong Vector",
        category: "Mảng & Vector",
        desc: "Sắp xếp trước rồi dùng unique và erase.",
        code: `sort(v.begin(), v.end());\nv.erase(unique(v.begin(), v.end()), v.end());`,
        body: `sort(\${1:v}.begin(), \${1:v}.end());\n\${1:v}.erase(unique(\${1:v}.begin(), \${1:v}.end()), \${1:v}.end());\$0`,
        tags: ["unique", "erase", "loai bo trung", "vector"]
      },

      // 5. Chuỗi ký tự (std::string)
      {
        id: "cpp-string-basic",
        prefix: ["substr", "strfind"],
        title: "Cắt chuỗi con & Tìm kiếm",
        category: "Chuỗi ký tự (std::string)",
        desc: "substr(start, len) và find().",
        code: `string sub = s.substr(pos, len);\nif (s.find("abc") != string::npos) {\n    \n}`,
        body: `string \${1:sub} = \${2:s}.substr(\${3:0}, \${4:len});\nif (\${2:s}.find("\${5:abc}") != string::npos) {\n    \${0}\n}`,
        tags: ["string", "substr", "find", "chuoi con"]
      },
      {
        id: "cpp-string-convert",
        prefix: ["stoi", "to_string", "stoll"],
        title: "Chuyển đổi Chuỗi <-> Số",
        category: "Chuỗi ký tự (std::string)",
        desc: "to_string(num), stoi(s), stoll(s), stod(s).",
        code: `string s = to_string(123);\nint x = stoi(s);\nlong long ll = stoll(s);`,
        body: `string \${1:s} = to_string(\${2:123});\nint \${3:x} = stoi(\${1:s});\$0`,
        tags: ["to_string", "stoi", "stoll", "chuyen doi"]
      },

      // 6. Cấu trúc dữ liệu STL
      {
        id: "cpp-map",
        prefix: ["map", "treemap"],
        title: "std::map (Key-Value tự sắp xếp O(logN))",
        category: "Cấu trúc dữ liệu STL",
        desc: "Bảng tra cứu Red-Black Tree sắp xếp theo key.",
        code: `map<string, int> mp;\nmp["key"]++;\nfor (const auto &[k, v] : mp) {\n    \n}`,
        body: `map<\${1:string}, \${2:int}> \${3:mp};\n\${3:mp}[\${4:key}]++;\nfor (const auto &[\${5:k}, \${6:v}] : \${3:mp}) {\n    \${0}\n}`,
        tags: ["map", "stl", "key value", "dem"]
      },
      {
        id: "cpp-unordered-map",
        prefix: ["unmap", "hashmap"],
        title: "std::unordered_map (Bảng băm O(1))",
        category: "Cấu trúc dữ liệu STL",
        desc: "Tra cứu siêu tốc O(1) trung bình.",
        code: `unordered_map<int, int> freq;\nfreq[x]++;`,
        body: `unordered_map<\${1:int}, \${2:int}> \${3:freq};\n\${3:freq}[\${4:x}]++;\$0`,
        tags: ["unordered_map", "hash table", "bang bam", "dem"]
      },
      {
        id: "cpp-set",
        prefix: ["set"],
        title: "std::set (Tập hợp không trùng, tự sắp xếp)",
        category: "Cấu trúc dữ liệu STL",
        desc: "Thêm, xoá, tìm kiếm trong O(logN).",
        code: `set<int> st;\nst.insert(x);\nif (st.count(x)) {\n    \n}`,
        body: `set<\${1:int}> \${2:st};\n\${2:st}.insert(\${3:x});\nif (\${2:st}.count(\${3:x})) {\n    \${0}\n}`,
        tags: ["set", "tap hop", "loai bo trung"]
      },
      {
        id: "cpp-stack-queue",
        prefix: ["stack", "queue"],
        title: "Stack (LIFO) & Queue (FIFO)",
        category: "Cấu trúc dữ liệu STL",
        desc: "Ngăn xếp và hàng đợi chuẩn STL.",
        code: `stack<int> st;\nst.push(x); st.pop(); int t = st.top();\nqueue<int> q;\nq.push(x); q.pop(); int f = q.front();`,
        body: `stack<\${1:int}> \${2:st};\n\${2:st}.push(\${3:x});\nint \${4:top} = \${2:st}.top(); \${2:st}.pop();\$0`,
        tags: ["stack", "queue", "ngan xep", "hang doi"]
      },
      {
        id: "cpp-priority-queue-max",
        prefix: ["pq", "maxheap"],
        title: "Hàng đợi ưu tiên Max-Heap (Lấy số lớn nhất)",
        category: "Cấu trúc dữ liệu STL",
        desc: "Phần tử lớn nhất luôn ở trên đỉnh top().",
        code: `priority_queue<int> pq;\npq.push(x);\nint top_v = pq.top(); pq.pop();`,
        body: `priority_queue<\${1:int}> \${2:pq};\n\${2:pq}.push(\${3:x});\nint \${4:top_v} = \${2:pq}.top(); \${2:pq}.pop();\$0`,
        tags: ["priority_queue", "heap", "max heap"]
      },
      {
        id: "cpp-priority-queue-min",
        prefix: ["minheap", "dijkstra_pq"],
        title: "Hàng đợi ưu tiên Min-Heap (Lấy số nhỏ nhất)",
        category: "Cấu trúc dữ liệu STL",
        desc: "Dùng cho thuật toán Dijkstra.",
        code: `priority_queue<int, vector<int>, greater<int>> min_pq;\nmin_pq.push(x);\nint sm = min_pq.top(); min_pq.pop();`,
        body: `priority_queue<\${1:int}, vector<\${1:int}>, greater<\${1:int}>> \${2:min_pq};\n\${2:min_pq}.push(\${3:x});\nint \${4:sm} = \${2:min_pq}.top(); \${2:min_pq}.pop();\$0`,
        tags: ["min heap", "priority_queue", "dijkstra"]
      },

      // 7. Thuật toán & Toán học
      {
        id: "cpp-gcd-lcm",
        prefix: ["gcd", "lcm", "ucln"],
        title: "Ước chung lớn nhất (GCD) & Bội chung nhỏ nhất (LCM)",
        category: "Thuật toán & Toán học (Algorithm)",
        desc: "__gcd hoặc std::gcd (từ C++17).",
        code: `int g = __gcd(a, b);\nlong long l = (1LL * a * b) / g;`,
        body: `int \${1:g} = __gcd(\${2:a}, \${3:b});\nlong long \${4:l} = (1LL * \${2:a} * \${3:b}) / \${1:g};\$0`,
        tags: ["gcd", "lcm", "ucln", "bcnn", "__gcd"]
      },
      {
        id: "cpp-binary-search-bound",
        prefix: ["bsearch", "lower_bound", "upper_bound"],
        title: "Tìm kiếm nhị phân (binary_search, lower_bound)",
        category: "Thuật toán & Toán học (Algorithm)",
        desc: "lower_bound (>= x) và upper_bound (> x) O(logN).",
        code: `bool ok = binary_search(v.begin(), v.end(), x);\nint idx = lower_bound(v.begin(), v.end(), x) - v.begin();`,
        body: `bool \${1:ok} = binary_search(\${2:v}.begin(), \${2:v}.end(), \${3:x});\nint \${4:idx} = lower_bound(\${2:v}.begin(), \${2:v}.end(), \${3:x}) - \${2:v}.begin();\$0`,
        tags: ["binary_search", "lower_bound", "upper_bound", "tim kiem nhi phan"]
      },
      {
        id: "cpp-next-permutation",
        prefix: ["nextperm", "hoanvi"],
        title: "Sinh hoán vị tiếp theo (next_permutation)",
        category: "Thuật toán & Toán học (Algorithm)",
        desc: "Sinh tất cả các hoán vị của vector.",
        code: `sort(v.begin(), v.end());\ndo {\n    \n} while (next_permutation(v.begin(), v.end()));`,
        body: `sort(\${1:v}.begin(), \${1:v}.end());\ndo {\n    \${0}\n} while (next_permutation(\${1:v}.begin(), \${1:v}.end()));`,
        tags: ["permutation", "hoan vi", "next_permutation"]
      },
      {
        id: "cpp-cmath-funcs",
        prefix: ["sqrt", "pow", "abs", "cmath"],
        title: "Hàm toán học cơ bản (<cmath>)",
        category: "Thuật toán & Toán học (Algorithm)",
        desc: "sqrt, pow, abs, ceil, floor, round.",
        code: `double sq = sqrt(n);\ndouble p = pow(a, b);\nint ab = abs(x);`,
        body: `double \${1:sq} = sqrt(\${2:n});\ndouble \${3:p} = pow(\${4:a}, \${5:b});\$0`,
        tags: ["cmath", "sqrt", "pow", "abs", "toan hoc"]
      }
    ]
  }
};

// Export cho môi trường extension (window / global / globalThis)
if (typeof globalThis !== "undefined") {
  globalThis.CODE_SNIPPETS = CODE_SNIPPETS;
}
if (typeof window !== "undefined") {
  window.CODE_SNIPPETS = CODE_SNIPPETS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = CODE_SNIPPETS;
}
