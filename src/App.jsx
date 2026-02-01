import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

// ─── SVG Animals (inline, no external deps) ─────────────────────────────────

const BearSVG = ({ style }) => (
  <svg viewBox="0 0 120 120" width="120" height="120" style={style}>
    {/* ears */}
    <circle cx="30" cy="28" r="16" fill="#8B5E3C"/>
    <circle cx="30" cy="28" r="9" fill="#C4956A"/>
    <circle cx="90" cy="28" r="16" fill="#8B5E3C"/>
    <circle cx="90" cy="28" r="9" fill="#C4956A"/>
    {/* head */}
    <ellipse cx="60" cy="58" rx="38" ry="36" fill="#A0724E"/>
    {/* eyes */}
    <circle cx="44" cy="52" r="5" fill="#2C1A0E"/>
    <circle cx="76" cy="52" r="5" fill="#2C1A0E"/>
    {/* eye shine */}
    <circle cx="45.5" cy="50.5" r="2" fill="white"/>
    <circle cx="77.5" cy="50.5" r="2" fill="white"/>
    {/* muzzle */}
    <ellipse cx="60" cy="68" rx="14" ry="10" fill="#C4956A"/>
    {/* nose */}
    <ellipse cx="60" cy="64" rx="5" ry="3.5" fill="#2C1A0E"/>
    {/* mouth */}
    <path d="M60 67.5 Q55 72 51 70" fill="none" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M60 67.5 Q65 72 69 70" fill="none" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round"/>
    {/* blush */}
    <circle cx="36" cy="62" r="5" fill="#F9A0B0" opacity="0.6"/>
    <circle cx="84" cy="62" r="5" fill="#F9A0B0" opacity="0.6"/>
    {/* heart on chest */}
    <path d="M55 82 C55 78, 49 78, 49 82 C49 86, 55 90, 55 90 C55 90, 61 86, 61 82 C61 78, 55 78, 55 82Z" fill="var(--rose)"/>
  </svg>
)

const CatSVG = ({ style }) => (
  <svg viewBox="0 0 120 130" width="110" height="130" style={style}>
    {/* pointy ears */}
    <polygon points="28,42 18,8 42,35" fill="#E8A0B8"/>
    <polygon points="28,42 22,18 38,37" fill="#F5C6D8"/>
    <polygon points="92,42 102,8 78,35" fill="#E8A0B8"/>
    <polygon points="92,42 98,18 82,37" fill="#F5C6D8"/>
    {/* head */}
    <ellipse cx="60" cy="58" rx="36" ry="34" fill="#F0B8CC"/>
    {/* eyes — big, cute */}
    <ellipse cx="43" cy="52" rx="7" ry="8" fill="white"/>
    <ellipse cx="77" cy="52" rx="7" ry="8" fill="white"/>
    <ellipse cx="43" cy="53" rx="4.5" ry="5.5" fill="#3D8B5E"/>
    <ellipse cx="77" cy="53" rx="4.5" ry="5.5" fill="#3D8B5E"/>
    <ellipse cx="43" cy="54" rx="2.5" ry="3.5" fill="#1a1a1a"/>
    <ellipse cx="77" cy="54" rx="2.5" ry="3.5" fill="#1a1a1a"/>
    <circle cx="41" cy="51" r="1.8" fill="white"/>
    <circle cx="75" cy="51" r="1.8" fill="white"/>
    {/* nose */}
    <polygon points="60,63 57,60 63,60" fill="#E84D6A"/>
    {/* mouth */}
    <path d="M60 63 Q56 67 53 65" fill="none" stroke="#5c3d2e" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M60 63 Q64 67 67 65" fill="none" stroke="#5c3d2e" strokeWidth="1.2" strokeLinecap="round"/>
    {/* whiskers */}
    <line x1="20" y1="60" x2="40" y2="62" stroke="#5c3d2e" strokeWidth="1" opacity="0.5"/>
    <line x1="20" y1="64" x2="40" y2="64" stroke="#5c3d2e" strokeWidth="1" opacity="0.5"/>
    <line x1="80" y1="62" x2="100" y2="60" stroke="#5c3d2e" strokeWidth="1" opacity="0.5"/>
    <line x1="80" y1="64" x2="100" y2="64" stroke="#5c3d2e" strokeWidth="1" opacity="0.5"/>
    {/* blush */}
    <circle cx="34" cy="60" r="5" fill="#F9A0B0" opacity="0.55"/>
    <circle cx="86" cy="60" r="5" fill="#F9A0B0" opacity="0.55"/>
    {/* body hint */}
    <ellipse cx="60" cy="108" rx="28" ry="22" fill="#F0B8CC"/>
    {/* paws */}
    <ellipse cx="40" cy="125" rx="10" ry="6" fill="#F5D0DC"/>
    <ellipse cx="80" cy="125" rx="10" ry="6" fill="#F5D0DC"/>
    {/* heart */}
    <path d="M56 102 C56 98, 50 98, 50 102 C50 106, 56 110, 56 110 C56 110, 62 106, 62 102 C62 98, 56 98, 56 102Z" fill="var(--rose)"/>
  </svg>
)

