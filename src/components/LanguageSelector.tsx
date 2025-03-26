
import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Globe, Search } from 'lucide-react';
import { languages } from '../lib/languages';

interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
  placeholder?: string;
  autoDetect?: boolean;
}

export default function LanguageSelector({ 
  value, 
  onChange, 
  placeholder = "Select language",
  autoDetect = false 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (language: string) => {
    onChange(language);
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedLanguage = value 
    ? languages.find(lang => lang.code === value)?.name 
    : placeholder;

  return (
    <div className="relative min-w-[200px]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 glass-panel rounded-lg text-foreground"
      >
        <div className="flex items-center space-x-2">
          {value === 'auto' ? (
            <Globe className="w-5 h-5 text-blue-500" />
          ) : null}
          <span className="truncate">
            {value === 'auto' ? 'Auto Detect' : selectedLanguage}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full glass-card py-2 animate-scale-in origin-top">
          <div className="px-3 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search languages..."
                className="w-full py-2 pl-9 pr-3 bg-background/50 border-border rounded-md text-sm input-focus-ring"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto scrollbar-thin">
            {autoDetect && (
              <button
                className="w-full flex items-center px-3 py-2 hover:bg-primary/10 text-left"
                onClick={() => handleSelect('auto')}
              >
                <div className="flex items-center flex-1">
                  <Globe className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Auto Detect</span>
                </div>
                {value === 'auto' && <Check className="w-4 h-4 text-primary" />}
              </button>
            )}
            
            {filteredLanguages.map((language) => (
              <button
                key={language.code}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-primary/10 text-left"
                onClick={() => handleSelect(language.code)}
              >
                <span className="truncate">{language.name}</span>
                {value === language.code && <Check className="w-4 h-4 text-primary" />}
              </button>
            ))}

            {filteredLanguages.length === 0 && (
              <div className="px-3 py-2 text-muted-foreground text-sm">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
