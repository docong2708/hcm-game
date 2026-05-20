function DialogBox({ npcName, message }) {
  return (
    <aside className="dialog-box">
      <p className="dialog-name">{npcName}</p>
      <p className="dialog-message">“{message}”</p>
    </aside>
  )
}

export default DialogBox
