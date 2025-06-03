import { createSignal } from "solid-js";

const Footer = () => {
  const [heartEmoji, setHeartEmoji] = createSignal("❣️");
  const [clickCount, setClickCount] = createSignal(0);
  
  const hearts = ["❣️", "💜", "💙", "💚", "💛", "🧡", "❤️", "🖤", "🤍", "🤎", "💝", "💖", "💗", "💓", "💕", "💘", "💌", "💟", "❤️‍🔥"];
  
  const cycleHeart = () => {
    const count = clickCount() + 1;
    setClickCount(count);
    
    if (count >= 10) {
      setHeartEmoji("🌈✨");
      setTimeout(() => {
        setHeartEmoji("❣️");
        setClickCount(0);
      }, 3000);
    } else {
      const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
      setHeartEmoji(randomHeart);
      
      setTimeout(() => {
        if (clickCount() < 10) {
          setHeartEmoji("❣️");
        }
      }, 1500);
    }
  };

  return (      
      <div class="text-center p-3 footer">
        <span class="text-black">
          Made with{" "}
          <span 
            class="heart-emoji" 
            onClick={cycleHeart}
            style={{ cursor: "pointer", transition: "all 0.3s ease" }}
          >
            {heartEmoji()}
          </span>
          {" "}+ <b>SolidJS</b>
        </span>
        {clickCount() >= 5 && clickCount() < 10 && (
          <div class="easter-egg-text">
            <small>✨ Keep clicking! You're onto something... ✨</small>
          </div>
        )}
        {clickCount() >= 10 && (
          <div class="easter-egg-celebration">
            <small>🎉 You found the secret! Thanks for being curious! 🎉</small>
          </div>
        )}
      </div>
  );
};

export default Footer;  