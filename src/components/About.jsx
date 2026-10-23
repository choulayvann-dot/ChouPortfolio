import { useState, useEffect, useRef } from "react";

const About = () => {
  // ---------- Data ----------
  const skills = [
    { name: "React", level: 95, color: "bg-cyan-500" },
    { name: "JavaScript / TypeScript", level: 92, color: "bg-yellow-500" },
    { name: "Tailwind CSS", level: 90, color: "bg-sky-500" },
    { name: "Node.js / Express", level: 85, color: "bg-green-600" },
    { name: "UI/UX Design", level: 80, color: "bg-pink-500" },
    { name: "MongoDB / PostgreSQL", level: 78, color: "bg-emerald-500" },
  ];

  const stats = [
    { number: 5, suffix: "+", label: "Years Experience" },
    { number: 30, suffix: "+", label: "Projects Completed" },
    { number: 20, suffix: "+", label: "Happy Clients" },
    { number: 10, suffix: "+", label: "Awards Won" },
  ];

  // ---------- Scroll Reveal State ----------
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [skillBarsAnimated, setSkillBarsAnimated] = useState(false);
  const [counters, setCounters] = useState(stats.map(() => 0));

  // IntersectionObserver — trigger once when section enters viewport
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // small delay for skill bars so they animate visibly
          setTimeout(() => setSkillBarsAnimated(true), 400);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Animated counters (runs when section becomes visible)
  useEffect(() => {
    if (!isVisible) return;

    const durations = [1500, 1500, 1500, 1500];
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      setCounters(
        stats.map((stat, i) => {
          const progress = Math.min(elapsed / durations[i], 1);
          // easeOutCubic for smooth finish
          const eased = 1 - Math.pow(1 - progress, 3);
          return Math.floor(eased * stat.number);
        }),
      );

      if (elapsed < Math.max(...durations)) {
        requestAnimationFrame(tick);
      } else {
        setCounters(stats.map((s) => s.number));
      }
    };

    requestAnimationFrame(tick);
  }, [isVisible]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-white overflow-hidden scroll-mt-24"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40 -z-0"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40 -z-0"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header – fade in */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Get to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              know me
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A little glimpse into who I am, what I do, and what drives my
            passion for building great digital products.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image + Info card – slides in from left */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-100 to-purple-100 aspect-square max-w-md mx-auto md:mx-0 group">
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-64 h-64 text-indigo-300 transition-transform duration-500 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Floating location card – gentle pulse */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 md:left-6 md:translate-x-0 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-4 border border-gray-100 w-[85%] md:w-auto hover:shadow-2xl transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Based in</p>
                <p className="text-sm font-bold text-gray-800">
                  San Francisco, CA
                </p>
              </div>
            </div>
          </div>

          {/* Right: Text content – slides in from right */}
          <div
            className={`mt-12 md:mt-0 transition-all duration-1000 ease-out delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              I'm a Full-Stack Developer with a passion for{" "}
              <span className="text-indigo-600">clean code</span> and{" "}
              <span className="text-purple-600">beautiful design</span>.
            </h3>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I specialize in building modern, responsive web applications
                using <strong className="text-gray-800">React</strong>,{" "}
                <strong className="text-gray-800">Node.js</strong>, and{" "}
                <strong className="text-gray-800">Tailwind CSS</strong>. Over
                the past 5 years, I've helped startups and established
                businesses ship products that users love.
              </p>
              <p>
                My approach blends technical precision with an eye for design —
                I believe great software should not only work flawlessly but
                also feel intuitive and delightful to use. When I'm not coding,
                you'll find me exploring new design trends, contributing to
                open-source projects, or enjoying a good cup of coffee.
              </p>
            </div>

            {/* Personal info grid – staggered fade-in */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                {
                  icon: "🎓",
                  title: "Education",
                  value: "B.Sc. Computer Science",
                },
                {
                  icon: "💼",
                  title: "Current Role",
                  value: "Senior Developer",
                },
                { icon: "🌐", title: "Languages", value: "English, Spanish" },
                { icon: "☕", title: "Fun Fact", value: "Coffee lover ☕" },
              ].map((item, idx) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-3 transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${400 + idx * 120}ms` }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      {item.title}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download CV button */}
            <div className="mt-10">
              <a
                href="#"
                className="group inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                <svg
                  className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Skills section */}
        <div className="mt-24">
          <div
            className={`text-center mb-10 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              My Skills
            </h3>
            <p className="mt-2 text-gray-600">
              Technologies and tools I use to bring ideas to life.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {skill.name}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${skill.color} rounded-full transition-all duration-[1400ms] ease-out`}
                    style={{
                      width: skillBarsAnimated ? `${skill.level}%` : "0%",
                      transitionDelay: `${idx * 100 + 200}ms`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section – animated counters */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-indigo-50 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {counters[idx]}
                {stat.suffix}
              </p>
              <p className="mt-2 text-sm font-medium text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility: respect reduced motion */}
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

export default About;
