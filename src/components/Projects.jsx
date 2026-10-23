import { useState, useEffect, useRef } from "react";

const Projects = () => {
  // ---------- Data ----------
  const projects = [
    {
      id: 1,
      title: "E-Commerce Dashboard",
      description:
        "A full-featured admin dashboard for managing products, orders, and analytics with real-time data visualization.",
      image: "🛍️",
      gradient: "from-indigo-500 to-purple-600",
      tags: ["React", "Node.js", "MongoDB"],
      category: "fullstack",
      liveLink: "#",
      codeLink: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task manager with drag-and-drop boards, real-time updates, and team workspaces.",
      image: "📋",
      gradient: "from-cyan-500 to-blue-600",
      tags: ["React", "TypeScript", "Firebase"],
      category: "fullstack",
      liveLink: "#",
      codeLink: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "A modern, animated portfolio site with smooth scroll reveals, typing effects, and fully responsive design.",
      image: "🎨",
      gradient: "from-pink-500 to-rose-600",
      tags: ["React", "Tailwind CSS"],
      category: "frontend",
      liveLink: "#",
      codeLink: "#",
    },
    {
      id: 4,
      title: "Weather Forecast App",
      description:
        "A beautiful weather app with 7-day forecasts, interactive maps, and location-based auto detection.",
      image: "🌤️",
      gradient: "from-sky-400 to-indigo-500",
      tags: ["React", "OpenWeather API"],
      category: "frontend",
      liveLink: "#",
      codeLink: "#",
    },
    {
      id: 5,
      title: "REST API Service",
      description:
        "A scalable Node.js REST API with JWT authentication, rate limiting, and comprehensive documentation.",
      image: "⚙️",
      gradient: "from-emerald-500 to-teal-600",
      tags: ["Node.js", "Express", "PostgreSQL"],
      category: "backend",
      liveLink: "#",
      codeLink: "#",
    },
    {
      id: 6,
      title: "AI Chat Assistant",
      description:
        "An AI-powered chat interface with streaming responses, conversation history, and markdown rendering.",
      image: "🤖",
      gradient: "from-purple-500 to-fuchsia-600",
      tags: ["React", "OpenAI API", "Tailwind"],
      category: "fullstack",
      liveLink: "#",
      codeLink: "#",
      featured: true,
    },
  ];

  const categories = [
    { key: "all", label: "All Projects" },
    { key: "fullstack", label: "Full-Stack" },
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
  ];

  // ---------- State ----------
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // ---------- Scroll Reveal ----------
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // ---------- Filtering ----------
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Smooth scroll helper (for CTA at bottom)
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden scroll-mt-24"
    >
      {/* Decorative blobs */}
      <div className="absolute top-32 left-0 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40 -z-0"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40 -z-0"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---------- Header ---------- */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            My Recent{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A selection of projects I've built — from full-stack apps to
            polished front-end experiences.
          </p>
        </div>

        {/* ---------- Filter Tabs ---------- */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 ease-out delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ---------- Projects Grid ---------- */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Image / Preview area */}
              <div
                className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                {/* Big emoji as placeholder image */}
                <span
                  className={`text-7xl transition-transform duration-500 ${
                    hoveredId === project.id
                      ? "scale-125 rotate-6"
                      : "scale-100"
                  }`}
                >
                  {project.image}
                </span>

                {/* Featured badge */}
                {project.featured && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                    ⭐ Featured
                  </span>
                )}

                {/* Overlay with action buttons (appears on hover) */}
                <div
                  className={`absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 text-sm font-semibold text-gray-900 bg-white rounded-full hover:bg-indigo-50 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live Demo
                  </a>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 text-sm font-semibold text-white bg-white/10 border border-white/30 rounded-full hover:bg-white/20 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <i className="fab fa-github text-sm"></i>
                    Code
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100 group-hover:bg-indigo-100 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom accent bar */}
              <div
                className={`h-1 bg-gradient-to-r ${project.gradient} transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
              ></div>
            </article>
          ))}
        </div>

        {/* ---------- Empty state ---------- */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg">No projects in this category yet.</p>
          </div>
        )}

        {/* ---------- View All CTA ---------- */}
        <div
          className={`text-center mt-16 transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "contact")}
            className="group inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
          >
            Have a project in mind?
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
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

export default Projects;
