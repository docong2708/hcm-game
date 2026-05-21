import { useState } from 'react'

function PuzzleModal({ value, onSolved, onClose }) {
  const [selectedChoice, setSelectedChoice] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!selectedChoice) {
      setMessage('Hãy chọn điều bạn tin là đúng.')
      return
    }

    if (selectedChoice === value.correctAnswer) {
      onSolved(value)
      return
    }

    setMessage('Chưa chính xác. Hãy lắng nghe lại tình huống và thử chọn một cách hiểu khác.')
  }

  return (
    <div className="puzzle-modal-backdrop">
      <section className="puzzle-modal" aria-label="Cuộc trò chuyện với NPC">
        <header className="puzzle-header">
          <img src={value.npcImage} alt={value.npcName} className="puzzle-npc-image" />
          <div>
            <p className="puzzle-kicker">Tình huống xã hội</p>
            <h2>{value.npcName}</h2>
            <p className="puzzle-value">{value.valueName}</p>
          </div>
        </header>

        <p className="puzzle-story">{value.story}</p>

        <form className="puzzle-form" onSubmit={handleSubmit}>
          <fieldset className="puzzle-choice-group">
            <legend className="puzzle-question">{value.question}</legend>
            {value.choices.map((choice) => (
              <label
                className={`puzzle-choice ${
                  selectedChoice === choice ? 'puzzle-choice-selected' : ''
                }`}
                key={choice}
              >
                <input
                  type="radio"
                  name="npc-choice"
                  value={choice}
                  checked={selectedChoice === choice}
                  onChange={() => {
                    setSelectedChoice(choice)
                    setMessage('')
                  }}
                />
                <span>{choice}</span>
              </label>
            ))}
          </fieldset>

          {message && <p className="puzzle-message">{message}</p>}

          <div className="puzzle-actions">
            <button type="submit">Trả lời</button>
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
