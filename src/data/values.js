export const correctValues = [
  {
    id: 'doc-lap-dan-toc',
    type: 'correct',
    title: 'Độc lập dân tộc',
    hint: 'Một dân tộc phải có quyền tự quyết, tự do và không bị lệ thuộc.',
    description:
      'Độc lập dân tộc là quyền thiêng liêng, bất khả xâm phạm của các dân tộc.',
    puzzle: {
      story:
        'Một cổng làng bị khóa bằng sợi xích cũ. Bên kia cổng, tiếng loa xa lạ đọc tên từng người như thể họ không còn được tự gọi tên mình.',
      question: 'Giá trị nào giúp một dân tộc tự quyết định con đường của mình?',
      answer: 'độc lập',
      hints: [
        'NPC nói về quyền tự quyết và không bị lệ thuộc.',
        'Hãy nghĩ tới điều một dân tộc cần trước khi có thể tự xây dựng tương lai.',
      ],
    },
  },
  {
    id: 'chu-nghia-xa-hoi',
    type: 'correct',
    title: 'Chủ nghĩa xã hội',
    hint: 'Xã hội tốt đẹp phải hướng tới ấm no, tự do, hạnh phúc cho nhân dân.',
    description: 'Độc lập dân tộc gắn liền với chủ nghĩa xã hội.',
    puzzle: {
      story:
        'Trong sân khu tập thể, một bảng phân phối cũ còn ghi những phần thiếu. Người già, trẻ nhỏ và người lao động đều nhìn về cùng một nồi cơm nguội.',
      question: 'Giá trị nào hướng xã hội tới ấm no, tự do, hạnh phúc cho nhân dân?',
      answer: 'chủ nghĩa xã hội',
      hints: [
        'Không chỉ là độc lập, mà là đời sống tốt đẹp cho số đông.',
        'NPC nhắc tới ấm no, tự do và hạnh phúc.',
      ],
    },
  },
  {
    id: 'dai-doan-ket',
    type: 'correct',
    title: 'Đại đoàn kết toàn dân',
    hint: 'Một người không thể tạo nên sức mạnh bằng cả cộng đồng.',
    description:
      'Đại đoàn kết toàn dân là sức mạnh to lớn của cách mạng Việt Nam.',
    puzzle: {
      story:
        'Một cây cầu bị hỏng sau mưa. Một người có thể nâng một tấm ván, nhưng không thể giữ cả nhịp cầu cho khu phố đi qua.',
      question: 'Giá trị nào giúp con người tạo nên sức mạnh chung?',
      answer: 'đoàn kết',
      hints: [
        'Hãy nhớ lời NPC nói về sức mạnh cộng đồng.',
        'Một cá nhân không thể thay thế cả tập thể.',
      ],
    },
  },
  {
    id: 'dao-duc-cach-mang',
    type: 'correct',
    title: 'Đạo đức cách mạng',
    hint: 'Người có lý tưởng phải biết sống cần, kiệm, liêm, chính, chí công vô tư.',
    description: 'Đạo đức là gốc của người cách mạng.',
    puzzle: {
      story:
        'Một chiếc ví rơi dưới chân sạp hàng. Bên trong có tiền thuốc, ảnh gia đình và một mảnh giấy ghi: "mai trả". Không ai đang nhìn bạn.',
      question: 'Giá trị nào khiến con người làm điều đúng ngay cả khi im lặng bao quanh?',
      answer: 'đạo đức',
      hints: [
        'NPC nhắc tới cần, kiệm, liêm, chính.',
        'Điều đúng không cần khán giả mới trở thành điều đúng.',
      ],
    },
  },
  {
    id: 'con-nguoi',
    type: 'correct',
    title: 'Con người',
    hint: 'Mục tiêu cuối cùng của xã hội là vì con người, do con người.',
    description:
      'Tư tưởng Hồ Chí Minh luôn đề cao vai trò, phẩm chất và sự phát triển của con người.',
    puzzle: {
      story:
        'Đèn trạm xá tắt. Một người bị thương ngồi bên thềm, cố giấu tiếng thở đau sau tay áo. Con đường an toàn hơn nằm ở hướng ngược lại.',
      question: 'Giá trị nào phải được đặt ở trung tâm của mọi lựa chọn?',
      answer: 'con người',
      hints: [
        'NPC nói mục tiêu cuối cùng là vì ai.',
        'Mọi lý tưởng trở nên rỗng nếu bỏ lại người đang đau.',
      ],
    },
  },
]

