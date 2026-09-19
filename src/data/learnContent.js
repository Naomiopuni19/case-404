export const learnSections = [
  {
    id: "networking",
    title: "Networking Fundamentals",
    topics: [
      {
        id: "ip-addressing",
        title: "IP Addressing Basics",
        body: [
          "Every device on a network needs an address so other devices know where to send data. That address is the IP address. IPv4 addresses look like four numbers separated by dots, for example 192.168.1.10, and each number ranges from 0 to 255.",
          "IP addresses fall into two groups: public and private. Public addresses are unique across the entire internet. Private addresses (like 192.168.x.x, 10.x.x.x, and 172.16.x.x through 172.31.x.x) are reused inside private networks and are not directly reachable from the internet, which is why home and office networks sit behind a router using them.",
          "When you are monitoring a network, the source and destination IP addresses in a log entry tell you who talked to whom. An internal IP suddenly reaching out to an unfamiliar external IP is one of the most basic signs analysts look for.",
        ],
        keyPoints: [
          "IPv4 addresses have four numbers from 0 to 255, separated by dots",
          "Private IP ranges include 10.x.x.x, 172.16.x.x to 172.31.x.x, and 192.168.x.x",
          "An internal device contacting an unusual external IP is a common red flag",
        ],
      },
      {
        id: "subnetting",
        title: "Subnetting and CIDR",
        body: [
          "A subnet is a smaller network carved out of a larger one. Subnetting lets an organization split its address space into manageable, isolated segments, for example separating the finance department's machines from the guest WiFi.",
          "CIDR notation is the shorthand used to describe a network's size, written as an IP address followed by a slash and a number, like 192.168.1.0/24. The number after the slash tells you how many bits are reserved for the network portion of the address, the rest are available for individual devices.",
          "A /24 network has 256 possible addresses (254 usable, since one is reserved for the network itself and one for broadcast). A /16 is much larger, with over 65000 addresses. Smaller numbers after the slash mean bigger networks.",
        ],
        keyPoints: [
          "CIDR notation like /24 tells you how large a network is",
          "A /24 network holds 254 usable addresses",
          "Subnetting isolates parts of a network from each other for security and organization",
        ],
      },
      {
        id: "tcp-ip-model",
        title: "The TCP/IP Model",
        body: [
          "Networking is often explained in layers, and TCP/IP is the practical model used across the real internet. At a basic level: the Application layer is where programs like your browser or email client operate, the Transport layer (TCP or UDP) manages how data is delivered, the Internet layer (IP) handles addressing and routing, and the Network Access layer deals with the physical connection, like Ethernet or WiFi.",
          "TCP (Transmission Control Protocol) guarantees delivery. It checks that data arrives, resends anything lost, and puts packets back in order. This makes it reliable but a bit slower, which is why it is used for things like web pages and file transfers.",
          "UDP (User Datagram Protocol) does not guarantee delivery or order. It is faster and lighter, which is why it is used for things like video calls and DNS lookups, where speed matters more than perfect reliability.",
        ],
        keyPoints: [
          "TCP is reliable and ordered, UDP is fast but not guaranteed",
          "IP handles addressing and routing between networks",
          "Most monitoring tools describe traffic in terms of these layers",
        ],
      },
      {
        id: "ports-protocols",
        title: "Common Ports and Protocols",
        body: [
          "A port is a number that tells a device which service or application incoming traffic is meant for. Combined with an IP address, a port identifies a specific conversation, for example 192.168.1.10:443 means traffic bound for HTTPS on that machine.",
          "Some ports come up constantly in monitoring work: 80 (HTTP, unencrypted web traffic), 443 (HTTPS, encrypted web traffic), 22 (SSH, remote command line access), 21 (FTP, file transfer), 25 (SMTP, email sending), 53 (DNS, domain name lookups), and 3389 (RDP, remote desktop).",
          "Seeing traffic on an unexpected port, like RDP (3389) suddenly appearing from an external IP to an internal server that has no business being remotely accessed, is a classic thing analysts flag for investigation.",
        ],
        keyPoints: [
          "Port 443 is HTTPS, port 22 is SSH, port 3389 is RDP",
          "A port plus an IP address identifies a specific service conversation",
          "Unexpected traffic on sensitive ports is worth investigating",
        ],
      },
    ],
  },
  {
    id: "monitoring",
    title: "Network Monitoring",
    topics: [
      {
        id: "siem-basics",
        title: "What a SIEM Actually Does",
        body: [
          "SIEM stands for Security Information and Event Management. In plain terms, it is a system that pulls in logs from everywhere across an organization, firewalls, servers, endpoints, applications, and puts them in one searchable place.",
          "Without a SIEM, an analyst would have to log into dozens of separate systems to piece together what happened during an incident. A SIEM correlates events automatically, so if the same suspicious IP shows up in a firewall log and an endpoint log within minutes of each other, the SIEM can flag that connection instead of relying on someone noticing it by chance.",
          "Most of the work in a SOC happens inside a SIEM: searching logs by user, IP, or time range, building timelines of what happened, and generating alerts when certain patterns occur.",
        ],
        keyPoints: [
          "A SIEM centralizes logs from across the whole organization",
          "It correlates events that would be easy to miss individually",
          "Searching and timeline building are core daily SIEM tasks",
        ],
      },
      {
        id: "log-analysis",
        title: "Logs and What to Look For",
        body: [
          "A log is simply a recorded event, a timestamp, who or what did something, and what happened. Authentication logs record logins and failures. Firewall logs record what traffic was allowed or blocked. Endpoint logs record what processes ran on a machine.",
          "When reviewing logs, a few patterns matter most: repeated failed logins followed by a success (a possible brute force that worked), logins at unusual hours or from unusual locations, a normal user account suddenly running administrative commands, and large or unusual data transfers.",
          "Context matters more than any single log line. One failed login means nothing. Fifty failed logins in two minutes followed by a successful one, from an account that never logs in at 3am, tells a story.",
        ],
        keyPoints: [
          "Logs record who did what and when, across systems",
          "Repeated failures followed by success is a classic brute force pattern",
          "A single log entry rarely tells the full story, look at the pattern around it",
        ],
      },
      {
        id: "ids-ips",
        title: "IDS vs IPS",
        body: [
          "An IDS (Intrusion Detection System) watches network traffic and alerts when it sees something matching known attack patterns. It does not block anything on its own, it just tells you something looks wrong.",
          "An IPS (Intrusion Prevention System) does the same detection but sits inline with traffic and can actively block it. The tradeoff is that a badly tuned IPS can accidentally block legitimate traffic, so it needs to be configured carefully.",
          "Both rely on signatures (known patterns of bad traffic) or anomaly detection (traffic that deviates from a learned baseline of normal behavior).",
        ],
        keyPoints: [
          "IDS detects and alerts, IPS detects and can block",
          "Both use signatures or anomaly detection to spot threats",
          "A poorly tuned IPS risks blocking legitimate traffic",
        ],
      },
      {
        id: "packet-capture",
        title: "Packet Capture Basics",
        body: [
          "Sometimes logs are not enough and you need to see the actual traffic. Packet capture (often called a pcap) records the raw data moving across a network, tools like Wireshark let you open and inspect it.",
          "A packet capture shows you source and destination addresses and ports, the protocol used, and often the actual content if it is not encrypted. Encrypted traffic (like HTTPS) still shows metadata, who talked to whom and when, even if the content itself is hidden.",
          "Packet capture is detailed and time consuming, so in practice it is used to dig into a specific suspicious connection rather than to monitor everything all the time.",
        ],
        keyPoints: [
          "Packet capture shows the actual data moving across the network",
          "Encrypted traffic still reveals metadata like source, destination, and timing",
          "It is typically used for deep investigation, not constant monitoring",
        ],
      },
    ],
  },
  {
    id: "attacks",
    title: "Common Attacks",
    topics: [
      {
        id: "phishing",
        title: "Phishing and Social Engineering",
        body: [
          "Phishing is an attempt to trick someone into giving up credentials, clicking a malicious link, or opening a malicious attachment, usually through email that looks legitimate. It remains one of the most common ways attackers get an initial foothold.",
          "Signs of phishing include a sender address that looks almost right but not quite, urgent or threatening language, unexpected attachments, and links that do not match where they claim to go.",
          "Social engineering more broadly means manipulating people rather than systems, convincing someone over the phone to reset a password, or impersonating IT support to get someone to install something.",
        ],
        keyPoints: [
          "Phishing is usually the first step attackers use to get in",
          "Watch for lookalike sender addresses, urgency, and mismatched links",
          "Social engineering targets people, not just technology",
        ],
      },
      {
        id: "malware-ransomware",
        title: "Malware and Ransomware",
        body: [
          "Malware is any software designed to cause harm, spy on a system, or give an attacker unauthorized access. It covers a wide range: viruses, worms, spyware, and trojans that disguise themselves as legitimate programs.",
          "Ransomware is a specific type of malware that encrypts a victim's files and demands payment for the decryption key. Modern ransomware often also steals data first, so even if you recover from backups, the attacker still threatens to leak what they stole.",
          "Ransomware typically spreads from an initial infected machine to others on the network, which is why isolating an infected endpoint quickly is one of the most important response actions.",
        ],
        keyPoints: [
          "Malware is a broad category, ransomware is one specific and damaging type",
          "Modern ransomware often steals data before encrypting it",
          "Fast isolation of infected machines limits how far it spreads",
        ],
      },
      {
        id: "brute-force",
        title: "Brute Force and Credential Attacks",
        body: [
          "A brute force attack tries many password combinations against an account until one works. A related technique, credential stuffing, uses username and password pairs leaked from other breaches, betting that people reuse passwords.",
          "These attacks show up in logs as a burst of failed login attempts, often against the same account or from the same source, sometimes across many accounts from many sources if it is an automated, distributed attempt.",
          "Multi factor authentication is the strongest practical defense, since even a correct password is not enough to get in without the second factor.",
        ],
        keyPoints: [
          "Brute force guesses passwords repeatedly, credential stuffing reuses leaked passwords",
          "A burst of failed logins is the typical sign in logs",
          "Multi factor authentication is the most effective defense",
        ],
      },
      {
        id: "lateral-movement",
        title: "Lateral Movement and Command and Control",
        body: [
          "Once an attacker gets a foothold on one machine, they rarely stop there. Lateral movement is the process of moving from that first compromised machine to others on the network, often using stolen credentials or exploiting trust between systems.",
          "Command and control, often shortened to C2, refers to the communication channel an attacker sets up between the compromised machine and their own infrastructure, so they can send commands and receive stolen data. This traffic often tries to blend in, mimicking normal web traffic, to avoid detection.",
          "Spotting lateral movement usually means noticing a machine that normally only talks to a handful of internal systems suddenly connecting to servers it has never touched before.",
        ],
        keyPoints: [
          "Lateral movement is how attackers spread beyond the first compromised machine",
          "C2 traffic is how attackers maintain remote control after the initial breach",
          "Unusual internal connections are a key sign of lateral movement",
        ],
      },
    ],
  },
  {
    id: "soc-ir",
    title: "SOC and Incident Response",
    topics: [
      {
        id: "soc-role",
        title: "What a SOC Analyst Actually Does",
        body: [
          "A Security Operations Center (SOC) is the team responsible for continuously monitoring an organization for threats. A SOC analyst's day usually involves reviewing alerts generated by monitoring tools, investigating the ones that look real, and either closing them as false positives or escalating them as genuine incidents.",
          "Junior analysts (often called Tier 1) typically triage the first wave of alerts, deciding what is worth a closer look. More experienced analysts investigate deeper, hunt for threats that automated tools missed, and lead the response when something serious is confirmed.",
          "It is less about dramatic hacking scenes and more about pattern recognition, patience, and knowing which small details actually matter.",
        ],
        keyPoints: [
          "A SOC continuously monitors for and responds to threats",
          "Tier 1 analysts triage, more senior analysts investigate and lead response",
          "The job relies heavily on pattern recognition and careful investigation",
        ],
      },
      {
        id: "ir-lifecycle",
        title: "The Incident Response Lifecycle",
        body: [
          "Most organizations follow a version of the same incident response lifecycle: preparation, detection and analysis, containment, eradication, recovery, and lessons learned.",
          "Preparation happens before anything goes wrong, having the right tools, playbooks, and training in place. Detection and analysis is figuring out that something happened and understanding its scope. Containment stops it from spreading further. Eradication removes the actual threat from the environment. Recovery restores normal operations. Lessons learned reviews what happened so it is less likely to happen again.",
          "This cycle repeats. Every real incident, big or small, is a chance to improve the next response.",
        ],
        keyPoints: [
          "The lifecycle: preparation, detection and analysis, containment, eradication, recovery, lessons learned",
          "Containment and eradication are different steps, stopping the spread versus removing the threat",
          "Lessons learned feeds back into better preparation for next time",
        ],
      },
      {
        id: "triage-severity",
        title: "Triage and Severity",
        body: [
          "Not every alert deserves the same urgency. Triage is the process of quickly deciding how serious something is and what to do about it first.",
          "Severity is usually judged by a combination of factors: how critical the affected system is, how far the threat has already spread, whether sensitive data is at risk, and how confident the analyst is that it is a real threat rather than a false positive.",
          "A single failed login on a test server is low severity. A confirmed ransomware execution on a finance server is critical and gets immediate, full attention.",
        ],
        keyPoints: [
          "Triage decides urgency and order of response",
          "Severity depends on system criticality, spread, data risk, and confidence level",
          "Not every alert is equally urgent, prioritization is a core skill",
        ],
      },
      {
        id: "containment-recovery",
        title: "Containment vs Eradication vs Recovery",
        body: [
          "These three steps get confused often, but they are distinct. Containment is about stopping the bleeding right now, isolating an infected machine from the network, disabling a compromised account, blocking a malicious IP at the firewall.",
          "Eradication comes after containment and means actually removing the threat, deleting malware, closing the vulnerability that let the attacker in, resetting compromised credentials.",
          "Recovery is bringing systems back to normal safely, restoring from clean backups, monitoring closely afterward to make sure the threat is really gone and did not leave anything behind.",
        ],
        keyPoints: [
          "Containment stops the spread immediately",
          "Eradication removes the actual threat and closes the entry point",
          "Recovery restores normal operations with close monitoring afterward",
        ],
      },
    ],
  },
]