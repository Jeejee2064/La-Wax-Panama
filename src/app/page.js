'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false
});
// ======================
// TEXT CONTENT & DATA
// ======================

const NAV_ITEMS = [
  { id: 'home', label: 'Accueil' },
  { id: 'histoire', label: 'Mon Histoire' },
  { id: 'projet', label: 'Le Projet' },
  { id: 'evolution', label: 'Avis' },
  { id: 'disponible', label: 'La Wax' },
  { id: 'contact', label: 'Contact' }
];

const COLORS = {
  primary: '#3d405b',
  secondary: '#81b29a',
  accent: '#f2cc8f',
  light: '#f4f1de',
  dark: '#3d405b'
};

const HERO_CONTENT = {
  title: "La Wax Tropicale",
  subtitle: "100% Panama",
  description: "Pensée par un surfeur, façonnée sous le soleil, testée dans les vagues.",
  buttons: [
    { text: "Découvrir l'histoire 🏄‍♂️", target: "histoire", color: COLORS.secondary },
    { text: "Me contacter 📩", target: "contact", outline: true }
  ]
};

const HISTOIRE_CONTENT = {
  title: "🏄‍♂️ Mon histoire",
  paragraphs: [
    "Installé au Panama depuis 5 ans, j'ai petit à petit rencontré un problème très concret pour les surfeurs: aucune wax disponible localement ne répondait vraiment aux besoins des surfeurs du Panama.",
    "Importées, souvent inadaptées aux hautes températures, parfois hors de prix et rarement disponibles en quantité suffisante… La frustration était constante. La guerre du feu était bien terminée mais la guerre de la wax faisait toujours rage. Alors j'ai décidé de m'y mettre moi-même avec le bagage que j'ai sous la main.",
    "Après des mois d'expérimentations, de tests sur le terrain, de retours de surfeurs passionnés et exigeants, j'ai développé une wax tropicale artisanale qui tient enfin ses promesses ici, au Panama."
  ]
};

const PROJET_CONTENT = {
  title: "🧪 Un projet 100% local, né de la passion et de la rigueur",
  objective: "👉 Créer une wax performante, locale, éthique et adaptée au climat tropical.",
  features: [
    {
      title: "Ingrédients sélectionnés",
      content: "Naturels et durables autant que possible, rigoureusement choisis."
    },
    {
      title: "Formulation artisanale",
      content: "Précise, affinée au gramme près pour une performance optimale."
    },
    {
      title: "Écoute communauté",
      content: "Retours constants des écoles, surfeurs, longboarders, bodyboarders."
    }
  ],
  result: "Le résultat : une wax dense, souple mais solide, adhérente juste comme il faut, et surtout qui ne fond pas sur ta planche au soleil."
};

const POURQUOI_CONTENT = {
  title: "🧼 Pourquoi choisir ma wax Panamá Perfect ?",
  benefits: [
    {
      title: "✅ Adaptée au climat du Panama",
      content: "Résiste aux chaleurs extrêmes. Conçue pour les eaux tropicales (+24 °C). Fini la wax qui dégouline ou glisse."
    },
    {
      title: "✅ Excellente accroche",
      content: "Inspirée des meilleures wax internationales avec une texture unique testée pour maximiser ton grip sans te coller les pieds."
    },
    {
      title: "✅ Texture évolutive et agréable",
      content: "Ferme au toucher, elle devient souple à l'application et réactive sous la chaleur de la session. Un vrai confort."
    },
    {
      title: "✅ Produit artisanal et local",
      content: "Fabriquée au Panama, à la main, en petites séries. Tu soutiens un projet local, pensé pour les surfeurs d'ici."
    },
    {
      title: "✅ Zéro bullshit, 100% terrain",
      content: "Pas de promesses marketing vides. Juste une wax qui fonctionne, validée par des riders locaux et testée dans toutes les conditions du Pacifique panaméen."
    }
  ]
};

const EVOLUTION_CONTENT = {
  title: "💬 Un projet qui évolue avec vous",
  paragraphs: [
    "La wax est déjà utilisée par plusieurs surfeurs locaux et écoles partenaires.",
    "Je continue à faire évoluer la formule avec vos retours, pour que cette wax ne soit pas juste une alternative… mais la meilleure option disponible pour nos vagues."
  ],
  testimonial: "ça colle, ça dure, et ça fait le job mieux que beaucoup de marques importées.",
  partenaires: "Les complices qui m'accompagnent dans cette aventure !"
};

