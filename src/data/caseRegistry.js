import { case001 } from './cases/case001'
import { case002 } from './cases/case002'
import { case003 } from './cases/case003'

export const cases = {
  'INC-0042': case001,
  'INC-0043': case002,
  'INC-0044': case003,
}

export const caseSummaries = [
  { id: case001.incident.id, type: case001.incident.type, severity: case001.incident.severity, time: case001.incident.firstDetected },
  { id: case002.incident.id, type: case002.incident.type, severity: case002.incident.severity, time: case002.incident.firstDetected },
  { id: case003.incident.id, type: case003.incident.type, severity: case003.incident.severity, time: case003.incident.firstDetected },
]

export const lockedIncidents = [
  { id: 'INC-0041', severity: 'HIGH', type: 'Suspicious PowerShell', time: '02:51', locked: true },
  { id: 'INC-0040', severity: 'MEDIUM', type: 'Unusual login', time: '02:34', locked: true },
  { id: 'INC-0039', severity: 'MEDIUM', type: 'Possible malware', time: '01:12', locked: true },
]