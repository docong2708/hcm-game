import { useEffect, useRef, useState } from 'react'
import backgroundImage from '../assets/background.png'
import coGiaoLanImg from '../assets/cogiaolan_transparent.png'
import congNhanMinhImg from '../assets/congnhanminh_transparent.png'
import cuuChienBinhAnImg from '../assets/cuuchienbinhan_transparent.png'
import mainCharacterImg from '../assets/maincharacter_transparent.png'
import nguoiBanHangImg from '../assets/nguoibanhang_transparent.png'
import sinhVienNamImg from '../assets/sinhviennam_transparent.png'
import { correctValues, wrongValues } from '../data/values'
import ChoiceModal from './ChoiceModal'
import DialogBox from './DialogBox'

const PLAYER_SIZE = 42
const ORB_SIZE = 34
const NPC_SIZE = 40
const PLAYER_SPEED = 4
const NPC_DIALOG_DISTANCE = 92
const ORB_INTERACT_DISTANCE = 78

const START_POSITION = {
  x: window.innerWidth / 2 - PLAYER_SIZE / 2,
  y: window.innerHeight / 2 - PLAYER_SIZE / 2,
  size: PLAYER_SIZE,
}

const CORRECT_VALUE_POSITIONS = [
  { x: 12, y: 18 },
  { x: 76, y: 22 },
  { x: 18, y: 72 },
  { x: 72, y: 68 },
  { x: 48, y: 18 },
]

const WRONG_VALUE_POSITIONS = [
  { x: 88, y: 48 },
  { x: 9, y: 48 },
  { x: 35, y: 84 },
  { x: 62, y: 84 },
  { x: 51, y: 50 },
]

const ALL_ORB_POSITIONS = [...CORRECT_VALUE_POSITIONS, ...WRONG_VALUE_POSITIONS]

