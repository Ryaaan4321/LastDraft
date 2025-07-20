import BlueSidebarLayoutTemplate from "@/components/templates/BlueSidebarLayoutTemplate";
import CenteredLayoutTemplate from "@/components/templates/CenteredLayoutTemplate";
import MinimalistLayoutTemplate from "@/components/templates/MinimalistLayoutTemplate";
import SidebarLayoutTemplate from "@/components/templates/SidebarLayoutTemplate";
import SimpleTwoColumnTemplate from "@/components/templates/SimpleTwoColumnTemplate";


export const resumeTemplates = [
  {
    id: "modern",
    title: "Modern Developer",
    component: SidebarLayoutTemplate,
    content: {
      personalInfo: {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "+91 9999999999",
        location: "Remote, India",
        summary: "Full-stack developer with a passion for building scalable web apps.",
      },
      experience: [
        {
          title: "Software Engineer",
          company: "Tech Corp",
          startDate: "Jan 2022",
          endDate: "Present",
          description: "<ul><li>Built scalable APIs</li><li>Improved performance by 30%</li></ul>",
        },
      ],
      education: [
        {
          degree: "B.Tech in CSE",
          institution: "NIT Patna",
          startYear: "2019",
          endYear: "2023",
        },
      ],
      skills: "React, Node.js, TypeScript, MongoDB",
      projects: [
        {
          title: "Portfolio Website",
          link: "https://portfolio.example.com",
          description: "<p>Created using React and TailwindCSS. Showcases personal work and blogs.</p>",
          startDate: "2020",
          endDate: "2024"
        },
      ],
      summary: []
    },
  },
  {
    id: "blue",
    title: "Blue Sidebar Template",
    component: BlueSidebarLayoutTemplate,
    content: {
      personalInfo: {
        fullName: "Jane Smith",
        email: "jane@example.com",
        location: "Bangalore",
        summary: "Creative frontend developer with a clean design sense.",
      },
      experience: [],
      education: [],
      skills: "HTML, CSS, JavaScript, Figma",
      projects: [
        {
          title: "Portfolio Website",
          link: "https://portfolio.example.com",
          description: "<p>Created using React and TailwindCSS. Showcases personal work and blogs.</p>",
          startDate: "2020",
          endDate: "2024"
        },
      ],
      summary: [],
      extras: {
        hobbies: "",
        achievements: "",
        certifications: ""
      }
    },
  },

  {
    id: "minimalist",
    title: "Minimalist Template",
    component: MinimalistLayoutTemplate,
    content: {
      personalInfo: {
        fullName: "Jane Smith",
        email: "jane@example.com",
        location: "Bangalore",
        summary: "Creative frontend developer with a clean design sense.",
      },
      experience: [],
      education: [],
      skills: "HTML, CSS, JavaScript, Figma",
      projects: [
        {
          title: "Portfolio Website",
          link: "https://portfolio.example.com",
          description: "<p>Created using React and TailwindCSS. Showcases personal work and blogs.</p>",
          startDate: "2020",
          endDate: "2024"
        },
      ],
      summary: [],
      extras: {
        hobbies: "",
        achievements: "",
        certifications: ""
      }
    },
  },
  {
    id: "center",
    title: "Centered Template",
    component: CenteredLayoutTemplate,
    content: {
      personalInfo: {
        fullName: "Jane Smith",
        email: "jane@example.com",
        location: "Bangalore",
        summary: "Creative frontend developer with a clean design sense.",
      },
      experience: [],
      education: [],
      skills: "HTML, CSS, JavaScript, Figma",
      projects: [
        {
          title: "Portfolio Website",
          link: "https://portfolio.example.com",
          description: "<p>Created using React and TailwindCSS. Showcases personal work and blogs.</p>",
          startDate: "2020",
          endDate: "2024"
        },
      ],
      summary: [],
      extras: {
        hobbies: "",
        achievements: "",
        certifications: ""
      }
    },
  },
  {
    id: "twocolumn",
    title: "Two Column",
    component: SimpleTwoColumnTemplate,
    content: {
      personalInfo: {
        fullName: "Jane Smith",
        email: "jane@example.com",
        location: "Bangalore",
        summary: "Creative frontend developer with a clean design sense.",
      },
      experience: [],
      education: [],
      skills: "HTML, CSS, JavaScript, Figma",
      projects: [
        {
          title: "Portfolio Website",
          link: "https://portfolio.example.com",
          description: "<p>Created using React and TailwindCSS. Showcases personal work and blogs.</p>",
          startDate: "2020",
          endDate: "2024"
        },
      ],
      summary: [],
      extras: {
        hobbies: "",
        achievements: "",
        certifications: ""
      }
    },
  },
]
