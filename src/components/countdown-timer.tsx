import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-03-31T09:00:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = Math.max(TARGET_DATE - now, 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEC", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3 sm:gap-4 font-semibold">
          <div className="flex flex-col items-center">
            <span className="font-space-grotesk text-white text-4xl sm:text-5xl tracking-wider tabular-nums">
              {pad(unit.value)}
            </span>
            <span className="font-google-sans text-white/40 text-[10px] tracking-[0.2em] mt-1">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-white/20 text-3xl sm:text-4xl font-light -mt-4">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
