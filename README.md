# CASE:404

A cybersecurity Security Operations Center (SOC) simulator built for A.F.I.A. Group, a fictional financial services company. You sit down at a live SOC console with real telemetry, alerts, and an incident already in progress. Nobody tells you what happened, you have to find out and respond correctly.

## What it does

CASE:404 puts you through the full loop of a working SOC analyst:

- **Hiring assessment** - a 40 question, randomized multiple choice quiz on core cybersecurity fundamentals (networking, monitoring, common attacks, incident response). Score 80% or higher to get hired and access the console.
- **Live incident simulation** - each case is a self contained scenario with SIEM logs, a terminal, threat intelligence lookups, email analysis, endpoint detail, an attack timeline that progresses in real time, and an evidence board to reconstruct what happened.
- **Scoring engine** - your performance is scored across six categories (detection, investigation, evidence correlation, response, containment, documentation) based on what you actually did during the incident, not a scripted path.
- **Career profile** - a real account backed by Firebase, tracking your role, virtual salary balance, and solved case history.
- **Rank progression** - solving cases promotes you from Junior Analyst upward, and each new case can be gated behind passing the previous one at a minimum score.
- **Learn section** - plain language study notes on IP addressing, subnetting, the TCP/IP model, SIEM and log analysis, IDS/IPS, common attack types, and the incident response lifecycle.

## Current cases

- **Case 001, The Midnight Login** - a credential compromise incident.
- **Case 002, Silent Spread** - a ransomware outbreak, harder and faster paced than Case 001, requires passing Case 001 at 60% or higher to unlock.
- **Case 003, Blackout** - coming soon.

More cases are planned. The architecture supports adding new ones without touching the core engine.

## Tech stack

- React + Vite
- Tailwind CSS v4
- Firebase (Authentication and Firestore) for accounts and profiles
- lucide-react for icons

## Project structure
src/
data/
cases/ Individual case bundles (incident data, SIEM logs, attack stages, etc.)
caseRegistry.js Maps case IDs to their case bundle
learnContent.js Notes for the Learn section
questionBank.js Hiring quiz question pool
state/
IncidentEngine.jsx Core simulation state, scoring, and case selection
AuthContext.jsx Firebase auth, profile, pay, and rank logic
components/ All UI panels and screens
lib/
firebase.js Firebase project configuration

## Running it locally
npm install
npm run dev

The app expects a Firebase project with Authentication (Email/Password) and Firestore enabled. Configuration lives in `src/lib/firebase.js`.

## Author

Built by Naomi Opuni (Afia). [github.com/Naomiopuni19](https://github.com/Naomiopuni19)