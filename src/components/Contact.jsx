import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Contact = () => {
  // ---------- Contact info cards ----------
  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "jane.doe@example.com",
      href: "mailto:jane.doe@example.com",
      hoverColor: "group-hover:bg-indigo-500",
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      hoverColor: "group-hover:bg-emerald-500",
    },
    {
      icon: "📍",
      label: "Location",
      value: "San Francisco, CA",
      href: "#",
      hoverColor: "group-hover:bg-purple-500",
    },
  ];

  // ---------- Social links ----------
  const socials = [
    {
      icon: "fab fa-github",
      label: "GitHub",
      href: "#",
      hover: "hover:bg-gray-900",
    },
    {
      icon: "fab fa-linkedin-in",
      label: "LinkedIn",
      href: "#",
      hover: "hover:bg-blue-600",
    },
    {
      icon: "fab fa-twitter",
      label: "Twitter",
      href: "#",
      hover: "hover:bg-sky-500",
    },
    {
      icon: "fab fa-dribbble",
      label: "Dribbble",
      href: "#",
      hover: "hover:bg-pink-500",
    },
  ];

  // ---------- Form state ----------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focusedField, setFocusedField] = useState(null);
  const [serverError, setServerError] = useState("");

  // ---------- Scroll reveal ----------
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  // ---------- Input handling ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    return newErrors;
  };

  // ---------- Submit via axios ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("sending");
    try {
      await axios.post("/api/contact", formData, { timeout: 15000 });

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("Submit failed:", err.response?.data || err.message);
      setServerError(
        err.response?.data?.error || "Something went wrong. Please try again.",
      );
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-b from-white to-indigo-50 overflow-hidden scroll-mt-24"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40 -z-0"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40 -z-0"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---------- Header ---------- */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Let's{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              work together
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear
            from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* ---------- Left: Contact Info ---------- */}
          <div
            className={`lg:col-span-2 space-y-4 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>

              <div className="space-y-5">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="group flex items-center gap-4 p-2 -m-2 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${info.hoverColor} group-hover:text-white`}
                    >
                      <span className="text-xl">{info.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        {info.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-4">
                  Follow me on
                </p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:text-white ${social.hover} border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg shadow-indigo-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-sm font-medium">Available for work</span>
              </div>
              <h4 className="text-xl font-bold mb-2">
                Open to freelance & full-time
              </h4>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Currently accepting new projects. Let's build something amazing
                together.
              </p>
            </div>
          </div>

          {/* ---------- Right: Contact Form ---------- */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 ease-out delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Send me a message
              </h3>

              {/* Name */}
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Smith"
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 text-sm transition-all duration-300 outline-none ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : focusedField === "name"
                        ? "border-indigo-500 ring-2 ring-indigo-100 bg-white"
                        : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                    <i className="fas fa-exclamation-circle"></i> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 text-sm transition-all duration-300 outline-none ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : focusedField === "email"
                        ? "border-indigo-500 ring-2 ring-indigo-100 bg-white"
                        : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                    <i className="fas fa-exclamation-circle"></i> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mb-5">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 placeholder-gray-400 text-sm transition-all duration-300 outline-none resize-none ${
                    errors.message
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : focusedField === "message"
                        ? "border-indigo-500 ring-2 ring-indigo-100 bg-white"
                        : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                    <i className="fas fa-exclamation-circle"></i>{" "}
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`group w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold rounded-xl text-white shadow-lg transition-all duration-300 ${
                  status === "sending"
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:scale-95"
                }`}
              >
                {status === "sending" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <i className="fas fa-check-circle mr-2"></i>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </>
                )}
              </button>

              {/* Success / error banner */}
              {status === "success" && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl flex items-center gap-2 animate-fade-in">
                  <i className="fas fa-check-circle"></i>
                  Thanks for reaching out! I'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2 animate-fade-in">
                  <i className="fas fa-times-circle"></i>
                  {serverError || "Something went wrong. Please try again."}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Accessibility & animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }

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

export default Contact;
