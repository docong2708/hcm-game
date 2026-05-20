import { useMemo, useState } from 'react'

function normalizeAnswer(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, ' ')
}

function PuzzleModal({ value, onSolved, onFail, onClose }) {
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [hintIndex, setHintIndex] = useState(-1)

  const normalizedCorrectAnswer = useMemo(
    () => normalizeAnswer(value.puzzle.answer),
    [value.puzzle.answer],
  )

  function handleSubmit(event) {
    event.preventDefault()

    if (value.type === 'wrong') {
      onFail()
      return
    }

    if (normalizeAnswer(answer) === normalizedCorrectAnswer) {
      onSolved(value)
      return
    }

    setMessage('Câu trả lời chưa đúng. Hãy quan sát thêm.')
  }

  function showHint() {
    setHintIndex((currentIndex) => {
      const nextIndex = currentIndex + 1
      if (nextIndex >= value.puzzle.hints.length) {
        return 0
      }

      return nextIndex
    })
    setMessage('')
  }

  const activeHint = hintIndex >= 0 ? value.puzzle.hints[hintIndex] : ''

  return (
    <div className="puzzle-modal-backdrop">
      <section className="puzzle-modal" aria-label="Sổ tay điều tra">
        <p className="puzzle-kicker">Sổ tay điều tra</p>
        <p className="puzzle-story">{value.puzzle.story}</p>

        <form className="puzzle-form" onSubmit={handleSubmit}>
          <label className="puzzle-question" htmlFor="puzzle-answer">
            {value.puzzle.question}
          </label>
          <input
            id="puzzle-answer"
            className="puzzle-answer-input"
            type="text"
            value={answer}
            autoFocus
            autoComplete="off"
            onChange={(event) => setAnswer(event.target.value)}
          />

          {activeHint && <p className="puzzle-hint">{activeHint}</p>}
          {message && <p className="puzzle-message">{message}</p>}

          <div className="puzzle-actions">
            <button type="submit">Giải mã</button>
            <button type="button" onClick={showHint}>
              Gợi ý
            </button>
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
