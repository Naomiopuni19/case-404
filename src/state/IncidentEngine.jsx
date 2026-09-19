import { createContext, useContext, useEffect, useReducer, useRef } from 'react'
import {
  attackStages,
  liveEvents,
  laterEvents,
  actionsCatalog,
} from '../data/caseData'

const CRITICAL_ACTIONS = ['disable-account', 'isolate-endpoint', 'block-ip']
const STAGE_INTERVAL_MS = 25000 // how often the attack advances if uncontained

const initialState = {
  startedAt: Date.now(),
  stageRevealCount: attackStages.filter((s) => s.revealed).length, // 4
  events: [...liveEvents],
  contained: false,
  breached: false, // true if exfiltration stage completed uncontained
  actionsTaken: [], // { id, at }
  toasts: [], // transient consequence messages
  investigated: {
    siemSearched: false,
    terminalUsed: false,
    endpointInspected: false,
    emailInspected: false,
    threatIntelLookups: [],
    evidencePinned: [],
  },
  reportSubmitted: false,
  view: 'landing', // landing | briefing | soc | report | performance
  activePanel: 'overview',
}

function allCriticalActionsTaken(actionsTaken) {
  return CRITICAL_ACTIONS.every((id) => actionsTaken.some((a) => a.id === id))
}

function reducer(state, action) {
  switch (action.type) {
    case 'GO_TO': {
      return { ...state, view: action.view }
    }
    case 'SET_PANEL': {
      return { ...state, activePanel: action.panel }
    }
    case 'TICK_STAGE': {
      if (state.contained || state.breached) return state
      const nextIndex = state.stageRevealCount
      if (nextIndex >= attackStages.length) return state
      const newStage = attackStages[nextIndex]
      const newEvents = laterEvents.filter((e) => e.time === newStage.time)
      const justBreached = newStage.id === 'exfil'
      return {
        ...state,
        stageRevealCount: nextIndex + 1,
        events: [...state.events, ...newEvents],
        breached: justBreached,
        toasts: justBreached
          ? [...state.toasts, { id: `breach-${Date.now()}`, tone: 'critical', text: 'Attacker completed data exfiltration. Containment came too late for this stage.' }]
          : state.toasts,
      }
    }
    case 'TAKE_ACTION': {
      const def = actionsCatalog.find((a) => a.id === action.id)
      if (!def) return state
      if (state.actionsTaken.some((a) => a.id === action.id)) return state
      const actionsTaken = [...state.actionsTaken, { id: action.id, at: Date.now() }]
      const nowContained = !state.breached && allCriticalActionsTaken(actionsTaken)
      const toast = { id: `${action.id}-${Date.now()}`, tone: 'ok', text: def.consequence }
      const containedToast = nowContained
        ? [{ id: `contained-${Date.now()}`, tone: 'ok', text: 'Incident contained. The attack chain has been broken.' }]
        : []
      return {
        ...state,
        actionsTaken,
        contained: nowContained || state.contained,
        toasts: [...state.toasts, toast, ...containedToast],
      }
    }
    case 'DISMISS_TOAST': {
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) }
    }
    case 'SIEM_SEARCHED': {
      return { ...state, investigated: { ...state.investigated, siemSearched: true } }
    }
    case 'TERMINAL_USED': {
      return { ...state, investigated: { ...state.investigated, terminalUsed: true } }
    }
    case 'ENDPOINT_INSPECTED': {
      return { ...state, investigated: { ...state.investigated, endpointInspected: true } }
    }
    case 'EMAIL_INSPECTED': {
      return { ...state, investigated: { ...state.investigated, emailInspected: true } }
    }
    case 'THREAT_INTEL_LOOKUP': {
      const lookups = state.investigated.threatIntelLookups.includes(action.value)
        ? state.investigated.threatIntelLookups
        : [...state.investigated.threatIntelLookups, action.value]
      return { ...state, investigated: { ...state.investigated, threatIntelLookups: lookups } }
    }
    case 'PIN_EVIDENCE': {
      const pinned = state.investigated.evidencePinned.includes(action.id)
        ? state.investigated.evidencePinned
        : [...state.investigated.evidencePinned, action.id]
      return { ...state, investigated: { ...state.investigated, evidencePinned: pinned } }
    }
    case 'SUBMIT_REPORT': {
      return { ...state, reportSubmitted: true, report: action.report, view: 'performance' }
    }
    default:
      return state
  }
}

const EngineContext = createContext(null)

export function IncidentEngineProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const timerRef = useRef(null)

  useEffect(() => {
    if (state.view !== 'soc') return
    if (state.contained || state.breached) return
    timerRef.current = setInterval(() => {
      dispatch({ type: 'TICK_STAGE' })
    }, STAGE_INTERVAL_MS)
    return () => clearInterval(timerRef.current)
  }, [state.view, state.contained, state.breached])

  return (
    <EngineContext.Provider value={{ state, dispatch }}>
      {children}
    </EngineContext.Provider>
  )
}

export function useIncidentEngine() {
  const ctx = useContext(EngineContext)
  if (!ctx) throw new Error('useIncidentEngine must be used within IncidentEngineProvider')
  return ctx
}

export function computeScore(state) {
  const { investigated, actionsTaken, contained, breached, report } = state

  const detection = 100 // they opened the incident
  const investigation = Math.min(
    100,
    (investigated.siemSearched ? 25 : 0) +
      (investigated.terminalUsed ? 20 : 0) +
      (investigated.endpointInspected ? 25 : 0) +
      (investigated.emailInspected ? 30 : 0)
  )
  const correlation = Math.min(100, investigated.evidencePinned.length * 20 + investigated.threatIntelLookups.length * 15)
  const response = Math.min(
    100,
    actionsTaken.filter((a) => CRITICAL_ACTIONS.includes(a.id)).length * 30 +
      actionsTaken.filter((a) => !CRITICAL_ACTIONS.includes(a.id)).length * 5
  )
  const containment = contained ? 100 : breached ? 35 : 60
  const reportFields = report ? Object.values(report).filter((v) => v && v.trim().length > 0).length : 0
  const documentation = Math.min(100, reportFields * 14)

  const overall = Math.round(
    (detection + investigation + correlation + response + containment + documentation) / 6
  )

  let rating = 'TRAINEE'
  if (overall >= 90) rating = 'SENIOR ANALYST READY'
  else if (overall >= 75) rating = 'SOC ANALYST'
  else if (overall >= 55) rating = 'JUNIOR ANALYST'

  return {
    detection,
    investigation,
    correlation,
    response,
    containment,
    documentation,
    overall,
    rating,
  }
}

export { attackStages }