const BunnySVG = ({ style }) => (
  <svg viewBox="0 0 120 160" width="100" height="160" style={style}>
    {/* long ears */}
    <ellipse cx="40" cy="38" rx="11" ry="34" fill="#F5E6E8" stroke="#E0C8CC" strokeWidth="1.5"/>
    <ellipse cx="40" cy="38" rx="6" ry="28" fill="#F9A0B0"/>
    <ellipse cx="80" cy="38" rx="11" ry="34" fill="#F5E6E8" stroke="#E0C8CC" strokeWidth="1.5"/>
    <ellipse cx="80" cy="38" rx="6" ry="28" fill="#F9A0B0"/>
    {/* head */}
    <circle cx="60" cy="72" r="32" fill="#F5E6E8"/>
    {/* eyes */}
    <circle cx="47" cy="68" r="5.5" fill="#D94060"/>
    <circle cx="73" cy="68" r="5.5" fill="#D94060"/>
    <circle cx="45.5" cy="66.5" r="2" fill="white"/>
    <circle cx="71.5" cy="66.5" r="2" fill="white"/>
    {/* nose */}
    <ellipse cx="60" cy="77" rx="3.5" ry="2.5" fill="#E84D6A"/>
    {/* mouth */}
    <path d="M60 79.5 Q56 83 53 81" fill="none" stroke="#5c3d2e" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M60 79.5 Q64 83 67 81" fill="none" stroke="#5c3d2e" strokeWidth="1.2" strokeLinecap="round"/>
    {/* blush */}
    <circle cx="38" cy="74" r="5" fill="#F9A0B0" opacity="0.55"/>
    <circle cx="82" cy="74" r="5" fill="#F9A0B0" opacity="0.55"/>
    {/* body */}
    <ellipse cx="60" cy="120" rx="30" ry="35" fill="#F5E6E8"/>
    {/* paws */}
    <ellipse cx="38" cy="148" rx="11" ry="7" fill="#F0DADA"/>
    <ellipse cx="82" cy="148" rx="11" ry="7" fill="#F0DADA"/>
    {/* heart */}
    <path d="M56 112 C56 108, 50 108, 50 112 C50 116, 56 120, 56 120 C56 120, 62 116, 62 112 C62 108, 56 108, 56 112Z" fill="var(--rose)"/>
  </svg>
)

// ─── Floating Heart ──────────────────────────────────────────────────────────

const FloatingHeart = ({ style, size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={style}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="var(--rose)" opacity="0.7"/>
  </svg>
)

// ─── Confetti Piece ──────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  'var(--rose)', 'var(--gold)', '#fff', '#F9A0B0',
  '#7EC8E3', '#A8E6CF', '#FFB347', '#C3A6FF'
]

