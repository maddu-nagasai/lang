
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-32">
        <div className={`max-w-7xl mx-auto transition-all duration-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Mission Section */}
          <div className="text-center mb-20">
            <span className="inline-block glass-panel px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Mission
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Breaking Language Barriers, <br/>
              <span className="text-gradient">Connecting Humanity</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              We believe language should never be a barrier to understanding, connection, or opportunity.
              Our mission is to make seamless translation available to everyone, everywhere.
            </p>
          </div>
          
          {/* Story Section */}
          <div className="glass-card p-8 md:p-12 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Transglotix was founded in 2025 by a diverse team of linguists, engineers, and language enthusiasts
                    who shared a vision: to create a world where language differences enhance rather than hinder human connection.
                  </p>
                  <p>
                    What began as a small project to improve machine translation for underrepresented languages
                    quickly evolved into a comprehensive platform serving millions of users worldwide.
                  </p>
                  <p>
                    Today, we offer translation services in over 100 languages, with industry-leading
                    accuracy powered by our proprietary neural network architecture that preserves
                    context, tone, and cultural nuances.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Team collaborating"
                  className="rounded-xl w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Accuracy",
                  description: "We strive for the highest possible translation quality, preserving meaning and context."
                },
                {
                  title: "Accessibility",
                  description: "Language services should be available to everyone, regardless of resources or technical ability."
                },
                {
                  title: "Privacy",
                  description: "We respect user privacy and maintain strict data protection standards in all our services."
                },
                {
                  title: "Innovation",
                  description: "We continuously advance our technology to tackle the most challenging aspects of language translation."
                }
              ].map((value, index) => (
                <div key={index} className="glass-panel p-6 scale-hover">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                    <span className="text-xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-foreground/80">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Technology Section */}
          <div className="glass-card p-8 md:p-12 mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Technology</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4 text-foreground/80">
                  <p>
                    At the heart of our translation platform is a proprietary neural network 
                    architecture that combines the latest advances in machine learning with decades 
                    of linguistic research.
                  </p>
                  <p>
                    Unlike conventional translation systems, our technology understands context, 
                    idioms, and cultural references, producing translations that preserve not just 
                    the literal meaning, but the intent and tone of the original.
                  </p>
                  <p>
                    Key features of our technology include:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Neural network architecture with over 175 billion parameters</li>
                    <li>Context-aware translation that captures nuance and tone</li>
                    <li>Real-time voice recognition and translation in 100+ languages</li>
                    <li>Advanced text-to-speech synthesis with natural intonation</li>
                    <li>Document translation that preserves formatting and layout</li>
                  </ul>
                  <p>
                    We continually improve our models through both machine learning and human
                    feedback, ensuring our translations become more accurate and natural over time.
                  </p>
                </div>
              </div>
              <div className="relative h-full min-h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
                  alt="Technology"
                  className="rounded-xl w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
