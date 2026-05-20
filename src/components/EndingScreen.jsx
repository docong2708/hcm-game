import { useEffect, useState } from 'react'

const ENDING_LINES = [
  'Tư tưởng Hồ Chí Minh không thuộc về quá khứ.',
  'Nó quyết định tương lai.',
  'Một xã hội có giá trị là một xã hội có tương lai.',
]

function EndingScreen({ onRestart }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [completedLines, setCompletedLines] = useState([])

  useEffect(() => {
    if (lineIndex >= ENDING_LINES.length) {
      return undefined
    }

    const currentLine = ENDING_LINES[lineIndex]

    if (typedText.length < currentLine.length) {
      const typingTimer = setTimeout(() => {
        setTypedText(currentLine.slice(0, typedText.length + 1))
      }, 46)

      return () => clearTimeout(typingTimer)
    }

    const nextLineTimer = setTimeout(() => {
      setCompletedLines((lines) => [...lines, currentLine])
      setTypedText('')
      setLineIndex((index) => index + 1)
    }, 700)

    return () => clearTimeout(nextLineTimer)
  }, [lineIndex, typedText])

  return (
    <main className="ending-screen">
      <div className="ending-sunrise" />

      <section className="ending-cinematic" aria-label="Ending cinematic">
        <p className="ending-kicker">Niềm tin xã hội được khôi phục</p>

        <div className="ending-lines">
          {completedLines.map((line) => (
            <p className="ending-line completed" key={line}>
              {line}
            </p>
          ))}

          {lineIndex < ENDING_LINES.length && (
            <p className="ending-line typing">
              {typedText}
              <span className="typing-cursor" />
            </p>
          )}
        </div>

        <button
          className="ending-restart"
          type="button"
          onClick={onRestart}
        >
          Chơi lại
        </button>
      </section>
    </main>
  )
}

export default EndingScreen
