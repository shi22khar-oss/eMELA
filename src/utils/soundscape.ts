const melody = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66];

/** A small, original Web Audio soundscape. No downloads, autoplay, or remote audio. */
export class FairSoundscape {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | undefined;
  private step = 0;

  async start() {
    if (this.context) return;
    if (!window.AudioContext) throw new Error('Web Audio is not supported');

    const context = new AudioContext();
    this.context = context;
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.65, context.currentTime + 0.25);
    master.connect(context.destination);
    this.master = master;

    await context.resume();
    this.playStep();
    this.timer = window.setInterval(() => this.playStep(), 420);
  }

  stop() {
    window.clearInterval(this.timer);
    this.timer = undefined;
    if (this.context) void this.context.close();
    this.context = null;
    this.master = null;
    this.step = 0;
  }

  private playStep() {
    if (!this.context || !this.master) return;
    const now = this.context.currentTime + 0.025;
    const note = melody[this.step % melody.length];
    this.playTone(note, now, 0.34, 0.075, 'triangle');
    if (this.step % 2 === 0) this.playTone(note / 2, now, 0.5, 0.035, 'sine');
    if (this.step % 4 === 0) this.playBeat(now);
    if (this.step % 4 === 2) this.playBeat(now + 0.2, 0.045);
    this.step += 1;
  }

  private playTone(frequency: number, start: number, duration: number, volume: number, type: OscillatorType) {
    if (!this.context || !this.master) return;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  private playBeat(start: number, volume = 0.08) {
    if (!this.context || !this.master) return;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(125, start);
    oscillator.frequency.exponentialRampToValueAtTime(48, start + 0.13);
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(start);
    oscillator.stop(start + 0.2);
  }
}