const DISPONIBLE_CONTENT = {
  title: "🌴 Disponible très bientôt",
  description: "La wax Panamá Perfect sera bientôt disponible en ligne et dans plusieurs spots clés du pays.",
  features: [
    { icon: "📦", title: "Petits lots" },
    { icon: "🌊", title: "Formule tropicale" },
    { icon: "🫶", title: "Prix juste" },
    { icon: "👾", title: "Wax personnalisable" },
    { icon: "💚", title: "Engagement local" }
  ]
};

const CONTACT_CONTENT = {
  title: "📩 Rejoins le projet",
  paragraphs: [
    "Surfeur, école, surf shop, curieux ou curieuse de participer à une aventure artisanale ?",
    "Contacte-moi pour des tests, des collabs ou des précommandes."
  ],
  buttons: [
    { text: "✉️ Envoyer un email", href: "mailto:contact@waxtropicale.com", color: COLORS.primary },
    { text: "📱 WhatsApp", href: "https://wa.me/50700000000", color: COLORS.secondary }
  ],
  closing: "Parce que le Panama mérite une wax à son image : authentique, chaude, puissante et locale."
};

const FOOTER_CONTENT = {
  brand: "La Wax Panama",
  copyright: "© 2025 La Wax Panama | Fait avec passion au Panama 🇵🇦"
};

