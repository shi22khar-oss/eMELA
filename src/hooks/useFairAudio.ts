import { useCallback, useEffect, useRef, useState } from 'react';
import { FairSoundscape } from '../utils/soundscape';

export function useFairAudio() {
  const engineRef = useRef<FairSoundscape | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = useCallback(async () => {
    if (engineRef.current) {
      engineRef.current.stop();
      engineRef.current = null;
      setSoundOn(false);
      return false;
    }

    const engine = new FairSoundscape();
    engineRef.current = engine;
    try {
      await engine.start();
      if (engineRef.current !== engine) {
        engine.stop();
        return false;
      }
      setSoundOn(true);
      return true;
    } catch (error) {
      if (engineRef.current === engine) engineRef.current = null;
      engine.stop();
      throw error;
    }
  }, []);

  useEffect(() => () => {
    engineRef.current?.stop();
    engineRef.current = null;
  }, []);

  return { soundOn, toggleSound };
}
