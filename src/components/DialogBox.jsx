import { useEffect, useState } from 'react'

function DialogBox({ npcName, lines, onComplete }) {
  const dialogLines = Array.isArray(lines)
    ? lines.filter(Boolean)
    : [lines].filter(Boolean)
  const [lineIndex, setLineIndex] = useState(0)
  const [visibleText, setVisibleText] = useState('')

  useEffect(() => {
    setLineIndex(0)
    setVisibleText('')
  }, [npcName])

  useEffect(() => {
    const activeLine = dialogLines[lineIndex] ?? ''
    setVisibleText('')

    let characterIndex = 0
    const typingTimer = window.setInterval(() => {
      characterIndex += 1
      setVisibleText(activeLine.slice(0, characterIndex))

      if (characterIndex >= activeLine.length) {
        window.clearInterval(typingTimer)
      }
    }, 24)

    return () => window.clearInterval(typingTimer)
  }, [npcName, lineIndex])

  function advanceDialog() {
    const activeLine = dialogLines[lineIndex] ?? ''

    if (visibleText.length < activeLine.length) {
      setVisibleText(activeLine)
      return
    }

    if (lineIndex < dialogLines.length - 1) {
      setLineIndex((currentIndex) => currentIndex + 1)
      return
    }

    onComplete()
  }

  function handleButtonClick(event) {
    event.stopPropagation()
    advanceDialog()
  }

  return (
    <aside className="dialog-box" onClick={advanceDialog}>
      <p className="dialog-name">{npcName}</p>
      <p className="dialog-message">“{visibleText}”</p>
      <button className="dialog-next-button" type="button" onClick={handleButtonClick}>
        Tiếp tục
      </button>
    </aside>
  )
}

export default DialogBox
