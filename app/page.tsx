const fireflies = [
  { x: "9%", y: "22%", delay: "-2.1s", duration: "8s" },
  { x: "18%", y: "68%", delay: "-5.4s", duration: "11s" },
  { x: "31%", y: "19%", delay: "-7.2s", duration: "9s" },
  { x: "42%", y: "77%", delay: "-3.8s", duration: "12s" },
  { x: "57%", y: "13%", delay: "-6.1s", duration: "10s" },
  { x: "68%", y: "69%", delay: "-1.4s", duration: "9s" },
  { x: "79%", y: "25%", delay: "-8.3s", duration: "13s" },
  { x: "91%", y: "61%", delay: "-4.7s", duration: "8s" }
];

function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 52" aria-hidden="true">
      <path d="M6 44C18 9 50 2 84 8 72 39 45 55 6 44Z" />
      <path d="M13 42C34 33 54 23 76 11" className="leaf-vein" />
    </svg>
  );
}

function CalendarGlyph() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="12" y="16" width="40" height="36" rx="10" />
      <path d="M12 27h40M23 11v10M41 11v10" />
      <path d="m24 39 6 6 12-13" className="task-accent" />
    </svg>
  );
}

function LetterGlyph() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="10" y="15" width="44" height="34" rx="10" />
      <path d="m14 21 18 15 18-15" />
      <path d="M15 45 27 34M49 45 37 34" />
    </svg>
  );
}

function KeyGlyph() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="22" cy="25" r="11" />
      <path d="m30 33 20 20M41 44l7-7M47 50l7-7" />
      <circle cx="22" cy="25" r="3" className="task-accent-fill" />
    </svg>
  );
}

function SunGlyph() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="11" />
      <path d="M32 7v10M32 47v10M7 32h10M47 32h10M14 14l7 7M43 43l7 7M50 14l-7 7M21 43l-7 7" />
    </svg>
  );
}

function TaskPod({
  className,
  children
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`task-pod ${className}`}>
      <div className="task-pod__halo" />
      <div className="task-pod__face">{children}</div>
      <i className="task-pod__spark task-pod__spark--one" />
      <i className="task-pod__spark task-pod__spark--two" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="garden" aria-label="OMT Assist">
      <div className="garden__sky" aria-hidden="true" />
      <div className="garden__aurora garden__aurora--one" aria-hidden="true" />
      <div className="garden__aurora garden__aurora--two" aria-hidden="true" />

      <header className="garden__masthead">
        <a className="wordmark" href="/" aria-label="OMT Assist home">
          <span className="wordmark__seed" aria-hidden="true">
            <i />
          </span>
          <span>omt assist</span>
        </a>
        <span className="masthead-sigil" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </header>

      <div className="moon" aria-hidden="true">
        <span className="moon__face">
          <i className="moon__eye moon__eye--left" />
          <i className="moon__eye moon__eye--right" />
          <i className="moon__smile" />
        </span>
      </div>

      <div className="cloud cloud--one" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="cloud cloud--two" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="vine vine--left" aria-hidden="true">
        <Leaf className="vine__leaf vine__leaf--one" />
        <Leaf className="vine__leaf vine__leaf--two" />
        <Leaf className="vine__leaf vine__leaf--three" />
      </div>
      <div className="vine vine--right" aria-hidden="true">
        <Leaf className="vine__leaf vine__leaf--one" />
        <Leaf className="vine__leaf vine__leaf--two" />
        <Leaf className="vine__leaf vine__leaf--three" />
      </div>

      {fireflies.map((fly, index) => (
        <i
          key={index}
          className="firefly"
          aria-hidden="true"
          style={
            {
              "--fly-x": fly.x,
              "--fly-y": fly.y,
              "--fly-delay": fly.delay,
              "--fly-duration": fly.duration
            } as React.CSSProperties
          }
        />
      ))}

      <section className="garden__story">
        <p className="garden__eyebrow">a quiet kind of wonderful</p>
        <h1>
          The day,
          <br />
          <em>gently handled.</em>
        </h1>
        <div className="garden__flourish" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
      </section>

      <div className="orbit-world" aria-hidden="true">
        <div className="orbit orbit--outer" />
        <div className="orbit orbit--inner" />
        <TaskPod className="task-pod--calendar">
          <CalendarGlyph />
        </TaskPod>
        <TaskPod className="task-pod--letter">
          <LetterGlyph />
        </TaskPod>
        <TaskPod className="task-pod--key">
          <KeyGlyph />
        </TaskPod>
        <TaskPod className="task-pod--sun">
          <SunGlyph />
        </TaskPod>

        <div className="keeper">
          <div className="keeper__glow" />
          <Leaf className="keeper__leaf keeper__leaf--left" />
          <Leaf className="keeper__leaf keeper__leaf--right" />
          <div className="keeper__body">
            <i className="keeper__ear keeper__ear--left" />
            <i className="keeper__ear keeper__ear--right" />
            <div className="keeper__face">
              <i className="keeper__eye keeper__eye--left" />
              <i className="keeper__eye keeper__eye--right" />
              <i className="keeper__smile" />
            </div>
            <i className="keeper__heart" />
          </div>
          <div className="keeper__shadow" />
        </div>
      </div>

      <div className="meadow" aria-hidden="true">
        <div className="meadow__hill meadow__hill--back" />
        <div className="meadow__hill meadow__hill--front" />
        <div className="mushroom mushroom--one"><i /><span /></div>
        <div className="mushroom mushroom--two"><i /><span /></div>
        <div className="flower flower--one"><i /><span /><span /><span /></div>
        <div className="flower flower--two"><i /><span /><span /><span /></div>
        <div className="grass grass--one"><i /><i /><i /></div>
        <div className="grass grass--two"><i /><i /><i /></div>
        <div className="grass grass--three"><i /><i /><i /></div>
      </div>

      <p className="garden__whisper">always nearby</p>
      <div className="garden__grain" aria-hidden="true" />
    </main>
  );
}
