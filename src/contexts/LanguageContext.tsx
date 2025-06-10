
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'hinglish';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Login Page
    appTitle: 'Raj Medical & General Store',
    signInDescription: 'Sign in to access your inventory system',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    signUpWithGoogle: 'Sign up with Google',
    orContinueWith: 'Or continue with',
    demoCredentials: 'Demo Credentials:',
    welcomeMessage: 'Welcome!',
    loginSuccess: 'Successfully logged in to Raj Medical Store',
    loginFailed: 'Login Failed',
    invalidCredentials: 'Invalid email or password',
    error: 'Error',
    loginError: 'An error occurred during login',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    logout: 'Logout',
    outOfStock: 'Out of Stock',
    stockWork: 'Stock Work',
    
    // Out of Stock
    outOfStockTitle: 'Out of Stock Items',
    addOutOfStockItem: 'Add Out of Stock Item',
    itemName: 'Item Name',
    dateOutOfStock: 'Date Out of Stock',
    notes: 'Notes (Optional)',
    addItem: 'Add Item',
    
    // Stock Work
    stockWorkTitle: 'Stock Work Record',
    addStockWork: 'Add Stock Work',
    quantity: 'Quantity',
    action: 'Action',
    date: 'Date',
    added: 'Added',
    removed: 'Removed',
    moved: 'Moved',
    restocked: 'Restocked',
    
    // Common
    loading: 'Loading...',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    today: 'Today',
    noItems: 'No items found',
  },
  
  hi: {
    // Login Page
    appTitle: 'राज मेडिकल एंड जनरल स्टोर',
    signInDescription: 'अपने इन्वेंटरी सिस्टम तक पहुंचने के लिए साइन इन करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    signingIn: 'साइन इन हो रहा है...',
    signUpWithGoogle: 'Google से साइन अप करें',
    orContinueWith: 'या जारी रखें',
    demoCredentials: 'डेमो क्रेडेंशियल:',
    welcomeMessage: 'स्वागत है!',
    loginSuccess: 'राज मेडिकल स्टोर में सफलतापूर्वक लॉग इन',
    loginFailed: 'लॉगिन असफल',
    invalidCredentials: 'गलत ईमेल या पासवर्ड',
    error: 'त्रुटि',
    loginError: 'लॉगिन के दौरान त्रुटि हुई',
    
    // Dashboard
    welcomeBack: 'वापस स्वागत है',
    logout: 'लॉगआउट',
    outOfStock: 'स्टॉक खत्म',
    stockWork: 'स्टॉक वर्क',
    
    // Out of Stock
    outOfStockTitle: 'स्टॉक खत्म आइटम',
    addOutOfStockItem: 'स्टॉक खत्म आइटम जोड़ें',
    itemName: 'आइटम का नाम',
    dateOutOfStock: 'स्टॉक खत्म होने की तारीख',
    notes: 'नोट्स (वैकल्पिक)',
    addItem: 'आइटम जोड़ें',
    
    // Stock Work
    stockWorkTitle: 'स्टॉक वर्क रिकॉर्ड',
    addStockWork: 'स्टॉक वर्क जोड़ें',
    quantity: 'मात्रा',
    action: 'कार्य',
    date: 'तारीख',
    added: 'जोड़ा गया',
    removed: 'हटाया गया',
    moved: 'स्थानांतरित',
    restocked: 'फिर से स्टॉक',
    
    // Common
    loading: 'लोड हो रहा है...',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    delete: 'डिलीट करें',
    edit: 'एडिट करें',
    today: 'आज',
    noItems: 'कोई आइटम नहीं मिला',
  },
  
  hinglish: {
    // Login Page
    appTitle: 'Raj Medical & General Store',
    signInDescription: 'Apne inventory system access karne ke liye sign in kariye',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signingIn: 'Sign in ho raha hai...',
    signUpWithGoogle: 'Google se sign up kariye',
    orContinueWith: 'Ya continue kariye',
    demoCredentials: 'Demo Credentials:',
    welcomeMessage: 'Welcome!',
    loginSuccess: 'Raj Medical Store mein successfully login ho gaye',
    loginFailed: 'Login fail ho gaya',
    invalidCredentials: 'Galat email ya password',
    error: 'Error',
    loginError: 'Login ke dauran error aya',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    logout: 'Logout',
    outOfStock: 'Stock Khatam',
    stockWork: 'Stock Work',
    
    // Out of Stock
    outOfStockTitle: 'Stock Khatam Items',
    addOutOfStockItem: 'Stock khatam item add kariye',
    itemName: 'Item ka naam',
    dateOutOfStock: 'Stock khatam hone ki date',
    notes: 'Notes (optional)',
    addItem: 'Item add kariye',
    
    // Stock Work
    stockWorkTitle: 'Stock Work Record',
    addStockWork: 'Stock work add kariye',
    quantity: 'Quantity',
    action: 'Action',
    date: 'Date',
    added: 'Add kiya gaya',
    removed: 'Remove kiya gaya',
    moved: 'Move kiya gaya',
    restocked: 'Restock kiya gaya',
    
    // Common
    loading: 'Load ho raha hai...',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    today: 'Aaj',
    noItems: 'Koi item nahi mila',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('hinglish');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('rajstore_language') as Language;
    if (storedLanguage && ['en', 'hi', 'hinglish'].includes(storedLanguage)) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('rajstore_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
