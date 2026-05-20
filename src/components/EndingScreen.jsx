import { useEffect, useState } from 'react'

const ENDINGS = {
  good: {
    kicker: 'Giá trị được khôi phục',
    lines: [
      'Không một xã hội nào có thể tồn tại',
      'nếu đánh mất giá trị con người.',
    ],
  },
  bad: {
    kicker: 'Hậu quả của vô cảm',
    lines: [
      'Bạn đã lựa chọn sai.',
      'Xã hội tiếp tục chìm trong vô cảm.',
    ],
  },
}

function EndingScreen({ endingType = 'good', onRestart }) {
  const ending = ENDINGS[endingType] || ENDINGS.good
  const [lineIndex, setLineIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [completedLines, setCompletedLines] = useState([])

  useEffect(() => {
    if (lineIndex >= ending.lines.length) {
      return undefined
    }

    const currentLine = ending.lines[lineIndex]

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
  }, [lineIndex, typedText, ending.lines])

  return (
    <main className={`ending-screen ${endingType}`}>
      <div className="ending-sunrise" />

      <section className="ending-cinematic" aria-label="Ending cinematic">
        <p className="ending-kicker">{ending.kicker}</p>

        <div className="ending-lines">
          {completedLines.map((line) => (
            <p className="ending-line completed" key={line}>
              {line}
            </p>
          ))}

          {lineIndex < ending.lines.length && (
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
