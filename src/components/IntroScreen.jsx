import { useEffect, useState } from 'react'

const INTRO_LINES = [
  'Xã hội đang đánh mất những giá trị cốt lõi.',
  'Hãy trò chuyện với người dân để thu thập manh mối, phân biệt đâu là tư tưởng đúng đắn, đâu là tư tưởng lệch lạc.',
  'Khôi phục 5 giá trị đúng để đưa niềm tin trở lại.',
]

function IntroScreen({ onStart }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [completedLines, setCompletedLines] = useState([])

  useEffect(() => {
    if (lineIndex >= INTRO_LINES.length) {
      return undefined
    }

    const currentLine = INTRO_LINES[lineIndex]

    if (typedText.length < currentLine.length) {
      const typingTimer = setTimeout(() => {
        setTypedText(currentLine.slice(0, typedText.length + 1))
      }, 40)
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
    <main className="intro-screen">
      <section className="intro-dialog" aria-label="Mission introduction">
        <div className="intro-logo">NHIỆM VỤ</div>

        <div className="intro-lines">
          {completedLines.map((line) => (
            <p className="intro-line completed" key={line}>
              {line}
            </p>
          ))}

          {lineIndex < INTRO_LINES.length && (
            <p className="intro-line typing">
              {typedText}
              <span className="typing-cursor" />
            </p>
          )}
        </div>

        {lineIndex >= INTRO_LINES.length && (
          <button
            type="button"
            className="intro-start-button"
            onClick={onStart}
          >
            BẮT ĐẦU KHÔI PHỤC
          </button>
        )}
      </section>
    </main>
  )
}

export default IntroScreen
