// CASE 001 - The Midnight Login
// All content is fictional. A.F.I.A. Group is a simulated company.

export const case001 = {
  incident: {
    id: 'INC-0042',
    caseName: 'The Midnight Login',
    type: 'Suspected Account Compromise',
    severity: 'CRITICAL',
    assigned: 'ANALYST-07',
    affectedUser: 'Sarah Mensah',
    affectedUsername: 's.mensah',
    affectedEndpoint: 'FIN-FINANCE-04',
    firstDetected: '03:17:42',
    divisionLabel: 'A.F.I.A. Group Finance',
  },

  stageIntervalMs: 25000,

  attackStages: [
    { id: 'phish', time: '03:11:02', label: 'Phishing email delivered', icon: 'mail', revealed: true },
    { id: 'click', time: '03:14:18', label: 'Link clicked', icon: 'cursor', revealed: true },
    { id: 'creds', time: '03:15:07', label: 'Credentials submitted', icon: 'key', revealed: true },
    { id: 'login', time: '03:17:42', label: 'Suspicious login from 185.232.41.77', icon: 'login', revealed: true },
    { id: 'powershell', time: '03:18:02', label: 'PowerShell executed on FIN-FINANCE-04', icon: 'terminal', revealed: false },
    { id: 'fileaccess', time: '03:19:15', label: 'Sensitive files accessed', icon: 'file', revealed: false },
    { id: 'exfil', time: '03:21:40', label: 'Large outbound transfer (420MB)', icon: 'upload', revealed: false },
  ],

  liveEvents: [
    { time: '03:17:42', category: 'AUTHENTICATION', severity: 'high', summary: 'Successful login', detail: 'User: s.mensah  |  Source: 185.232.41.77' },
    { time: '03:17:44', category: 'ENDPOINT', severity: 'critical', summary: 'PowerShell spawned', detail: 'Host: FIN-FINANCE-04  |  Parent: outlook.exe' },
    { time: '03:17:49', category: 'NETWORK', severity: 'high', summary: 'Outbound connection detected', detail: '10.20.4.18 -> 185.232.41.77' },
    { time: '03:18:02', category: 'FILE ACCESS', severity: 'medium', summary: 'payroll.xlsx accessed', detail: 'Host: FIN-FINANCE-04' },
    { time: '03:18:15', category: 'EMAIL', severity: 'medium', summary: 'Suspicious email detected', detail: 'From: it-support@afia-secure.com' },
  ],

  laterEvents: [
    { time: '03:19:15', category: 'FILE ACCESS', severity: 'high', summary: 'Finance share accessed', detail: 'Host: FIN-FINANCE-04  |  Q3_payroll_master.xlsx' },
    { time: '03:20:03', category: 'ENDPOINT', severity: 'critical', summary: 'Unknown binary written to disk', detail: 'C:\\Users\\s.mensah\\AppData\\Local\\Temp\\update.exe' },
    { time: '03:21:40', category: 'NETWORK', severity: 'critical', summary: 'Large outbound transfer', detail: '420MB -> 185.232.41.77  |  Port 443' },
  ],

  siemLogs: [
    { time: '03:17:42', user: 's.mensah', event: 'Login success', sourceIp: '185.232.41.77', severity: 'high' },
    { time: '02:58:31', user: 's.mensah', event: 'Email opened', sourceIp: '10.20.5.12', severity: 'medium' },
    { time: '02:51:12', user: 's.mensah', event: 'Link clicked', sourceIp: '185.232.41.77', severity: 'high' },
    { time: '01:42:07', user: 's.mensah', event: 'File accessed', sourceIp: '10.20.4.18', severity: 'medium' },
    { time: '00:23:17', user: 's.mensah', event: 'Login success', sourceIp: '10.20.5.12', severity: 'low' },
    { time: '03:18:02', user: 's.mensah', event: 'Process created: powershell.exe', sourceIp: '10.20.4.18', severity: 'critical' },
    { time: '03:19:15', user: 's.mensah', event: 'File accessed: Q3_payroll_master.xlsx', sourceIp: '10.20.4.18', severity: 'high' },
    { time: 'yesterday', user: 'd.owusu', event: 'Login success', sourceIp: '10.20.5.44', severity: 'low' },
    { time: 'yesterday', user: 'a.boateng', event: 'VPN connect', sourceIp: '10.20.9.02', severity: 'low' },
  ],

  threatIntel: {
    ip: {
      '185.232.41.77': {
        reputation: 'MALICIOUS',
        firstObserved: '2026-08-11',
        campaigns: 3,
        activity: ['Credential theft', 'Remote access', 'Data exfiltration'],
      },
      '10.20.4.18': {
        reputation: 'INTERNAL',
        firstObserved: '-',
        campaigns: 0,
        activity: ['Internal host - FIN-FINANCE-04'],
      },
    },
    domain: {
      'login-afia-secure.com': { reputation: 'HIGH RISK', firstObserved: '2026-08-09', campaigns: 2, activity: ['Credential phishing kit', 'Typosquat of afia.com'] },
      'afia-secure.com': { reputation: 'HIGH RISK', firstObserved: '2026-08-09', campaigns: 2, activity: ['Phishing infrastructure'] },
    },
    hash: {
      'e3b0c44298fc1c149afbf4c8996fb924': { reputation: 'MALICIOUS', firstObserved: '2026-08-30', campaigns: 1, activity: ['Remote access trojan', 'Matches update.exe on FIN-FINANCE-04'] },
    },
  },

  endpoints: [
    {
      hostname: 'FIN-FINANCE-04',
      status: 'compromised',
      user: 'Sarah Mensah',
      processes: [
        { name: 'chrome.exe', malicious: false },
        { name: 'outlook.exe', malicious: false },
        { name: 'excel.exe', malicious: false },
        { name: 'powershell.exe', malicious: true },
        { name: 'update.exe', malicious: true },
      ],
      connections: [
        { ip: '185.232.41.77', malicious: true },
        { ip: '10.20.10.12', malicious: false },
      ],
      files: [
        { name: 'invoice.pdf', malicious: false },
        { name: 'Q3_payroll_master.xlsx', malicious: false },
        { name: 'update.exe', malicious: true },
      ],
    },
  ],

  email: {
    from: 'it-support@afia-secure.com',
    to: 'sarah.mensah@afia.com',
    subject: 'URGENT - Password Expiration',
    received: '02:58:31',
    body: `Your A.F.I.A. Group network password expires in 24 hours. To avoid account lockout, verify your credentials immediately at the link below.\n\nlogin-afia-secure.com/verify\n\nA.F.I.A. IT Support`,
    suspiciousElements: [
      { label: 'Sender domain', note: '"afia-secure.com" is not an A.F.I.A. Group domain - typosquat of afia.com' },
      { label: 'Link destination', note: 'login-afia-secure.com does not resolve to any known A.F.I.A. asset' },
      { label: 'Urgency language', note: '"Expires in 24 hours" pressures the recipient to act without checking' },
    ],
  },

  evidencePieces: [
    { id: 'phish-email', label: 'Phishing email', source: 'Email', connectsTo: null },
    { id: 'link-clicked', label: 'Link clicked', source: 'SIEM', connectsTo: 'phish-email' },
    { id: 'cred-theft', label: 'Credential theft', source: 'Timeline', connectsTo: 'link-clicked' },
    { id: 'finance-pc', label: 'FIN-FINANCE-04 compromised', source: 'Endpoint', connectsTo: 'cred-theft' },
    { id: 'exfil', label: 'Data exfiltration (420MB)', source: 'Network', connectsTo: 'finance-pc' },
  ],

  actionsCatalog: [
    {
      id: 'disable-account',
      label: 'Disable account',
      target: 's.mensah',
      kind: 'critical-response',
      consequence: 'Unauthorized authentication stopped. The attacker can no longer use these credentials.',
    },
    {
      id: 'isolate-endpoint',
      label: 'Isolate endpoint',
      target: 'FIN-FINANCE-04',
      kind: 'critical-response',
      consequence: 'Host removed from the network. Outbound transfer and further lateral movement blocked.',
    },
    {
      id: 'block-ip',
      label: 'Block indicator',
      target: '185.232.41.77',
      kind: 'critical-response',
      consequence: 'Malicious traffic interrupted at the firewall.',
    },
    {
      id: 'revoke-session',
      label: 'Revoke session',
      target: 'Session #88421',
      kind: 'supporting',
      consequence: 'Active session terminated. A new login will require fresh authentication.',
    },
    {
      id: 'reset-credentials',
      label: 'Force password reset',
      target: 's.mensah',
      kind: 'supporting',
      consequence: 'Credentials rotated. The stolen password is no longer valid.',
    },
    {
      id: 'escalate',
      label: 'Escalate to IR',
      target: null,
      kind: 'escalation',
      consequence: 'Incident handed to the Incident Response team for deeper forensics.',
    },
  ],

  criticalActions: ['disable-account', 'isolate-endpoint', 'block-ip'],
  defaultThreatIntelQuery: '185.232.41.77',
  breachToastText: 'Attacker completed data exfiltration. Containment came too late for this stage.',

  briefingIntro: [
    "Anomalous authentication activity has been detected within A.F.I.A. Group Finance. A login to the finance environment occurred using valid credentials from an unrecognized external address, moments after a suspicious email reached the account holder.",
    "You've been assigned as primary analyst. Nobody has told you what happened - that's your job to determine. The situation is still active.",
  ],

  caseFileNarrative: "Anomalous authentication activity has been detected within A.F.I.A. Group Finance. A login to the finance environment occurred using valid credentials from an unrecognized external address. You have been assigned as primary analyst on this incident. Investigate the SIEM, email system, affected endpoint, and network activity to determine how access was obtained, what the attacker did, and whether the incident can still be contained.",

  networkTopology: {
    user: { label: 's.mensah', sub: 'User' },
    primary: { label: 'FIN-FINANCE-04', subCompromised: 'Compromised', subContained: 'Isolated' },
    external: { label: '185.232.41.77', sub: 'External IP' },
    bottom: [
      { label: 'File Server', sub: '10.20.10.12' },
      { label: 'Database', sub: '10.20.20.8' },
    ],
  },

  threatMapConfig: {
    sourceIp: '185.232.41.77',
    destHostname: 'FIN-FINANCE-04',
    destInternalIp: '10.20.4.18',
  },

  objectives: [
    { n: 1, title: 'Initial Access', sub: 'Phishing / Credential Theft', throughStage: 3 },
    { n: 2, title: 'Privilege Escalation', sub: 'Exploit vulnerable service', throughStage: 4 },
    { n: 3, title: 'Lateral Movement', sub: 'Internal network discovery', throughStage: 4 },
    { n: 4, title: 'Data Access', sub: 'Financial records / Payroll', throughStage: 5 },
    { n: 5, title: 'Exfiltration', sub: 'External transfer', throughStage: 6 },
  ],

  feedbackTexts: {
    emailGood: 'Reviewed the phishing email and identified the spoofed domain.',
    emailMissed: 'The phishing email was never opened - the initial access vector went unverified.',
    endpointGood: 'Inspected FIN-FINANCE-04 and found the malicious process and dropped file.',
    endpointMissed: 'The compromised endpoint was never inspected directly.',
    intelGood: "Checked threat intelligence on the attacker's indicators.",
    intelMissed: 'No threat intelligence lookups were run on the IP or domain involved.',
  },
}