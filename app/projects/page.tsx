import type { Metadata } from "next";
import { loadProjects, loadProjectDetails } from "@/lib/content";
import { Section } from "@/components/section";
import ProjectGrid from "@/components/projects/project-grid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Current OMT Assist project surface."
};

export default async function ProjectsPage() {
  const projectsPayload = await loadProjects();
  const details = await loadProjectDetails(projectsPayload.projects.map((project) => project.id));

  const projects = projectsPayload.projects.map((project) => ({
    ...project,
    details: details[project.id] ?? ""
  }));

  return (
    <div className="space-y-8">
      <Section
        heading="Projects"
        description="Current repository surface and deployment baseline."
      />
      <ProjectGrid projects={projects} />
    </div>
  );
}
