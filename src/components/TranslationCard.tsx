
import { useState, useRef, useEffect } from 'react';
import { Copy, Download, Mic, MicOff, RefreshCw, Upload, Volume2 } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { translateText } from '../lib/translation';
import { toast } from "sonner";

export default function TranslationCard() {
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (sourceText.trim() && sourceText.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        handleTranslate();
      }, 1000);
      
      return () => clearTimeout(delayDebounceFn);
    }
  }, [sourceText, sourceLanguage, targetLanguage]);
  
  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    try {
      const result = await translateText(sourceText, sourceLanguage, targetLanguage);
      setTranslatedText(result);
    } catch (error) {
      toast.error("Translation failed. Please try again.");
      console.error("Translation error:", error);
    } finally {
      setIsTranslating(false);
    }
  };
  
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = true;
    recognition.interimResults = true;
    
    if (sourceLanguage !== 'auto') {
      const langCode = sourceLanguage.includes('-') 
        ? sourceLanguage 
        : `${sourceLanguage}-${sourceLanguage}`;
      recognition.lang = langCode;
    }
    
    recognition.onstart = () => {
      setIsListening(true);
      toast.info("Listening...");
    };
    
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      
      setSourceText(finalTranscript || interimTranscript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      toast.error(`Speech recognition error: ${event.error}`);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };
  
  const speakText = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) {
      toast.error("Text-to-speech is not supported in your browser");
      return;
    }
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    
    utterance.onstart = () => {
      toast.info("Speaking...");
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error', event);
      toast.error("Failed to speak text");
    };
    
    window.speechSynthesis.speak(utterance);
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      toast.success("Copied to clipboard");
      
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(() => {
      toast.error("Failed to copy");
    });
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'text/plain') {
      toast.error("Please upload a .txt file");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const text = event.target.result as string;
        setSourceText(text);
      }
    };
    
    reader.onerror = () => {
      toast.error("Error reading file");
    };
    
    reader.readAsText(file);
  };
  
  const handleDownload = () => {
    if (!translatedText) return;
    
    const element = document.createElement('a');
    const file = new Blob([translatedText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `translation_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success("Downloaded translation");
  };
  
  const handleSwapLanguages = () => {
    if (sourceLanguage === 'auto') {
      toast.info("Cannot swap with Auto Detect language");
      return;
    }
    
    const tempLang = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    
    // Swap texts as well
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };
  
  return (
    <div className="glass-card overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 z">
        {/* Source text */}
        <div className="p-6 flex flex-col h-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 mb-4">
            <div className="w-full sm:w-auto">
              <LanguageSelector 
                value={sourceLanguage} 
                onChange={setSourceLanguage} 
                placeholder="Detect language"
                autoDetect
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleVoiceInput}
                className={`p-2 rounded-lg btn-hover ${
                  isListening 
                    ? 'bg-red-500/20 text-red-500' 
                    : 'glass-panel'
                }`}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 glass-panel rounded-lg btn-hover"
                aria-label="Upload file"
              >
                <Upload className="w-5 h-5" />
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept=".txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </button>
              
              <button 
                onClick={() => speakText(sourceText, sourceLanguage)}
                disabled={!sourceText}
                className={`p-2 rounded-lg btn-hover ${
                  sourceText ? 'glass-panel' : 'opacity-50 cursor-not-allowed glass-panel'
                }`}
                aria-label="Speak source text"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => handleCopy(sourceText)}
                disabled={!sourceText}
                className={`p-2 rounded-lg btn-hover ${
                  sourceText ? 'glass-panel' : 'opacity-50 cursor-not-allowed glass-panel'
                }`}
                aria-label="Copy source text"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
            className="w-full h-60 bg-background/30 rounded-lg p-4 border-0 resize-none input-focus-ring"
          />
        </div>
        
        {/* Translation controls */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="absolute">
            <button
              onClick={handleSwapLanguages}
              className="p-3 glass-panel rounded-full animate-pulse-light btn-hover"
              aria-label="Swap languages"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Swap buttons for mobile */}
        <div className="lg:hidden px-6 flex justify-center">
          <button
            onClick={handleSwapLanguages}
            className="p-3 glass-panel rounded-full animate-pulse-light btn-hover"
            aria-label="Swap languages"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        
        {/* Translated text */}
        <div className="p-6 flex flex-col h-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 mb-4">
            <div className="w-full sm:w-auto">
              <LanguageSelector 
                value={targetLanguage} 
                onChange={setTargetLanguage} 
                placeholder="Select language"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => speakText(translatedText, targetLanguage)}
                disabled={!translatedText}
                className={`p-2 rounded-lg btn-hover ${
                  translatedText ? 'glass-panel' : 'opacity-50 cursor-not-allowed glass-panel'
                }`}
                aria-label="Speak translated text"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => handleCopy(translatedText)}
                disabled={!translatedText}
                className={`p-2 rounded-lg btn-hover ${
                  translatedText ? 'glass-panel' : 'opacity-50 cursor-not-allowed glass-panel'
                }`}
                aria-label="Copy translated text"
              >
                <Copy className="w-5 h-5" />
              </button>
              
              <button 
                onClick={handleDownload}
                disabled={!translatedText}
                className={`p-2 rounded-lg btn-hover ${
                  translatedText ? 'glass-panel' : 'opacity-50 cursor-not-allowed glass-panel'
                }`}
                aria-label="Download translation"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="w-full h-60 bg-background/30 rounded-lg p-4 overflow-auto">
            {isTranslating ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : translatedText ? (
              <p className="whitespace-pre-wrap">{translatedText}</p>
            ) : (
              <p className="text-muted-foreground text-center h-full flex items-center justify-center">
                Translation will appear here
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
