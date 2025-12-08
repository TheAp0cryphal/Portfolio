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

  return null;
};

export default Footer;  