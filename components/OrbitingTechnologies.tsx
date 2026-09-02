import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { SiDotnet, SiGit, SiNextdotjs, SiPython, SiReact, SiTypescript } from "react-icons/si";

type Technology = {
  label: string;
  Icon: IconType;
  color: string;
  angle: number;
};

const innerRing: Technology[] = [
  { label: "TypeScript", Icon: SiTypescript, color: "#3178c6", angle: 8 },
  { label: "React", Icon: SiReact, color: "#61dafb", angle: 128 },
  { label: "Next.js", Icon: SiNextdotjs, color: "#f5f5f5", angle: 248 },
];

const outerRing: Technology[] = [
  { label: "Python", Icon: SiPython, color: "#ffd343", angle: 42 },
  { label: ".NET", Icon: SiDotnet, color: "#a974d8", angle: 162 },
  { label: "Git", Icon: SiGit, color: "#f1502f", angle: 282 },
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
    <div className="pointer-events-none absolute inset-[-19%]" aria-label="Tecnologias principais: TypeScript, React, Next.js, Python, .NET e Git">
      <span className="tech-orbit-ring tech-orbit-ring--inner" />
      <span className="tech-orbit-ring tech-orbit-ring--outer" />
      <Orbit technologies={innerRing} className="tech-orbit tech-orbit--inner" />
      <Orbit technologies={outerRing} className="tech-orbit tech-orbit--outer" />
    </div>
  );
}