export const wrongValues = [
  {
    id: 'song-le-thuoc',
    type: 'wrong',
    title: 'Sống lệ thuộc',
    description: 'Chấp nhận mất quyền tự chủ, không cần độc lập.',
    puzzle: {
      story:
        'Một tờ cam kết hứa hẹn sự yên ổn nếu cả khu phố thôi tự quyết. Dòng chữ cuối cùng để trống chỗ ký tên.',
      question: 'Lối sống nào đánh đổi quyền tự chủ để lấy sự yên ổn giả tạo?',
      answer: 'lệ thuộc',
      hints: [
        'Có những lời hứa làm con người nhỏ lại.',
        'Từ khóa nằm trong nỗi sợ phải tự quyết.',
      ],
    },
  },
  {
    id: 'ca-nhan-ich-ky',
    type: 'wrong',
    title: 'Mạnh ai nấy sống',
    description: 'Đặt lợi ích cá nhân lên trên cộng đồng.',
    puzzle: {
      story:
        'Một lối tắt chỉ đủ cho một người. Nếu bạn kéo cánh cổng lại sau lưng, những người còn lại sẽ mắc kẹt trong mưa.',
      question: 'Lối nghĩ nào đặt phần mình lên trên tất cả?',
      answer: 'ích kỷ',
      hints: [
        'Nó trái ngược với tinh thần cộng đồng.',
        'Khi chỉ còn chữ tôi, khu phố mất tiếng chúng ta.',
      ],
    },
  },
  {
    id: 'vo-cam',
    type: 'wrong',
    title: 'Vô cảm',
    description: 'Không quan tâm đến nỗi đau và khó khăn của người khác.',
    puzzle: {
      story:
        'Một tiếng gọi yếu ớt vang lên sau bức tường. Những người đi qua đều bước chậm lại, rồi giả vờ không nghe thấy.',
      question: 'Thái độ nào khiến con người quay lưng trước nỗi đau của người khác?',
      answer: 'vô cảm',
      hints: [
        'Nó bắt đầu khi ta thôi thấy người khác là người.',
        'Sự im lặng đôi khi cũng là một lựa chọn.',
      ],
    },
  },
  {
    id: 'thanh-cong-bang-moi-gia',
    type: 'wrong',
    title: 'Thành công bằng mọi giá',
    description: 'Bất chấp đạo đức để đạt lợi ích cá nhân.',
    puzzle: {
      story:
        'Một bản thành tích sáng bóng nằm trên chiếc bàn mục. Góc giấy che đi tên của những người bị gạt khỏi hàng.',
      question: 'Lối nghĩ nào bất chấp đạo đức để đạt mục tiêu cá nhân?',
      answer: 'thành công bằng mọi giá',
      hints: [
        'Nó dùng kết quả để che khuất cách đạt được kết quả.',
        'Khi đạo đức bị bỏ lại, chiến thắng chỉ còn là vỏ rỗng.',
      ],
    },
  },
  {
    id: 'lang-phi',
    type: 'wrong',
    title: 'Lãng phí',
    description:
      'Tiêu xài, sử dụng tài nguyên và công sức một cách vô trách nhiệm.',
    puzzle: {
      story:
        'Kho nước chỉ còn vài can. Một vòi rỉ chảy suốt đêm dưới ánh đèn vẫn bật trong căn phòng không người.',
      question: 'Thói quen nào làm hao mòn tài nguyên và công sức chung?',
      answer: 'lãng phí',
      hints: [
        'Nó trái với cần kiệm.',
        'Không phải mất đi trong một lần, mà rơi rụng từng chút không ai để ý.',
      ],
    },
  },
]
