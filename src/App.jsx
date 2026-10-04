import { IncidentEngineProvider, useIncidentEngine } from "./state/IncidentEngine"
import { AuthProvider, useAuth } from "./state/AuthContext"
import Auth from "./components/Auth"
import Quiz from "./components/Quiz"
import CandidateProfileForm from "./components/CandidateProfileForm"
import Landing from "./components/Landing"
import Learn from "./components/Learn"
import Profile from "./components/Profile"
import ThreatFeed from "./components/ThreatFeed"
import MentorChat from "./components/MentorChat"
import Briefing from "./components/Briefing"
import Dashboard from "./components/Dashboard"
import IncidentReport from "./components/IncidentReport"
import PerformanceReport from "./components/PerformanceReport"

const MENTOR_VIEWS = ["briefing", "soc", "report", "performance"]

function Router() {
  const { state } = useIncidentEngine()

  let content
  switch (state.view) {
    case "landing":
      content = <Landing />
      break
    case "learn":
      content = <Learn />
      break
    case "profile":
      content = <Profile />
      break
    case "feed":
      content = <ThreatFeed />
      break
    case "briefing":
      content = <Briefing />
      break
    case "soc":
      content = <Dashboard />
      break
    case "report":
      content = <IncidentReport />
      break
    case "performance":
      content = <PerformanceReport />
      break
    default:
      content = <Landing />
  }

  return (
    <>
      {content}
      {MENTOR_VIEWS.includes(state.view) && <MentorChat />}
    </>
  )
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-void text-ink-dim">
      <p className="text-sm">Loading...</p>
    </div>
  )
}

function Gate() {
  const { user, profile, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (!user) return <Auth />
  if (!profile) return <LoadingScreen />

  if (!profile.hired) {
    if (profile.applicationStatus !== "accepted") return <Quiz />
    return <CandidateProfileForm />
  }

  return (
    <IncidentEngineProvider>
      <Router />
    </IncidentEngineProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  )
}