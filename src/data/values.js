import coGiaoLanImg from '../assets/cogiaolan_transparent.png'
import congNhanMinhImg from '../assets/congnhanminh_transparent.png'
import cuuChienBinhAnImg from '../assets/cuuchienbinhan_transparent.png'
import nguoiBanHangImg from '../assets/nguoibanhang_transparent.png'
import sinhVienNamImg from '../assets/sinhviennam_transparent.png'

export const correctValues = [
  {
    id: 'trung-thuc',
    npcName: 'Cô giáo Lan',
    npcImage: coGiaoLanImg,
    valueName: 'Trung thực',
    title: 'Trung thực',
    story:
      'Một học sinh đánh rơi bài kiểm tra đã được chấm điểm. Nếu giữ im lặng, em có thể dùng đáp án đó để đạt điểm cao hơn trong lần sửa bài.',
    question: 'Điều gì nên được đặt lên hàng đầu trong tình huống này?',
    choices: ['Lợi ích cá nhân', 'Trung thực', 'Im lặng để an toàn'],
    correctAnswer: 'Trung thực',
    consequence:
      'Lớp học bớt nặng nề. Cô giáo Lan mỉm cười, và những tấm giấy cũ trên bảng tin không còn rung lên vì sợ hãi.',
  },
  {
    id: 'dai-doan-ket',
    npcName: 'Công nhân Minh',
    npcImage: congNhanMinhImg,
    valueName: 'Đại đoàn kết',
    title: 'Đại đoàn kết',
    story:
      'Một đoạn đường vào khu dân cư bị sạt lở sau mưa. Minh cố gắng làm một mình, nhưng mỗi tấm ván nặng hơn sức của một người.',
    question: 'Điều gì tạo nên sức mạnh để cả khu phố cùng vượt qua việc này?',
    choices: ['Ai mạnh người ấy làm', 'Đại đoàn kết', 'Chờ một người giỏi nhất'],
    correctAnswer: 'Đại đoàn kết',
    consequence:
      'Những cánh cửa mở ra. Người trong khu phố cùng bước ra, và con đường được nối lại bằng sức của nhiều bàn tay.',
  },
  {
    id: 'nhan-ai',
    npcName: 'Người bán hàng Tư',
    npcImage: nguoiBanHangImg,
    valueName: 'Nhân ái',
    title: 'Nhân ái',
    story:
      'Một người lao động quên ví tiền ở nhà, trong khi đứa trẻ đi cùng đang sốt. Nếu bán hàng đúng giá như cũ, bà Tư sẽ lãi hơn trong ngày vắng khách.',
    question: 'Lựa chọn nào giữ lại tình người trong phiên chợ khó khăn?',
    choices: ['Tăng giá vì có cơ hội', 'Nhân ái', 'Từ chối vì sợ thiệt'],
    correctAnswer: 'Nhân ái',
    consequence:
      'Sạp hàng nhỏ ấm lên. Một người được giúp đúng lúc, và chợ vắng có lại tiếng người hỏi han nhau.',
  },
  {
    id: 'trach-nhiem',
    npcName: 'Sinh viên Nam',
    npcImage: sinhVienNamImg,
    valueName: 'Trách nhiệm',
    title: 'Trách nhiệm',
    story:
      'Nam thấy một thông tin sai về khu phố lan truyền rất nhanh. Nếu chia sẻ tiếp, cậu sẽ được chú ý; nếu dừng lại kiểm chứng, cậu có thể bị bỏ qua.',
    question: 'Người trẻ nên chọn điều gì trước khi làm một lời nói lan xa?',
    choices: ['Trách nhiệm', 'Nói theo đám đông', 'Được chú ý bằng mọi giá'],
    correctAnswer: 'Trách nhiệm',
    consequence:
      'Dòng tin đồn chậm lại. Nam hạ điện thoại xuống, và những cuộc nói chuyện bắt đầu có thêm sự cẩn trọng.',
  },
  {
    id: 'doc-lap-tu-chu',
    npcName: 'Cựu chiến binh An',
    npcImage: cuuChienBinhAnImg,
    valueName: 'Độc lập tự chủ',
    title: 'Độc lập tự chủ',
    story:
      'Ở quảng trường cũ, bác An kể về một thời người dân phải nghe mệnh lệnh từ nơi khác. Sự yên ổn giả tạo đổi lấy quyền tự quyết của cả cộng đồng.',
    question: 'Giá trị nào giúp một dân tộc tự quyết định con đường của mình?',
    choices: ['Sống lệ thuộc', 'Độc lập tự chủ', 'Chấp nhận im lặng'],
    correctAnswer: 'Độc lập tự chủ',
    consequence:
      'Lá cờ cũ không còn phải nằm trong bóng tối. Bác An đứng thẳng hơn, như vừa nghe lại tiếng bước chân của những ngày không khuất phục.',
  },
]
