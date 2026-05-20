function ChoiceModal({ orb, onChoose, onSkip }) {
  return (
    <div className="choice-modal-backdrop">
      <section className="choice-modal" aria-label="Lựa chọn tư tưởng">
        <h2>{orb.title}</h2>
        <p>{orb.description}</p>

        <div className="choice-actions">
          <button type="button" onClick={onChoose}>
            Chọn
          </button>
          <button className="reject-button" type="button" onClick={onSkip}>
            Bỏ qua
          </button>
        </div>
      </section>
    </div>
  )
}

export default ChoiceModal
