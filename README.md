# Bala Krishna — DevOps Engineer Portfolio

Personal DevOps and Cloud Engineering portfolio web application built from scratch with React, Vite, and Tailwind CSS, and deployed automatically via GitHub Actions and GitHub Pages.

## Approach & Build Journey (From Scratch)

* **Incremental UI & Layout Design:** Started with a clean dark-themed React application and refined the header, navigation (`Home`, `Projects`, `Interview Q&A`, `Contact`, `Resume`), hero section, highlight cards, and key skills step by step.
* **Interactive Pipeline Visualization:** Built a vertical stage flow along the right edge (`Code` -> `PR` -> `Sonar Scan` -> `Build` -> `Docker Build` -> `Trivy` -> `Private Repo` -> `GitOps Repo` -> `Argo CD` -> `Kubernetes` -> `Ingress` -> `User`) with a moving star-streak that highlights the active stage.
* **Projects & Resume Section:** Added project cards linking to GitHub repositories (including the portfolio repository itself) along with a Resume section supporting viewing and downloading resumes.
* **Cloudflare & Hosting Flow:** Confirmed that when hosting directly on GitHub Pages, removing Cloudflare does not break the GitHub Pages site (assuming custom domain routing through Cloudflare is no longer needed).

## Sources & References Used

* **DevOps & GitOps Workflow Stages:** End-to-end CI/CD and GitOps deployment stage order (`Code` through `User`).
* **Visual & Motion References:**
  * Git workflow and pipeline stage progression concepts.
  * Space starfield and streak canvas animation for the dark background.

## Tools, Technologies & Platforms Used

* **Frontend & Styling:** React, Vite, Tailwind CSS, HTML5 Canvas, SVG icons, and clean modern typography.
* **Version Control & Repository:** Git and GitHub (`Bala-Nakkala.github.io`).
* **CI/CD & Hosting:** GitHub Actions (automated build and deployment workflow on push to `main`) and GitHub Pages.
* **Local Development Environment:** VS Code, Git Bash / Terminal, and Node.js / npm.
* **Core DevOps Skills Highlighted:** AWS, Microsoft Azure, Kubernetes, Docker, Jenkins, GitLab, GitHub, Ansible, Terraform, Argo CD, CI/CD, Linux, Bash, Python, and Monitoring.

## How Code to Live Site Works (GitHub Actions & GitHub Pages)

1. **Code Edit:** Update project files locally in `src/App.jsx` or `README.md`.
2. **Git Commit & Push:** Push changes to the `main` branch on GitHub.
3. **GitHub Actions Build:** GitHub Actions runs automatically on push, installs dependencies, and builds the production bundle.
4. **GitHub Pages Publish:** The built site is published and served on GitHub Pages.

## Local Setup & Deployment

1. Install dependencies:
   ```bash
   npm install
