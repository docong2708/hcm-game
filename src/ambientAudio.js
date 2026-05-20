export function createAmbientAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const context = new AudioContext()

  const masterGain = context.createGain()
  masterGain.gain.value = 0.16
  masterGain.connect(context.destination)

  function createNoiseBuffer() {
    const bufferSize = context.sampleRate * 2
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i += 1) {
      data[i] = Math.random() * 2 - 1
    }

    return buffer
  }

  function createWind() {
    const source = context.createBufferSource()
    source.buffer = createNoiseBuffer()
    source.loop = true

    const highpass = context.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 140

    const lowpass = context.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.value = 1000

    const gain = context.createGain()
    gain.gain.value = 0.04

    source.connect(highpass)
    highpass.connect(lowpass)
    lowpass.connect(gain)
    gain.connect(masterGain)

    const lfo = context.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.12
    const lfoGain = context.createGain()
    lfoGain.gain.value = 0.02
    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)

    source.start()
    lfo.start()

    return { source, lfo, lfoGain }
  }

  function createSpeaker() {
    const oscillator = context.createOscillator()
    oscillator.type = 'triangle'
    oscillator.frequency.value = 240

    const bandpass = context.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.value = 900
    bandpass.Q.value = 0.8

    const gain = context.createGain()
    gain.gain.value = 0.02

    const tremolo = context.createOscillator()
    tremolo.type = 'sine'
    tremolo.frequency.value = 0.18
    const tremoloGain = context.createGain()
    tremoloGain.gain.value = 0.012

    oscillator.connect(bandpass)
    bandpass.connect(gain)
    gain.connect(masterGain)

    tremolo.connect(tremoloGain)
    tremoloGain.connect(gain.gain)

    oscillator.start()
    tremolo.start()

    return { oscillator, tremolo }
  }

  function playPianoTone(frequency, startTime, duration) {
    const oscillator = context.createOscillator()
    oscillator.type = 'triangle'
    oscillator.frequency.value = frequency

    const filter = context.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 1200

    const gain = context.createGain()
    gain.gain.value = 0

    oscillator.connect(filter)
    filter.connect(gain)
    gain.connect(masterGain)

    oscillator.start(startTime)
    gain.gain.setValueAtTime(0.001, startTime)
    gain.gain.exponentialRampToValueAtTime(0.04, startTime + 0.12)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
    oscillator.stop(startTime + duration + 0.05)
  }

  function playPianoChord() {
    const now = context.currentTime
    const chordNotes = [220, 277.18, 329.63]
    chordNotes.forEach((note) => playPianoTone(note, now, 2.2))
  }

  const windTrack = createWind()
  const speakerTrack = createSpeaker()
  playPianoChord()
  const pianoInterval = setInterval(playPianoChord, 13200)

  return {
    context,
    resume() {
      return context.resume()
    },
    stop() {
      windTrack.source.stop()
      windTrack.lfo.stop()
      speakerTrack.oscillator.stop()
      speakerTrack.tremolo.stop()
      clearInterval(pianoInterval)
      context.close()
    },
  }
}
