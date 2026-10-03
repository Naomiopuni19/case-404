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
        subject_line: "Your A.F.I.A. Group Application - Decision",
        decision_message:
          "After careful review of your assessment, we are pleased to inform you that you have been selected to move forward in the hiring process for the Security Operations Center Analyst role. Please log back in to complete your candidate profile and finalize your onboarding.",
      }
    : {
        to_email: toEmail,
        candidate_name: toName,
        subject_line: "Your A.F.I.A. Group Application - Decision",
        decision_message:
          "Thank you for taking the time to complete the assessment for the Security Operations Center Analyst role. After careful review, we have decided not to move forward with your application at this time. We encourage you to reapply in the future.",
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