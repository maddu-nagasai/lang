
import { useEffect, useState } from "react";
import Header from "../components/Header";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function Team() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const teamMembers: TeamMember[] = [
    {
      name: "Revanth Kumar Nidibrolu",
      role: "Team lead & Backend Developer",
      image: "https://res.cloudinary.com/dhuenys5v/image/upload/v1743006077/1686030286830_ermjyt.jpg"
    },
    {
      name: "Yaswanth Varma Gurindapalli",
      role: "Backend Developer",
      image: "https://res.cloudinary.com/dhuenys5v/image/upload/v1743006079/IMG_20250326_205508_wqsgeo.jpg"
    },
    {
      name: "Ganapathi Naidu Chaluvadi",
      role: "Tester and Design",
      image: "https://res.cloudinary.com/dhuenys5v/image/upload/v1743006208/fogtm8m7nlax4w34vobp.jpg"
    },
    {
      name: "Ayyappa Kandukuri",
      role: "FrontEnd Developer",
      image: "https://res.cloudinary.com/dhuenys5v/image/upload/v1743006279/IMG-20250326-WA0002_agd98w.jpg"
    },
    {
      name: "TejaSri Sadhanala",
      role: "Model Directer",
      image: "https://res.cloudinary.com/dhuenys5v/image/upload/v1743010391/IMG-20250326-WA0007_d3phei.jpg"
    },
  ];
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-32">
        <div className={`max-w-7x1 mx-auto transition-all duration-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <span className="inline-block glass-panel px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Experts
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Meet the <span className="text-gradient">Team</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Our diverse team of linguists, engineers, and language enthusiasts is dedicated to 
              breaking down language barriers worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`glass-card overflow-hidden transition-all duration-500 transform ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className=" aspect-square  h-46 w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>                  
                  <div>
                    <div className="flex flex-wrap gap-2">
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
