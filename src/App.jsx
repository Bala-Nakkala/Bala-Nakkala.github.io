import React, { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "qa", label: "Interview Q&A" },
  { id: "contact", label: "Contact" },
  { id: "resume", label: "Resume" },
];

// మీకు మాత్రమే Remove & Upload ఆప్షన్స్ కనిపించడానికి Admin PIN (మీకు నచ్చినట్లు మార్చుకోవచ్చు)
const ADMIN_PIN = "balu123";

const INITIAL_HOSTED_RESUMES = [
  {
    id: "hosted-devops",
    name: "Bala_Krishna_DevOps_Engineer.pdf",
    url: "/Bala_Krishna_DevOps_Engineer.pdf",
    borderClass: "border-sky-400/35 bg-sky-500/[0.06]",
  },
  {
    id: "hosted-global",
    name: "Bala_Krishna_DevOps_Engineer_Global.pdf",
    url: "/Bala_Krishna_DevOps_Engineer_Global.pdf",
    borderClass: "border-purple-400/35 bg-purple-500/[0.06]",
  },
];

// Notebook sketch order:
// Row 1 (L -> R): Code -> PR -> Sonar Scan -> Build
// Row 2 (R -> L): Docker Build <- Trivy <- ECR <- Git Ops
// Row 3 (L -> R): Argo CD -> Kubernetes -> Ingress -> User
const PIPELINE_ROWS = [
  { dir: "ltr", items: ["Code", "PR", "Sonar Scan", "Build"] },
  { dir: "rtl", items: ["Docker Build", "Trivy", "ECR", "Git Ops"] },
  { dir: "ltr", items: ["Argo CD", "Kubernetes", "Ingress", "User"] },
];

const ORDERED_STAGES = [
  "Code",
  "PR",
  "Sonar Scan",
  "Build",
  "Docker Build",
  "Trivy",
  "ECR",
  "Git Ops",
  "Argo CD",
  "Kubernetes",
  "Ingress",
  "User",
];

const USER_PROJECTS = [
  {
    name: "Bala-Nakkala.github.io",
    tag: "React • Vite • GitHub Pages",
    desc: "Personal DevOps portfolio deployed via GitHub Actions and GitHub Pages with glassmorphic UI.",
    githubUrl: "https://github.com/Bala-Nakkala/Bala-Nakkala.github.io",
  },
  {
    name: "Python_for_Devops",
    tag: "Python • Automation",
    desc: "Automation scripts and operational health-check utilities built for DevOps workflows.",
    githubUrl: "https://github.com/Bala-Nakkala/Python_for_Devops",
  },
  {
    name: "GitHub-Actions-CICD",
    tag: "GitHub Actions • CI/CD",
    desc: "Automated build, test, and deployment pipelines using GitHub Actions and self-hosted runners.",
    githubUrl: "https://github.com/Bala-Nakkala/GitHub-Actions-CICD",
  },
  {
    name: "cloud-native-cicd-on-kubernetes",
    tag: "Kubernetes • Jenkins • Docker",
    desc: "End-to-end cloud-native CI/CD pipeline running dynamic build agents on Kubernetes.",
    githubUrl: "https://github.com/Bala-Nakkala/cloud-native-cicd-on-kubernetes",
  },
  {
    name: "ai-k8s-troubleshooter",
    tag: "Kubernetes • AI • Diagnostics",
    desc: "Kubernetes cluster and pod troubleshooting assistant for faster root-cause analysis.",
    githubUrl: "https://github.com/Bala-Nakkala/ai-k8s-troubleshooter",
  },
  {
    name: "Terraform-Lab",
    tag: "Terraform • IaC • Cloud",
    desc: "Infrastructure as Code modules and hands-on cloud provisioning labs using Terraform.",
    githubUrl: "https://github.com/Bala-Nakkala/Terraform-Lab",
  },
  {
    name: "springboot-gitops",
    tag: "Argo CD • GitOps • Spring Boot",
    desc: "Declarative GitOps continuous delivery workflow for Spring Boot applications on Kubernetes.",
    githubUrl: "https://github.com/Bala-Nakkala/springboot-gitops",
  },
  {
    name: "Ansible-lab",
    tag: "Ansible • Configuration Management",
    desc: "Automated server provisioning, configuration management, and rolling update playbooks.",
    githubUrl: "https://github.com/Bala-Nakkala/Ansible-lab",
  },
  {
    name: "kind-lab",
    tag: "Kubernetes • Kind • Local Cluster",
    desc: "Multi-node local Kubernetes cluster setups and testing labs powered by Kind.",
    githubUrl: "https://github.com/Bala-Nakkala/kind-lab",
  },
];

