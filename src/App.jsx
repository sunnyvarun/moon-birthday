

import "./index.css";
import { useCallback, useEffect, useRef, useState } from "react";




const petals = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 8) % 100}%`,
  delay: `${(i % 8) * -1.7}s`,
  duration: `${12 + (i % 7) * 2}s`,
  size: `${7 + (i % 4) * 3}px`,
}));

const stars = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  left: `${(i * 47 + 11) % 100}%`,
  top: `${(i * 31 + 7) % 100}%`,
  delay: `${(i % 9) * -0.6}s`,
  size: i % 5 === 0 ? "3px" : "2px",
}));

function Atmosphere() {
  return (
    <>
      <div className="stars" aria-hidden="true">
        {stars.map((star) => (
          <span
            className="star"
            key={star.id}
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>

      <div className="nebula nebula-one" aria-hidden="true" />
      <div className="nebula nebula-two" aria-hidden="true" />

      <div className="petals" aria-hidden="true">
        {petals.map((petal) => (
          <span
            className="petal"
            key={petal.id}
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: petal.size,
              height: `calc(${petal.size} * 1.7)`,
            }}
          />
        ))}
      </div>
    </>
  );
}

function Moon() {
  return (
    <div className="moon-halo" aria-hidden="true">
      <div className="moon">
        <div className="moon-shade" />
        <span className="crater crater-one" />
        <span className="crater crater-two" />
        <span className="crater crater-three" />
        <span className="crater crater-four" />
        <span className="crater crater-five" />
      </div>
    </div>
  );
}


function BirthdayBackground() {
  return (
    <div className="birthday-floaties" aria-hidden="true">
      <span className="birthday-cloud cloud-one" />
      <span className="birthday-cloud cloud-two" />
      <span className="birthday-shooting-star" />

      <span className="birthday-floaty">♡</span>
      <span className="birthday-floaty">✦</span>
      <span className="birthday-floaty">🎁</span>
      <span className="birthday-floaty">✧</span>
      <span className="birthday-floaty">💗</span>
      <span className="birthday-floaty">⭐</span>
    </div>
  );
}


function Welcome({ onBegin }) {
  
  const [collected, setCollected] = useState([]);

  const stars = [
    { id: 1, left: "14%", top: "24%", symbol: "✦" },
    { id: 2, left: "78%", top: "19%", symbol: "✧" },
    { id: 3, left: "25%", top: "55%", symbol: "✧" },
    { id: 4, left: "84%", top: "57%", symbol: "✦" },
    { id: 5, left: "52%", top: "14%", symbol: "✦" },
  ];

  const complete = collected.length === stars.length;

  function collectStar(id) {
    setCollected((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  }

  return (
    
    <section className="star-invitation">
      <BirthdayBackground />
      <div className="invitation-sky-glow" />
      <div className="invitation-twinkles" aria-hidden="true">
        ✧　·　✦　·　✧　·　✦　·　✧
      </div>

      <div className="invitation-game">
        <p className="invitation-eyebrow">
          A LITTLE UNIVERSE, JUST FOR YOU
        </p>

        <h1 className="invitation-title">
          {complete ? "You woke up the magic!" : "Help the little star!"}
        </h1>

        <p className="invitation-instructions">
          {complete
            ? "Look what your little magic has created."
            : "Five little stars are lost. Can you find them?"}
        </p>

        <div className="invitation-playground">
          {stars.map((star) => {
            const isCollected = collected.includes(star.id);

            return (
              <button
                key={star.id}
                type="button"
                className={`invitation-star ${
                  isCollected ? "star-collected" : ""
                }`}
                style={{ left: star.left, top: star.top }}
                onClick={() => collectStar(star.id)}
                disabled={isCollected}
                aria-label={
                  isCollected
                    ? `Star ${star.id} collected`
                    : `Collect star ${star.id}`
                }
              >
                {isCollected ? "♡" : star.symbol}
                {isCollected && (
                  <span className="star-sparkle" aria-hidden="true">
                    ✨
                  </span>
                )}
              </button>
            );
          })}

          <div
  className={`birthday-cake ${
    collected.length > 0 ? "cake-awakening" : ""
  } ${complete ? "cake-complete" : ""}`}
  aria-label={`${collected.length} of 5 birthday candles lit`}
>
  <div className="birthday-cake-glow" />

  <div className="birthday-candles">
    {stars.map((star, index) => (
      <div className="birthday-candle" key={star.id}>
        {collected.includes(star.id) && (
          <span className="birthday-flame" aria-hidden="true">
            ✨
          </span>
        )}
        <span
          className={`birthday-candle-stick ${
            collected.includes(star.id) ? "candle-lit" : ""
          }`}
        />
      </div>
    ))}
  </div>

  <div className="birthday-frosting">
    <span className="cake-decoration">♥</span>
    <span className="cake-decoration">✦</span>
    <span className="cake-decoration">♥</span>
  </div>

  <div className="birthday-cake-body" aria-hidden="true">
  <span className="cake-heart-decoration">♡</span>
  <span className="cake-heart-decoration">✦</span>
  <span className="cake-heart-decoration">♡</span>
</div>

  <div className="birthday-cake-plate" />
</div>
        </div>

        <div
          className="invitation-progress"
          role="status"
          aria-live="polite"
        >
          <div className="invitation-progress-track">
            <div
              className="invitation-progress-fill"
              style={{
                width: `${(collected.length / stars.length) * 100}%`,
              }}
            />
          </div>
          <p>{collected.length} of 5 stars found</p>
        </div>

        {complete ? (
          <button
            type="button"
            className="invitation-enter"
            onClick={onBegin}
          >
            Enter your space <span aria-hidden="true">✧</span>
          </button>
        ) : (
          <p className="invitation-hint">
            Psst... tap the little stars ✨
          </p>
        )}

        <p className="invitation-footer">
          Made of stardust, little dreams, and love.
        </p>
      </div>
    </section>
  );
}



function BirthdayTree({ grow, onComplete }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!grow || !canvasRef.current || !window.Tree) return;

    const canvas = canvasRef.current;
    const width = 760;
    const height = 540;

    canvas.width = width;
    canvas.height = height;

    const options = {
      seed: {
        x: width / 2,
        y: height - 12,
        color: "#f5a4cf",
        scale: 1.3,
      },

      branch: [
        [
          width / 2, height,
          width / 2 + 5, height * 0.69,
          width / 2, height * 0.36,
          13, 85,
          [
            [
              width / 2, height * 0.68,
              width * 0.40, height * 0.54,
              width * 0.29, height * 0.45,
              8, 65,
              [
                [
                  width * 0.35, height * 0.51,
                  width * 0.27, height * 0.43,
                  width * 0.23, height * 0.35,
                  4, 35,
                ],
                [
                  width * 0.31, height * 0.47,
                  width * 0.34, height * 0.38,
                  width * 0.39, height * 0.36,
                  3, 30,
                ],
              ],
            ],
            [
              width / 2, height * 0.63,
              width * 0.60, height * 0.52,
              width * 0.71, height * 0.44,
              8, 65,
              [
                [
                  width * 0.65, height * 0.49,
                  width * 0.72, height * 0.40,
                  width * 0.77, height * 0.34,
                  4, 35,
                ],
                [
                  width * 0.69, height * 0.46,
                  width * 0.65, height * 0.37,
                  width * 0.61, height * 0.35,
                  3, 30,
                ],
              ],
            ],
            [
              width / 2, height * 0.51,
              width * 0.44, height * 0.35,
              width * 0.39, height * 0.27,
              5, 42,
            ],
            [
              width / 2, height * 0.49,
              width * 0.56, height * 0.34,
              width * 0.61, height * 0.27,
              5, 42,
            ],
          ],
        ],
      ],

      bloom: {
        // Fewer blossoms make the heart outline readable.
        num: 320,
        width,
        height,
      },

      footer: {
        width: 300,
        height: 4,
        speed: 8,
      },
    };

    const tree = new window.Tree(canvas, width, height, options);

    let frameId;
    let cancelled = false;
    let hasCompleted = false;

    setReady(false);

    function animate() {
      if (cancelled) return;

      // Phase 1: grow the trunk and branches.
      if (tree.canGrow()) {
        tree.grow();
        setReady(true);
        frameId = requestAnimationFrame(animate);
        return;
      }

      // Phase 2: fill the heart-shaped canopy gradually.
      // Do NOT call tree.jump(); that creates extra floating
      // blossoms outside the intended heart silhouette.
      if (tree.bloomsCache.length > 0) {
        tree.flower(3);
        setReady(true);
        frameId = requestAnimationFrame(animate);
        return;
      }

      // Phase 3: stop completely once the heart is filled.
      if (!hasCompleted) {
        hasCompleted = true;
        setReady(true);
        onComplete?.();
      }
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [grow, onComplete]);

  return (
    <div
      className={`birthday-tree-canvas ${ready ? "tree-ready" : ""}`}
    >
      <canvas
        ref={canvasRef}
        aria-label="A heart-shaped birthday tree"
      />
    </div>
  );
}






// Arrival-stage timing controls (milliseconds / seconds). Adjust these values to tune the sequence.
const ARRIVAL_RAIN_TO_WISH_MS = 2700;
const ARRIVAL_RAIN_PARTICLE_BASE_SECONDS = 1;
const ARRIVAL_RAIN_PARTICLE_STEP_SECONDS = 0.24;

function Arrival({ onContinue }) {
  const [wishes, setWishes] = useState([]);
  const [phase, setPhase] = useState("hunt");
  const [treatPositions, setTreatPositions] = useState(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      left: `${8 + Math.random() * 78}%`,
      top: `${15 + Math.random() * 68}%`,
      symbol: ["🍫", "🍬", "🍭"][i],
      label: ["Birthday chocolate", "Birthday candy", "Birthday sweet"][i],
    }))
  );

  const allCollected = wishes.length === 3;
  const treeGrowing = phase === "growing";
  const raining = phase === "rain";
  const showingWish = phase === "wish";

  const collectWish = (id) => {
    if (phase !== "hunt") return;

    setWishes((previous) => {
      if (previous.includes(id)) return previous;

      const next = [...previous, id];

      if (next.length === 3) {
        setPhase("growing");
      }

      return next;
    });
  };

  const handleTreeComplete = useCallback(() => {
    setPhase((current) => {
      if (current !== "growing") return current;
      return "rain";
    });
  }, []);

  useEffect(() => {
    if (phase !== "rain") return;

    const timer = window.setTimeout(() => {
      setPhase("wish");
    }, ARRIVAL_RAIN_TO_WISH_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <section
      className={`birthday-garden birthday-phase-${phase}`}
    >
      <BirthdayBackground />

      {!showingWish && (
        <>
          <div className="garden-stars" aria-hidden="true">
           
          </div>

          <header className="garden-heading">
            <p className="garden-eyebrow">
              ✨ A LITTLE BIRTHDAY ADVENTURE ✨
            </p>

            <h1>
              {phase === "hunt"
                ? "Find your birthday treats!"
                : treeGrowing
                  ? "A heart is growing just for you..."
                  : "A little birthday magic..."}
            </h1>

            <p className="garden-description">
              {phase === "hunt"
                ? "Look everywhere! Three little surprises are floating."
                : treeGrowing
                  ? "Watch your very own heart tree grow, one blossom at a time."
                  : "Something magical is on its way..."}
            </p>
          </header>

          {/* Treats are positioned relative to the entire viewport,
              not inside the tree scene. */}
          {phase === "hunt" &&
            treatPositions.map((treat) => {
              const collected = wishes.includes(treat.id);

              if (collected) return null;

              return (
                <button
                  key={treat.id}
                  type="button"
                  className={`wish-droplet wish-hunt-${treat.id}`}
                  style={{
                    left: treat.left,
                    top: treat.top,
                  }}
                  onClick={() => collectWish(treat.id)}
                  aria-label={`Collect ${treat.label}`}
                >
                  <span className="treat-emoji">{treat.symbol}</span>
                  <span className="treat-sparkle" aria-hidden="true">
                    ✨
                  </span>
                </button>
              );
            })}

          {phase === "hunt" && (
            <div className="treat-counter">
              <span>🎁</span>
              {wishes.length} / 3 surprises found
              <span></span>
            </div>
          )}

          {phase === "hunt" && (
            <p className="garden-hint">
            </p>
          )}

          {/* Keep the tree mounted during growth and the rain transition. */}
          <div
            className={`tree-stage ${
              raining ? "tree-stage-fading" : ""
            }`}
          >
            <div className="tree-stage-stars" aria-hidden="true">
              ✧　·　⭐　·　✧
            </div>

            <BirthdayTree
              grow={allCollected}
              onComplete={handleTreeComplete}
            />
          </div>

          {treeGrowing && (
            <div className="tree-growing-note" role="status">
              <span className="growing-spinner">✧</span>
              Growing a heart full of birthday wishes...
            </div>
          )}
        </>
      )}

      {/* Full-screen cover: starts only when the tree reports completion. */}
      {raining && (
        <div
          className="birthday-magic-transition"
          aria-label="A magical shower of birthday hearts and stars"
        >
          {Array.from({ length: 150 }, (_, i) => (
            <span
              key={i}
              className="birthday-rain-particle"
              style={{
                left: `${(i * 47 + 13) % 100}%`,
                animationDelay: `${(i % 25) * 0.075}s`,
                animationDuration: `${ARRIVAL_RAIN_PARTICLE_BASE_SECONDS + (i % 9) * ARRIVAL_RAIN_PARTICLE_STEP_SECONDS}s`,
                fontSize: `${12 + (i % 5) * 7}px`,
              }}
            >
              {["💗", "✨", "♡", "⭐", "💕", "🌸", "🎀"][i % 7]}
            </span>
          ))}
          <div className="rain-center-message">
            A little magic, just for you... 💖
          </div>
        </div>
      )}

      {/* The birthday wish only appears after the rain transition. */}
      {showingWish && (
        <div className="birthday-wish-screen">
          <div className="wish-orbit wish-orbit-one" aria-hidden="true">
            ✦　♡　✧
          </div>

          <article className="birthday-surprise wish-card-reveal">
            <div className="surprise-kicker">
              🎂 ✨ THE UNIVERSE HAS A MESSAGE FOR YOU ✨ 🎂
            </div>

            <div className="wish-big-heart" aria-hidden="true">
              💖
            </div>

            <h2 className="surprise-title">
              Happy Birthday,
              <br />
              <span>My Dear Alekya Bhanu!</span>
            </h2>

            <p className="surprise-message">
              May your life sparkle like the stars, your heart bloom
              with happiness, and every new year bring you beautiful
              surprises, sweet memories, and dreams coming true. 💗
            </p>

            <div className="surprise-characters" aria-hidden="true">
              🧸　🎁　🐰　🎂　🐻　💝
            </div>

            <button
              type="button"
              className="garden-continue"
              onClick={onContinue}
            >
              Open your birthday letter <span>♡</span>
            </button>
          </article>

          <div className="wish-orbit wish-orbit-two" aria-hidden="true">
            ⭐　🎀　✨　💗
          </div>
        </div>
      )}
    </section>
  );
}






function LoveLetter({ onContinue, onBack }) {
  const [opened, setOpened] = useState(false);

  const decorations = [
    { symbol: "♡", className: "letter-float-one" },
    { symbol: "✦", className: "letter-float-two" },
    { symbol: "💗", className: "letter-float-three" },
    { symbol: "✧", className: "letter-float-four" },
    { symbol: "⭐", className: "letter-float-five" },
    { symbol: "💕", className: "letter-float-six" },
  ];

  return (
    <section className="birthday-letter-stage">
      <div className="letter-ambient-decor" aria-hidden="true">
        {decorations.map((item) => (
          <span key={item.className} className={item.className}>
            {item.symbol}
          </span>
        ))}
      </div>

      <header className="top-note letter-top-note">
        <span className="tiny-star">✧</span>
        CHAPTER THREE · A MESSAGE FROM MY HEART
        <span className="tiny-star">✧</span>
      </header>

      <section className="letter-content" key="love-letter">
        

        <h2 className="letter-heading">
          A little piece of <span>my heart.</span>
        </h2>

        <p className="letter-subtitle">
          {opened
            ? "Every word comes with a little piece of my heart. 💗"
            : "A tiny envelope is hiding something special for you..."}
        </p>

        {!opened ? (
          <div className="letter-envelope-area">
            <div className="letter-character" aria-hidden="true">
              <span className="letter-character-sparkle">✦</span>
              🧸
              <span className="letter-character-heart">💗</span>
            </div>

            <button
              type="button"
              className="envelope-button birthday-envelope-button"
              onClick={() => setOpened(true)}
              aria-label="Open your special birthday letter"
            >
              <span className="envelope-glow" />

              <span className="envelope birthday-envelope">
                <span className="envelope-paper">
                  <span className="paper-heart">♡</span>
                  <span className="paper-mini-text">FOR YOU</span>
                </span>

                <span className="envelope-flap" />
                <span className="envelope-front" />

                <span className="envelope-seal">♥</span>
                <span className="envelope-seal-sparkle">✦</span>
              </span>

              <span className="envelope-caption">
                A letter written just for you 💌
              </span>
            </button>

            
          </div>
        ) : (
          <article className="letter-paper birthday-letter-paper">
            <div className="letter-paper-top-decoration" aria-hidden="true">
              <span>✦</span>
              <span>♡</span>
              <span>✦</span>
            </div>

            <div className="letter-paper-decoration">💗</div>

            <p className="letter-salutation">
              To my favorite person, 💌
            </p>

            <p>
              If I could give you one thing in this universe,
              it would be the ability to see yourself through
              my eyes. Maybe then you would understand how
              incredibly special you are to me.
            </p>

            <p>
              You make ordinary moments feel magical. You
              turn little memories into treasures, and somehow,
              even the quietest moments feel beautiful when
              they have a place in our story.
            </p>

            <p>
              If the Moon could keep a secret, I would ask it
              to hold every little wish I have made for you.
              If the stars could write, I would ask them to
              write your name across the sky.
            </p>

            <p>
              And if I could make one wish tonight, it would
              be that life gives you a thousand reasons to
              smile, a thousand dreams to chase, and all the
              love your heart can hold.
            </p>

            <p className="letter-signoff">
              Always, under the same moon. <span>♡</span>
            </p>

            <div className="letter-little-gift" aria-hidden="true">
              🎁 💗 🧸
            </div>

            <button
              type="button"
              className="journey-button letter-continue"
              onClick={onContinue}
            >
              <span>There's more waiting for you</span>
              <span className="button-arrow">✧</span>
            </button>
          </article>
        )}

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back to watch again
        </button>
      </section>

      <Footer />
    </section>
  );
}


function Footer() {
  return (
    <footer className="bottom-note">
      <span className="footer-line" />
      MADE WITH LOVE, UNDER THE SAME MOON
      <span className="footer-line" />
    </footer>
  );
}






function MoonJourney({ onBack, onFinish }) {
  const firstYear = 2009;
  const lastYear = 2026;
  const totalYears = lastYear - firstYear + 1;

  const [started, setStarted] = useState(false);
  const [year, setYear] = useState(firstYear);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [starCaught, setStarCaught] = useState(false);
  const [catchingStar, setCatchingStar] = useState(false);

  const currentNumber = year - firstYear + 1;

    const moonMessages = {
    2009: {
      title: "A Tiny Spark ✨",
      message: "Every beautiful journey begins with a little spark. This is your first little moon memory. ♡",
    },
    2010: {
      title: "Little Stardust 🌙",
      message: "If the stars could tell stories, this moon would have a sweet little secret of its own.",
    },
    2011: {
      title: "A Sky Full of Magic ⭐",
      message: "Some moments may seem small, but they can make a whole universe feel brighter.",
    },
    2012: {
      title: "Written in the Stars 💫",
      message: "Imagine a little star saving its sparkle just to make this moment feel special.",
    },
    2013: {
      title: "A Little Wish ♡",
      message: "If this moon could make one wish, it would be for this lovely little journey to keep shining.",
    },
    2014: {
      title: "The Dreamy Moon 🌟",
      message: "Somewhere in this enormous universe, there's always room for one more beautiful memory.",
    },
    2015: {
      title: "Cosmic Secrets ✨",
      message: "This moon is keeping a pocketful of stardust and a tiny secret just for this moment.",
    },
    2016: {
      title: "Moonbeam Magic 🌙",
      message: "The night sky has a thousand lights, but every moon brings its own kind of wonder.",
    },
    2017: {
      title: "My Little Constellation 💗",
      message: "Every star has its own place in the sky, and every little moment has its place in a story.",
    },
    2018: {
      title: "Orbiting Dreams 🪐",
      message: "Let this moon be a reminder that there's always another little adventure waiting beyond the stars.",
    },
    2019: {
      title: "A Sprinkle of Magic 💫",
      message: "Sometimes the universe doesn't need grand fireworks. One tiny sparkle can be enough.",
    },
    2020: {
      title: "The Moon Still Shines 🌙",
      message: "Even when the world feels different, there's something comforting about looking up at the same moon.",
    },
    2021: {
      title: "Another Star in Our Sky ✨",
      message: "One more year, one more little light, and one more reason to keep exploring this universe.",
    },
    2022: {
      title: "Stardust Wishes 🎀",
      message: "Sending a little imaginary stardust your way, with a wish for more laughter and lovely memories.",
    },
    2023: {
      title: "A Constellation of Moments ⭐",
      message: "Think of every happy moment as a star. Together, they make a sky worth remembering.",
    },
    2024: {
      title: "A Moonlit Memory ♡",
      message: "Some memories deserve their own little place among the stars, glowing softly for years to come.",
    },
    2025: {
      title: "The Next Adventure 🌌",
      message: "The universe is enormous, the stars are endless, and there are still so many little wonders to discover.",
    },
    2026: {
      title: "Our Sky Goes On 💖",
      message: "We've reached the final moon in this little journey, but the universe has plenty more surprises waiting.",
    },
  };

  const currentMessage = moonMessages[year] || {
    title: "A little note from the universe 💗",
    message:
      "Every moon has a different story, and this one has a little message waiting just for you.",
  };

  function selectYear(nextYear) {
    if (nextYear < firstYear || nextYear > lastYear) return;

    setYear(nextYear);
    setLoaded(false);
    setFailed(false);
    setStarCaught(false);
    setCatchingStar(false);
  }

  function catchStar() {
    if (catchingStar || starCaught) return;

    setCatchingStar(true);

    window.setTimeout(() => {
      setStarCaught(true);
      setCatchingStar(false);
    }, 650);
  }

  function travelToNextMoon() {
    if (!starCaught) return;

    if (year < lastYear) {
      selectYear(year + 1);
    } else {
      onFinish?.();
    }
  }

  return (
    <section
      className={`moon-journey-page ${
        started ? "moon-game-started" : "moon-game-intro"
      }`}
    >
      <div className="moon-space-noise" aria-hidden="true" />
      <div className="moon-nebula moon-nebula-one" aria-hidden="true" />
      <div className="moon-nebula moon-nebula-two" aria-hidden="true" />

      <div className="moon-game-stars" aria-hidden="true">
        {Array.from({ length: 32 }, (_, index) => (
          <span
            key={index}
            className={`moon-game-star moon-game-star-${(index % 6) + 1}`}
            style={{
              "--star-index": index,
              "--star-delay": `${(index % 9) * -0.7}s`,
            }}
          >
            {index % 4 === 0
              ? "✦"
              : index % 4 === 1
                ? "·"
                : index % 4 === 2
                  ? "✧"
                  : "⋆"}
          </span>
        ))}
      </div>

      <button
        type="button"
        className="moon-exit-button"
        onClick={onBack}
        aria-label="Return to the love letter"
      >
        <span aria-hidden="true">↶</span>
        <span>Our little universe</span>
      </button>

      {!started ? (
        <div className="moon-intro-screen">
          <div className="intro-orbit intro-orbit-one" aria-hidden="true" />
          <div className="intro-orbit intro-orbit-two" aria-hidden="true" />

          <div className="intro-moon" aria-hidden="true">
            <div className="intro-moon-crater intro-crater-one" />
            <div className="intro-moon-crater intro-crater-two" />
            <div className="intro-moon-crater intro-crater-three" />
          </div>

          <span
            className="intro-floating-heart intro-heart-one"
            aria-hidden="true"
          >
            ♡
          </span>
          <span
            className="intro-floating-heart intro-heart-two"
            aria-hidden="true"
          >
            ✧
          </span>

          <p className="moon-intro-kicker">
            JUST YOU, ME & THE MOON
          </p>

          <h2 className="moon-intro-title">
            Meet me
            <br />
            <span>under the stars.</span>
          </h2>

          <p className="moon-intro-copy">
            Eighteen Moons. Eighteen little moments.
            <br />
            One universe that feels a little more like ours. ♡
          </p>

          <button
            type="button"
            className="moon-start-button"
            onClick={() => setStarted(true)}
          >
            <span className="start-button-sparkle">✦</span>
            Let's get lost in space
            <span className="start-button-arrow">↗</span>
          </button>

          <p className="moon-intro-hint">
            Psst... a little surprise is waiting for you
          </p>
        </div>
      ) : (
        <div
          className={`moon-memory-screen moon-mood-${year % 4}`}
          key={year}
        >
          <header className="moon-memory-header">
            <span className="moon-memory-label">
              <span className="live-star">✦</span>
              A LITTLE MOON MAGIC
            </span>

            <span className="moon-memory-count">
              {String(currentNumber).padStart(2, "0")}
              <span> / {totalYears}</span>
            </span>
          </header>

          <div className="moon-memory-layout">
            <div className="moon-art-area">
              <div className="moon-aura moon-aura-outer" />
              <div className="moon-aura moon-aura-inner" />

              <div
                className={`moon-photo-wrap ${
                  loaded ? "moon-photo-loaded" : ""
                }`}
              >
                {!failed ? (
                  <img
                    className="moon-real-photo"
                    src={`/moon/moon-${year}.jpg`}
                    alt={`Moon for ${year}`}
                    onLoad={() => setLoaded(true)}
                    onError={() => {
                      setLoaded(false);
                      setFailed(true);
                    }}
                  />
                ) : (
                  <div className="moon-image-error">
                    <span>☾</span>
                    <p>This Moon is hiding!</p>
                    <small>
                      Check public/moon/moon-{year}.jpg
                    </small>
                  </div>
                )}
              </div>

              <span className="moon-orbiting-heart" aria-hidden="true">
                ♡
              </span>
              <span className="moon-orbiting-star" aria-hidden="true">
                ✧
              </span>
              <span className="moon-orbiting-spark" aria-hidden="true">
                ✦
              </span>

              <div className="moon-year-stamp">
                <span>OUR MOON NO.</span>
                <strong>
                  {String(currentNumber).padStart(2, "0")}
                </strong>
              </div>
            </div>

            <div className="moon-memory-message">
              <p className="moon-message-eyebrow">
                A NEW LITTLE WORLD ✦
              </p>

              <h2 className="moon-year-title">
                Moonlight
                <br />
                <span>of {year}.</span>
              </h2>

              <p className="moon-year-subtitle">
                One Moon, one moment, one more little reason to smile. ♡
              </p>

              <div className="moon-surprise-area">
                {!starCaught ? (
                  <div className="moon-game-prompt">
                    <p className="moon-game-instruction">
                      A shooting star has a little gift for you...
                    </p>

                    <button
                      type="button"
                      className={`catch-star-button ${
                        catchingStar ? "catching" : ""
                      }`}
                      onClick={catchStar}
                      disabled={catchingStar}
                    >
                      <span className="catch-star-icon">✦</span>
                      {catchingStar
                        ? "A little magic..."
                        : "Catch the little star"}
                      <span aria-hidden="true">⋆｡°✩</span>
                    </button>
                  </div>
                ) : (
                  <article
                    className="moon-love-message"
                    aria-live="polite"
                  >
                    <span className="love-message-sparkle">
                      ✧　♡　✧
                    </span>
                    <h3>{currentMessage.title}</h3>
                    <p>{currentMessage.message}</p>
                    <span className="love-message-sparkle">
                      ⋆｡°✩
                    </span>
                  </article>
                )}
              </div>

              <div className="moon-navigation-buttons">
                {year > firstYear && (
                  <button
                    type="button"
                    className="previous-moon-button"
                    onClick={() => selectYear(year - 1)}
                  >
                    <span aria-hidden="true">↶</span> Previous Moon
                  </button>
                )}
                {starCaught && (
                  <button
                    type="button"
                    className="find-next-moon-button"
                    onClick={travelToNextMoon}
                  >
                    <span>✦</span>
                    {year === lastYear
                      ? "Continue our story"
                      : "Find the next Moon"}
                    <span>♡</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="moon-journey-bottom">
            <div
              className="moon-progress-dots"
              aria-label={`Moon ${currentNumber} of ${totalYears}`}
            >
              {Array.from({ length: totalYears }, (_, index) => (
                <span
                  key={index}
                  className={
                    index + 1 === currentNumber
                      ? "current"
                      : index + 1 < currentNumber
                        ? "visited"
                        : ""
                  }
                />
              ))}
            </div>

            
          </div>
        </div>
      )}

      
    </section>
  );
}


function FinalReveal({ onReplay, onMoonJourney }) {
  const [musicOn, setMusicOn] = useState(false);
  const [musicError, setMusicError] = useState(false);

  function toggleMusic() {
    const audio = document.getElementById("birthday-audio");
    if (!audio) return;

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }

    audio.play()
      .then(() => {
        setMusicOn(true);
        setMusicError(false);
      })
      .catch(() => {
        setMusicOn(false);
        setMusicError(true);
      });
  }

  return (
    <>
      <Moon />

      <audio
        id="birthday-audio"
        src="/audio/birthday.mp3"
        loop
        preload="none"
        onPause={() => setMusicOn(false)}
        onPlay={() => setMusicOn(true)}
        onError={() => setMusicError(true)}
      />

      <header className="top-note">
        <span className="tiny-star">✧</span>
        YOUR MOST SPECIAL DAY
        <span className="tiny-star">✧</span>
      </header>

      <div className="final-roses" aria-hidden="true">
        {["✿", "❀", "✿", "❀", "✿", "❀", "✿"].map(
          (flower, index) => (
            <span key={index} style={{ "--i": index }}>
              {flower}
            </span>
          )
        )}
      </div>

      <section className="final-content" key="final-reveal">
        <div className="final-orbit" aria-hidden="true">
          <span>♡</span>
        </div>

        <p className="eyebrow">A WISH WRITTEN IN THE STARS</p>

        <h1 className="final-heading">
          Happy Birthday,
          <br />
          <span>my favorite person.</span>
        </h1>


<div className="love-photo-frame">
  <div className="love-photo-heart" aria-hidden="true">♡</div>
  <img
    className="birthday-person-photo"
    src="/images/moon-photo.jpg"
    alt="A special birthday memory"
  />
  <span className="photo-frame-caption">♡ A little piece of my universe ♡</span>
</div>


        <div className="divider">
          <span />
          <span className="divider-heart">♡</span>
          <span />
        </div>

        <p className="final-message">
          Today, the universe feels a little more beautiful,
          <br className="desktop-break" />
          because it gave the world someone like you.
        </p>

        <p className="final-message">
          May your days be filled with gentle happiness,
          your dreams find their way to the stars, and your
          heart always find reasons to smile.
        </p>

        <p className="final-message">
          And whenever you look up at the Moon, I hope you
          remember that somewhere beneath this same sky,
          there is a little universe made just for you.
        </p>

        <p className="final-blessing">
          May Allah bless you with happiness, peace, and
          beautiful moments in every year ahead. ♡
        </p>

        <p className="final-signature">
          Always, under the same moon.
        </p>

        <div className="final-actions">

          <button className="journey-button" onClick={onReplay}>
            <span>Experience it all again</span>
            <span className="button-arrow">↻</span>
          </button>
        </div>

        {musicError && (
          <p className="music-note" role="status">
            Music couldn't be loaded. Check that
            public/audio/birthday.mp3 exists, or continue
            without music.
          </p>
        )}

        <button className="back-button" onClick={onMoonJourney}>
          ← Revisit the Moon journey
        </button>
      </section>

    </>
  );
}


export default function App() {
  const [chapter, setChapter] = useState("welcome");

  function goToChapter(nextChapter) {
    setChapter(nextChapter);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={`universe chapter-${chapter}`}>
      <Atmosphere />

      {chapter === "welcome" && (
        <Welcome onBegin={() => goToChapter("arrival")} />
      )}

      {chapter === "arrival" && (
        <Arrival onContinue={() => goToChapter("love")} />
      )}

      {chapter === "love" && (
        <LoveLetter
          onContinue={() => goToChapter("moon")}
          onBack={() => goToChapter("arrival")}
        />
      )}
      {chapter === "moon" && (
  <MoonJourney
    onBack={() => goToChapter("love")}
    onFinish={() => goToChapter("final")}
  />
)}

{chapter === "final" && (
  <FinalReveal
    onReplay={() => goToChapter("welcome")}
    onMoonJourney={() => goToChapter("moon")}
  />
)}

    </main>
  );
}

