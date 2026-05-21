import { useEffect, useRef, useState } from 'react'
import backgroundImage from '../assets/background.png'
import mainCharacterImg from '../assets/maincharacter_transparent.png'
import { correctValues } from '../data/values'
import DialogBox from './DialogBox'
import PuzzleModal from './PuzzleModal'

const PLAYER_SIZE = 42
const NPC_SIZE = 40
const MAP_WIDTH = 2400
const PLAYER_SPEED = 5
const GRAVITY = 0.7
const JUMP_STRENGTH = 10
const INTERACT_DISTANCE_X = 80

function getGroundY() {
  return window.innerHeight - 104
}

function createStartPosition() {
  const groundY = getGroundY()

  return {
    x: 120,
    y: groundY - PLAYER_SIZE,
    velocityX: 0,
    velocityY: 0,
    state: 'idle',
    isOnGround: true,
    size: PLAYER_SIZE,
  }
}

const NPC_LAYOUT = [
  { x: 30, y: 24 },
  { x: 66, y: 28 },
  { x: 24, y: 62 },
  { x: 70, y: 60 },
  { x: 46, y: 30 },
]

const NPCS = correctValues.map((value, index) => ({
  ...value,
  id: value.id,
  name: value.npcName,
  image: value.npcImage,
  ...NPC_LAYOUT[index],
}))

function getMapX(entity) {
  return (MAP_WIDTH * entity.x) / 100
}

function getGroundedMapPosition(entity, size = NPC_SIZE, lift = 0) {
  const groundY = getGroundY()

  return {
    x: getMapX(entity),
    y: groundY - size - lift,
    size,
  }
}

function getHorizontalDistance(player, entityPosition) {
  const playerCenterX = player.x + player.size / 2
  const entityCenterX = entityPosition.x + entityPosition.size / 2

  return Math.abs(playerCenterX - entityCenterX)
}

