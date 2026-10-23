import { useState, useEffect, useRef } from "react";

const HeroSection = () => {
  // ---------- Typing Effect ----------
  const roles = [
    "Full-Stack Developer",
    "UI / UX Designer",
    "React Specialist",
    "Problem Solver",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // ---------- Scroll Reveal ----------
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Typing effect logic
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        // pause before deleting
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, roles]);

  // Scroll reveal via IntersectionObserver
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
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-indigo-50 overflow-hidden"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text content with fade-in reveal */}
          <div
            className={`text-center md:text-left transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
              👋 Hello, welcome to my portfolio
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              I'm{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Van Choulay
              </span>
            </h1>

            {/* Typing effect */}
            <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-700 min-h-[2.25rem] sm:min-h-[2.5rem]">
              {roles[roleIndex].substring(0, charIndex)}
              <span className="inline-block w-[2px] h-6 sm:h-7 bg-indigo-600 ml-1 align-middle animate-cursor"></span>
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
              I craft beautiful, responsive, and performant web applications.
              Passionate about turning complex problems into intuitive,
              pixel-perfect digital experiences.
            </p>

            {/* CTA buttons – with smooth scroll */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, "projects")}
                className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                View My Work
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
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                Contact Me
              </a>
            </div>

            {/* Social links */}
            <div className="mt-10 flex items-center gap-4 justify-center md:justify-start">
              <span className="text-sm text-gray-500">Find me on:</span>
              <div className="flex gap-3">
                {[
                  {
                    icon: "fab fa-github",
                    label: "GitHub",
                    hover: "hover:bg-gray-900",
                  },
                  {
                    icon: "fab fa-linkedin-in",
                    label: "LinkedIn",
                    hover: "hover:bg-blue-600",
                  },
                  {
                    icon: "fab fa-twitter",
                    label: "Twitter",
                    hover: "hover:bg-sky-500",
                  },
                  {
                    icon: "fab fa-dribbble",
                    label: "Dribbble",
                    hover: "hover:bg-pink-500",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-white ${social.hover} shadow-sm border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Illustration / Profile card with fade-in reveal */}
          <div
            className={`relative flex justify-center md:justify-end transition-all duration-1000 ease-out delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl"></div>

              <div className="relative w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group">
                <img
                  src="img/logo/IMG_1216.JPG"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <svg
                  className="w-48 h-48 text-indigo-300 transition-transform duration-500 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-2 -right-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2 animate-bounce-slow">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-sm font-medium text-gray-700">
                  Available for work
                </span>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2 hover:shadow-xl transition-shadow duration-300">
                <span className="text-2xl">💻</span>
                <div>
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="text-sm font-bold text-gray-800">5+ Years</p>
                </div>
              </div>

              <div className="absolute top-1/2 -right-6 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2 hover:shadow-xl transition-shadow duration-300">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="text-xs text-gray-500">Projects</p>
                  <p className="text-sm font-bold text-gray-800">30+ Done</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator – scrolls smoothly on click */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-2">Scroll down</span>
          <button
            onClick={() => {
              const next = document.getElementById("about");
              if (next) next.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll to next section"
            className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2 hover:border-indigo-400 transition-colors duration-300 group"
          >
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-scroll group-hover:bg-indigo-500"></div>
          </button>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes scroll {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(8px); }
        }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }

        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-cursor { animation: cursor-blink 1s steps(1) infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-blob, .animate-scroll, .animate-bounce-slow, .animate-cursor {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
