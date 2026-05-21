import { useState } from 'react'

function normalizeAnswer(answer) {
  return answer
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]/g, '')
}

function getAnswerPattern(answer) {
  return answer
    .split('')
    .map((character) => (character === ' ' ? ' / ' : '_'))
    .join(' ')
}

function PuzzleModal({ value, onSolved, onClose }) {
  const [decodedAnswer, setDecodedAnswer] = useState('')
  const [message, setMessage] = useState('')
  const expectedAnswer = value.decodeAnswer ?? value.valueName

  function handleSubmit(event) {
    event.preventDefault()

    if (!decodedAnswer.trim()) {
      setMessage('Hãy điền từ khóa còn thiếu để giải mã tình huống.')
      return
    }

    if (normalizeAnswer(decodedAnswer) === normalizeAnswer(expectedAnswer)) {
      onSolved(value)
      return
    }

    setMessage('Chưa chính xác. Hãy đọc lại manh mối và thử đoán từ khóa khác.')
  }

  return (
    <div className="puzzle-modal-backdrop">
      <section className="puzzle-modal" aria-label="Cuộc trò chuyện với NPC">
        <header className="puzzle-header">
          <img src={value.npcImage} alt={value.npcName} className="puzzle-npc-image" />
          <div>
            <p className="puzzle-kicker">Tình huống xã hội</p>
            <h2>{value.npcName}</h2>
            <p className="puzzle-value">Giải mã từ khóa</p>
          </div>
        </header>

        <p className="puzzle-story">{value.story}</p>

        <form className="puzzle-form" onSubmit={handleSubmit}>
          <div className="puzzle-decode-panel">
            <p className="puzzle-question">{value.decodePrompt ?? value.question}</p>
            {value.decodeHint && <p className="puzzle-hint">{value.decodeHint}</p>}
            <p className="puzzle-blank-line" aria-label="Số ký tự của từ khóa">
              {getAnswerPattern(expectedAnswer)}
            </p>
            <label className="puzzle-input-label" htmlFor={`decode-${value.id}`}>
              Điền từ khóa
            </label>
            <input
              id={`decode-${value.id}`}
              className="puzzle-decode-input"
              type="text"
              value={decodedAnswer}
              autoFocus
              autoComplete="off"
              placeholder="Nhập từ bạn giải mã được..."
              onChange={(event) => {
                setDecodedAnswer(event.target.value)
                setMessage('')
              }}
            />
          </div>

          {message && <p className="puzzle-message">{message}</p>}

          <div className="puzzle-actions">
            <button type="submit">Giải mã</button>
            <button className="puzzle-leave-button" type="button" onClick={onClose}>
              Rời đi
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default PuzzleModal
