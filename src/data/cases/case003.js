// CASE 003 - Blackout
// All content is fictional. A.F.I.A. Group is a simulated company.

export const case003 = {
  incident: {
    id: 'INC-0044',
    caseName: 'Blackout',
    type: 'Insider Threat and Log Tampering',
    severity: 'CRITICAL',
    assigned: 'ANALYST-07',
    affectedUser: 'Daniel Quaye',
    affectedUsername: 'd.quaye',
    affectedEndpoint: 'ITO-ADMIN-03',
    firstDetected: '23:21:10',
    divisionLabel: 'A.F.I.A. Group IT Operations',
  },

  stageIntervalMs: 20000,

  attackStages: [
    { id: 'after-hours-login', time: '22:52:30', label: 'Privileged login to ITO-ADMIN-03 outside working hours', icon: 'login', revealed: true },
    { id: 'logging-disabled', time: '23:05:14', label: 'Audit logging service stopped on DB-PROD-01', icon: 'shieldoff', revealed: true },
    { id: 'backups-deleted', time: '23:12:40', label: 'Scheduled backup jobs deleted on BKP-01', icon: 'file', revealed: true },
    { id: 'db-export', time: '23:20:05', label: 'Customer accounts table exported from DB-PROD-01', icon: 'terminal', revealed: true },
    { id: 'sample-emailed', time: '23:22:30', label: 'Data sample emailed to a personal address', icon: 'mail', revealed: false },
    { id: 'archive-encrypted', time: '23:31:50', label: 'Export compressed and encrypted on ITO-ADMIN-03', icon: 'lock', revealed: false },
    { id: 'exfil', time: '23:38:15', label: 'Large outbound transfer (850MB) to 203.0.113.58', icon: 'upload', revealed: false },
    { id: 'outage', time: '23:52:00', label: 'Production database service shut down, platform outage', icon: 'network', revealed: false },
  ],

  liveEvents: [
    { time: '23:05:14', category: 'ENDPOINT', severity: 'critical', summary: 'Audit logging service stopped', detail: 'Host: DB-PROD-01  |  Account: d.quaye' },
    { time: '23:12:40', category: 'FILE ACCESS', severity: 'critical', summary: 'Backup jobs deleted', detail: 'Host: BKP-01  |  14 scheduled jobs removed' },
    { time: '23:20:05', category: 'ENDPOINT', severity: 'high', summary: 'Database export started', detail: 'Host: DB-PROD-01  |  Table: customer_accounts' },
    { time: '23:21:10', category: 'NETWORK', severity: 'medium', summary: 'Unusual internal transfer', detail: 'DB-PROD-01 to ITO-ADMIN-03  |  850MB' },
    { time: '23:22:30', category: 'EMAIL', severity: 'medium', summary: 'Outbound email to external address', detail: 'From: d.quaye@afia.com  |  Attachment: customer_sample.csv' },
  ],

  laterEvents: [
    { time: '23:31:50', category: 'ENDPOINT', severity: 'high', summary: 'Archive created and encrypted', detail: 'Host: ITO-ADMIN-03  |  File: q3_review.7z' },
    { time: '23:38:15', category: 'NETWORK', severity: 'critical', summary: 'Large outbound transfer', detail: '850MB to 203.0.113.58  |  Port 443' },
    { time: '23:52:00', category: 'ENDPOINT', severity: 'critical', summary: 'Database service stopped', detail: 'Host: DB-PROD-01  |  Platform outage' },
  ],

  siemLogs: [
    { time: '22:52:30', user: 'd.quaye', event: 'Login success: ITO-ADMIN-03 (outside working hours)', sourceIp: '10.40.2.15', severity: 'high' },
    { time: '23:05:14', user: 'd.quaye', event: 'Service stopped: audit logging on DB-PROD-01', sourceIp: '10.40.2.15', severity: 'critical' },
    { time: '23:12:40', user: 'd.quaye', event: 'Backup jobs deleted on BKP-01', sourceIp: '10.40.2.15', severity: 'critical' },
    { time: '23:20:05', user: 'd.quaye', event: 'Database export: customer_accounts', sourceIp: '10.40.2.15', severity: 'high' },
    { time: '23:22:30', user: 'd.quaye', event: 'Email sent to external address', sourceIp: '10.40.2.15', severity: 'medium' },
    { time: '23:31:50', user: 'd.quaye', event: 'Process created: 7z.exe', sourceIp: '10.40.2.15', severity: 'high' },
    { time: '23:38:15', user: 'd.quaye', event: 'Outbound connection: 203.0.113.58', sourceIp: '10.40.2.15', severity: 'critical' },
    { time: '18:04:11', user: 'd.quaye', event: 'Logout', sourceIp: '10.40.2.15', severity: 'low' },
    { time: 'yesterday', user: 'd.quaye', event: 'Login success', sourceIp: '10.40.2.15', severity: 'low' },
    { time: 'yesterday', user: 'p.asare', event: 'VPN connect', sourceIp: '10.40.9.21', severity: 'low' },
  ],

  threatIntel: {
    ip: {
      '203.0.113.58': {
        reputation: 'HIGH RISK',
        firstObserved: '2026-09-18',
        campaigns: 2,
        activity: ['Anonymous file hosting', 'Linked to earlier data theft incidents'],
      },
      '10.40.2.15': {
        reputation: 'INTERNAL',
        firstObserved: '-',
        campaigns: 0,
        activity: ['Internal host ITO-ADMIN-03'],
      },
    },
    domain: {
      'dropvault-share.net': { reputation: 'HIGH RISK', firstObserved: '2026-09-16', campaigns: 2, activity: ['Anonymous file hosting', 'Used to receive stolen data'] },
    },
    hash: {
      'b17e9d3c5a204f68c1d8e0a7f2394b55': { reputation: 'HIGH RISK', firstObserved: '2026-10-02', campaigns: 1, activity: ['Encrypted archive of database export', 'Matches q3_review.7z on ITO-ADMIN-03'] },
    },
  },

  endpoints: [
    {
      hostname: 'ITO-ADMIN-03',
      status: 'compromised',
      user: 'Daniel Quaye',
      processes: [
        { name: 'chrome.exe', malicious: false },
        { name: 'outlook.exe', malicious: false },
        { name: 'powershell.exe', malicious: true },
        { name: '7z.exe', malicious: true },
      ],
      connections: [
        { ip: '203.0.113.58', malicious: true },
        { ip: '10.40.10.5', malicious: false },
      ],
      files: [
        { name: 'meeting_notes.docx', malicious: false },
        { name: 'export_customers.ps1', malicious: true },
        { name: 'q3_review.7z', malicious: true },
      ],
    },
    {
      hostname: 'DB-PROD-01',
      status: 'at risk',
      user: 'Production database server',
      processes: [
        { name: 'sqlservr.exe', malicious: false },
        { name: 'stop_audit.ps1', malicious: true },
      ],
      connections: [
        { ip: '10.40.2.15', malicious: true },
      ],
      files: [
        { name: 'customer_accounts.bak', malicious: false },
        { name: 'stop_audit.ps1', malicious: true },
      ],
    },
    {
      hostname: 'BKP-01',
      status: 'at risk',
      user: 'Backup server',
      processes: [
        { name: 'backupagent.exe', malicious: false },
      ],
      connections: [
        { ip: '10.40.2.15', malicious: true },
      ],
      files: [
        { name: 'job_schedule.cfg', malicious: false },
        { name: 'deleted_jobs.log', malicious: true },
      ],
    },
  ],

  email: {
    from: 'd.quaye@afia.com',
    to: 'dquaye.private@mailbox-ghana.net',
    subject: 'Sample extract',
    received: '23:22:30',
    body: `Sending a small sample so you can check the format. The full extract is nearly ready and I will send it tonight. Please confirm your contact is still interested before I go further.\n\nAttachment: customer_sample.csv\n\nDaniel`,
    suspiciousElements: [
      { label: 'External recipient', note: 'A company account is sending customer data to a personal address outside A.F.I.A. Group' },
      { label: 'Customer data attachment', note: 'customer_sample.csv contains real customer records and should never leave the company network' },
      { label: 'Timing and context', note: 'Sent after hours, minutes after audit logging was switched off and the backups were deleted' },
    ],
  },

  evidencePieces: [
    { id: 'after-hours-login', label: 'Privileged login outside working hours', source: 'SIEM', connectsTo: null },
    { id: 'logging-disabled', label: 'Audit logging switched off', source: 'Endpoint', connectsTo: 'after-hours-login' },
    { id: 'backups-deleted', label: 'Backup jobs deleted', source: 'Endpoint', connectsTo: 'logging-disabled' },
    { id: 'db-export', label: 'Customer database exported', source: 'Timeline', connectsTo: 'backups-deleted' },
    { id: 'exfil', label: 'Data exfiltration (850MB)', source: 'Network', connectsTo: 'db-export' },
  ],

  actionsCatalog: [
    {
      id: 'disable-account',
      label: 'Disable account',
      target: 'd.quaye',
      kind: 'critical-response',
      consequence: 'Privileged access suspended. The account can no longer reach the database or backup servers.',
    },
    {
      id: 'isolate-endpoint',
      label: 'Isolate endpoint',
      target: 'ITO-ADMIN-03',
      kind: 'critical-response',
      consequence: 'Admin workstation removed from the network. The outbound transfer is cut off.',
    },
    {
      id: 'block-ip',
      label: 'Block indicator',
      target: '203.0.113.58',
      kind: 'critical-response',
      consequence: 'Traffic to the external file host blocked at the firewall.',
    },
    {
      id: 'revoke-session',
      label: 'Revoke session',
      target: 'Session #90317',
      kind: 'supporting',
      consequence: 'Active admin session terminated. A new login will need fresh authentication.',
    },
    {
      id: 'restore-logging',
      label: 'Restore audit logging',
      target: 'DB-PROD-01',
      kind: 'supporting',
      consequence: 'Audit logging restarted so further activity on the database is recorded.',
    },
    {
      id: 'escalate',
      label: 'Escalate to IR',
      target: null,
      kind: 'escalation',
      consequence: 'Incident handed to the Incident Response and HR teams for a formal insider investigation.',
    },
  ],

  criticalActions: ['disable-account', 'isolate-endpoint', 'block-ip'],
  defaultThreatIntelQuery: '203.0.113.58',
  breachToastText: 'The customer database was exported and the platform taken offline. Containment came too late for this stage.',

  briefingIntro: [
    "Several systems inside A.F.I.A. Group IT Operations have stopped reporting. Audit logging on the production database went silent, the nightly backups disappeared, and a large internal data transfer has just started. All of it traces back to one trusted administrator account.",
    "You have been assigned as primary analyst. The activity is still in progress, and the person behind it knows exactly how the systems work. Nobody has told you what happened. That is for you to determine.",
  ],

  caseFileNarrative: "Several systems within A.F.I.A. Group IT Operations have stopped reporting. Audit logging on DB-PROD-01 was switched off, scheduled jobs on BKP-01 were deleted, and a large export of customer data has begun from an administrator workstation. All activity is linked to a single privileged account. Investigate the SIEM, email system, affected endpoints and network activity to determine who is responsible, what data is leaving, and whether the incident can still be contained before the platform is taken offline.",

  networkTopology: {
    user: { label: 'd.quaye', sub: 'Privileged user' },
    primary: { label: 'ITO-ADMIN-03', subCompromised: 'Compromised', subContained: 'Isolated' },
    external: { label: '203.0.113.58', sub: 'External IP' },
    bottom: [
      { label: 'DB-PROD-01', sub: '10.40.10.5' },
      { label: 'BKP-01', sub: '10.40.10.9' },
    ],
  },

  threatMapConfig: {
    sourceIp: '203.0.113.58',
    destHostname: 'ITO-ADMIN-03',
    destInternalIp: '10.40.2.15',
  },

  objectives: [
    { n: 1, title: 'Valid Account Abuse', sub: 'Privileged login outside working hours', throughStage: 0 },
    { n: 2, title: 'Defense Evasion', sub: 'Audit logging disabled', throughStage: 1 },
    { n: 3, title: 'Impact Preparation', sub: 'Backups destroyed', throughStage: 2 },
    { n: 4, title: 'Collection', sub: 'Customer database exported', throughStage: 5 },
    { n: 5, title: 'Exfiltration and Disruption', sub: 'External transfer and outage', throughStage: 7 },
  ],

  feedbackTexts: {
    emailGood: 'Reviewed the outbound email and recognised customer data being sent to a personal address.',
    emailMissed: 'The outbound email was never opened, so the data theft channel went unverified.',
    endpointGood: 'Inspected ITO-ADMIN-03 and found the export script and the encrypted archive.',
    endpointMissed: 'The administrator workstation was never inspected directly.',
    intelGood: 'Checked threat intelligence on the external file hosting address.',
    intelMissed: 'No threat intelligence lookups were run on the external IP or domain involved.',
  },
}