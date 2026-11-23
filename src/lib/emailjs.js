import emailjs from "@emailjs/browser"

const PUBLIC_KEY = "ltvsT_jQ15vSHuHIY"
const SERVICE_ID = "service_d1iyg9n"
const DECISION_TEMPLATE_ID = "template_vp9ji0m"
const NOTIFICATION_TEMPLATE_ID = "template_jzgzrqh"

emailjs.init({ publicKey: PUBLIC_KEY })

export function sendDecisionEmail({ toEmail, toName, passed }) {
  const params = passed
    ? {
        to_email: toEmail,
        candidate_name: toName,
        subject_line: "Your A.F.I.A. Group Application Decision",
        decision_heading: "Congratulations, " + toName + ".",
        decision_message:
          "Your assessment has been reviewed. We are pleased to inform you that you have been selected to proceed to the next stage of the recruitment process for the Junior SOC Analyst position.",
        status_label: "Selected",
        status_color: "#1E8E5A",
        next_step: "Complete your candidate profile",
        cta_text: "Complete Your Profile",
      }
    : {
        to_email: toEmail,
        candidate_name: toName,
        subject_line: "Your A.F.I.A. Group Application Decision",
        decision_heading: "Thank you, " + toName + ".",
        decision_message:
          "Thank you for completing the assessment for the Junior SOC Analyst position. After careful review, we will not be moving forward with your application at this time. You are welcome to apply again.",
        status_label: "Not selected",
        status_color: "#6B7A8C",
        next_step: "You may apply again",
        cta_text: "Return to the Portal",
      }

  return emailjs.send(SERVICE_ID, DECISION_TEMPLATE_ID, params)
}

export function sendNotificationEmail({ toEmail, toName, subjectLine, heading, message, severity }) {
  const params = {
    to_email: toEmail,
    recipient_name: toName,
    subject_line: subjectLine,
    heading: heading,
    message_body: message,
    severity: severity || "INFO",
  }

  return emailjs.send(SERVICE_ID, NOTIFICATION_TEMPLATE_ID, params)
}