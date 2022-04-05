import "./styles.css";
import { useRef, useState, useEffect } from "react";

const sounds = [
  { name: "applause", url: "sounds/sound-board_sounds_applause.mp3" },
  { name: "boo", url: "sounds/sound-board_sounds_boo.mp3" },
  { name: "gasp", url: "sounds/sound-board_sounds_gasp.mp3" },
  { name: "victory", url: "sounds/sound-board_sounds_victory.mp3" }
];

export default function App() {
  const [activeSound, setActiveSound] = useState(null);
  const [trigger, setTrigger] = useState(0);
  const soundRef = useRef(null);
  const stop = (sound) => {
    sound.pause();
    sound.currentTime = 0;
  };

  useEffect(() => {
    let currentSound = soundRef.current;
    if (currentSound) {
      currentSound.play();
    }
    return () => (currentSound ? stop(currentSound) : null);
  }, [trigger]);

  return (
    <div className="App">
      {sounds.map((element, i) => (
        <button
          key={i}
          onClick={() => {
            setActiveSound(i);
            setTrigger(trigger + 1);
          }}
        >
          {element.name}
          <audio
            ref={activeSound === i ? soundRef : null}
            src={element.url}
            className="clip"
            id={element.name}
          ></audio>
        </button>
      ))}
    </div>
  );
}
