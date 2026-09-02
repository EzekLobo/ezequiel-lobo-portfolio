import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaDatabase } from "react-icons/fa6";
import { TbBrandCSharp } from "react-icons/tb";
import { SiDocker, SiDotnet, SiGit, SiNextdotjs, SiPython, SiReact, SiTypescript } from "react-icons/si";

type Technology = {
  label: string;
  Icon: IconType;
  color: string;
  angle: number;
};

const innerRing: Technology[] = [
  { label: "TypeScript", Icon: SiTypescript, color: "#3178c6", angle: 0 },
  { label: "React", Icon: SiReact, color: "#61dafb", angle: 72 },
  { label: "Next.js", Icon: SiNextdotjs, color: "#f5f5f5", angle: 144 },
  { label: "ASP.NET", Icon: SiDotnet, color: "#a974d8", angle: 216 },
  { label: "C#", Icon: TbBrandCSharp, color: "#512bd4", angle: 288 },
];

const outerRing: Technology[] = [
  { label: "Python", Icon: SiPython, color: "#ffd343", angle: 20 },
  { label: "Docker", Icon: SiDocker, color: "#2496ed", angle: 110 },
  { label: "SQL", Icon: FaDatabase, color: "#a9d8ff", angle: 200 },
  { label: "Git", Icon: SiGit, color: "#f1502f", angle: 290 },
];

function Orbit({ technologies, className }: { technologies: Technology[]; className: string }) {
  return (
    <div aria-hidden="true" className={className}>
      {technologies.map((technology) => (
        <span
          key={technology.label}
          className="tech-orbit-item"
          style={{ "--orbit-angle": `${technology.angle}deg` } as CSSProperties}
        >
          <span className="tech-orbit-item__content" title={technology.label}>
            <technology.Icon style={{ color: technology.color }} />
          </span>
        </span>
      ))}
    </div>
  );
}

export default function OrbitingTechnologies() {
  return (
    <div className="pointer-events-none absolute inset-[-19%]" aria-label="Tecnologias principais: TypeScript, React, Next.js, ASP.NET, C#, Python, Docker, SQL e Git">
      <span className="tech-orbit-ring tech-orbit-ring--inner" />
      <span className="tech-orbit-ring tech-orbit-ring--outer" />
      <Orbit technologies={innerRing} className="tech-orbit tech-orbit--inner" />
      <Orbit technologies={outerRing} className="tech-orbit tech-orbit--outer" />
    </div>
  );
}
