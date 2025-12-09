// src/components/ScrambledText.jsx
import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrambledText.css";

gsap.registerPlugin && gsap.registerPlugin(ScrollTrigger);

const DEFAULT_POOL = "!<>-_\\/[]{}—=+*^?#~0123456789@#$%&";
const randomChar = (pool) => pool[Math.floor(Math.random() * pool.length)];

function ScrambledText({
  children,
  triggerSelector = ".about-section", // element to watch for scroll (keeps compatibility)
  duration = 0.9,
  scramblePool = DEFAULT_POOL,
  stagger = 0.03,
  mobileDisable = true,
  // tuning (override in About.jsx if you want)
  scrambleFreqMs = 80,
  revealBaseMultiplier = 160,
  className = "",
  replay = true, // <--- set to true to replay on each enter (default true)
}) {
  const text = useMemo(() => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
      return children.map((c) => (typeof c === "string" ? c : "")).join("");
    }
    return String(children ?? "");
  }, [children]);

  const spanRefs = useRef([]);
  spanRefs.current = [];
  const scrambleIntervalsRef = useRef([]); // array of interval ids
  const revealTimeoutsRef = useRef([]); // array of timeout ids
  const stRef = useRef(null);
  const revealedRef = useRef(false);
  const observerRef = useRef(null);

  const addSpanRef = (el) => {
    if (el) spanRefs.current.push(el);
  };

  useEffect(() => {
    const rootEl = spanRefs.current.length ? spanRefs.current[0].closest(".scrambled-text-root") : null;
    if (!rootEl) return;

    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    // helpers
    const clearAllRevealTimeouts = () => {
      revealTimeoutsRef.current.forEach((id) => clearTimeout(id));
      revealTimeoutsRef.current = [];
    };
    const clearAllScrambleIntervals = () => {
      scrambleIntervalsRef.current.forEach((id) => clearInterval(id));
      scrambleIntervalsRef.current = [];
    };

    const startScrambling = () => {
      // mark unrevealed
      revealedRef.current = false;
      rootEl.classList.remove("is-revealed");
      clearAllRevealTimeouts();
      clearAllScrambleIntervals();

      spanRefs.current.forEach((span) => {
        const original = span.getAttribute("data-char") || "";
        if (original === " ") {
          span.textContent = "\u00A0";
          span.style.color = "#FFDD33";
          return;
        }
        // initial scrambled char
        span.textContent = randomChar(scramblePool);
        span.style.color = "#FFDD33";
        const id = setInterval(() => {
          // only scramble while unrevealed
          if (!revealedRef.current) {
            span.textContent = randomChar(scramblePool);
          }
        }, scrambleFreqMs);
        scrambleIntervalsRef.current.push(id);
      });
    };

    const reveal = () => {
      // idempotent: if already revealed, do nothing
      if (revealedRef.current) return;
      revealedRef.current = true;

      // stop scrambling immediately
      clearAllScrambleIntervals();
      clearAllRevealTimeouts();

      spanRefs.current.forEach((span, idx) => {
        const original = span.getAttribute("data-char") || "";
        const charRevealDelay = Math.floor(revealBaseMultiplier * idx * stagger + 350);
        const tId = setTimeout(() => {
          span.textContent = original === " " ? "\u00A0" : original;
          gsap.set(span, { color: "#FFDD33" });
          gsap.to(span, {
            color: "#000000",
            duration,
            ease: "power2.out",
          });
        }, charRevealDelay);
        revealTimeoutsRef.current.push(tId);
      });

      // block entry animation
      gsap.fromTo(rootEl, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });

      // final safety pass and add class
      const lastIndex = Math.max(0, spanRefs.current.length - 1);
      const lastDelay = Math.floor(revealBaseMultiplier * lastIndex * stagger + 350);
      const finishMs = lastDelay + Math.round(duration * 1000) + 60;
      const finalId = setTimeout(() => {
        spanRefs.current.forEach((span) => {
          const original = span.getAttribute("data-char") || "";
          span.textContent = original === " " ? "\u00A0" : original;
          span.style.color = "#000000";
        });
        rootEl.classList.add("is-revealed");
      }, finishMs);
      revealTimeoutsRef.current.push(finalId);
    };

    const resetToScrambled = () => {
      // clear timers and restart scramble
      clearAllRevealTimeouts();
      clearAllScrambleIntervals();
      revealedRef.current = false;
      rootEl.classList.remove("is-revealed");

      spanRefs.current.forEach((span) => {
        const original = span.getAttribute("data-char") || "";
        if (original === " ") {
          span.textContent = "\u00A0";
          span.style.color = "#FFDD33";
        } else {
          span.textContent = randomChar(scramblePool);
          span.style.color = "#FFDD33";
        }
      });

      // restart interval
      startScrambling();
    };

    // Mobile fallback: show final text and skip effects
    if (isTouch && mobileDisable) {
      clearAllRevealTimeouts();
      clearAllScrambleIntervals();
      spanRefs.current.forEach((s) => {
        const original = s.getAttribute("data-char") || "";
        s.textContent = original === " " ? "\u00A0" : original;
        s.style.color = "#000000";
      });
      rootEl.classList.add("is-revealed");
      revealedRef.current = true;
      return;
    }

    // begin scrambled immediately
    startScrambling();

    // Use ScrollTrigger when available and replay is desired
    if (replay && ScrollTrigger && typeof ScrollTrigger.create === "function") {
      // create ScrollTrigger using the root element (more reliable)
      stRef.current = ScrollTrigger.create({
        trigger: rootEl,
        start: "top 85%",
        once: false,
        onEnter: () => reveal(),
        onEnterBack: () => reveal(),
        onLeave: () => resetToScrambled(),
        onLeaveBack: () => resetToScrambled(),
      });

      // if already visible on load -> reveal now
      const rect = rootEl.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        reveal();
      }
    } else if (replay) {
      // Fallback: IntersectionObserver based replay (works without GSAP ScrollTrigger)
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal();
            } else {
              // element left view
              resetToScrambled();
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.15 }
      );
      io.observe(rootEl);
      observerRef.current = io;
      // if already in view -> reveal now
      const rect = rootEl.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        reveal();
      }
    } else {
      // if replay disabled, keep original behavior: reveal once (immediate)
      reveal();
    }

    // cleanup
    return () => {
      clearAllRevealTimeouts();
      clearAllScrambleIntervals();
      if (stRef.current) {
        stRef.current.kill && stRef.current.kill();
        stRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [
    triggerSelector,
    scramblePool,
    scrambleFreqMs,
    revealBaseMultiplier,
    stagger,
    duration,
    mobileDisable,
    replay,
  ]);

  // render scrambled spans initially so nothing flashes
  return (
    <div className={`scrambled-text-root ${className}`}>
      <p>
        {Array.from(text).map((ch, i) => {
          const initial = ch === " " ? "\u00A0" : randomChar(scramblePool);
          return (
            <span
              key={i}
              ref={addSpanRef}
              className="scramble-char"
              data-char={ch}
              style={{ color: "#FFDD33" }}
            >
              {initial}
            </span>
          );
        })}
      </p>
    </div>
  );
}

export default ScrambledText;
