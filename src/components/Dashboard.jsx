import Sidebar from './Sidebar'
import TopBar from './TopBar'
import StatBar from './StatBar'
import IncidentQueue from './IncidentQueue'
import ThreatMap from './ThreatMap'
import LiveEventStream from './LiveEventStream'
import NetworkActivity from './NetworkActivity'
import AttackerObjectives from './AttackerObjectives'
import ThreatIntelPanel from './ThreatIntelPanel'
import SiemSearch from './SiemSearch'
import Terminal from './Terminal'
import EvidenceBoard from './EvidenceBoard'
import ActionsPanel from './ActionsPanel'
import AttackTimelinePanel from './AttackTimelinePanel'
import EndpointDetail from './EndpointDetail'
import EmailDetail from './EmailDetail'
import CaseFiles from './CaseFiles'
import ReportsHistory from './ReportsHistory'
import Toasts from './Toasts'
import { Panel } from './ui'
import { useIncidentEngine } from '../state/IncidentEngine'

function Overview() {
  return (
    <div className="flex flex-col gap-3">
      <StatBar />
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
        <div className="xl:col-span-3"><div className="h-80"><IncidentQueue /></div></div>
        <div className="xl:col-span-6"><div className="h-80"><ThreatMap /></div></div>
        <div className="xl:col-span-3"><div className="h-80"><LiveEventStream /></div></div>
      </div>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
        <div className="xl:col-span-4"><div className="h-72"><ThreatIntelPanel /></div></div>
        <div className="xl:col-span-4"><div className="h-72"><NetworkActivity /></div></div>
        <div className="xl:col-span-4"><div className="h-72"><AttackerObjectives /></div></div>
      </div>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
        <div className="xl:col-span-4"><div className="h-80"><SiemSearch /></div></div>
        <div className="xl:col-span-4"><div className="h-80"><Terminal /></div></div>
        <div className="xl:col-span-4"><div className="h-80"><EvidenceBoard /></div></div>
      </div>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
        <div className="xl:col-span-6"><div className="h-72"><AttackTimelinePanel /></div></div>
        <div className="xl:col-span-6"><div className="h-72"><ActionsPanel /></div></div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { state } = useIncidentEngine()

  function renderPanel() {
    switch (state.activePanel) {
      case 'overview':
      case 'incident-workspace':
      case 'incidents':
        return <Overview />
      case 'siem':
        return <div className="h-[calc(100vh-8rem)]"><SiemSearch /></div>
      case 'network':
        return <div className="h-[calc(100vh-8rem)]"><NetworkActivity /></div>
      case 'endpoints':
        return <EndpointDetail />
      case 'email':
        return <EmailDetail />
      case 'intel':
        return <div className="mx-auto h-[520px] max-w-md"><ThreatIntelPanel /></div>
      case 'files':
        return <CaseFiles />
      case 'reports':
        return <ReportsHistory />
      default:
        return <Overview />
    }
  }

  return (
    <div className="flex h-screen bg-void">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4">{renderPanel()}</main>
      </div>
      <Toasts />
    </div>
  )
}