function shuffleArray(items) {
  const array = items.slice()
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

function createGameValues() {
  const shuffledPositions = shuffleArray(ALL_ORB_POSITIONS)

  return [
    ...correctValues.map((value, index) => ({
      ...value,
      type: 'correct',
      ...shuffledPositions[index],
    })),
    ...wrongValues.map((value, index) => ({
      ...value,
      type: 'wrong',
      ...shuffledPositions[correctValues.length + index],
    })),
  ]
}

const NPC_LAYOUT = [
  { name: 'Cô giáo Lan', image: coGiaoLanImg, x: 30, y: 24 },
  { name: 'Bác công nhân Minh', image: congNhanMinhImg, x: 66, y: 28 },
  { name: 'Người bán hàng Tư', image: nguoiBanHangImg, x: 24, y: 62 },
  { name: 'Sinh viên Nam', image: sinhVienNamImg, x: 70, y: 60 },
  { name: 'Cựu chiến binh An', image: cuuChienBinhAnImg, x: 46, y: 30 },
]

const GAME_VALUES = [
  ...correctValues.map((value, index) => ({
    ...value,
    type: 'correct',
    ...CORRECT_VALUE_POSITIONS[index],
  })),
  ...wrongValues.map((value, index) => ({
    ...value,
    type: 'wrong',
    ...WRONG_VALUE_POSITIONS[index],
  })),
]

const NPCS = correctValues.map((value, index) => ({
  id: `npc-${value.id}`,
  hint: value.hint,
  ...NPC_LAYOUT[index],
}))

function getMapPosition(entity, size = ORB_SIZE) {
  return {
    x: (window.innerWidth * entity.x) / 100,
    y: (window.innerHeight * entity.y) / 100,
    size,
  }
}

function isColliding(player, item) {
  return (
    player.x < item.x + item.size &&
    player.x + player.size > item.x &&
    player.y < item.y + item.size &&
    player.y + player.size > item.y
  )
}

function getDistance(first, second) {
  const firstCenterX = first.x + first.size / 2
  const firstCenterY = first.y + first.size / 2
  const secondCenterX = second.x + second.size / 2
  const secondCenterY = second.y + second.size / 2

  return Math.hypot(firstCenterX - secondCenterX, firstCenterY - secondCenterY)
}

function GameCanvas({ hope, onCorrectChoice, onWrongChoice, restoredValueIds }) {
  const keysRef = useRef({})
  const playerRef = useRef(START_POSITION)
  const frameRef = useRef(null)
  const ePressedRef = useRef(false)
  const skippedOrbIdRef = useRef(null)

  const [player, setPlayer] = useState(START_POSITION)
  const [orbs, setOrbs] = useState(() => createGameValues())
  const [nearbyNpc, setNearbyNpc] = useState(null)
  const [nearbyOrb, setNearbyOrb] = useState(null)
  const [dialogNpc, setDialogNpc] = useState(null)
  const [activeOrb, setActiveOrb] = useState(null)
  const [popupMessage, setPopupMessage] = useState('')

  const hopeLevel = Math.min(4, Math.floor(hope / 25))
  const npcMood = hope >= 80 ? 'hopeful' : hope > 0 ? 'warming' : 'sad'

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key.toLowerCase()
      keysRef.current[key] = true

      if (key === 'e' && !ePressedRef.current) {
        ePressedRef.current = true
        if (nearbyOrb && !activeOrb) {
          setActiveOrb(nearbyOrb)
        } else {
          setDialogNpc((currentNpc) => (currentNpc ? null : nearbyNpc))
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
  }, [nearbyOrb, nearbyNpc, activeOrb])

  useEffect(() => {
    function movePlayer() {
      const keys = keysRef.current
      let nextX = playerRef.current.x
      let nextY = playerRef.current.y

      // WASD va phim mui ten cung dieu khien nhan vat.
      if (!activeOrb) {
        if (keys.a || keys.arrowleft) nextX -= PLAYER_SPEED
        if (keys.d || keys.arrowright) nextX += PLAYER_SPEED
        if (keys.w || keys.arrowup) nextY -= PLAYER_SPEED
        if (keys.s || keys.arrowdown) nextY += PLAYER_SPEED
      }

      nextX = Math.max(0, Math.min(window.innerWidth - PLAYER_SIZE, nextX))
      nextY = Math.max(0, Math.min(window.innerHeight - PLAYER_SIZE, nextY))

      const nextPlayer = { x: nextX, y: nextY, size: PLAYER_SIZE }
      playerRef.current = nextPlayer
      setPlayer(nextPlayer)

      const nextNpc = NPCS.find((npc) => {
        const npcPosition = getMapPosition(npc, NPC_SIZE)
        return getDistance(nextPlayer, npcPosition) < NPC_DIALOG_DISTANCE
      })
      setNearbyNpc(nextNpc ?? null)

      if (!nextNpc) {
        setDialogNpc(null)
      }

      const nearbyOrbCandidate = orbs.find((orb) => {
        const orbPosition = getMapPosition(orb, ORB_SIZE)
        return getDistance(nextPlayer, orbPosition) < ORB_INTERACT_DISTANCE
      })

      setNearbyOrb(nearbyOrbCandidate ?? null)

      if (!nearbyOrbCandidate) {
        skippedOrbIdRef.current = null
      }

      frameRef.current = requestAnimationFrame(movePlayer)
    }

    frameRef.current = requestAnimationFrame(movePlayer)

    return () => cancelAnimationFrame(frameRef.current)
  }, [activeOrb, orbs])

  function showPopup(message) {
    setPopupMessage(message)
    setTimeout(() => setPopupMessage(''), 1800)
  }

  function chooseOrb() {
    if (!activeOrb) {
      return
    }

    if (activeOrb.type === 'wrong') {
      onWrongChoice()
      showPopup('Một giá trị lệch lạc đã được chấp nhận.')
      setActiveOrb(null)
      return
    }

    setOrbs((currentOrbs) =>
      currentOrbs.filter((orb) => orb.id !== activeOrb.id),
    )
    onCorrectChoice(activeOrb)
    showPopup('Niềm tin xã hội đã được khôi phục một phần...')
    setActiveOrb(null)
  }

  function skipOrb() {
    if (!activeOrb) {
      return
    }

    skippedOrbIdRef.current = activeOrb.id
    setActiveOrb(null)
  }

  return (
    <section
      className={`game-canvas hope-level-${hopeLevel}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-label="Bản đồ thành phố dystopia"
    >
      <div className="film-grain" />
      <div className="dust-layer" />
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
        const npcPosition = getMapPosition(npc, NPC_SIZE)
        const isNearby = nearbyNpc?.id === npc.id

        return (
          <div
            className={`npc npc-${npcMood}`}
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
            {isNearby && <span className="npc-hint-key">E</span>}
          </div>
        )
      })}

      {orbs.map((orb) => {
        const orbPosition = getMapPosition(orb, ORB_SIZE)
        const isNearbyOrb = nearbyOrb?.id === orb.id

        return (
          <div
            className="value-item"
            key={orb.id}
            style={{ left: orbPosition.x, top: orbPosition.y }}
          >
            {isNearbyOrb && (
              <span className="orb-interact-prompt">
                Nhấn E để tương tác
              </span>
            )}
          </div>
        )
      })}

      <div className="player" style={{ left: player.x, top: player.y }}>
        <div className="player-shadow" />
        <img
          src={mainCharacterImg}
          alt="Nhân vật chính"
          className="player-sprite character-sprite-clean"
        />
      </div>

      {popupMessage && <div className="collect-popup">{popupMessage}</div>}
      {dialogNpc && <DialogBox npcName={dialogNpc.name} message={dialogNpc.hint} />}
      {activeOrb && (
        <ChoiceModal orb={activeOrb} onChoose={chooseOrb} onSkip={skipOrb} />
      )}
    </section>
  )
}

export default GameCanvas
