import { useState } from 'react'
import EndingScreen from './components/EndingScreen'
import GameCanvas from './components/GameCanvas'
import GameOverScreen from './components/GameOverScreen'
import HUD from './components/HUD'
import { correctValues } from './data/values'

function App() {
  const [gameState, setGameState] = useState('playing')
  const [restoredValueIds, setRestoredValueIds] = useState([])

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

  if (gameState === 'game-over') {
    return <GameOverScreen onRestart={restartGame} />
  }

  if (gameState === 'good-ending') {
    return <EndingScreen onRestart={restartGame} />
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
        onWrongChoice={() => setGameState('game-over')}
        restoredValueIds={restoredValueIds}
      />
    </main>
  )
}

export default App
