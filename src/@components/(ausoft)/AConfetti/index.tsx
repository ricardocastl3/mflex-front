import ConfettiExplosion from "react-confetti-explosion";

export default function AConfetti({
  ...props
}: {
  force: number;
  duration: number;
  particleCount: number;
  width: number;
}) {
  return <ConfettiExplosion {...props} />;
}