function Confetti({ active }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const pieces = useRef([])

  const spawn = useCallback(() => {
    const w = window.innerWidth
    const count = 180
    pieces.current = []
    for (let i = 0; i < count; i++) {
      // spawn from left quarter or right quarter only
      const side = Math.random() < 0.5 ? 'left' : 'right'
      pieces.current.push({
        x: side === 'left' ? Math.random() * (w * 0.28) : w - Math.random() * (w * 0.28),
        y: window.innerHeight + Math.random() * 40,
        vx: side === 'left' ? Math.random() * 2 + 0.5 : -(Math.random() * 2 + 0.5),
        vy: -(Math.random() * 12 + 8),
        rot: Math.random() * 360,
        rotV: (Math.random() - 0.5) * 12,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        w: Math.random() * 8 + 5,
        h: Math.random() * 5 + 3,
        life: 1,
      })
    }
  }, [])

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(animRef.current)
      pieces.current = []
      return
    }
    spawn()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      // respawn burst at 60 and 120 frames for waves
      if (frame === 60 || frame === 120) spawn()

      pieces.current.forEach(p => {
        p.vy += 0.18 // gravity
        p.x += p.vx
        p.y += p.vy
        p.rot += p.rotV
        p.rotV *= 0.995

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rot * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })

      // remove off-screen
      pieces.current = pieces.current.filter(p => p.y < canvas.height + 20)

      animRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [active, spawn])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}
    />
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [popup, setPopup] = useState(null) // null | 'nah' | 'yay'

  const animals = [
    { Animal: BearSVG, label: '🐻' },
    { Animal: CatSVG, label: '🐱' },
    { Animal: BunnySVG, label: '🐰' },
  ]

  return (
    <div className="app-wrapper">
      {/* Floating background hearts */}
      {[...Array(12)].map((_, i) => (
        <FloatingHeart
          key={i}
          size={14 + (i % 4) * 8}
          style={{
            position: 'absolute',
            left: `${(i * 8.5) % 95}%`,
            top: `${(i * 13 + 5) % 85}%`,
            opacity: 0.12 + (i % 3) * 0.08,
            animation: `floatHeart ${3 + (i % 3) * 1.5}s ease-in-out ${i * 0.4}s infinite alternate`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      {/* Main card */}
      <div className="card" style={{ position: 'relative', zIndex: 1 }}>
        {/* Animal parade */}
        <div className="animal-row">
          {animals.map(({ Animal }, i) => (
            <Animal
              key={i}
              style={{
                animation: `bobAnimal 2s ease-in-out ${i * 0.35}s infinite alternate`,
                filter: 'drop-shadow(0 4px 8px rgba(92,61,46,0.18))',
              }}
            />
          ))}
        </div>

        {/* Heading */}
        <h1 className="heading">
          <span className="script-line">Hey there, handsome 💕</span>
          <span className="big-ask">Be My Valentine?</span>
        </h1>

        {/* Buttons */}
        <div className="btn-row">
          <button className="btn btn-yes" onClick={() => setPopup('nah')}>
            Yes
          </button>
          <button className="btn btn-absofreakinglutely" onClick={() => setPopup('yay')}>
            Abso-freaking-lutely
          </button>
        </div>
      </div>

      {/* ── Popup: "nah" ──────────────────────────────────────────────────── */}
      {popup === 'nah' && (
        <div className="overlay">
          <div className="popup popup-nah">
            <div className="popup-emoji">😤</div>
            <p className="popup-text">
              Nah, why aren't you excited to be my valentine?<br />
              <strong>TRY AGAIN SIR!</strong>
            </p>
            <button className="btn btn-yesmaam" onClick={() => setPopup(null)}>
              Yes ma'am
            </button>
          </div>
        </div>
      )}

      {/* ── Popup: "yay" ──────────────────────────────────────────────────── */}
      {popup === 'yay' && (
        <>
          <Confetti active={true} />
          <div className="overlay">
            <div className="popup popup-yay">
              <div className="popup-emoji">🥳✨</div>
              <p className="popup-text">
                That's the spirit!<br />
                See you <strong>February 14th.</strong>
              </p>
              <p className="popup-disclaimer">
                Disclaimer, I am an unemployed graduate so lower your expectations sir 😂
              </p>
               <button className="btn btn-yesmaam" onClick={() => setPopup(null)}>
              I'm excited!
            </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
