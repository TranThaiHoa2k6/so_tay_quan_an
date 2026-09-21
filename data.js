// ============================================================
// DANH SÁCH QUÁN ĂN
// Đây là file duy nhất bạn cần sửa khi thêm/sửa quán mới.
// Không cần đụng vào index.html, style.css hay app.js.
//
// Cấu trúc mỗi quán:
// {
//   name: "Tên quán",
//   categories: ["Loại quán 1", "Loại quán 2", ...]  (1 quán có thể thuộc nhiều loại)
//   branches: [
//     { label: "Tên chi nhánh (có thể để trống \"\")",
//       address: "Địa chỉ",
//       hours: "Giờ mở cửa",
//       phone: "Số điện thoại (có thể để trống \"\")" }
//   ],
//   note: "Ghi chú về quán, món ăn nổi bật, giá cả, không gian..."
// }
//
// Màu badge cho từng "Loại quán" được khai báo trong app.js (BADGE_MAP).
// Category mới -> nhớ thêm 1 dòng vào BADGE_MAP (app.js) + 1 class
// .badge-xxx tương ứng trong style.css.
// ============================================================

const DATA = [
  {
    name: "Buffet 79k Hương Việt",
    categories: ["Buffet"],
    branches: [
      { label: "CN1", address: "22 Tân Quý, Quận Tân Phú", hours: "15:00–22:00", phone: "" },
      { label: "CN2", address: "644 Nguyễn Văn Quá, Quận 12", hours: "15:00–21:00", phone: "" }
    ],
    note: "Buffet 79k, ăn thoải mái bún đậu, nem nướng, bánh tráng thịt luộc."
  },
  {
    name: "Kim Cherry",
    categories: ["Ăn vặt", "Bánh tráng"],
    branches: [
      { label: "", address: "53 Nguyễn Trãi, P. Chợ Quán, Q.5 (đối diện ĐH Sài Gòn)", hours: "08:00–22:00", phone: "" }
    ],
    note: "Xe bánh tráng nhỏ, có chỗ ngồi. Nổi bật bánh tráng mỡ hành (15–20k), bánh tráng trứng gà vữa (20k), sate tuổi thơ, trà sữa/trà trái cây tự pha."
  },
  {
    name: "Kokoria – Chicken & Cheese",
    categories: ["Gà Hàn"],
    branches: [
      { label: "Sư Vạn Hạnh", address: "573/2 Sư Vạn Hạnh, P.12, Quận 10", hours: "10:30–22:00", phone: "" },
      { label: "Lê Văn Duyệt", address: "106 Lê Văn Duyệt, P.1, Quận Bình Thạnh", hours: "10:30–22:00", phone: "0909 407 981" },
      { label: "Tân Bình", address: "28 Trương Công Định, P.14, Quận Tân Bình", hours: "10:30–22:00", phone: "" },
      { label: "Gò Vấp", address: "699 Phan Văn Trị, P.1, Quận Gò Vấp", hours: "10:30–22:00", phone: "0938 115 428" }
    ],
    note: "Chuỗi quán gà rán/gà phô mai kiểu Hàn Quốc, nổi bật với món gà phô mai \"signature\", ngoài ra có mì lạnh, mì tương đen, gà sốt cay, khoai tây lắc phô mai. Giá trung bình khoảng 120k – 150k/người."
  },
  {
    name: "Cơm gà xối mỡ Thanh",
    categories: ["Cơm gà"],
    branches: [
      { label: "", address: "Hẻm 214 Nguyễn Trãi, P.2, Quận 5", hours: "15:00–23:00", phone: "" }
    ],
    note: "Gà xối mỡ giòn rụm, mềm bên trong. Cơm thấm mỡ gà, tơi xốp. Có thêm cơm chiên thịt heo xù, mực sốt chua ngọt."
  },
  {
    name: "Bún Thang Cậu Ba",
    categories: ["Bún"],
    branches: [
      { label: "", address: "829 Trần Hưng Đạo, P.1, Quận 5", hours: "06:00–15:00", phone: "" }
    ],
    note: "Bún thang chuẩn vị miền Bắc, nước dùng trong ngọt từ xương gà và tôm khô, ăn kèm gà xé, giò lụa, trứng thái sợi, nấm hương, mắm tôm. Có thêm bún mọc, phở gà, miến gà."
  },
  {
    name: "Cá Viên Chiên Anh Mỹ",
    categories: ["Ăn vặt"],
    branches: [
      { label: "", address: "81 Nguyễn Thái Học, P. Cầu Ông Lãnh, Quận 1", hours: "15:30–00:00", phone: "" }
    ],
    note: "Cá viên chiên nước mắm tỏi phi, ăn kèm bắp xào. Không gian rộng rãi, thoáng mát, phù hợp nhóm đông."
  },
  {
    name: "Geylang By 9",
    categories: ["Cháo"],
    branches: [
      { label: "", address: "25 Cô Bắc, P. Cầu Ông Lãnh, Quận 1", hours: "16:00–03:00", phone: "0906 776 194" }
    ],
    note: "Cháo ếch kiểu Singapore, không gian giản dị mang phong cách Singapore. Có chỗ để xe miễn phí."
  },
  {
    name: "Cacao Dừa 136",
    categories: ["Ăn vặt"],
    branches: [
      { label: "", address: "136/1 Nguyễn Tri Phương, P.9, Quận 5 (hẻm đối diện trường Trần Khai Nguyên)", hours: "08:00–22:00", phone: "0938 845 359" }
    ],
    note: "Cacao dừa béo mịn, ngọt vừa, dừa tắc cũng ngon. Quán trong hẻm, có phòng máy lạnh trên lầu."
  },
  {
    name: "Chè Cô Giang",
    categories: ["Chè"],
    branches: [
      { label: "", address: "85 Cô Giang, P. Cầu Ông Lãnh, Quận 1", hours: "15:00–22:00", phone: "" }
    ],
    note: "Quán chè về đêm luôn đông khách, đa dạng loại chè: chè ba màu, sâm bổ lượng, chè đậu đen nước cốt dừa, chè đậu xanh, chè mè đen. Giá rẻ, khoảng 18k/ly. Không gian ngồi hơi chật, chủ yếu khách quen ghé ăn."
  },
  {
    name: "Bingsu Cafe (BingBing)",
    categories: ["Bingsu"],
    branches: [
      { label: "", address: "283/72 Cách Mạng Tháng Tám, Quận 10", hours: "10:30–23:30", phone: "0704 412 082" }
    ],
    note: "Bingsu có 3 size, size nhỏ vẫn đủ cho 1 người ăn. Không gian nhỏ nhưng décor dễ thương, nhân viên thân thiện, có hỏi trước độ cay khi order món khác kèm."
  },
  {
    name: "Bún Bò Huế Cô Ân",
    categories: ["Bún"],
    branches: [
      { label: "", address: "331/10 Đ. Nguyễn Thiện Thuật, P. Bàn Cờ", hours: "24/24", phone: "028 3833 2806" }
    ],
    note: "Bún bò Huế đúng vị, chủ quán gốc Huế, nước dùng đậm đà thơm mắm ruốc. Quán mở 24/24, nhiều thịt, giá hợp lý. Có chú chó nhỏ dễ thương chạy quanh quán."
  },
  {
    name: "Bún Thịt Nướng Chả Giò - Nguyễn Trung Trực",
    categories: ["Bún"],
    branches: [
      { label: "", address: "1 Nguyễn Trung Trực, P. Bến Thành", hours: "06:00–20:30", phone: "0909 139 017" }
    ],
    note: "Bún thịt nướng lâu năm nổi tiếng, chả giò giòn. Ngồi ghế nhựa bên lề đường đối diện quán. Giá khoảng 190k/2 phần, gần trung tâm."
  },
  {
    name: "Coconino Phan Văn Trị",
    categories: ["Bingsu"],
    branches: [
      { label: "", address: "127 Phan Văn Trị, P. Chợ Quán", hours: "13:00–22:00", phone: "0899 505 565" }
    ],
    note: "Bingsu kiểu Hàn, có phô mai sốt và bánh flan ăn kèm. Quán khá nóng vì không có máy lạnh, tầng 2 hơi cũ. Trà sữa nhài kem cheese được khen ngon."
  },
  {
    name: "Chè Tang Chao 華人甜品店",
    categories: ["Chè"],
    branches: [
      { label: "", address: "249a Lê Hồng Phong, P. Chợ Quán", hours: "12:30–22:30", phone: "0838 312 168" }
    ],
    note: "Chè kiểu Hoa, món nổi bật là chè mè đen & đậu phộng bày hình âm dương, vị béo thơm không quá ngọt. Quán 2 tầng, có máy lạnh, hợp nhóm đông. Một số món dễ hết sớm, nên hỏi trước khi order."
  },
  {
    name: "Quán cơm Bento Dino - Bùi Thị Xuân",
    categories: ["Cơm gà"],
    branches: [
      { label: "", address: "134/3/1 Bùi Thị Xuân, P. Bến Thành, Quận 1", hours: "09:00–14:00", phone: "0903 384 231" }
    ],
    note: "Quán cơm phần được sinh viên/dân văn phòng khu Quận 1 ưa chuộng, thực đơn đa dạng món, giá phải chăng. Chỉ bán buổi sáng-trưa, đóng cửa lúc 14:00."
  },
  {
    name: "Hủ Tíu Xá Xíu Hoành Thánh",
    categories: ["Hủ tiếu"],
    branches: [
      { label: "", address: "55 Phong Phú, P. Phú Định, Quận 8", hours: "15:30–23:30", phone: "" }
    ],
    note: "Xá xíu ngon xuất sắc, ăn khô cũng rất đã. Giá khoảng 42k–55k/tô. Quán lâu năm quen thuộc với người dân khu vực, không gian nhỏ hơi ngột ngạt."
  },
  {
    name: "Hủ Tiếu Da Gà",
    categories: ["Hủ tiếu"],
    branches: [
      { label: "", address: "43 Vĩnh Nam, P. Phú Định, Quận 8", hours: "06:30–21:00", phone: "0919 357 904" }
    ],
    note: "Hủ tiếu da gà giá bình dân, nước sốt được khen ngon. Quán khá đông khách, nên ghé trước 8 giờ sáng kẻo hết."
  },
  {
    name: "Xíu Mại Chén Chú IT",
    categories: ["Xíu mại"],
    branches: [
      { label: "", address: "47 Đ. số 9A, KDC Trung Sơn, Bình Hưng", hours: "16:00–04:00", phone: "0939 100 789" }
    ],
    note: "Không gian trẻ trung, sạch sẽ, rộng rãi, hợp cả ăn một mình lẫn nhóm nhỏ. Xíu mại nóng hổi, nước lèo thanh nhẹ. Giá khoảng 30k/người (kèm bánh mì)."
  },
  {
    name: "Hủ Tiếu Mì Gia - A Hòa",
    categories: ["Hủ tiếu", "Mì"],
    branches: [
      { label: "", address: "95 Phan Văn Trị, P. Chợ Quán", hours: "06:00–21:30", phone: "0908 274 112" }
    ],
    note: "Bán cả nước lẫn khô, đa dạng combo với sườn/hoành thánh. Nước lèo thanh nhẹ, được lòng khách quen ăn nhiều lần. Giá dao động 45k–85k tùy món."
  },
  {
    name: "Bin Bin - Milktea Tea",
    categories: ["Trà sữa", "Trà trái cây"],
    branches: [
      { label: "", address: "1 Nguyễn Thị Thập, P. Tân Hưng, Quận 7 (xe đẩy, ngay cạnh quán dê nướng)", hours: "Buổi tối", phone: "0908 557 762" }
    ],
    note: "Xe trà sữa/trà trái cây lưu động, menu đa dạng. Giá dao động từ 25-32k. Vị trí bán cố định ngay cạnh quán dê nướng."
  },
  {
    name: "Quán chay Sala",
    categories: ["Chay", "Bánh mì"],
    branches: [
      { label: "", address: "71c Nguyễn Thị Minh Khai, P. Bến Thành, Quận 1", hours: "06:00–21:00", phone: "0919 777 703" }
    ],
    note: "Quán chay rộng rãi, có máy lạnh, thực đơn đa dạng. Đặc biệt có bánh mì chay. Có bán mang về. Giá trung bình khoảng 100k/người."
  },
  {
    name: "Quán chay Thôi Kệ",
    categories: ["Chay"],
    branches: [
      { label: "", address: "727 Lê Hồng Phong, P. Hòa Hưng, Quận 10", hours: "07:00–20:00", phone: "0946 595 573" }
    ],
    note: "Quán chay lâu năm, không gian rộng rãi thoáng mát, thực đơn đa dạng lên đến 70 món. Nổi bật hủ tiếu bò kho chay (35–42k), bún Thái, bánh xèo, bánh mì. Có bán mang về."
  },
  {
    name: "Hủ Tiếu Ngọc Ánh",
    categories: ["Hủ tiếu"],
    branches: [
      { label: "", address: "25/24 Tôn Thất Tùng, P. Bến Thành, Quận 1", hours: "10:00–15:00 (T2–T6, nghỉ T7-CN)", phone: "" }
    ],
    note: "Quán bình dân trong hẻm nhỏ, ngồi lề đường, thanh bình sạch sẽ. Giá phải chăng."
  },
  {
    name: "Lucky Mì Gà Da Giòn",
    categories: ["Mì"],
    branches: [
      { label: "", address: "153/11b Nguyễn Thị Minh Khai, P. Bến Thành, Quận 1", hours: "06:00–21:00 (CN: 07:00–17:00)", phone: "" }
    ],
    note: "Quán trong hẻm nhỏ, gửi xe gần đó (~5k). Da gà chiên giòn, nước lèo nóng. Đông dân văn phòng và học sinh vào giờ trưa."
  },
  {
    name: "Cháo Lòng hẻm 153",
    categories: ["Cháo"],
    branches: [
      { label: "", address: "153/6 Nguyễn Thị Minh Khai, P. Bến Thành, Quận 1", hours: "15:30–20:30", phone: "0908 907 609" }
    ],
    note: "Quán cháo lòng lâu năm tại trung tâm Quận 1 cũ, chỉ mở buổi chiều-tối. Cháo đậm đà, huyết, dồi, quẩy đều làm ngon; giá 40-50k/tô. Chỗ ngồi trong nhà, thường hay đông khách vào buổi tối."
  },
  {
    name: "Bánh Mì 89",
    categories: ["Bánh mì", "Bột chiên"],
    branches: [
      { label: "", address: "126 Bùi Thị Xuân, P. Bến Thành, Quận 1", hours: "", phone: "" }
    ],
    note: "Điểm hẹn quen thuộc của học sinh giờ tan trưa. Bánh mì bò nướng, xíu mại, trứng chiên đầy đặn; còn có bột chiên nóng giòn. Giá mềm, chỉ khoảng 20-25k."
  },
  {
    name: "Trà Sữa Chị Chi",
    categories: ["Trà sữa", "Trà trái cây"],
    branches: [
      { label: "", address: "134/1/2 Bùi Thị Xuân", hours: "Buổi sáng", phone: "" }
    ],
    note: "Xe trà sữa bán các loại nước quen thuộc, từ trà sữa đến trà trái cây. Khách chủ yếu là học sinh trường Bùi Thị Xuân ghé thường xuyên."
  },
  {
    name: "Bánh Tráng Các Loại Quận 7",
    categories: ["Ăn vặt", "Bánh tráng"],
    branches: [
      { label: "", address: "5A Số 17, P. Tân Hưng, Quận 7", hours: "", phone: "" }
    ],
    note: "Sạp bánh tráng các loại. Nổi tiếng vì những loại bánh tráng thơm ngon. Nằm ngay dưới quán mì cay Kochu."
  },
  {
    name: "Tiệm Trà Na Ơii",
    categories: ["Trà sữa"],
    branches: [
      { label: "CN1", address: "305A Tân Hương, P. Phú Thọ Hòa, Quận Tân Phú", hours: "", phone: "0927 173 656" },
      { label: "CN2", address: "461 Lê Văn Quới, P. Bình Trị Đông, Quận Bình Tân", hours: "", phone: "0975 825 147" }
    ],
    note: "Trân châu tươi jumbo, được quảng cáo là bự nhất Tân Phú. Khách khen nước ngon, nhân viên nhiệt tình, có tặng kèm kẹo dẻo."
  },
  {
    name: "Cha&Co Matcha Latte",
    categories: ["Cafe", "Matcha"],
    branches: [
      { label: "", address: "215C Nguyễn Trãi, P. Cầu Ông Lãnh, Quận 1", hours: "", phone: "" }
    ],
    note: "Quán chuyên các món matcha latte."
  },
  {
    name: "Kem dừa - Ăn vặt Sawadee",
    categories: ["Kem", "Ăn vặt"],
    branches: [
      { label: "", address: "Số 3 Đường 63, P. Tân Hưng, Quận 7", hours: "16:00–22:30", phone: "" }
    ],
    note: "Kem dừa tự làm, tan nhanh, ngọt vừa phải, nhiều topping. Giá bình dân (~15-35k), quán đông khách, có chỗ ngồi vỉa hè rộng rãi."
  },
  {
    name: "Khổ Qua Cà Ớt Nhà Sam",
    categories: ["Ăn vặt"],
    branches: [
      { label: "", address: "1942/118/39 Huỳnh Tấn Phát, Nhà Bè", hours: "17:00–22:00", phone: "0797 628 003 (Zalo)" }
    ],
    note: "Cá viên chiên, khổ qua/cà/ớt nhồi chả cá tự làm, hơn 10 loại tự chọn, giá từ 1k/món. Hợp ăn vặt nhóm bạn."
  },
];