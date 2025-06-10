
import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'hinglish', name: 'Hinglish', flag: '🌐' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-400" />
      <div className="flex space-x-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            variant={language === lang.code ? 'default' : 'ghost'}
            size="sm"
            className={`text-xs px-2 py-1 h-auto ${
              language === lang.code 
                ? 'medical-gradient text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {lang.flag} {lang.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
