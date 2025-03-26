
import { useEffect, useState } from "react";
import Header from "../components/Header";
import TranslationCard from "../components/TranslationCard";

export default function Translate() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading for smooth animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-32">
        <div className={`max-w-5xl mx-auto transition-all duration-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Universal Translator</h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Translate text, speech, and files between 100+ languages with state-of-the-art accuracy.
            </p>
          </div>
          
          <TranslationCard />
          
          <div className="mt-10 glass-panel p-6 rounded-xl">
            <h2 className="text-xl font-medium mb-4">Translation Tips</h2>
            <ul className="space-y-2 list-disc list-inside text-foreground/80">
              <li>Use voice input for natural, hands-free translation</li>
              <li>Upload text files to translate entire documents at once</li>
              <li>Auto-detection works best with at least a complete sentence</li>
              <li>For specialized terminology, try using more context in your text</li>
              <li>Download your translations for offline reference</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
