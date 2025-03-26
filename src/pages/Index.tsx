
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import WorldMap from "../components/WorldMap";

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startCounting();
        }
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) {
      observer.current.observe(statsRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);
  
  const [languageCount, setLanguageCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [translationCount, setTranslationCount] = useState(0);
  
  const startCounting = () => {
    let startTime = Date.now();
    const duration = 2000; // 2 seconds
    
    const targetLanguages = 100;
    const targetUsers = 5000000;
    const targetTranslations = 1000000000;
    
    const updateCounters = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      setLanguageCount(Math.floor(progress * targetLanguages));
      setUserCount(Math.floor(progress * targetUsers));
      setTranslationCount(Math.floor(progress * targetTranslations));
      
      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      }
    };
    
    requestAnimationFrame(updateCounters);
  };
  
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B+';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <WorldMap />
        </div>
        
        <div 
          className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-block glass-panel px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            Breaking language barriers
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Translate anything <br/>
            <span className="text-gradient">anywhere, instantly</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
            Experience seamless translation across 100+ languages, with voice input, file uploads, 
            and precision that preserves meaning and context.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/translate" 
              className="glass-card bg-primary text-primary-foreground bg-blue-500 dark:bg-primary px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center btn-hover min-w-40"
            >
              Start Translating
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link 
              to="/about" 
              className="glass-panel px-8 py-3 rounded-lg font-medium hover:bg-background/50 transition-colors inline-flex items-center justify-center btn-hover min-w-40"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <div className="p-2 rounded-full border border-foreground/20">
            <ArrowRight className="w-5 h-5 rotate-90" />
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section 
        ref={statsRef} 
        className="py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <h3 className="text-5xl font-bold mb-2 text-gradient">{languageCount}+</h3>
              <p className="text-xl">Languages</p>
            </div>
            
            <div className="glass-card p-8 text-center">
              <h3 className="text-5xl font-bold mb-2 text-gradient">{formatNumber(userCount)}</h3>
              <p className="text-xl">Users Worldwide</p>
            </div>
            
            <div className="glass-card p-8 text-center">
              <h3 className="text-5xl font-bold mb-2 text-gradient">{formatNumber(translationCount)}</h3>
              <p className="text-xl">Translations</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block glass-panel px-4 py-2 rounded-full text-sm font-medium mb-6">
              Premium Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Powerful Translation Tools
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Our platform offers a comprehensive suite of features designed to make translation
              seamless, accurate, and efficient.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Voice Translation",
                description: "Speak naturally and get instant translations in over 100 languages."
              },
              {
                title: "File Translation",
                description: "Upload documents and get them translated while preserving formatting."
              },
              {
                title: "Auto Detection",
                description: "Our AI automatically detects the source language for instant translation."
              },
              {
                title: "Offline Mode",
                description: "Download language packs to translate even without an internet connection."
              },
              {
                title: "Context Awareness",
                description: "Our translations understand context for more natural, accurate results."
              },
              {
                title: "Cross-Platform",
                description: "Use on any device with perfect synchronization across platforms."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-8 scale-hover"
              >
                <div className="h-12 w-12 flex items-center justify-center glass-panel rounded-full mb-6">
                  <span className="text-2xl font-bold text-gradient">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass-card p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to break language barriers?</h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto">
            Start translating now and experience the power of seamless communication across languages.
          </p>
          <Link 
            to="/translate" 
            className="glass-card bg-primary text-primary-foreground bg-blue-500 dark:bg-primary px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center btn-hover min-w-40"
          >
            Start Translating
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gradient">Transglotix</span>
            <p className="mt-2 text-sm text-foreground/60">
              Breaking language barriers since 2024
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <ul className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-end">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/translate" className="hover:text-primary transition-colors">
                  Translate
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-primary transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
            
            <p className="mt-6 text-sm text-foreground/60 text-center md:text-right">
              © {new Date().getFullYear()} . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
