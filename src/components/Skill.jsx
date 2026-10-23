import { useState, useEffect, useRef } from "react";

const Skill = () => {
  // ---------- Data ----------
  const skills = [
    // Frontend
    {
      name: "React",
      level: 95,
      category: "frontend",
      color: "from-cyan-500 to-blue-500",
      icon: "⚛️",
    },
    {
      name: "JavaScript / TypeScript",
      level: 92,
      category: "frontend",
      color: "from-yellow-400 to-amber-500",
      icon: "📜",
    },
    {
      name: "Tailwind CSS",
      level: 90,
      category: "frontend",
      color: "from-sky-400 to-cyan-500",
      icon: "🎨",
    },
    {
      name: "HTML5 & CSS3",
      level: 93,
      category: "frontend",
      color: "from-orange-500 to-red-500",
      icon: "🌐",
    },
    {
      name: "Next.js",
      level: 85,
      category: "frontend",
      color: "from-gray-700 to-gray-900",
      icon: "▲",
    },
    {
      name: "Vue.js",
      level: 75,
      category: "frontend",
      color: "from-emerald-500 to-green-600",
      icon: "💚",
    },

    // Backend
    {
      name: "Node.js / Express",
      level: 88,
      category: "backend",
      color: "from-green-600 to-emerald-600",
      icon: "🟢",
    },
    {
      name: "MongoDB / PostgreSQL",
      level: 82,
      category: "backend",
      color: "from-emerald-500 to-teal-600",
      icon: "🗄️",
    },
    {
      name: "REST & GraphQL APIs",
      level: 85,
      category: "backend",
      color: "from-purple-500 to-fuchsia-600",
      icon: "🔌",
    },
    {
      name: "Python / Django",
      level: 78,
      category: "backend",
      color: "from-blue-600 to-indigo-600",
      icon: "🐍",
    },

    // Design
    {
      name: "UI / UX Design",
      level: 85,
      category: "design",
      color: "from-pink-500 to-rose-600",
      icon: "✏️",
    },
    {
      name: "Figma",
      level: 88,
      category: "design",
      color: "from-rose-500 to-pink-600",
      icon: "🎯",
    },
    {
      name: "Responsive Design",
      level: 92,
      category: "design",
      color: "from-indigo-500 to-purple-600",
      icon: "📱",
    },

    // Tools
    {
      name: "Git & GitHub",
      level: 90,
      category: "tools",
      color: "from-gray-600 to-gray-800",
      icon: "🐙",
    },
    {
      name: "Docker",
      level: 75,
      category: "tools",
      color: "from-blue-500 to-cyan-600",
      icon: "🐳",
    },
    {
      name: "Vite / Webpack",
      level: 82,
      category: "tools",
      color: "from-yellow-500 to-orange-600",
      icon: "⚡",
    },
  ];

  const categories = [
    { key: "all", label: "All Skills", icon: "✦" },
    { key: "frontend", label: "Frontend", icon: "🖥️" },
    { key: "backend", label: "Backend", icon: "⚙️" },
    { key: "design", label: "Design", icon: "🎨" },
    { key: "tools", label: "Tools", icon: "🛠️" },
  ];

  // Extra soft-skill / tech badges
  const techBadges = [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "Figma",
    "Git",
    "Docker",
    "Vite",
    "Jest",
    "Redux",
    "Sass",
  ];

  // ---------- State ----------
  const [activeCategory, setActiveCategory] = useState("all");
  const [animated, setAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // ---------- Scroll reveal ----------
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Delay to let cards appear before bars fill
          setTimeout(() => setAnimated(true), 350);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // ---------- Filtering ----------
  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden scroll-mt-24"
    >
      {/* Decorative background */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40 -z-0"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40 -z-0"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---------- Section Header ---------- */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
            Skill Set
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            The technologies, tools, and design practices I use to bring ideas
            to life.
          </p>
        </div>

        {/* ---------- Category Filter Tabs ---------- */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 ease-out delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* ---------- Skill Bars Grid ---------- */}
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 max-w-4xl mx-auto">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.name}
              className={`group transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg group-hover:scale-125 transition-transform duration-300">
                    {skill.icon}
                  </span>
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                    {skill.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-500 group-hover:text-indigo-600 transition-colors duration-300">
                  {skill.level}%
                </span>
              </div>
              <div className="relative w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-[1500ms] ease-out shadow-sm`}
                  style={{
                    width: animated ? `${skill.level}%` : "0%",
                    transitionDelay: `${idx * 80}ms`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- Tech Badges Cloud ---------- */}
        <div
          className={`mt-20 text-center transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Also familiar with
          </h3>
          <p className="text-sm text-gray-500 mb-8">
            Tools & libraries I've used in real projects
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {techBadges.map((tech, idx) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                style={{ transitionDelay: `${idx * 20}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- Bottom CTA ---------- */}
        <div
          className={`text-center mt-16 transition-all duration-1000 ease-out delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-gray-600 mb-4">
            Always learning something new — currently exploring{" "}
            <span className="font-semibold text-indigo-600">
              AI integrations
            </span>{" "}
            and{" "}
            <span className="font-semibold text-purple-600">
              3D web experiences
            </span>
            .
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
          >
            Let's Work Together
            <svg
              className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Accessibility */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skill;
