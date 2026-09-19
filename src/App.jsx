import { IncidentEngineProvider, useIncidentEngine } from './state/IncidentEngine'
import Landing from './components/Landing'
import Briefing from './components/Briefing'
import Dashboard from './components/Dashboard'
import IncidentReport from './components/IncidentReport'
import PerformanceReport from './components/PerformanceReport'

function Router() {
  const { state } = useIncidentEngine()

  switch (state.view) {
    case 'landing':
      return <Landing />
    case 'briefing':
      return <Briefing />
    case 'soc':
      return <Dashboard />
    case 'report':
      return <IncidentReport />
    case 'performance':
      return <PerformanceReport />
    default:
      return <Landing />
  }
}

export default function App() {
  return (
    <IncidentEngineProvider>
      <Router />
    </IncidentEngineProvider>
  )
}