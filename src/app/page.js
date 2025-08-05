'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const WaxTropicale = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'histoire', 'projet', 'pourquoi', 'evolution', 'disponible', 'contact'];
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

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'histoire', label: 'Mon Histoire' },
    { id: 'projet', label: 'Le Projet' },
    { id: 'pourquoi', label: 'Pourquoi' },
    { id: 'evolution', label: 'Avis' },
    { id: 'disponible', label: 'La Wax' },
    { id: 'contact', label: 'Contact' }
  ];

  // Animation variants
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

  return (
    <div className="relative">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 transition-all duration-300" 
        style={{ backgroundColor: '#3d405b' }}
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
              <span className="text-xl font-bold" style={{ color: '#f4f1de' }}>La Wax Panama</span>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {navItems.map((item, index) => (
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
                {navItems.map((item, index) => (
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
          style={{ color: '#81b29a' }}
        >
          <path d="M0,60 C300,20 600,100 900,60 C1050,30 1150,80 1200,60 L1200,120 L0,120 Z" fill="currentColor" />
        </motion.svg>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden" style={{ backgroundColor: '#f4f1de' }}>
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
              style={{ color: '#3d405b' }}
              variants={fadeInUp}
            >
              La Wax Tropicale<br />
              <motion.span 
                style={{ color: '#81b29a' }}
                variants={fadeInUp}
              >
                100% Panama
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8" 
              style={{ color: '#3d405b' }}
              variants={fadeInUp}
            >
              Pensée par un surfeur, façonnée sous le soleil, testée dans les vagues.
            </motion.p>
            <motion.div 
              className="flex flex-col md:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <motion.button 
                onClick={() => scrollTo('histoire')}
                className="px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg"
                style={{ backgroundColor: '#81b29a' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Découvrir l'histoire 🏄‍♂️
              </motion.button>
              <motion.button 
                onClick={() => scrollTo('contact')}
                className="px-8 py-4 rounded-full font-semibold text-lg border-2 hover:bg-white/10"
                style={{ color: '#3d405b', borderColor: '#3d405b' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Me contacter 📩
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Histoire Section */}
      <section id="histoire" className="py-20" style={{ backgroundColor: '#81b29a' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-4xl font-bold mb-12 text-center text-white"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              🏄‍♂️ Mon histoire
            </motion.h2>
            <motion.div 
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
            >
              <motion.p 
                className="text-lg leading-relaxed mb-6" 
                style={{ color: '#3d405b' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Installé au Panama depuis 5 ans, j'ai petit à petit rencontré un problème très concret pour les surfeurs: 
                aucune wax disponible localement ne répondait vraiment aux besoins des surfeurs du Panama.
              </motion.p>
              <motion.p 
                className="text-lg leading-relaxed mb-6" 
                style={{ color: '#3d405b' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                viewport={{ once: true }}
              >
                Importées, souvent inadaptées aux hautes températures, parfois hors de prix et rarement disponibles 
                en quantité suffisante… La frustration était constante. La guerre du feu était bien terminée mais la 
                guerre de la wax faisait toujours rage. Alors j'ai décidé de m'y mettre moi-même avec le bagage que j'ai sous la main.
              </motion.p>
              <motion.p 
                className="text-lg leading-relaxed" 
                style={{ color: '#3d405b' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Après des mois d'expérimentations, de tests sur le terrain, de retours de surfeurs passionnés et exigeants, 
                j'ai développé une wax tropicale artisanale qui tient enfin ses promesses ici, au Panama.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projet Section */}
      <section id="projet" className="py-20" style={{ backgroundColor: '#f2cc8f' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-4xl font-bold mb-12 text-center" 
              style={{ color: '#3d405b' }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              🧪 Un projet 100% local, né de la passion et de la rigueur
            </motion.h2>
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-xl font-semibold" style={{ color: '#3d405b' }}>
                Mon objectif a toujours été simple :
              </p>
              <p className="text-lg mt-4" style={{ color: '#3d405b' }}>
                👉 Créer une wax performante, locale, éthique et adaptée au climat tropical.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
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
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#3d405b' }}>{item.title}</h3>
                  <p style={{ color: '#3d405b' }}>{item.content}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="text-center mt-12 bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <p className="text-lg font-semibold" style={{ color: '#3d405b' }}>
                Le résultat : une wax dense, souple mais solide, adhérente juste comme il faut, 
                et surtout qui ne fond pas sur ta planche au soleil.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pourquoi Section */}
      <section id="pourquoi" className="py-20" style={{ backgroundColor: '#3d405b' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-4xl font-bold mb-12 text-center text-white"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              🧼 Pourquoi choisir ma wax Panamá Perfect ?
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
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
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#3d405b' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#3d405b' }}>{item.content}</p>
                </motion.div>
              ))}
              
              <motion.div 
                className="md:col-span-2 bg-white rounded-2xl p-6 shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#3d405b' }}>
                  ✅ Zéro bullshit, 100% terrain
                </h3>
                <p style={{ color: '#3d405b' }}>
                  Pas de promesses marketing vides. Juste une wax qui fonctionne, validée par des riders 
                  locaux et testée dans toutes les conditions du Pacifique panaméen.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section id="evolution" className="py-20" style={{ backgroundColor: '#f4f1de' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-12" 
              style={{ color: '#3d405b' }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              💬 Un projet qui évolue avec vous
            </motion.h2>
            
            <motion.div 
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-8"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.p 
                className="text-lg mb-6" 
                style={{ color: '#3d405b' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                La wax est déjà utilisée par plusieurs surfeurs locaux et écoles partenaires.
              </motion.p>
              <motion.div 
                className="text-center p-6 rounded-2xl" 
                style={{ backgroundColor: '#81b29a' }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-xl font-semibold text-white">
                  "ça colle, ça dure, et ça fait le job mieux que beaucoup de marques importées."
                </p>
              </motion.div>
              <motion.p 
                className="text-lg mt-6" 
                style={{ color: '#3d405b' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Je continue à faire évoluer la formule avec vos retours, pour que cette wax ne soit pas 
                juste une alternative… mais la meilleure option disponible pour nos vagues.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disponible Section */}
      <section id="disponible" className="py-20" style={{ backgroundColor: '#81b29a' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-12 text-white"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              🌴 Disponible très bientôt
            </motion.h2>
            <motion.p 
              className="text-xl mb-12 text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              La wax Panamá Perfect sera bientôt disponible en ligne et dans plusieurs spots clés du pays.
            </motion.p>
            
            <motion.div 
              className="grid md:grid-cols-3 lg:grid-cols-5 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { icon: "📦", title: "Petits lots" },
                { icon: "🌊", title: "Formule tropicale" },
                { icon: "🫶", title: "Prix juste" },
                { icon: "👾", title: "Wax personnalisable" },
                { icon: "💚", title: "Engagement local" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold" style={{ color: '#3d405b' }}>{item.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20" style={{ backgroundColor: '#f2cc8f' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl font-bold mb-12" 
              style={{ color: '#3d405b' }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              📩 Rejoins le projet
            </motion.h2>
            
            <motion.div 
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.p 
                className="text-lg mb-8" 
                style={{ color: '#3d405b' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Surfeur, école, surf shop, curieux ou curieuse de participer à une aventure artisanale ?
              </motion.p>
              <motion.p 
                className="text-lg mb-8" 
                style={{ color: '#3d405b' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                viewport={{ once: true }}
              >
                Contacte-moi pour des tests, des collabs ou des précommandes.
              </motion.p>
              
              <motion.div 
                className="flex flex-col md:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.a 
                  href="mailto:contact@waxtropicale.com"
                  className="px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg"
                  style={{ backgroundColor: '#3d405b' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ✉️ Envoyer un email
                </motion.a>
                <motion.a 
                  href="https://wa.me/50700000000"
                  className="px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg"
                  style={{ backgroundColor: '#81b29a' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  📱 WhatsApp
                </motion.a>
              </motion.div>
              
              <motion.div 
                className="mt-12 p-6 rounded-2xl" 
                style={{ backgroundColor: '#f4f1de' }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-lg font-semibold" style={{ color: '#3d405b' }}>
                  Parce que le Panama mérite une wax à son image :<br />
                  authentique, chaude, puissante et locale.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-8" 
        style={{ backgroundColor: '#3d405b' }}
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
            <span className="text-lg font-bold" style={{ color: '#f4f1de' }}>Wax Tropicale Panama</span>
          </motion.div>
          <motion.p 
            className="text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            © 2025 La Wax Panama | Fait avec passion au Panama 🇵🇦
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
};

export default WaxTropicale;