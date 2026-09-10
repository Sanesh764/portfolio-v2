/**
 * Certificate Configuration
 * 
 * To add a new certificate PDF to your portfolio:
 * 1. Place the PDF file in the `public` folder (e.g., `public/my-certificate.pdf`).
 * 2. Add an entry to the `pdfCertificates` array below with the required fields:
 *    - id: unique string identifier
 *    - title: full title of the certificate
 *    - org: issuing institution or organization
 *    - date: date of completion / issue (e.g., "September 2026", "Jan-Apr 2026")
 *    - category: category tag (e.g., "AWS", "NPTEL", "Cloud", "Programming", "Course")
 *    - pdfUrl: path starting with '/' (e.g., "/my-certificate.pdf")
 *    - preview: optional preview image path (e.g., "/certificate-previews/my-certificate.png")
 *    - credentialId: optional credential verification number / roll number
 */

export const pdfCertificates = [
  {
    id: 'aws-cloud-practitioner-clf-c02',
    title: 'AWS Certified Cloud Practitioner (CLF-C02) - Official Practice Question Set',
    org: 'AWS Training & Certification',
    date: 'September 2026',
    category: 'AWS',
    pdfUrl: '/666471f4-2ad1-4dad-b045-46ad2d40d910.pdf',
    preview: '/certificate-previews/666471f4-2ad1-4dad-b045-46ad2d40d910.png',
    credentialId: '666471f4-2ad1-4dad-b045-46ad2d40d910',
    badge: 'AWS Official'
  },
  {
    id: 'aws-developer-intro-learning-plan',
    title: 'AWS Developer - Introduction to AWS Developer Learning Plan',
    org: 'AWS Training & Certification',
    date: 'July 2026',
    category: 'AWS',
    pdfUrl: '/aws-developer_training.pdf',
    preview: '/certificate-previews/aws-developer_training.png',
    credentialId: 'AWS-DEV-LP',
    badge: 'AWS Official'
  },
  {
    id: 'aws-developer-intro-being-developer',
    title: 'AWS Developer - Introduction to Being an AWS Developer',
    org: 'AWS Training & Certification',
    date: 'September 2026',
    category: 'AWS',
    pdfUrl: '/b6e1740a-cc8f-40a6-a8b8-d0b54dacb491.pdf',
    preview: '/certificate-previews/b6e1740a-cc8f-40a6-a8b8-d0b54dacb491.png',
    credentialId: 'b6e1740a-cc8f-40a6-a8b8-d0b54dacb491',
    badge: 'AWS Official'
  },
  {
    id: 'nptel-cloud-computing',
    title: 'Cloud Computing (Elite Certification - Score: 79%)',
    org: 'NPTEL (IIT Kharagpur)',
    date: 'Jan – Apr 2026',
    category: 'Cloud',
    pdfUrl: '/NPTEL26CS55S96310012404857030.pdf',
    preview: '/certificate-previews/NPTEL26CS55S96310012404857030.png',
    credentialId: 'NPTEL26CS55S963100124',
    badge: 'Elite Credential'
  },
  {
    id: 'nptel-internet-of-things',
    title: 'Introduction to Internet of Things (Elite Certification - Score: 84%)',
    org: 'NPTEL (IIT Kharagpur)',
    date: 'Jan – Apr 2026',
    category: 'IoT',
    pdfUrl: '/NPTEL_RESULT.pdf',
    preview: '/certificate-previews/NPTEL_RESULT.png',
    credentialId: 'NPTEL26CS37S763100069',
    badge: 'Elite Credential'
  },
  {
    id: 'pw-skills-decode-cpp-dsa',
    title: 'Decode C++ with Data Structures & Algorithms',
    org: 'Physics Wallah (PW Skills)',
    date: 'August 2025',
    category: 'Programming',
    pdfUrl: '/672b1fce-cb82-4147-ab9b-3d2122f7e40b.pdf',
    preview: '/certificate-previews/672b1fce-cb82-4147-ab9b-3d2122f7e40b.png',
    credentialId: '672b1fce-cb82-4147-ab9b-3d2122f7e40b',
    badge: 'Verified Course'
  }
];

export default pdfCertificates;
