// CASE 002 - Silent Spread
// All content is fictional. A.F.I.A. Group is a simulated company.

export const case002 = {
  incident: {
    id: 'INC-0043',
    caseName: 'Silent Spread',
    type: 'Ransomware Outbreak',
    severity: 'CRITICAL',
    assigned: 'ANALYST-07',
    affectedUser: 'Kwesi Antwi',
    affectedUsername: 'k.antwi',
    affectedEndpoint: 'LEG-LEGAL-02',
    firstDetected: '14:36:05',
    divisionLabel: 'A.F.I.A. Group Legal',
  },

  stageIntervalMs: 18000,

  attackStages: [
    { id: 'attachment-delivered', time: '14:30:00', label: 'Email with malicious attachment delivered', icon: 'mail', revealed: true },
    { id: 'attachment-opened', time: '14:32:40', label: 'Attachment opened on LEG-LEGAL-02', icon: 'file', revealed: true },
    { id: 'defender-disabled', time: '14:33:55', label: 'Windows Defender disabled via registry change', icon: 'shieldoff', revealed: true },
    { id: 'c2-beacon', time: '14:35:10', label: 'Beacon callback to C2 server 91.214.124.10', icon: 'network', revealed: true },
    { id: 'lateral-smb', time: '14:37:45', label: 'Lateral movement via SMB to LEG-LEGAL-05', icon: 'terminal', revealed: false },
    { id: 'encrypt-legal05', time: '14:40:20', label: 'File encryption begins on LEG-LEGAL-05', icon: 'file', revealed: false },
    { id: 'share-access', time: '14:42:50', label: 'Ransomware process accesses LEG-SHARE-01 shared drive', icon: 'network', revealed: false },
    { id: 'mass-encrypt', time: '14:45:30', label: 'Mass encryption of shared drive complete - ransom note dropped', icon: 'lock', revealed: false },
  ],

  liveEvents: [
    { time: '14:32:40', category: 'EMAIL', severity: 'medium', summary: 'Attachment opened', detail: 'Host: LEG-LEGAL-02  |  File: License_Renewal_Tool.exe' },
    { time: '14:33:55', category: 'ENDPOINT', severity: 'critical', summary: 'Security service disabled', detail: 'Host: LEG-LEGAL-02  |  Windows Defender real-time protection' },
    { time: '14:35:10', category: 'NETWORK', severity: 'critical', summary: 'Outbound beacon detected', detail: '10.30.4.22 -> 91.214.124.10' },
    { time: '14:36:05', category: 'FILE ACCESS', severity: 'high', summary: 'Mass file rename detected', detail: 'Host: LEG-LEGAL-02  |  Extension changed to .locked404' },
    { time: '14:36:20', category: 'ENDPOINT', severity: 'high', summary: 'Suspicious process flagged', detail: 'Host: LEG-LEGAL-02  |  Process: crypthelper.exe' },
  ],

  laterEvents: [
    { time: '14:37:45', category: 'NETWORK', severity: 'high', summary: 'SMB connection to peer host', detail: '10.30.4.22 -> 10.30.4.31 (LEG-LEGAL-05)' },
    { time: '14:40:20', category: 'FILE ACCESS', severity: 'critical', summary: 'Mass file rename detected', detail: 'Host: LEG-LEGAL-05  |  Extension changed to .locked404' },
    { time: '14:42:50', category: 'FILE ACCESS', severity: 'critical', summary: 'Shared drive access from infected host', detail: 'LEG-SHARE-01  |  Source: LEG-LEGAL-05' },
    { time: '14:45:30', category: 'FILE ACCESS', severity: 'critical', summary: 'Mass encryption completed', detail: 'LEG-SHARE-01  |  Ransom note dropped: READ_ME_404.txt' },
  ],

  siemLogs: [
    { time: '14:32:40', user: 'k.antwi', event: 'Attachment opened: License_Renewal_Tool.exe', sourceIp: '10.30.4.22', severity: 'medium' },
    { time: '14:33:55', user: 'k.antwi', event: 'Windows Defender disabled', sourceIp: '10.30.4.22', severity: 'critical' },
    { time: '14:35:10', user: 'k.antwi', event: 'Outbound connection: 91.214.124.10', sourceIp: '10.30.4.22', severity: 'critical' },
    { time: '14:36:05', user: 'k.antwi', event: 'Mass file rename detected (.locked404)', sourceIp: '10.30.4.22', severity: 'high' },
    { time: '14:37:45', user: 'k.antwi', event: 'SMB connection to 10.30.4.31', sourceIp: '10.30.4.22', severity: 'high' },
    { time: '14:20:00', user: 'svc.backup', event: 'Scheduled backup job started', sourceIp: '10.30.4.31', severity: 'low' },
    { time: '14:40:20', user: 'e.danso', event: 'Mass file rename detected (.locked404)', sourceIp: '10.30.4.31', severity: 'critical' },
    { time: 'yesterday', user: 'k.antwi', event: 'Login success', sourceIp: '10.30.5.02', severity: 'low' },
    { time: 'yesterday', user: 'e.danso', event: 'VPN connect', sourceIp: '10.30.9.14', severity: 'low' },
  ],

  threatIntel: {
    ip: {
      '91.214.124.10': {
        reputation: 'MALICIOUS',
        firstObserved: '2026-09-02',
        campaigns: 5,
        activity: ['Ransomware C2', 'Data extortion infrastructure'],
      },
      '10.30.4.31': {
        reputation: 'INTERNAL',
        firstObserved: '-',
        campaigns: 0,
        activity: ['Internal host - LEG-LEGAL-05'],
      },
    },
    domain: {
      'quickactivate-pro.com': { reputation: 'HIGH RISK', firstObserved: '2026-08-28', campaigns: 4, activity: ['Fake software licensing site', 'Malware distribution'] },
    },
    hash: {
      'a94f2c7e0b8d4315fa22c9e6d701bb44': { reputation: 'MALICIOUS', firstObserved: '2026-09-01', campaigns: 5, activity: ['Ransomware dropper', 'Matches License_Renewal_Tool.exe on LEG-LEGAL-02'] },
    },
  },

  endpoints: [
    {
      hostname: 'LEG-LEGAL-02',
      status: 'compromised',
      user: 'Kwesi Antwi',
      processes: [
        { name: 'outlook.exe', malicious: false },
        { name: 'winword.exe', malicious: false },
        { name: 'License_Renewal_Tool.exe', malicious: true },
        { name: 'crypthelper.exe', malicious: true },
      ],
      connections: [
        { ip: '91.214.124.10', malicious: true },
        { ip: '10.30.4.31', malicious: false },
      ],
      files: [
        { name: 'contract_draft.docx.locked404', malicious: false },
        { name: 'License_Renewal_Tool.exe', malicious: true },
      ],
    },
    {
      hostname: 'LEG-LEGAL-05',
      status: 'compromised',
      user: 'Efua Danso',
      processes: [
        { name: 'chrome.exe', malicious: false },
        { name: 'crypthelper.exe', malicious: true },
      ],
      connections: [
        { ip: '10.30.4.22', malicious: true },
      ],
      files: [
        { name: 'client_intake.xlsx.locked404', malicious: false },
      ],
    },
    {
      hostname: 'LEG-SHARE-01',
      status: 'at risk',
      user: 'Shared drive (Legal division)',
      processes: [
        { name: 'System', malicious: false },
      ],
      connections: [
        { ip: '10.30.4.31', malicious: true },
      ],
      files: [
        { name: 'Q3_case_files_master.xlsx', malicious: false },
        { name: 'READ_ME_404.txt', malicious: true },
      ],
    },
  ],

  email: {
    from: 'licensing@quickactivate-pro.com',
    to: 'k.antwi@afia.com',
    subject: 'Your Software License Renewal - Action Required',
    received: '14:28:10',
    body: `Your document editing software license expires today. To avoid losing access, download and run the attached renewal tool to reactivate your license immediately.\n\nAttachment: License_Renewal_Tool.exe\n\nQuickActivate Pro Licensing Team`,
    suspiciousElements: [
      { label: 'Sender domain', note: '"quickactivate-pro.com" is not a domain A.F.I.A. Group has any licensing relationship with' },
      { label: 'Executable attachment', note: 'A license renewal should never require running an .exe file' },
      { label: 'Urgency language', note: '"Expires today" pressures the recipient to act without verifying the sender' },
    ],
  },

  evidencePieces: [
    { id: 'malicious-attachment', label: 'Malicious attachment delivered', source: 'Email', connectsTo: null },
    { id: 'attachment-opened', label: 'Attachment opened, Defender disabled', source: 'SIEM', connectsTo: 'malicious-attachment' },
    { id: 'c2-beacon', label: 'C2 beacon established', source: 'Network', connectsTo: 'attachment-opened' },
    { id: 'lateral-spread', label: 'Lateral spread to LEG-LEGAL-05', source: 'Endpoint', connectsTo: 'c2-beacon' },
    { id: 'share-at-risk', label: 'Shared drive LEG-SHARE-01 at risk', source: 'Network', connectsTo: 'lateral-spread' },
  ],

  actionsCatalog: [
    {
      id: 'isolate-legal-02',
      label: 'Isolate endpoint',
      target: 'LEG-LEGAL-02',
      kind: 'critical-response',
      consequence: 'Patient zero removed from the network. Encryption process halted on this host.',
    },
    {
      id: 'isolate-legal-05',
      label: 'Isolate endpoint',
      target: 'LEG-LEGAL-05',
      kind: 'critical-response',
      consequence: 'Second infected host removed from the network. Lateral spread contained.',
    },
    {
      id: 'block-c2-ip',
      label: 'Block indicator',
      target: '91.214.124.10',
      kind: 'critical-response',
      consequence: 'C2 traffic blocked at the firewall. Beaconing stopped.',
    },
    {
      id: 'disable-account',
      label: 'Disable account',
      target: 'k.antwi',
      kind: 'supporting',
      consequence: 'Account access suspended pending investigation.',
    },
    {
      id: 'restore-backup',
      label: 'Initiate backup restore',
      target: 'LEG-SHARE-01',
      kind: 'supporting',
      consequence: 'Restore from last clean backup snapshot queued for the shared drive.',
    },
    {
      id: 'escalate',
      label: 'Escalate to IR',
      target: null,
      kind: 'escalation',
      consequence: 'Incident handed to the Incident Response team for deeper forensics.',
    },
  ],

  criticalActions: ['isolate-legal-02', 'isolate-legal-05', 'block-c2-ip'],
  defaultThreatIntelQuery: '91.214.124.10',
  breachToastText: 'Mass encryption of the shared drive completed. Containment came too late for this stage.',

  briefingIntro: [
    "A ransomware outbreak has been detected within A.F.I.A. Group Legal. An employee opened a malicious attachment disguised as a software license renewal, and file encryption is already spreading across the division's network.",
    "You've been assigned as primary analyst. The malware is still moving. Every machine you don't isolate in time is another set of files you won't get back.",
  ],

  caseFileNarrative: "A ransomware outbreak has been detected within A.F.I.A. Group Legal. A malicious attachment, disguised as a software license renewal tool, was opened on LEG-LEGAL-02, disabling Windows Defender and establishing contact with a command and control server. The malware is spreading laterally to other machines and has begun reaching the division's shared drive. Investigate the SIEM, email system, affected endpoints, and network activity to determine the scope of the spread and contain it before the shared drive is fully encrypted.",

  networkTopology: {
    user: { label: 'k.antwi', sub: 'User' },
    primary: { label: 'LEG-LEGAL-02', subCompromised: 'Compromised', subContained: 'Isolated' },
    external: { label: '91.214.124.10', sub: 'C2 Server' },
    bottom: [
      { label: 'LEG-LEGAL-05', sub: 'Spreading' },
      { label: 'LEG-SHARE-01', sub: 'At risk' },
    ],
  },

  threatMapConfig: {
    sourceIp: '91.214.124.10',
    destHostname: 'LEG-LEGAL-02',
    destInternalIp: '10.30.4.22',
  },

  objectives: [
    { n: 1, title: 'Initial Access', sub: 'Malicious email attachment', throughStage: 1 },
    { n: 2, title: 'Defense Evasion', sub: 'Security software disabled', throughStage: 2 },
    { n: 3, title: 'Command and Control', sub: 'Beacon to external server', throughStage: 3 },
    { n: 4, title: 'Lateral Movement', sub: 'Spread to second endpoint', throughStage: 5 },
    { n: 5, title: 'Mass Encryption', sub: 'Shared drive impact', throughStage: 7 },
  ],

  feedbackTexts: {
    emailGood: 'Reviewed the malicious attachment email and identified the fake licensing domain.',
    emailMissed: 'The delivery email was never opened - the initial access vector went unverified.',
    endpointGood: 'Inspected the infected endpoints and found the ransomware process and dropped files.',
    endpointMissed: 'The compromised endpoints were never inspected directly.',
    intelGood: "Checked threat intelligence on the C2 server and licensing domain.",
    intelMissed: 'No threat intelligence lookups were run on the C2 indicator or domain involved.',
  },
}