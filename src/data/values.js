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
    decodePrompt:
      'Điền giá trị còn thiếu: Em nhặt được bài kiểm tra có đáp án. Thay vì giấu đi để có lợi cho mình, em chọn sống ..........',
    decodeHint:
      'Gợi ý: 2 từ, bắt đầu bằng T. Nghĩa là nói đúng sự thật và không gian dối.',
    decodeAnswer: 'Trung thực',
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
    decodePrompt:
      'Điền giá trị còn thiếu: Một người không thể sửa con đường sau mưa, nhưng cả khu phố cùng chung sức thì tạo nên ..........',
    decodeHint:
      'Gợi ý: 3 từ, bắt đầu bằng Đ. Nghĩa là mọi người gắn bó và giúp nhau.',
    decodeAnswer: 'Đại đoàn kết',
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
    decodePrompt:
      'Điền giá trị còn thiếu: Thấy người mua quên ví và có trẻ nhỏ đang sốt, bà Tư giúp họ vì lòng ..........',
    decodeHint:
      'Gợi ý: 2 từ, bắt đầu bằng N. Nghĩa là biết thương người và sẵn sàng giúp khi họ khó khăn.',
    decodeAnswer: 'Nhân ái',
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
    decodePrompt:
      'Điền giá trị còn thiếu: Trước khi chia sẻ một tin chưa kiểm chứng, Nam dừng lại vì cậu có ..........',
    decodeHint:
      'Gợi ý: 2 từ, bắt đầu bằng T. Nghĩa là hiểu việc mình làm có ảnh hưởng đến người khác.',
    decodeAnswer: 'Trách nhiệm',
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
    decodePrompt:
      'Điền giá trị còn thiếu: Một dân tộc được tự quyết định con đường của mình là dân tộc có ..........',
    decodeHint:
      'Gợi ý: 4 từ, bắt đầu bằng Đ. Nghĩa là không lệ thuộc và tự làm chủ lựa chọn của mình.',
    decodeAnswer: 'Độc lập tự chủ',
    consequence:
      'Lá cờ cũ không còn phải nằm trong bóng tối. Bác An đứng thẳng hơn, như vừa nghe lại tiếng bước chân của những ngày không khuất phục.',
  },
]
