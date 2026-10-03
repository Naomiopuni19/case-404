import { IncidentEngineProvider, useIncidentEngine } from "./state/IncidentEngine"
import { AuthProvider, useAuth } from "./state/AuthContext"
import Auth from "./components/Auth"
import Quiz from "./components/Quiz"
import CandidateProfileForm from "./components/CandidateProfileForm"
import Landing from "./components/Landing"
import Learn from "./components/Learn"
import Profile from "./components/Profile"
import Briefing from "./components/Briefing"
import Dashboard from "./components/Dashboard"
import IncidentReport from "./components/IncidentReport"
import PerformanceReport from "./components/PerformanceReport"

function Router() {
  const { state } = useIncidentEngine()

  switch (state.view) {
    case "landing":
      return <Landing />
    case "learn":
      return <Learn />
    case "profile":
      return <Profile />
    case "briefing":
      return <Briefing />
    case "soc":
      return <Dashboard />
    case "report":
      return <IncidentReport />
    case "performance":
      return <PerformanceReport />
    default:
      return <Landing />
  }
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
  if (profile.applicationStatus !== "accepted") return <Quiz />
  if (!profile.hired) return <CandidateProfileForm />

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