function GameCanvas({ hope, onCorrectChoice, onWrongChoice, restoredValueIds }) {
  const keysRef = useRef({})
  const playerRef = useRef(createStartPosition())
  const facingRef = useRef('right')
  const frameRef = useRef(null)
  const ePressedRef = useRef(false)

  const [player, setPlayer] = useState(() => createStartPosition())
  const [facing, setFacing] = useState('right')
  const [nearbyNpc, setNearbyNpc] = useState(null)
  const [dialogNpc, setDialogNpc] = useState(null)
  const [activePuzzleNpc, setActivePuzzleNpc] = useState(null)
  const [popupMessage, setPopupMessage] = useState('')

  const hopeLevel = Math.min(4, Math.floor(hope / 25))
  const npcMood = hope >= 80 ? 'hopeful' : hope > 0 ? 'warming' : 'sad'

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key.toLowerCase()
      keysRef.current[key] = true

      if (key === ' ' || key === 'arrowup') {
        event.preventDefault()
      }

      if (key === 'e' && !ePressedRef.current) {
        ePressedRef.current = true
        if (nearbyNpc && !dialogNpc && !activePuzzleNpc) {
          setDialogNpc(nearbyNpc)
        }
      }
    }

    function handleKeyUp(event) {
      const key = event.key.toLowerCase()
      keysRef.current[key] = false

      if (key === 'e') {
        ePressedRef.current = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [nearbyNpc, dialogNpc, activePuzzleNpc])

  useEffect(() => {
    function movePlayer() {
      const keys = keysRef.current
      const currentPlayer = playerRef.current
      const groundY = getGroundY()
      let velocityX = 0
      let velocityY = currentPlayer.velocityY + GRAVITY
      let nextFacing = facingRef.current

      if (!activePuzzleNpc && !dialogNpc) {
        const movingLeft = keys.a || keys.arrowleft
        const movingRight = keys.d || keys.arrowright

        if (movingLeft && !movingRight) {
          velocityX = -PLAYER_SPEED
          nextFacing = 'left'
        }

        if (movingRight && !movingLeft) {
          velocityX = PLAYER_SPEED
          nextFacing = 'right'
        }

        if (
          (keys.w || keys.arrowup || keys[' ']) &&
          currentPlayer.isOnGround
        ) {
          velocityY = -JUMP_STRENGTH
        }
      }

      let nextX = currentPlayer.x + velocityX
      let nextY = currentPlayer.y + velocityY

      nextX = Math.max(0, Math.min(MAP_WIDTH - PLAYER_SIZE, nextX))

      let isOnGround = false
      if (nextY >= groundY - PLAYER_SIZE) {
        nextY = groundY - PLAYER_SIZE
        velocityY = 0
        isOnGround = true
      }

      let playerState = 'idle'
      if (!isOnGround && velocityY < 0) {
        playerState = 'jumping'
      } else if (!isOnGround && velocityY >= 0) {
        playerState = 'falling'
      } else if (velocityX !== 0) {
        playerState = 'running'
      }

      const nextPlayer = {
        x: nextX,
        y: nextY,
        velocityX,
        velocityY,
        state: playerState,
        isOnGround,
        size: PLAYER_SIZE,
      }
      playerRef.current = nextPlayer
      setPlayer(nextPlayer)

      if (nextFacing !== facingRef.current) {
        facingRef.current = nextFacing
        setFacing(nextFacing)
      }

      const nextNpc = NPCS.find((npc) => {
        const npcPosition = getGroundedMapPosition(npc, NPC_SIZE)
        return getHorizontalDistance(nextPlayer, npcPosition) < INTERACT_DISTANCE_X
      })
      setNearbyNpc(nextNpc ?? null)

      if (!nextNpc) {
        setDialogNpc(null)
      }

      frameRef.current = requestAnimationFrame(movePlayer)
    }

    frameRef.current = requestAnimationFrame(movePlayer)

    return () => cancelAnimationFrame(frameRef.current)
  }, [activePuzzleNpc, dialogNpc])

  function showPopup(message) {
    setPopupMessage(message)
    setTimeout(() => setPopupMessage(''), 1800)
  }

  function handleDialogComplete(npc) {
    setDialogNpc(null)

    if (restoredValueIds.includes(npc.id)) {
      showPopup(`${npc.valueName} đã được thắp sáng trong khu phố.`)
      return
    }

    setActivePuzzleNpc(npc)
  }

  function solvePuzzle(value) {
    onCorrectChoice(value)
    showPopup(`Bạn đã hiểu được giá trị: ${value.valueName}`)
    setActivePuzzleNpc(null)
  }

  function failPuzzle() {
    onWrongChoice()
    setActivePuzzleNpc(null)
  }

  function closePuzzle() {
    setActivePuzzleNpc(null)
  }

  const cameraX = Math.max(
    0,
    Math.min(MAP_WIDTH - window.innerWidth, player.x - window.innerWidth / 2),
  )

  return (
    <section
      className={`game-canvas hope-level-${hopeLevel}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-label="Bản đồ thành phố dystopia"
    >
      <div className="film-grain" />
      <div className="dust-layer" />
      <div
        className="side-scroll-world"
        style={{
          width: MAP_WIDTH,
          transform: `translateX(${-cameraX}px)`,
        }}
      >
        <div className="ground" />
        <div className="road road-horizontal" />
        <div className="road road-vertical" />

        <div className="map-place school building building-a">
          <span>Trường học</span>
        </div>
        <div className="map-place park building building-b">
          <span>Công viên</span>
          <i />
          <i />
          <i />
        </div>
        <div className="map-place neighborhood building building-c">
          <span>Khu dân cư</span>
        </div>
        <div className="map-place square building building-d">
          <span>Quảng trường</span>
        </div>
        <div className="propaganda-board neon-sign">Giữ lấy giá trị chung</div>
        <div className="old-poster error-sign error-sign-a">Nếp sống văn minh</div>
        <div className="old-poster error-sign error-sign-b">Vì cộng đồng</div>
        <div className="loudspeaker glitch-panel glitch-panel-a" />
        <div className="notice-wall glitch-panel glitch-panel-b">Bảng tin cũ</div>

        {NPCS.map((npc) => {
          const npcPosition = getGroundedMapPosition(npc, NPC_SIZE)
          const isNearby = nearbyNpc?.id === npc.id
          const isRestored = restoredValueIds.includes(npc.id)

          return (
            <div
              className={`npc npc-${isRestored ? 'hopeful' : npcMood}`}
              key={npc.id}
              style={{ left: npcPosition.x, top: npcPosition.y }}
            >
              <div className="npc-shadow" />
              <img
                src={npc.image}
                alt={npc.name}
                className="npc-sprite character-sprite-clean"
              />
              <span className="npc-name">{npc.name}</span>
              {isNearby && (
                <span className="npc-interact-prompt">
                  Nhấn E để trò chuyện
                </span>
              )}
            </div>
          )
        })}

        <div
          className={`player player-${player.state}`}
          style={{
            left: player.x,
            top: player.y,
          }}
        >
          <div className="player-shadow" />
          <img
            src={mainCharacterImg}
            alt="Nhân vật chính"
            className="player-sprite character-sprite-clean"
            style={{
              '--player-facing-scale': facing === 'left' ? '-1' : '1',
            }}
          />
          </div>
      </div>

      {popupMessage && <div className="insight-popup">{popupMessage}</div>}
      {dialogNpc && (
        <DialogBox
          npcName={dialogNpc.name}
          lines={[
            dialogNpc.story,
            restoredValueIds.includes(dialogNpc.id)
              ? dialogNpc.consequence
              : 'Hãy lắng nghe điều đang bị đặt lên bàn cân.',
          ]}
          onComplete={() => handleDialogComplete(dialogNpc)}
        />
      )}
      {activePuzzleNpc && (
        <PuzzleModal
          value={activePuzzleNpc}
          onSolved={solvePuzzle}
          onFail={failPuzzle}
          onClose={closePuzzle}
        />
      )}
    </section>
  )
}

export default GameCanvas
