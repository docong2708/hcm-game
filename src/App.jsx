import { useEffect, useRef, useState } from 'react'
import IntroScreen from './components/IntroScreen'
import EndingScreen from './components/EndingScreen'
import GameCanvas from './components/GameCanvas'
import HUD from './components/HUD'
import { correctValues } from './data/values'
import { createAmbientAudio } from './ambientAudio'

function App() {
  const [gameState, setGameState] = useState('intro')
  const [restoredValueIds, setRestoredValueIds] = useState([])
  const audioRef = useRef(null)

  useEffect(() => {
    return () => {
      audioRef.current?.stop()
    }
  }, [])

  function startAmbientAudio() {
    if (!audioRef.current) {
      audioRef.current = createAmbientAudio()
    }

    audioRef.current.resume().catch(() => {
      // Autoplay may be blocked until user interacts — resume later when possible.
    })
  }

  const restoredValues = correctValues.filter((value) =>
    restoredValueIds.includes(value.id),
  )
  const hope = (restoredValueIds.length / correctValues.length) * 100

  function handleCorrectChoice(orb) {
    setRestoredValueIds((currentIds) => {
      if (currentIds.includes(orb.id)) {
        return currentIds
      }

      const nextIds = [...currentIds, orb.id]

      if (nextIds.length === correctValues.length) {
        setTimeout(() => setGameState('good-ending'), 800)
      }

      return nextIds
    })
  }

  function restartGame() {
    setRestoredValueIds([])
    setGameState('playing')
  }

  if (gameState === 'intro') {
    return <IntroScreen onStart={() => {
      startAmbientAudio()
      setGameState('playing')
    }} />
  }

  if (gameState === 'bad-ending') {
    return <EndingScreen endingType="bad" onRestart={restartGame} />
  }

  if (gameState === 'good-ending') {
    return <EndingScreen endingType="good" onRestart={restartGame} />
  }

  return (
    <main className="game-shell">
      <HUD
        hope={hope}
        restoredThoughts={restoredValues}
        totalThoughts={correctValues.length}
      />
      <GameCanvas
        hope={hope}
        onCorrectChoice={handleCorrectChoice}
        onWrongChoice={() => setGameState('bad-ending')}
        restoredValueIds={restoredValueIds}
      />
    </main>
  )
}

export default App
