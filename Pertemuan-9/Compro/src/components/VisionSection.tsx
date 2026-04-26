"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const stepTime = Math.max(Math.floor(duration / target), 16);
          const timer = setInterval(() => {
            start += Math.ceil(target / (duration / stepTime));
            if (start >= target) {
              start = target;
              clearInterval(timer);
            }
            setCount(start);
          }, stepTime);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <h4 ref={ref} className="stat-number">
      {count.toLocaleString("id-ID")}
      {suffix}
    </h4>
  );
}

export default function VisionSection() {
  return (
    <section id="vision" className="vision">
      <div className="vision-flex">
        <div className="vision-text">
          <span className="hero-tagline">Our Purpose</span>
          <h2 className="vision-heading">
            Visi <span className="text-gradient">Visioner</span>
          </h2>
          <p className="vision-desc">
            Menjadi mercusuar inovasi teknologi yang tidak hanya mengikuti tren,
            tetapi menciptakan standar baru bagi peradaban digital manusia. Kami
            percaya bahwa teknologi harus membebaskan dan memberdayakan.
          </p>
          <div className="stats-row">
            <div className="stat">
              <AnimatedCounter target={999} suffix="%" />
              <span className="stat-label">Uptime SLA</span>
            </div>
            <div className="stat">
              <AnimatedCounter target={500} suffix="+" />
              <span className="stat-label">Proyek Global</span>
            </div>
            <div className="stat">
              <AnimatedCounter target={50} suffix="+" />
              <span className="stat-label">Enterprise Client</span>
            </div>
          </div>
        </div>
        <div className="vision-visual">
          <div className="orbit-container">
            <div className="orbit orbit--outer" />
            <div className="orbit orbit--inner" />
            <div className="orbit-core">CORE</div>
          </div>
        </div>
      </div>
    </section>
  );
}
