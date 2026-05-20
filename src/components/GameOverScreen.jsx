function GameOverScreen({ onRestart }) {
  return (
    <main className="game-over-screen">
      <section className="game-over-panel">
        <p className="ending-kicker">Niềm tin sụp đổ</p>
        <h1>Bạn đã chọn một tư tưởng sai lệch</h1>
        <p>
          Đường phố tối hơn, người dân tuyệt vọng hơn. Hãy quay lại, lắng nghe
          những lời nhắc từ cộng đồng và chọn đúng giá trị cần khôi phục.
        </p>
        <button type="button" onClick={onRestart}>
          Chơi lại
        </button>
      </section>
    </main>
  )
}

export default GameOverScreen
