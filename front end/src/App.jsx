import { useRef, useState } from 'react'
import {
  ArrowRight,
  Bell,
  Calculator,
  ClipboardList,
  Hammer,
  HardHat,
  Image,
  Layers,
  UserRound,
  UsersRound,
} from 'lucide-react'
import './App.css'

const tools = [
  { name: 'Design my space', Icon: Image, available: false },
  { name: 'Plan a renovation', Icon: Hammer, available: true },
  { name: 'Estimate cost', Icon: Calculator, available: false },
  { name: 'Find a contractor', Icon: HardHat, available: false },
]

const steps = [
  {
    title: 'Describe your project',
    description: 'Choose a room and tell us what you want to change.',
    Icon: ClipboardList,
  },
  {
    title: 'Get a renovation plan',
    description: 'See the steps in order and the materials you may need.',
    Icon: Layers,
  },
  {
    title: 'Know who can help',
    description: 'Find out when you might need a painter, plumber, or electrician.',
    Icon: UsersRound,
  },
]

function App() {
  const [showForm, setShowForm] = useState(false)
  const formHeading = useRef(null)

  function openProject() {
    setShowForm(true)
    requestAnimationFrame(() => formHeading.current?.focus())
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="./">
            <img
              className="brand-logo"
              src="/renovision-logo.jpg"
              alt="Renovision home"
            />
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="./" aria-current="page">Home</a>
            <button type="button" disabled>Design</button>
            <button
              type="button"
              aria-controls="renovation-form"
              aria-expanded={showForm}
              onClick={openProject}
            >
              Renovate
            </button>
            <button type="button" disabled>Contractors</button>
            <button type="button" disabled>Cost Estimator</button>
          </nav>

          <div className="header-actions">
            <button className="header-icon" type="button" aria-label="Notifications" disabled>
              <Bell size={22} aria-hidden="true" />
            </button>
            <button className="header-icon profile-icon" type="button" aria-label="Profile" disabled>
              <UserRound size={21} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-copy">
              <h1>Plan, design, and renovate your home</h1>
              <p>
                From repainting a room to updating lighting or plumbing,
                plan what to do, what you’ll need, and who can help.
              </p>

              <button
                className="primary-button start-project"
                type="button"
                aria-controls="renovation-form"
                aria-expanded={showForm}
                onClick={openProject}
              >
                Start your project
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="tools-panel" aria-label="Renovision tools">
              {tools.map(({ name, Icon, available }) => (
                <button
                  className="tool"
                  key={name}
                  type="button"
                  disabled={!available}
                  onClick={openProject}
                >
                  <Icon className="tool-icon" size={34} aria-hidden="true" />
                  <strong>{name}</strong>
                  {!available && <small>Coming later</small>}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="room-panel" id="renovation-form" hidden={!showForm}>
          <h2 ref={formHeading} tabIndex={-1}>Tell us about your room</h2>

          <div className="room-fields">
            <label>
              Room type
              <select defaultValue="">
                <option value="" disabled>Choose a room</option>
                <option>Living room</option>
                <option>Bedroom</option>
                <option>Kitchen</option>
                <option>Bathroom</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Length (m)
              <input type="number" min="0.01" step="any" placeholder="4" />
            </label>

            <label>
              Width (m)
              <input type="number" min="0.01" step="any" placeholder="3" />
            </label>

            <label className="room-description">
              What do you want to change?
              <textarea
                rows={3}
                placeholder="Repaint the walls and replace the ceiling light."
              />
            </label>
          </div>
        </section>

        <section className="steps" id="how-it-works" aria-label="How it works">
          {steps.map(({ title, description, Icon }) => (
            <div className="step" key={title}>
              <Icon className="step-icon" size={32} aria-hidden="true" />
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

export default App