// ======================
// ANIMATION VARIANTS
// ======================

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const waveVariants = {
  animate: {
    x: [0, -50, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// ======================
// COMPONENT
// ======================

const WaxTropicale = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 w-full z-1000 transition-all duration-300" 
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                <Image src="/logoWax.jpeg" alt="Logo Wax Tropicale" width={40} height={40} className="rounded-full" />
              </div>
              <span className="text-xl font-bold" style={{ color: COLORS.light }}>{FOOTER_CONTENT.brand}</span>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => scrollTo(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-white/20 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-sm border-t border-white/20"
            >
              <motion.div 
                className="container mx-auto px-6 py-4 space-y-2"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    variants={fadeInUp}
                    onClick={() => scrollTo(item.id)}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeSection === item.id 
                        ? 'bg-blue-100 text-blue-600 font-semibold' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Wavy Background SVG */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.svg
          className="absolute bottom-0 left-0 w-full h-32 opacity-5"
          viewBox="0 0 1200 120"
          variants={waveVariants}
          animate="animate"
          style={{ color: COLORS.secondary }}
        >
          <path d="M0,60 C300,20 600,100 900,60 C1050,30 1150,80 1200,60 L1200,120 L0,120 Z" fill="currentColor" />
        </motion.svg>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden" style={{ backgroundColor: COLORS.light }}>
        <div className="absolute inset-0 opacity-20">
          <Image src="/wax.jpeg" alt="Wax background" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-orange-200 to-yellow-200"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6" 
              style={{ color: COLORS.primary }}
              variants={fadeInUp}
            >
              {HERO_CONTENT.title}<br />
              <motion.span 
                style={{ color: COLORS.secondary }}
                variants={fadeInUp}
              >
                {HERO_CONTENT.subtitle}
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8" 
              style={{ color: COLORS.primary }}
              variants={fadeInUp}
            >
              {HERO_CONTENT.description}
            </motion.p>
            <motion.div 
              className="flex flex-col md:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              {HERO_CONTENT.buttons.map((button, index) => (
                <motion.button 
                  key={index}
                  onClick={() => scrollTo(button.target)}
                  className={`px-8 py-4 rounded-full font-semibold text-lg shadow-lg ${
                    button.outline 
                      ? `border-2 hover:bg-white/10 ${COLORS.primary} border-${COLORS.primary} text-${COLORS.primary}`
                      : `text-white`
                  }`}
                  style={{
                    backgroundColor: button.outline ? 'transparent' : button.color,
                    color: button.outline ? COLORS.primary : 'white',
                    borderColor: button.outline ? COLORS.primary : 'transparent'
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {button.text}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Histoire Section */}
      <section id="histoire" className="py-20" style={{ backgroundColor: COLORS.secondary }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-4xl font-bold mb-12 text-center text-white"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {HISTOIRE_CONTENT.title}
            </motion.h2>
            <motion.div 
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
            >
              {HISTOIRE_CONTENT.paragraphs.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  className="text-lg leading-relaxed mb-6" 
                  style={{ color: COLORS.primary }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.05) }}
                  viewport={{ once: true }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
{/* Fused Projet & Pourquoi Section */}
<section id="projet" className="py-20" style={{ backgroundColor: COLORS.accent }}>
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto">
      {/* Projet Content */}
      <motion.h2 
        className="text-4xl font-bold mb-12 text-center" 
        style={{ color: COLORS.primary }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {PROJET_CONTENT.title}
      </motion.h2>
      
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <p className="text-xl font-semibold" style={{ color: COLORS.primary }}>
          Mon objectif a toujours été simple :
        </p>
        <p className="text-lg mt-4" style={{ color: COLORS.primary }}>
          {PROJET_CONTENT.objective}
        </p>
      </motion.div>
      
      <motion.div 
        className="grid md:grid-cols-3 gap-8 mb-16"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        {PROJET_CONTENT.features.map((item, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg"
            variants={fadeInUp}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-bold text-center" style={{ color: COLORS.primary }}>
              {item.title}
            </h3>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="text-center mb-16 bg-white rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
      >
        <p className="text-lg font-semibold" style={{ color: COLORS.primary }}>
          {PROJET_CONTENT.result}
        </p>
      </motion.div>

      {/* Pourquoi Content */}
      <motion.h2 
        className="text-4xl font-bold mb-12 text-center"
        style={{ color: COLORS.primary }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {POURQUOI_CONTENT.title}
      </motion.h2>
      
      <motion.div 
        className="grid md:grid-cols-2 gap-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        {POURQUOI_CONTENT.benefits.map((item, index) => (
          <motion.div 
            key={index}
            className={`bg-white rounded-2xl p-6 shadow-lg ${
              index === POURQUOI_CONTENT.benefits.length - 1 ? 'md:col-span-2' : ''
            }`}
            variants={fadeInUp}
            whileHover={{ y: -5, scale: index === POURQUOI_CONTENT.benefits.length - 1 ? 1.01 : 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-bold text-center" style={{ color: COLORS.primary }}>
              {item.title}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
</section>

   {/* Evolution Section */}
<section id="evolution" className="py-20" style={{ backgroundColor: COLORS.light }}>
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2 
        className="text-4xl font-bold mb-12" 
        style={{ color: COLORS.primary }}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {EVOLUTION_CONTENT.title}
      </motion.h2>

      <motion.div 
        className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-8"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
      >
        {EVOLUTION_CONTENT.paragraphs.map((paragraph, index) => (
          <React.Fragment key={index}>
            {index === 1 && (
              <motion.div 
                className="text-center p-6 rounded-2xl my-6" 
                style={{ backgroundColor: COLORS.secondary }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-xl font-semibold text-white">
                  "{EVOLUTION_CONTENT.testimonial}"
                </p>
              </motion.div>
            )}
            <motion.p 
              className="text-lg mb-6" 
              style={{ color: COLORS.primary }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              viewport={{ once: true }}
            >
              {paragraph}
            </motion.p>
          </React.Fragment>
        ))}
      </motion.div>

      {/* Partners Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-8" style={{ color: COLORS.primary }}>
                    {EVOLUTION_CONTENT.partenaires}

        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8">
          {/* Partner 1 */}
          <motion.a 
            href="https://delcolmenar.com" // Replace with actual URL
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/partenaire1.png" alt="Partner 1" className="h-16 object-contain" />
          </motion.a>
          
          {/* Partner 2 */}
          <motion.a 
            href="https://www.instagram.com/popote_thesurfacademy?igsh=MTFrempuZDV2b3RtaA==" // Replace with actual URL
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/partenaire2.png" alt="Partner 2" className="h-16 object-contain" />
          </motion.a>
          
          {/* Partner 3 */}
          <motion.a 
            href="https://www.instagram.com/superdeportes?igsh=MXJjbWRwYjd1d3NrNA==" // Replace with actual URL
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/partenaire3.png" alt="Partner 3" className="h-16 object-contain" />
          </motion.a>
          
          {/* Partner 4 */}
          <motion.a 
            href="https://www.instagram.com/tropicaloggers?igsh=MWZianI5bzVoNGgxNg==" // Replace with actual URL
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/partenaire4.png" alt="Partner 4" className="h-16 object-contain" />
          </motion.a>
          
          {/* Partner 5 */}
          <motion.a 
            href="https://www.instagram.com/lineuptrade?igsh=MWp0dnh3dzkxM3Fz" // Replace with actual URL
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/partenaire5.jpg" alt="Partner 5" className="h-16 object-contain" />
          </motion.a>
          
          {/* Partner 6 */}
          <motion.a 
            href="https://www.instagram.com/dtcexpress?igsh=MnF2aHhtOXVqb2ky" // Replace with actual URL
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/dtc-logo.png" alt="Partner 6" className="h-16 object-contain" />
          </motion.a>
          
          {/* Partner 7 */}
          <motion.a 
            href="https://www.instagram.com/bluewavess2022?igsh=MTJkNm1mYWY0bjRtMA==" // Replace with actual URL
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/bluewave2.jpg" alt="Partner 7" className="h-16 object-contain" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  </div>
</section>

{/* Disponible Section */}
<section id="disponible" className="py-20" style={{ backgroundColor: COLORS.secondary }}>
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2 
        className="text-4xl font-bold mb-12 text-white"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {DISPONIBLE_CONTENT.title}
      </motion.h2>
      <motion.p 
        className="text-xl mb-12 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {DISPONIBLE_CONTENT.description}
      </motion.p>
      
      <motion.div 
        className="grid md:grid-cols-3 lg:grid-cols-5 gap-6"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        {DISPONIBLE_CONTENT.features.map((item, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg"
            variants={fadeInUp}
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-bold" style={{ color: COLORS.primary }}>{item.title}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Surf Shops Section */}
      <motion.div 
        className="mt-20 text-white text-left"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold mb-8 text-center">Find Our Wax at These Surf Shops in Panama</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Shops List */}
          <div className="bg-white bg-opacity-10 p-6 rounded-xl">
            <h4 className="text-xl text-gray-900 font-bold mb-4">Our Retail Partners</h4>
            <ul className="space-y-2">
              {[
                { name: "Panama Surf & Skate", address: "Calle 50, Panama City", lat: 8.9833, lng: -79.5167 },
                { name: "Santa Catalina Surf Shop", address: "Santa Catalina, Veraguas", lat: 7.6531, lng: -81.2914 },
                { name: "Playa Venao Surf Co.", address: "Playa Venao, Los Santos", lat: 7.4206, lng: -80.2747 },
                { name: "Bocas Surf Supply", address: "Isla Colon, Bocas del Toro", lat: 9.3400, lng: -82.2400 },
                { name: "Punta Chame Surf Hut", address: "Punta Chame, Panama Oeste", lat: 8.6500, lng: -79.7000 }
              ].map((shop, index) => (
                <li key={index} className="p-3 hover:bg-white hover:bg-opacity-20 rounded transition">
                  <h5 className="font-bold text-gray-900">{shop.name}</h5>
                  <p className="text-sm opacity-80 text-gray-900">{shop.address}</p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Map Container */}
          <div className="h-96 rounded-xl overflow-hidden">
            <DynamicMap shops={[
              { name: "Panama Surf & Skate", address: "Calle 50, Panama City", position: [8.9833, -79.5167] },
              { name: "Santa Catalina Surf Shop", address: "Santa Catalina, Veraguas", position: [7.6531, -81.2914] },
              { name: "Playa Venao Surf Co.", address: "Playa Venao, Los Santos", position: [7.4206, -80.2747] },
              { name: "Bocas Surf Supply", address: "Isla Colon, Bocas del Toro", position: [9.3400, -82.2400] },
              { name: "Punta Chame Surf Hut", address: "Punta Chame, Panama Oeste", position: [8.6500, -79.7000] }
            ]} />
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="py-20" style={{ backgroundColor: COLORS.accent }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-12" 
              style={{ color: COLORS.primary }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {CONTACT_CONTENT.title}
            </motion.h2>
            
            <motion.div 
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {CONTACT_CONTENT.paragraphs.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  className="text-lg mb-8" 
                  style={{ color: COLORS.primary }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.05) }}
                  viewport={{ once: true }}
                >
                  {paragraph}
                </motion.p>
              ))}
              
              <motion.div 
                className="flex flex-col md:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {CONTACT_CONTENT.buttons.map((button, index) => (
                  <motion.a 
                    key={index}
                    href={button.href}
                    className="px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
                    style={{ backgroundColor: button.color, color: 'white' }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {button.text}
                  </motion.a>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-12 p-6 rounded-2xl" 
                style={{ backgroundColor: COLORS.light }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-lg font-semibold" style={{ color: COLORS.primary }}>
                  {CONTACT_CONTENT.closing}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-8" 
        style={{ backgroundColor: COLORS.primary }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            className="flex items-center justify-center space-x-3 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <Image src="/logoWax.jpeg" alt="Logo Wax Tropicale" width={40} height={40} className="rounded-full" />
            </div>
            <span className="text-lg font-bold" style={{ color: COLORS.light }}>{FOOTER_CONTENT.brand}</span>
          </motion.div>
          <motion.p 
            className="text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {FOOTER_CONTENT.copyright}
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
};

export default WaxTropicale;