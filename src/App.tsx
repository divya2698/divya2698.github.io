import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useInView } from 'react-intersection-observer';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import FloatingCube from './components/FloatingCube';
import SpinningText from './components/SpinningText';
import Experience from './components/Experience';
import Project from './components/Project';
import Loader from './components/Loader';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  // Refs for sections
  const { ref: homeRef, inView: homeInView } = useInView({ threshold: 0.5 });
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.5 });
  const { ref: experienceRef, inView: experienceInView } = useInView({ threshold: 0.5 });
  const { ref: projectsRef, inView: projectsInView } = useInView({ threshold: 0.5 });
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.5 });

  // Update active section based on scroll position
  useEffect(() => {
    if (homeInView) setActiveSection('home');
    else if (aboutInView) setActiveSection('about');
    else if (experienceInView) setActiveSection('experience');
    else if (projectsInView) setActiveSection('projects');
    else if (contactInView) setActiveSection('contact');
  }, [homeInView, aboutInView, experienceInView, projectsInView, contactInView]);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Experience data
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Reveal AI",
      period: "2024",
      description: [
        "Shipped daily feature releases for a React-based interview chatbot integrated with OpenAI's LLM.",
        "Built a Next.js real-time dashboard with secure user authentication hosted via AWS Lambda and EC2.",
        "Streamlined CI/CD pipelines using Jenkins and AWS, reducing deployment time by 40%.",
        "Enhanced code readability, performance, and reliability in Agile development environments."
      ]
    },
    {
      title: "Software Developer",
      company: "Barrier Break",
      period: "2022",
      description: [
        "Created WCAG-compliant React components to improve accessibility.",
        "Implemented Redux for optimized state management, reducing page load times by 20%."
      ]
    },
    {
      title: "Software Engineer",
      company: "Atmik Bharat LLP",
      period: "2019 - 2022",
      description: [
        "Developed an automated Java webhook service to streamline order, inventory, and shipment updates."
      ]
    }
  ];

  // Projects data
  const projects = [
    {
      title: "Class Connect",
      description: "Collaborative learning platform with real-time discussions and course materials.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Food Donation System",
      description: "Java application connecting donors and delivery personnel.",
      technologies: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Inventory Management System",
      description: "Real-time inventory tracking with Spring Boot and AWS.",
      technologies: ["Spring Boot", "AWS", "React", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "E-commerce Platform",
      description: "Online shopping website with payment integration.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            Divya Prajapati
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
              <motion.button
                key={section}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(section)}
                className={`capitalize ${activeSection === section ? 'font-bold border-b-2 border-blue-500' : ''}`}
              >
                {section}
              </motion.button>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        ref={homeRef}
        className="min-h-screen pt-20 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Canvas>
            <Suspense fallback={<Loader />}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <FloatingCube position={[-2, 1, 0]} size={0.5} color={darkMode ? "#60a5fa" : "#3b82f6"} />
              <FloatingCube position={[2, -1, -2]} size={0.7} color={darkMode ? "#f87171" : "#ef4444"} />
              <FloatingCube position={[0, 2, -1]} size={0.3} color={darkMode ? "#34d399" : "#10b981"} />
              <FloatingCube position={[-1, -2, -3]} size={0.6} color={darkMode ? "#a78bfa" : "#8b5cf6"} />
            </Suspense>
          </Canvas>
        </div>

        <div className="container mx-auto px-6 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="block">Hi, I'm Divya</span>
              <span className={`block mt-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Full Stack Developer
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Building beautiful, functional, and scalable web applications
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className={`px-8 py-3 rounded-full font-semibold ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-3 rounded-full font-semibold ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10"
        >
          <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center">
            <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} mt-2`}></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={aboutRef}
        className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Divya Prajapati" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-blue-500 rounded-full -z-10"></div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6 relative">
                About Me
                <div className={`h-1 w-20 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} mt-2`}></div>
              </h2>
              
              <p className="mb-4 text-lg">
                Hi, I'm Divya Prajapati, a passionate Full Stack Developer with experience in building scalable applications using React.js, Node.js, Spring Boot, and AWS.
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Education</h3>
                <div className="mb-2">
                  <p className="font-medium">Master of Science in Computer Software Engineering Systems</p>
                  <p>Northeastern University (2024)</p>
                </div>
                <div>
                  <p className="font-medium">Bachelor of Science in Information Technology</p>
                  <p>Mumbai University (2019)</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'Java', 'Spring Boot', 'AWS', 'MongoDB', 'PostgreSQL', 'Docker', 'Git'].map((skill) => (
                    <span 
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section 
        id="experience" 
        ref={experienceRef}
        className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Work Experience</h2>
            <div className={`h-1 w-20 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} mx-auto`}></div>
          </motion.div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-300"></div>
            
            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <Experience 
                  key={index}
                  title={exp.title}
                  company={exp.company}
                  period={exp.period}
                  description={exp.description}
                  isLeft={index % 2 === 0}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        ref={projectsRef}
        className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <div className={`h-1 w-20 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} mx-auto`}></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Project
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                darkMode={darkMode}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactRef}
        className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
            <div className={`h-1 w-20 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} mx-auto`}></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <Mail size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:prajapati.di@northeastern.edu" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                        prajapati.di@northeastern.edu
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <Linkedin size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <a 
                        href="https://linkedin.com/in/divyaprajapati26" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                      >
                        @divyaprajapati26
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <Github size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <a 
                        href="https://github.com/divyaprajapati" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                      >
                        @divyaprajapati
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} 
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} 
                      placeholder="Your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} 
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className={`px-6 py-3 rounded-lg font-semibold ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
        <div className="container mx-auto px-6 text-center">
          <SpinningText text="DIVYA PRAJAPATI • FULL STACK DEVELOPER • " />
          
          <div className="mt-8 flex justify-center space-x-6">
            <motion.a 
              whileHover={{ scale: 1.2 }}
              href="https://github.com/divyaprajapati" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2 }}
              href="https://linkedin.com/in/divyaprajapati26" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2 }}
              href="mailto:prajapati.di@northeastern.edu" 
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              <Mail size={24} />
            </motion.a>
          </div>
          
          <p className="mt-6">© {new Date().getFullYear()} Divya Prajapati. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;