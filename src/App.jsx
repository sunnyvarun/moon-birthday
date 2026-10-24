

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
          </p>
        )}

        <p className="invitation-footer">
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
              ✨ A SMALL BIRTHDAY ADVENTURE ✨
            </p>

            <h1>
              {phase === "hunt"
                ? "Find your birthday candies!"
                : treeGrowing
                  ? "A heart is growing just for you..."
                  : "A little magic...😘"}
            </h1>

            <p className="garden-description">
              {phase === "hunt"
                ? "Look everywhere! Three little surprises are floating."
                : treeGrowing
                  ? "Watch your very own heart tree grow, one blossom at a time."
                  : "Something is on its way..."}
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
              {["💗", "✨", "♡", "⭐", "💕", "🌸", "🎀", "😘"][i % 7]}
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
              <span>My Dear Bhanu Papa!</span>
            </h2>

            <p className="surprise-message">
              May your life sparkle like the stars, your heart bloom
              with happiness like the tree just before a moment, and every new year bring you beautiful
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
                A words written just for you 💌
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
              incredibly special you are.
            </p>

            <p>
              You make ordinary moments feel magical. You
              turn little memories into treasures, and somehow,
              even the quietest moments feel beautiful when
              they have a place in your story.
            </p>

            <p>
              If the Moon could keep a secret, I would ask it
              to hold every little wish I have made for you.
              If the stars could write, I would ask them to
              write your name in the sky.
            </p>

            <p>
              And if I could make one wish tonight, it would
              be that life gives you a thousand reasons to
              smile smile smile, a thousand dreams to chase, and all the
              love your heart can hold.
            </p>

            <p className="letter-signoff">
              Always, under the same sky. <span>♡</span>
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
      title: "A Little Silver Beginning 🌙",
      message: " The year you were born, the Moon wore a tiny silver smile, welcoming a beautiful new soul into the world. And now, look at this Moon, I think the moon is lucky to have its twin on earth. ♡",
    },
    2010: {
      title: "Your First Full Moon 🌕",
      message: "The Moon glowed its brightest to celebrate your very 1st birthday, as if the whole night sky was in a party just for you. I guess even the Moon wanted to make your special B'day shine brighter!",
    },
    2011: {
      title: "Your Own Kind of Glow 🌖",
      message: "Just like this Moon, you have a soft glow that makes you beautiful, even though only some part of you shines brightly. To me, you look beautiful in every little way, just like the Moon with its dark part.",
    },
    2012: {
      title: "When Darkness Meets Light 🌗",
      message: "This time, the Moon's light and darkness have switched sides, just like life, where dark days can turn bright again. No matter which side of life you're on, my dear, I hope you always find your light and keep shining.",
    },
    2013: {
      title: "A Little More Light & Hope 🌖 ",
      message: "Even the dark part of you have a beauty that words can never fully explain, just like beauty of this Moon's dark side.",
    },
    2014: {
      title: "A Beauty Only I Can See 🌑",
      message: "Even when the Moon hides in darkness, You know? it's still there, just as I will never disappears from you, even on your hardest days.",
    },
    2015: {
      title: "A Little More of You 🌔",
      message: "Your bright side is growing, and every little detail makes you more beautiful. Just like this Moon, you have a glow that makes it hard to look away.",
    },
    2016: {
      title: "A Sliver of Hope 🌒",
      message: "Even when most of the Moon is hidden, that little light still stands out. I hope you always hold on to your little spark, even when life gets hard.",
    },
    2017: {
      title: "My Little Constellation 💗",
      message: "A little curve of light, but still so lovely to look at. Sometimes, all it takes is your smile to make your whole day better, and i will be the reason of your smile.",
    },
    2018: {
      title: "Moonbeam Magic 🌙",
      message: "I wish you could see yourself through my eyes then you will know just how beautiful you are than this bright moon.",
    },
    2019: {
      title: "A Little Darkness Returns 🌒",
      message: "The Moon is slowly showing its darkness again, reminding you that hardest days always come. I hope you never stop believing in yourself.",
    },
    2020: {
      title: "The Moon Still Shines 🌖",
      message: "Even when the world feels different, there's something comforting about looking up at the same moon and Thats how i look you.",
    },
    2021: {
      title: "Almost Full of Light 🌖",
      message: "The Moon is nearly full, with just a little shadow left. I remind you that even when life isn't perfect, there's still so much beauty to be proud of.",
    },
    2022: {
      title: "A Tiny Silver Promise 🌘",
      message: "This Moon looks like it's hiding a tiny smile, probably because it knows a little secret about you.",
    },
    2023: {
      title: "Caught in Between. 🌔",
      message: "Half dressed for the spotlight and half ready for bed. This Moon is just like someone who can't decide whether to go out or stay home.",
    },
    2024: {
      title: "Two Sides of You 🌗",
      message: "You have a good side that makes me adore you and a little mischievous side that sometimes drives me crazy. Honestly, I wouldn't change either, because both are what make you 'you'.",
    },
    2025: {
      title: "Hide-and-seek 🌒",
      message: "The Moon really said, 'Not today, everyone,' and disappeared into the darkness. Honestly, a little hide-and-seek never hurt anyone, but hurts me.",
    },
    2026: {
      title: "My View Goes On 👀",
      message: "Finally today,It's your birthday, and if the Moon is giving you this little glow as a gift, consider this my treat to you: a reminder that no matter how beautiful the Moon looks tonight, you'll always be my fav view.",
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
        <span>Your little universe</span>
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
            JUST YOU & THE MOON
          </p>

          <h2 className="moon-intro-title">
            18 years,
            <br />
            <span>18 shades of the Moon.</span>
          </h2>

          <p className="moon-intro-copy">
            Eighteen Moons. Eighteen little moments.
            <br />
            let's travel back through the years and see how the Moon looked on each of your birthdays. ♡
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
                <span>YOUR MOON NO.</span>
                <strong>
                  {String(currentNumber).padStart(2, "0")}
                </strong>
              </div>
            </div>

            <div className="moon-memory-message">
              <p className="moon-message-eyebrow">
                
              </p>

              <h2 className="moon-year-title">
                Moonlight
                <br />
                <span>of oct 24 - {year}.</span>
              </h2>

              <p className="moon-year-subtitle">
                One Moon,  one more reason to smile. ♡
              </p>

              <div className="moon-surprise-area">
                {!starCaught ? (
                  <div className="moon-game-prompt">
                    <p className="moon-game-instruction">
                      A shooting star has a beautiful words for you...
                    </p>

                    <button
                      type="button"
                      className={`catch-star-button ${
                        catchingStar ? "catching" : ""
                      }`}
                      onClick={catchStar}
                      disabled={catchingStar}
                    >
                      <span className="catch-star-icon"></span>
                      {catchingStar
                        ? "A little magic..."
                        : "Catch the star and read its message! "}
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
                      ? "Continue your day"
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

  function toggleMusic() {
    
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
    src="./public/moon/moon-photo.jpg"
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
          To the girl who's shining brighter in the pic as it like a moon in the sky, may your days be filled with happiness,
          your dreams find their way to the moon, and your
          heart always find reasons to smile.
        </p>

        <p className="final-message">
          And whenever you look up at the Moon, I hope you
          remember how beautiful you are and how brighter you are.
        </p>

        <p className="final-blessing">
          May God bless you with peace and
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
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  async function startMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setMusicOn(true);
    } catch (error) {
      console.error("Could not start birthday music:", error);
    }
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      startMusic();
    } else {
      audio.pause();
      setMusicOn(false);
    }
  }

  function goToChapter(nextChapter) {
    setChapter(nextChapter);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={`universe chapter-${chapter}`}>
  <audio
    ref={audioRef}
    src="/audio/birthday.mp3"
    loop
    preload="auto"
    onPlay={() => setMusicOn(true)}
    onPause={() => setMusicOn(false)}
  />

  <button
    type="button"
    onClick={toggleMusic}
    aria-label={musicOn ? "Pause birthday music" : "Play birthday music"}
    style={{
      position: "fixed",
      right: "18px",
      bottom: "18px",
      zIndex: 9999,
      borderRadius: "50%",
      width: "48px",
      height: "48px",
      border: "1px solid rgba(255,255,255,0.35)",
      background: "rgba(35,20,60,0.85)",
      color: "white",
      cursor: "pointer",
      fontSize: "20px",
      backdropFilter: "blur(10px)"
    }}
  >
    {musicOn ? "Ⅱ" : "♫"}
  </button>

  <Atmosphere />

      {chapter === "welcome" && (
        <Welcome
  onBegin={() => {
    startMusic();
    goToChapter("arrival");
  }}
/>
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

