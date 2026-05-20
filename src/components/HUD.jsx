function HUD({ hope, restoredThoughts, totalThoughts }) {
  return (
    <aside className="hud">
      <div>
        <p className="hud-label">NIỀM TIN XÃ HỘI</p>
        <div className="hope-bar">
          <div className="hope-fill" style={{ width: `${hope}%` }} />
        </div>
      </div>

      <p className="hud-count">
        {restoredThoughts.length}/{totalThoughts} tư tưởng đúng
      </p>

      <ul className="restored-list">
        {restoredThoughts.map((thought) => (
          <li key={thought.id}>{thought.title}</li>
        ))}
      </ul>
    </aside>
  )
}

export default HUD