const KEY_SKILL_PILLS = [
  { name: "AWS", dot: "bg-amber-400" },
  { name: "Azure", dot: "bg-sky-400" },
  { name: "Kubernetes", dot: "bg-blue-400" },
  { name: "Docker", dot: "bg-cyan-400" },
  { name: "Jenkins", dot: "bg-rose-400" },
  { name: "GitLab", dot: "bg-orange-500" },
  { name: "GitHub", dot: "bg-neutral-200" },
  { name: "Ansible", dot: "bg-white" },
  { name: "Terraform", dot: "bg-purple-400" },
  { name: "ArgoCD", dot: "bg-orange-400" },
  { name: "CI/CD", dot: "bg-indigo-400" },
  { name: "Linux", dot: "bg-yellow-300" },
  { name: "Bash", dot: "bg-lime-400" },
  { name: "Python", dot: "bg-emerald-400" },
  { name: "Monitoring", dot: "bg-amber-500" },
];

const MULTI_COLOR_GRADIENTS = [
  "linear-gradient(90deg, #38BDF8 0%, #818CF8 48%, #E879F9 100%)",
  "linear-gradient(90deg, #F87171 0%, #FACC15 50%, #38BDF8 100%)",
  "linear-gradient(90deg, #4ADE80 0%, #22D3EE 50%, #C084FC 100%)",
  "linear-gradient(90deg, #FB923C 0%, #F472B6 50%, #60A5FA 100%)",
];

function DevOpsInfinityLogo({ className = "h-6 w-6" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
    </svg>
  );
}

