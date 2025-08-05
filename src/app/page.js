'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const WaxTropicale = () => {
  const [activeSection, setActiveSection] = useState('home');

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
    }
  };

  return (
    <>
      <Head>
        <title>La Wax 100% Panama - Faite avec amour !</title>
        <meta name="description" content="Wax artisanale adaptée au climat tropical du Panama. Fabriquée localement par un surfeur pour les surfeurs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300" style={{ backgroundColor: '#3d405b' }}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/logoWax.jpeg" alt="Logo Wax Tropicale" width={40} height={40} className="rounded-full" />
              <span className="text-xl font-bold" style={{ color: '#f4f1de' }}>La Wax Panama</span>
            </div>
            
            <div className="hidden md:flex space-x-6">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'histoire', label: 'Mon Histoire' },
                { id: 'projet', label: 'Le Projet' },
                { id: 'pourquoi', label: 'Pourquoi' },
                { id: 'evolution', label: 'Avis' },
                { id: 'disponible', label: 'La Wax' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-white/20 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden" style={{ backgroundColor: '#f4f1de' }}>
        <div className="absolute inset-0 opacity-20">
          <Image src="/wax.jpeg" alt="Wax background" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: '#3d405b' }}>
              La Wax Tropicale<br />
              <span style={{ color: '#81b29a' }}>100% Panama</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8" style={{ color: '#3d405b' }}>
              Pensée par un surfeur, façonnée sous le soleil, testée dans les vagues.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollTo('histoire')}
                className="px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#81b29a' }}
              >
                Découvrir l'histoire 🏄‍♂️
              </button>
              <button 
                onClick={() => scrollTo('contact')}
                className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 border-2 hover:bg-white/10"
                style={{ color: '#3d405b', borderColor: '#3d405b' }}
              >
                Me contacter 📩
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section id="histoire" className="py-20" style={{ backgroundColor: '#81b29a' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-white">
              🏄‍♂️ Mon histoire
            </h2>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#3d405b' }}>
                Installé au Panama depuis 5 ans, j'ai petit à petit rencontré un problème très concret pour les surfeurs: 
                aucune wax disponible localement ne répondait vraiment aux besoins des surfeurs du Panama.
              </p>
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#3d405b' }}>
                Importées, souvent inadaptées aux hautes températures, parfois hors de prix et rarement disponibles 
                en quantité suffisante… La frustration était constante. La guerre du feu était bien terminée mais la 
                guerre de la wax faisait toujours rage. Alors j'ai décidé de m'y mettre moi-même avec le bagage que j'ai sous la main.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#3d405b' }}>
                Après des mois d'expérimentations, de tests sur le terrain, de retours de surfeurs passionnés et exigeants, 
                j'ai développé une wax tropicale artisanale qui tient enfin ses promesses ici, au Panama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projet Section */}
      <section id="projet" className="py-20" style={{ backgroundColor: '#f2cc8f' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: '#3d405b' }}>
              🧪 Un projet 100% local, né de la passion et de la rigueur
            </h2>
            <div className="text-center mb-8">
              <p className="text-xl font-semibold" style={{ color: '#3d405b' }}>
                Mon objectif a toujours été simple :
              </p>
              <p className="text-lg mt-4" style={{ color: '#3d405b' }}>
                👉 Créer une wax performante, locale, éthique et adaptée au climat tropical.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#3d405b' }}>Ingrédients sélectionnés</h3>
                <p style={{ color: '#3d405b' }}>
                  Naturels et durables autant que possible, rigoureusement choisis.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#3d405b' }}>Formulation artisanale</h3>
                <p style={{ color: '#3d405b' }}>
                  Précise, affinée au gramme près pour une performance optimale.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#3d405b' }}>Écoute communauté</h3>
                <p style={{ color: '#3d405b' }}>
                  Retours constants des écoles, surfeurs, longboarders, bodyboarders.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12 bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg font-semibold" style={{ color: '#3d405b' }}>
                Le résultat : une wax dense, souple mais solide, adhérente juste comme il faut, 
                et surtout qui ne fond pas sur ta planche au soleil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi Section */}
      <section id="pourquoi" className="py-20" style={{ backgroundColor: '#3d405b' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-white">
              🧼 Pourquoi choisir ma wax Panamá Perfect ?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#3d405b' }}>
                  ✅ Adaptée au climat du Panama
                </h3>
                <p style={{ color: '#3d405b' }}>
                  Résiste aux chaleurs extrêmes. Conçue pour les eaux tropicales (+24 °C). 
                  Fini la wax qui dégouline ou glisse.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#3d405b' }}>
                  ✅ Excellente accroche
                </h3>
                <p style={{ color: '#3d405b' }}>
                  Inspirée des meilleures wax internationales avec une texture unique testée 
                  pour maximiser ton grip sans te coller les pieds.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#3d405b' }}>
                  ✅ Texture évolutive et agréable
                </h3>
                <p style={{ color: '#3d405b' }}>
                  Ferme au toucher, elle devient souple à l'application et réactive sous la chaleur 
                  de la session. Un vrai confort.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#3d405b' }}>
                  ✅ Produit artisanal et local
                </h3>
                <p style={{ color: '#3d405b' }}>
                  Fabriquée au Panama, à la main, en petites séries. Tu soutiens un projet local, 
                  pensé pour les surfeurs d'ici.
                </p>
              </div>
              
              <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#3d405b' }}>
                  ✅ Zéro bullshit, 100% terrain
                </h3>
                <p style={{ color: '#3d405b' }}>
                  Pas de promesses marketing vides. Juste une wax qui fonctionne, validée par des riders 
                  locaux et testée dans toutes les conditions du Pacifique panaméen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section id="evolution" className="py-20" style={{ backgroundColor: '#f4f1de' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12" style={{ color: '#3d405b' }}>
              💬 Un projet qui évolue avec vous
            </h2>
            
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-8">
              <p className="text-lg mb-6" style={{ color: '#3d405b' }}>
                La wax est déjà utilisée par plusieurs surfeurs locaux et écoles partenaires.
              </p>
              <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#81b29a' }}>
                <p className="text-xl font-semibold text-white">
                  "ça colle, ça dure, et ça fait le job mieux que beaucoup de marques importées."
                </p>
              </div>
              <p className="text-lg mt-6" style={{ color: '#3d405b' }}>
                Je continue à faire évoluer la formule avec vos retours, pour que cette wax ne soit pas 
                juste une alternative… mais la meilleure option disponible pour nos vagues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disponible Section */}
      <section id="disponible" className="py-20" style={{ backgroundColor: '#81b29a' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 text-white">
              🌴 Disponible très bientôt
            </h2>
            <p className="text-xl mb-12 text-white">
              La wax Panamá Perfect sera bientôt disponible en ligne et dans plusieurs spots clés du pays.
            </p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-bold" style={{ color: '#3d405b' }}>Petits lots</h3>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-3">🌊</div>
                <h3 className="font-bold" style={{ color: '#3d405b' }}>Formule tropicale</h3>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-3">🫶</div>
                <h3 className="font-bold" style={{ color: '#3d405b' }}>Prix juste</h3>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-3">👾</div>
                <h3 className="font-bold" style={{ color: '#3d405b' }}>Wax personnalisable</h3>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-3">💚</div>
                <h3 className="font-bold" style={{ color: '#3d405b' }}>Engagement local</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20" style={{ backgroundColor: '#f2cc8f' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12" style={{ color: '#3d405b' }}>
              📩 Rejoins le projet
            </h2>
            
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <p className="text-lg mb-8" style={{ color: '#3d405b' }}>
                Surfeur, école, surf shop, curieux ou curieuse de participer à une aventure artisanale ?
              </p>
              <p className="text-lg mb-8" style={{ color: '#3d405b' }}>
                Contacte-moi pour des tests, des collabs ou des précommandes.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a 
                  href="mailto:contact@waxtropicale.com"
                  className="px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{ backgroundColor: '#3d405b' }}
                >
                  ✉️ Envoyer un email
                </a>
                <a 
                  href="https://wa.me/50700000000"
                  className="px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{ backgroundColor: '#81b29a' }}
                >
                  📱 WhatsApp
                </a>
              </div>
              
              <div className="mt-12 p-6 rounded-2xl" style={{ backgroundColor: '#f4f1de' }}>
                <p className="text-lg font-semibold" style={{ color: '#3d405b' }}>
                  Parce que le Panama mérite une wax à son image :<br />
                  authentique, chaude, puissante et locale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: '#3d405b' }}>
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image src="/logoWax.jpeg" alt="Logo Wax Tropicale" width={30} height={30} className="rounded-full" />
            <span className="text-lg font-bold" style={{ color: '#f4f1de' }}>Wax Tropicale Panama</span>
          </div>
          <p className="text-gray-300">
            © 2024 Wax Tropicale. Fait avec passion au Panama 🇵🇦
          </p>
        </div>
      </footer>
    </>
  );
};

export default WaxTropicale;