function SingleWaterArrow({ direction = "right" }) {
  const rotation =
    direction === "left"
      ? "rotate-180"
      : direction === "down"
        ? "rotate-90"
        : "";

  return (
    <span
      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 text-slate-950 shadow-[0_0_16px_rgba(34,211,238,0.85)] transition-transform duration-200 ${rotation}`}
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </span>
  );
}

function SingleArrowFlowCanvas() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ORDERED_STAGES.length);
    }, 750);
    return () => clearInterval(timer);
  }, []);

  const activeStage = ORDERED_STAGES[activeIndex];
  const isTransitioningBetweenRows =
    activeIndex === 3 || activeIndex === 7;
  const downArrowRow = activeIndex === 3 ? 0 : activeIndex === 7 ? 1 : -1;

  return (
    <div className="relative select-none py-2">
      <div className="flex flex-col gap-3.5">
        {PIPELINE_ROWS.map((row, rowIdx) => {
          const isRtl = row.dir === "rtl";
          const displayItems = isRtl ? [...row.items].reverse() : row.items;
          const arrowDir = isRtl ? "left" : "right";

          return (
            <React.Fragment key={rowIdx}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                {displayItems.map((stageName) => {
                  const isHighlighted = activeStage === stageName;
                  const showArrowOnStage =
                    isHighlighted && !isTransitioningBetweenRows;

                  return (
                    <div
                      key={stageName}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-200 ${
                        isHighlighted
                          ? "scale-105 border-cyan-200 bg-gradient-to-r from-cyan-400/30 via-sky-400/25 to-blue-500/30 text-white shadow-[0_0_22px_rgba(34,211,238,0.65)]"
                          : "border-sky-300/20 bg-sky-950/30 text-sky-100/75"
                      }`}
                    >
                      {showArrowOnStage && isRtl && (
                        <SingleWaterArrow direction={arrowDir} />
                      )}
                      <span>{stageName}</span>
                      {showArrowOnStage && !isRtl && (
                        <SingleWaterArrow direction={arrowDir} />
                      )}
                    </div>
                  );
                })}
              </div>

              {rowIdx < PIPELINE_ROWS.length - 1 && (
                <div
                  className={`flex h-6 items-center ${
                    rowIdx === 0 ? "justify-end pr-8" : "justify-start pl-8"
                  }`}
                >
                  {isTransitioningBetweenRows && downArrowRow === rowIdx && (
                    <SingleWaterArrow direction="down" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function SpaceDotsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const starCount = Math.min(240, Math.floor((width * height) / 6000));
    const focalLength = 340;

    const createStar = (spawnFar = false) => ({
      x: (Math.random() - 0.5) * width * 2.2,
      y: (Math.random() - 0.5) * height * 2.2,
      z: spawnFar ? 1000 : Math.random() * 980 + 20,
      speedZ: 0.75 + Math.random() * 0.85,
      size: 0.9 + Math.random() * 1.4,
    });

    const stars = Array.from({ length: starCount }, () => createStar(false));

    let sidePassStreaks = [];
    let nextWaveAt = performance.now() + 3000;

    const spawnSidePassStreaks = () => {
      const count = Math.random() < 0.5 ? 3 : 4;
      const list = [];

      for (let i = 0; i < count; i++) {
        const isRightSide = i % 2 === 0;
        const sideSign = isRightSide ? 1 : -1;

        const xOffset = sideSign * (width * (0.28 + Math.random() * 0.42));
        const yOffset = (Math.random() - 0.5) * height * 0.85;

        list.push({
          x: xOffset,
          y: yOffset,
          z: 960,
          speedZ: 2.35 + Math.random() * 0.55,
          streakLen: 82 + Math.random() * 32,
        });
      }

      return list;
    };

    const render = (now) => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= s.speedZ;

        if (s.z <= 8) {
          stars[i] = createStar(true);
          continue;
        }

        const scale = focalLength / s.z;
        const sx = cx + s.x * scale;
        const sy = cy + s.y * scale;

        if (sx < -20 || sx > width + 20 || sy < -20 || sy > height + 20) {
          stars[i] = createStar(true);
          continue;
        }

        const dotRadius = Math.max(0.55, Math.min(3.2, s.size * scale * 0.55));
        const alpha = Math.min(1, Math.max(0.18, (1000 - s.z) / 550));

        ctx.beginPath();
        ctx.arc(sx, sy, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      if (now >= nextWaveAt) {
        sidePassStreaks.push(...spawnSidePassStreaks());
        nextWaveAt = now + 3000;
      }

      if (sidePassStreaks.length > 0) {
        const remaining = [];
        for (const st of sidePassStreaks) {
          st.z -= st.speedZ;
          if (st.z <= 6) continue;

          const scale = focalLength / st.z;
          const headX = cx + st.x * scale;
          const headY = cy + st.y * scale;

          const dx = headX - cx;
          const dy = headY - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const nx = dx / dist;
          const ny = dy / dist;

          const progress = Math.max(0, Math.min(1, (960 - st.z) / 940));
          const currentLen = Math.min(st.streakLen, 20 + progress * st.streakLen);
          const tailX = headX - nx * currentLen;
          const tailY = headY - ny * currentLen;

          const offScreen =
            (headX < -160 && tailX < -160) ||
            (headX > width + 160 && tailX > width + 160) ||
            (headY < -160 && tailY < -160) ||
            (headY > height + 160 && tailY > height + 160);

          if (offScreen) continue;

          const alpha = Math.min(0.95, 0.28 + progress * 0.68);
          const lineW = 1.3 + progress * 1.3;

          const grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          grad.addColorStop(0.5, `rgba(224, 242, 254, ${alpha * 0.7})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.strokeStyle = grad;
          ctx.lineWidth = lineW;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(headX, headY);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(headX, headY, lineW * 0.85, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          remaining.push(st);
        }
        sidePassStreaks = remaining;
      }

      animId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}

function GoogleMailLogo() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 6.5V18a1.5 1.5 0 0 0 1.5 1.5H7V10.2L12 14l5-3.8v9.3h2.5A1.5 1.5 0 0 0 21 18V6.5c0-1.2-1.35-1.9-2.3-1.2L12 10.3 5.3 5.3C4.35 4.6 3 5.3 3 6.5z"
        fill="#EA4335"
      />
      <path d="M3 6.5V18a1.5 1.5 0 0 0 1.5 1.5H7V10.2L3 7.2V6.5z" fill="#4285F4" />
      <path d="M21 6.5V18a1.5 1.5 0 0 1-1.5 1.5H17V10.2l4-3V6.5z" fill="#34A853" />
      <path d="M17 10.2l4-3V6.5c0-1.2-1.35-1.9-2.3-1.2L17 6.6v3.6z" fill="#FBBC05" />
    </svg>
  );
}

function GitHubLogo() {
  return (
    <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11.02 11.02 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg className="h-7 w-7 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
    </svg>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [activeInfoCard, setActiveInfoCard] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hostedResumes, setHostedResumes] = useState(INITIAL_HOSTED_RESUMES);
  const [resumes, setResumes] = useState([]);
  const [gradIndex, setGradIndex] = useState(0);
  const [isOwner, setIsOwner] = useState(() => {
    try {
      return localStorage.getItem("bk_portfolio_owner") === "true";
    } catch {
      return false;
    }
  });
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setGradIndex((prev) => (prev + 1) % MULTI_COLOR_GRADIENTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const blendedGradientStyle = {
    backgroundImage: MULTI_COLOR_GRADIENTS[gradIndex],
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    transition: "background-image 0.6s ease",
  };

  const toggleInfoCard = (key) => {
    setActiveInfoCard((prev) => (prev === key ? null : key));
  };

  const handleOwnerToggle = () => {
    if (isOwner) {
      setIsOwner(false);
      setShowPinPrompt(false);
      setPinInput("");
      setPinError("");
      try {
        localStorage.removeItem("bk_portfolio_owner");
      } catch {}
    } else {
      setShowPinPrompt((prev) => !prev);
      setPinInput("");
      setPinError("");
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsOwner(true);
      setShowPinPrompt(false);
      setPinInput("");
      setPinError("");
      try {
        localStorage.setItem("bk_portfolio_owner", "true");
      } catch {}
    } else {
      setPinError("Incorrect PIN");
    }
  };

  const handleResumeUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const mapped = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 6)}`,
      name: file.name,
      url: URL.createObjectURL(file),
      borderClass: "border-emerald-400/35 bg-emerald-500/[0.06]",
    }));

    setResumes((prev) => [...mapped, ...prev]);
    e.target.value = "";
  };

  const handleRemoveHostedResume = (id) => {
    setHostedResumes((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveResume = (id) => {
    setResumes((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.url) URL.revokeObjectURL(target.url);
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      <SpaceDotsBackground />

      <header className="relative z-20 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <button
            type="button"
            onClick={() => {
              setActivePage("home");
              setSelectedProject(null);
            }}
            className="flex cursor-pointer items-center gap-3 text-left transition-transform duration-200 hover:scale-[1.01] active:scale-[0.97]"
          >
            <div className="ios-glass-pill flex h-11 w-11 items-center justify-center rounded-full border-sky-400/40 text-sky-300 shadow-[0_0_22px_rgba(56,189,248,0.28)]">
              <DevOpsInfinityLogo className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold tracking-tight leading-none">
                <span style={blendedGradientStyle}>Bala Krishna</span>
              </div>
              <div className="mt-1 text-[11px] tracking-wider text-neutral-400">
                DevOps Engineer
              </div>
            </div>
          </button>

          <nav className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActivePage(item.id);
                    if (item.id !== "projects") setSelectedProject(null);
                  }}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium ${
                    isActive
                      ? "ios-glass-pill-active text-white"
                      : "ios-glass-pill text-neutral-200 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => {
              setActivePage("contact");
              setSelectedProject(null);
            }}
            className="ios-glass-pill cursor-pointer rounded-full border-fuchsia-500/60 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-[0_0_18px_rgba(217,70,239,0.32)] hover:border-fuchsia-400"
          >
            Let&apos;s Connect →
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {activePage === "home" && (
          <>
            <section className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12]">
                  Hi, I&apos;m{" "}
                  <span style={blendedGradientStyle}>Bala Krishna</span>
                  <span className="mt-1 block text-white">DevOps Engineer</span>
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm sm:text-base font-medium">
                  <span className="text-sky-400">Automating</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-purple-400">Deploying</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-fuchsia-400">Scaling</span>
                </div>

                <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-neutral-300">
                  4 years of hands-on experience in AWS, Azure, Kubernetes, CI/CD,
                  and infrastructure automation to build reliable and scalable systems.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActivePage("projects")}
                    className="ios-primary-btn cursor-pointer rounded-full bg-gradient-to-r from-sky-500 via-purple-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white"
                  >
                    View My Projects →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <SingleArrowFlowCanvas />
              </div>
            </section>

            {/* 3 Interactive iOS Glass Highlight Cards */}
            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => toggleInfoCard("experience")}
                className={`ios-glass-card flex cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left ${
                  activeInfoCard === "experience"
                    ? "border-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.28)]"
                    : "border-amber-400/35 hover:border-amber-300/75"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/25 bg-sky-500/15 text-sky-400">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold text-amber-200 leading-tight">
                    4 Years
                  </div>
                  <div className="mt-0.5 text-xs text-neutral-300">
                    DevOps Experience
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleInfoCard("cloud")}
                className={`ios-glass-card flex cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left ${
                  activeInfoCard === "cloud"
                    ? "border-purple-400 shadow-[0_0_24px_rgba(168,85,247,0.3)]"
                    : "border-purple-500/40 hover:border-purple-400/75"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-400/25 bg-purple-500/15 text-purple-400">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.5 19H7a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18.1 8.5 4 4 0 0 1 17.5 19z" />
                    <path d="M12 17v-5" />
                    <path d="m9.5 14.5 2.5-2.5 2.5 2.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-300 leading-tight">
                    AWS &amp; Azure
                  </div>
                  <div className="mt-0.5 text-xs text-neutral-300">
                    Cloud Expertise
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleInfoCard("kubernetes")}
                className={`ios-glass-card flex cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left ${
                  activeInfoCard === "kubernetes"
                    ? "border-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.3)]"
                    : "border-sky-400/40 hover:border-sky-300/75"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/25 bg-sky-500/15 text-sky-400">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polygon points="12 2 20.5 7 20.5 17 12 22 3.5 17 3.5 7" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold text-sky-300 leading-tight">
                    Kubernetes
                  </div>
                  <div className="mt-0.5 text-xs text-neutral-300">
                    Orchestration
                  </div>
                </div>
              </button>
            </section>

            {activeInfoCard === "experience" && (
              <section className="ios-glass-card mt-5 rounded-2xl border border-amber-400/35 p-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-amber-200">
                      4 Years Experience — Projects &amp; Key Achievements
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Bala Krishna Nakkala • Cloud &amp; DevOps Engineer
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveInfoCard(null)}
                    className="ios-glass-pill cursor-pointer rounded-full px-3.5 py-1 text-xs text-neutral-200"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-xs font-semibold text-sky-400">
                      TCS (2022–2026) • DevOps Engineering &amp; Production Deployment
                    </div>
                    <h3 className="mt-1 text-base font-bold text-white">
                      Government Mobile Application (200M+ Registered Users)
                    </h3>
                    <ul className="mt-2.5 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-neutral-300">
                      <li>
                        Achieved 99.9% service availability with highly available Kubernetes infrastructure on AWS and eliminated dedicated 24/7 Jenkins build servers using on-demand Kubernetes agents.
                      </li>
                      <li>
                        Reduced end-to-end production deployment time by ~83% using Kubernetes dynamic agents, Kaniko image builds, and GitOps rollouts via Argo CD &amp; Argo Rollouts.
                      </li>
                      <li>
                        Engineered AWS NLB + NGINX Ingress for centralized TLS &amp; routing, automated 300+ AWS servers with Ansible (saving ~15+ hrs manual effort), and set up Prometheus, Grafana &amp; Alertmanager.
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-xs font-semibold text-purple-300">
                      TCS (Aug &apos;22 – Jan &apos;25) • Biometric Data Processing &amp; Integration
                    </div>
                    <h3 className="mt-1 text-base font-bold text-white">
                      Biometric Data Processing Platform (200,000+ Daily Packets)
                    </h3>
                    <ul className="mt-2.5 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-neutral-300">
                      <li>
                        Delivered processed biometric data to the client&apos;s data center within 30–60 minute SLAs across production environments.
                      </li>
                      <li>
                        Migrated 3 biometric microservices to GitHub Actions CI/CD with self-hosted runners deploying to AWS EKS, and supported Apache Kafka &amp; ZooKeeper streaming on Kubernetes.
                      </li>
                      <li>
                        Built AWS NLB + redundant HAProxy routing with NodePort connectivity, automated infrastructure with Terraform, Python &amp; Shell scripting, and handled 24/7 rotational on-call &amp; RCA.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {activeInfoCard === "cloud" && (
              <section className="ios-glass-card mt-5 rounded-2xl border border-purple-500/40 p-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-purple-300">
                      AWS vs. Microsoft Azure — Services &amp; Key Differences
                    </h2>
                    <p className="text-xs text-neutral-400">
                      What exists in each cloud platform and how they differ in DevOps operations
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveInfoCard(null)}
                    className="ios-glass-pill cursor-pointer rounded-full px-3.5 py-1 text-xs text-neutral-200"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-amber-400/25 bg-white/[0.03] p-4">
                    <h3 className="text-base font-bold text-amber-300">
                      AWS (Amazon Web Services) — What It Contains
                    </h3>
                    <ul className="mt-2.5 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-neutral-300">
                      <li>
                        <strong>Compute &amp; Containers:</strong> EC2, Amazon EKS, ECR, AWS Lambda.
                      </li>
                      <li>
                        <strong>Networking &amp; Storage:</strong> VPC, S3, NLB, IAM.
                      </li>
                      <li>
                        <strong>Databases &amp; Monitoring:</strong> RDS, DynamoDB, CloudWatch.
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-sky-400/25 bg-white/[0.03] p-4">
                    <h3 className="text-base font-bold text-sky-300">
                      Microsoft Azure — What It Contains
                    </h3>
                    <ul className="mt-2.5 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-neutral-300">
                      <li>
                        <strong>Compute &amp; Containers:</strong> Azure Virtual Machines (VMs), AKS (Azure Kubernetes Service), Azure Container Registry, Azure Functions.
                      </li>
                      <li>
                        <strong>Networking &amp; Storage:</strong> Virtual Network (VNet), Blob Storage, Azure Load Balancer, Microsoft Entra ID / RBAC.
                      </li>
                      <li>
                        <strong>Databases &amp; Monitoring:</strong> Azure SQL / PostgreSQL Flexible Server, Azure Monitor &amp; Log Analytics.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="text-sm font-bold text-white">
                    Key Differences Between AWS &amp; Azure
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed text-neutral-300">
                    <li>
                      <strong>Service Naming &amp; Structure:</strong> AWS uses standalone service names (EC2, EKS, S3, IAM, CloudWatch), whereas Azure groups resources inside Resource Groups and Subscriptions with unified naming (VMs, AKS, Blob Storage, Entra ID, Azure Monitor).
                    </li>
                    <li>
                      <strong>Enterprise &amp; Hybrid Strength:</strong> Azure integrates natively with Windows Server, Active Directory / Entra ID, and on-premises hybrid setups, while AWS has the longest-running broad cloud ecosystem and deep third-party tooling support.
                    </li>
                  </ul>
                </div>
              </section>
            )}

            {activeInfoCard === "kubernetes" && (
              <section className="ios-glass-card mt-5 rounded-2xl border border-sky-400/40 p-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <div>
                    <h2 className="text-xl font-bold text-sky-300">
                      Kubernetes Orchestration Across Both Projects
                    </h2>
                    <p className="text-xs text-neutral-400">
                      How Kubernetes was used in both production project workstreams
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveInfoCard(null)}
                    className="ios-glass-pill cursor-pointer rounded-full px-3.5 py-1 text-xs text-neutral-200"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="text-base font-bold text-white">
                      Project 1: High-Availability K8s &amp; GitOps Delivery
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                      Orchestrated highly available Kubernetes clusters on AWS supporting 200M+ registered users with 99.9% availability. Ran dynamic Jenkins build agents on Kubernetes, built container images with Kaniko, exposed services through NGINX Ingress + AWS NLB, automated rollouts via Argo CD &amp; Argo Rollouts, and monitored cluster health with Prometheus &amp; Grafana.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="text-base font-bold text-white">
                      Project 2: Biometric Microservices &amp; Kafka Streaming on EKS
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                      Used AWS EKS to run automated deployments for 3 biometric microservices via GitHub Actions self-hosted runners and supported Apache Kafka &amp; ZooKeeper streaming workloads processing 200,000+ daily packets within 30–60 minute SLAs using NodePort services and HAProxy/NLB routing.
                    </p>
                  </div>
                </div>
              </section>
            )}

            <section className="mt-8 border-t border-white/10 pt-5">
              <div className="mb-3.5 flex items-center gap-2 text-sm font-bold text-white">
                <span className="text-sky-400">❖</span>
                <span>Key Skills</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {KEY_SKILL_PILLS.map((skill) => (
                  <span
                    key={skill.name}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-neutral-200 backdrop-blur-md"
                  >
                    <span className={`h-2 w-2 rounded-full ${skill.dot}`} />
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </section>
          </>
        )}

        {activePage === "projects" && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Projects</h2>
              <p className="mt-1 text-sm text-neutral-400">
                Click a project to view its GitHub repository link.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {USER_PROJECTS.map((proj) => {
                const isSelected = selectedProject === proj.name;
                return (
                  <div
                    key={proj.name}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      setSelectedProject((prev) =>
                        prev === proj.name ? null : proj.name
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedProject((prev) =>
                          prev === proj.name ? null : proj.name
                        );
                      }
                    }}
                    className={`ios-glass-card flex cursor-pointer flex-col justify-between rounded-2xl border p-5 ${
                      isSelected
                        ? "border-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.28)]"
                        : "border-white/15 hover:border-sky-400/55"
                    }`}
                  >
                    <div>
                      <div className="inline-block rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-medium text-sky-300">
                        {proj.tag}
                      </div>
                      <h3 className="mt-3 break-words text-base font-bold text-white">
                        {proj.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                        {proj.desc}
                      </p>
                    </div>

                    {isSelected && (
                      <div
                        className="mt-4 border-t border-white/15 pt-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="text-[11px] text-neutral-400">
                          GitHub Repository
                        </div>
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block break-all text-xs font-semibold text-sky-400 underline hover:text-sky-300"
                        >
                          {proj.githubUrl}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {activePage === "qa" && (
          <section className="flex min-h-[60vh] items-center justify-center">
            <div className="ios-glass-card w-full max-w-2xl rounded-3xl border border-white/15 p-10 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-400/35 bg-sky-500/10 text-sky-400">
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                <span style={blendedGradientStyle}>Uploading Very Soon...</span>
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-300">
                Real-world DevOps, Kubernetes, AWS, Terraform, and CI/CD interview
                questions &amp; practical scenarios are being curated and will be
                published here shortly.
              </p>
            </div>
          </section>
        )}

        {activePage === "resume" && (
          <section className="ios-glass-card mx-auto max-w-4xl rounded-3xl border border-white/15 p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
                  Curriculum Vitae Vault
                </p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                  <span style={blendedGradientStyle}>Bala Krishna</span> — Resumes
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {isOwner && (
                  <label className="ios-primary-btn inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-purple-500 to-fuchsia-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white">
                    <span>+ Choose Resume File</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      multiple
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                  </label>
                )}

                <button
                  type="button"
                  onClick={handleOwnerToggle}
                  title={isOwner ? "Lock Admin Mode" : "Owner Access"}
                  className={`ios-glass-pill cursor-pointer rounded-full px-3.5 py-2 text-xs font-semibold ${
                    isOwner
                      ? "border-amber-400/50 text-amber-300"
                      : "border-white/15 text-neutral-400 hover:text-white"
                  }`}
                >
                  {isOwner ? "🔓 Admin Active" : "🔒"}
                </button>
              </div>
            </div>

            {showPinPrompt && !isOwner && (
              <form
                onSubmit={handlePinSubmit}
                className="mt-4 flex flex-wrap items-center justify-end gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
              >
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Owner PIN"
                  className="rounded-full border border-white/15 bg-black/60 px-4 py-1.5 text-xs text-white placeholder-neutral-400 outline-none focus:border-sky-400"
                />
                <button
                  type="submit"
                  className="ios-glass-pill cursor-pointer rounded-full border-sky-400/50 px-4 py-1.5 text-xs font-semibold text-sky-300"
                >
                  Unlock
                </button>
                {pinError && (
                  <span className="text-xs text-rose-400">{pinError}</span>
                )}
              </form>
            )}

            <div className="mt-6 space-y-3">
              {hostedResumes.map((r) => (
                <div
                  key={r.id}
                  className={`rounded-2xl border p-4 sm:flex sm:items-center sm:justify-between sm:gap-4 ${r.borderClass}`}
                >
                  <div className="text-sm font-bold text-white">{r.name}</div>
                  <div className="mt-3 flex items-center gap-2 sm:mt-0">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ios-glass-pill rounded-full border-sky-400/40 px-3.5 py-1 text-xs font-semibold text-sky-300"
                    >
                      Open
                    </a>
                    <a
                      href={r.url}
                      download={r.name}
                      className="ios-glass-pill rounded-full border-emerald-400/40 px-3.5 py-1 text-xs font-semibold text-emerald-300"
                    >
                      Download
                    </a>
                    {isOwner && (
                      <button
                        type="button"
                        onClick={() => handleRemoveHostedResume(r.id)}
                        className="ios-glass-pill cursor-pointer rounded-full border-rose-500/40 px-3.5 py-1 text-xs font-semibold text-rose-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {resumes.map((r) => (
                <div
                  key={r.id}
                  className={`rounded-2xl border p-4 sm:flex sm:items-center sm:justify-between sm:gap-4 ${r.borderClass}`}
                >
                  <div className="text-sm font-bold text-white">{r.name}</div>
                  <div className="mt-3 flex items-center gap-2 sm:mt-0">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ios-glass-pill rounded-full border-sky-400/40 px-3.5 py-1 text-xs font-semibold text-sky-300"
                    >
                      Open
                    </a>
                    <a
                      href={r.url}
                      download={r.name}
                      className="ios-glass-pill rounded-full border-emerald-400/40 px-3.5 py-1 text-xs font-semibold text-emerald-300"
                    >
                      Download
                    </a>
                    {isOwner && (
                      <button
                        type="button"
                        onClick={() => handleRemoveResume(r.id)}
                        className="ios-glass-pill cursor-pointer rounded-full border-rose-500/40 px-3.5 py-1 text-xs font-semibold text-rose-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {isOwner && (
              <label className="ios-glass-card mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-sky-400/45 px-6 py-8 text-center hover:border-sky-400/80">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-500/10 text-sky-400">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="mt-3 text-sm font-semibold text-white">
                  Click to upload or preview additional resumes
                </div>
                <div className="mt-1 text-xs text-neutral-400">
                  Supports PDF, DOC, DOCX
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>
            )}
          </section>
        )}

        {activePage === "contact" && (
          <section className="ios-glass-card mx-auto max-w-2xl rounded-3xl border border-white/15 p-8 sm:p-10">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
                Let&apos;s Connect
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
                <span style={blendedGradientStyle}>Bala Krishna</span>
              </h2>
              <p className="mt-1.5 text-sm text-neutral-400">
                DevOps Engineer • 4 Years Experience
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:bala.nakkalan@gmail.com"
                className="ios-glass-card group flex items-center justify-between rounded-2xl border border-red-500/30 p-4 hover:border-red-400/65"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <GoogleMailLogo />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Email
                    </div>
                    <div className="mt-0.5 text-sm sm:text-base font-bold text-white group-hover:text-rose-300 transition">
                      bala.nakkalan@gmail.com
                    </div>
                  </div>
                </div>
                <span className="text-sm text-neutral-400 group-hover:translate-x-1 group-hover:text-white transition">
                  →
                </span>
              </a>

              <a
                href="https://github.com/Bala-Nakkala"
                target="_blank"
                rel="noopener noreferrer"
                className="ios-glass-card group flex items-center justify-between rounded-2xl border border-purple-500/35 p-4 hover:border-purple-400/70"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <GitHubLogo />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      GitHub
                    </div>
                    <div className="mt-0.5 text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition">
                      github.com/Bala-Nakkala
                    </div>
                  </div>
                </div>
                <span className="text-sm text-neutral-400 group-hover:translate-x-1 group-hover:text-white transition">
                  →
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/bala-nakkala"
                target="_blank"
                rel="noopener noreferrer"
                className="ios-glass-card group flex items-center justify-between rounded-2xl border border-sky-500/35 p-4 hover:border-sky-400/70"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <LinkedInLogo />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      LinkedIn
                    </div>
                    <div className="mt-0.5 text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition">
                      www.linkedin.com/in/bala-nakkala
                    </div>
                  </div>
                </div>
                <span className="text-sm text-neutral-400 group-hover:translate-x-1 group-hover:text-white transition">
                  →
                </span>
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}