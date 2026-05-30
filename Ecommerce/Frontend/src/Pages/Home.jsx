import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ShopContext } from "../Context/ShopContext"
import Hero from "../Components/Hero"
import NewCollections from "../Components/NewCollections"
import NewsLetter from "../Components/NewsLetter"
import Offer from "../Components/Offer"
import Popular from "../Components/Popular"

const Home = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { all_products } = useContext(ShopContext);
  const navigate = useNavigate();

  // Function to detect language from transcript
  const detectLanguage = (text) => {
    const lowerText = text.toLowerCase();

    // Check for Hindi characters or common Hindi words
    const hindiPattern = /[\u0900-\u097F]/;
    const hindiWords = ['मैं', 'आप', 'है', 'हो', 'कर', 'का', 'की', 'के', 'को', 'से', 'पर', 'यह', 'वह', 'क्या', 'कौन', 'कब', 'कहाँ', 'कैसे', 'क्यों', 'मेरे', 'आपके', 'उसके', 'हम', 'तुम', 'वे', 'होता', 'होती', 'होते', 'था', 'थी', 'थे', 'होगा', 'होगी', 'होंगे', 'करो', 'करें', 'करना', 'किया', 'की', 'किए', 'दिखाओ', 'दिखाएं', 'ले', 'चलो', 'जाओ', 'मिल', 'मिली', 'मिले', 'महिला', 'औरत', 'वुमेन्स', 'पुरुष', 'मेन्स', 'बच्चा', 'किड्स', 'कार्ट', 'टोकरी', 'लॉगिन', 'मदद', 'अलविदा', 'नमस्ते', 'हेलो'];

    if (hindiPattern.test(text)) {
      return 'hi-IN';
    }

    // Check for common Hindi words in the text
    for (const word of hindiWords) {
      if (lowerText.includes(word.toLowerCase())) {
        return 'hi-IN';
      }
    }

    return 'en-US'; // Default to English
  };

  useEffect(() => {
    let recognition = null;

    // Function to start passive listening for trigger words
    const startPassiveListening = () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US'; // Start with English, detect language from transcript

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          const speechResult = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
          setTranscript(speechResult);

          // Check for trigger words to activate assistant
          if (!isActive && (
            speechResult.includes('hello') ||
            speechResult.includes('hi') ||
            speechResult.includes('hey') ||
            speechResult.includes('नमस्ते') ||
            speechResult.includes('हेलो') ||
            speechResult.includes('hai') ||
            speechResult.includes('halo')
          )) {
            setIsActive(true);
            recognition.stop();
            setTimeout(() => {
              activateVoiceAssistant();
            }, 500);
          }
          // If already active, handle commands
          else if (isActive) {
            handleVoiceCommand(speechResult);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          // Restart passive listening if not active
          if (!isActive) {
            setTimeout(() => {
              startPassiveListening();
            }, 500); // Reduced delay for better responsiveness
          }
        };

        recognition.onerror = (event) => {
          console.log('Speech recognition error:', event.error);
          setIsListening(false);
          // Restart passive listening if not active
          if (!isActive) {
            setTimeout(() => {
              startPassiveListening();
            }, 1000);
          }
        };

        recognition.start();
      }
    };

    // Function to activate full voice assistant
    const activateVoiceAssistant = () => {
      if ('speechSynthesis' in window) {
        const greeting = "What can I do for you?";
        const utterance = new SpeechSynthesisUtterance(greeting);
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;
        utterance.lang = 'en-US';

        // Try to find a female voice
        const voices = speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice =>
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('zira') ||
          voice.name.toLowerCase().includes('hazel') ||
          voice.name.toLowerCase().includes('susan') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('victoria')
        );

        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }

        // Start active listening after greeting
        utterance.onend = () => {
          startActiveListening();
        };

        speechSynthesis.speak(utterance);
      }
    };

    // Function to start active listening for commands
    const startActiveListening = () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US'; // Start with English, will detect language from transcript

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          const speechResult = event.results[0][0].transcript.toLowerCase().trim();
          setTranscript(speechResult);
          handleVoiceCommand(speechResult);
        };

        recognition.onend = () => {
          setIsListening(false);
          // Continue active listening for more commands
          setTimeout(() => {
            startActiveListening();
          }, 1000);
        };

        recognition.onerror = (event) => {
          console.log('Speech recognition error:', event.error);
          setIsListening(false);
          // Continue active listening
          setTimeout(() => {
            startActiveListening();
          }, 1000);
        };

        recognition.start();
      }
    };

    const handleVoiceCommand = (command) => {
      const detectedLanguage = detectLanguage(command);
      let response = "";
      let navigateTo = null;

      // English commands
      if (detectedLanguage === 'en-US') {
        if (command.includes('please provide women') || command.includes('show me women') || command.includes('women') || command.includes('female') || command.includes('ladies') || command.includes('provide women') || command.includes('give me women') || command.includes('women wear') || command.includes('womens wear')) {
          navigateTo = '/womens';
          response = "Here are our beautiful women's clothing collection. You can browse dresses, tops, jeans, and more!";
        } else if (command.includes('please provide men') || command.includes('show me men') || command.includes('men') || command.includes('male') || command.includes('boys') || command.includes('provide men') || command.includes('give me men') || command.includes('men wear') || command.includes('mens wear')) {
          navigateTo = '/mens';
          response = "Here are our stylish men's clothing collection. You can browse shirts, pants, hoodies, and more!";
        } else if (command.includes('please provide kid') || command.includes('show me kid') || command.includes('kid') || command.includes('children') || command.includes('baby') || command.includes('provide kid') || command.includes('give me kid') || command.includes('kids wear') || command.includes('kid wear')) {
          navigateTo = '/kids';
          response = "Welcome to our kids' clothing section with adorable outfits!";
        } else if (command.includes('cart') || command.includes('shopping cart') || command.includes('basket')) {
          navigateTo = '/cart-page';
          response = "Let me take you to your shopping cart.";
        } else if (command.includes('login') || command.includes('sign in') || command.includes('account')) {
          navigateTo = '/login';
          response = "I'll help you sign in to your account.";
        } else if (command.includes('popular') || command.includes('trending') || command.includes('best')) {
          response = "Check out our popular products section above - these are our customer favorites!";
        } else if (command.includes('new') || command.includes('latest') || command.includes('recent')) {
          response = "Our latest collections are showcased in the New Collections section!";
        } else if (command.includes('help') || command.includes('what can you do') || command.includes('assist')) {
          response = "I can help you navigate our store! Say 'please provide me men's wear' for men's fashion, 'please provide me women's wear' for ladies fashion, 'please provide me kids wear' for children's clothes, or 'cart' for your shopping basket.";
        } else if (command.includes('bye') || command.includes('goodbye') || command.includes('stop') || command.includes('quit')) {
          setIsActive(false);
          response = "Goodbye! Say 'Hello' anytime to talk again.";
          setTimeout(() => {
            startPassiveListening();
          }, 2000);
        } else {
          response = "I can help you find women's wear, men's wear, kids' wear, or access your cart. What would you like to see?";
        }
      }

      // Hindi commands
      else if (detectedLanguage === 'hi-IN') {
        if (command.includes('महिला') || command.includes('औरत') || command.includes('वुमेन्स') || command.includes('लड़की') || command.includes('महिलाओं के') || command.includes('महिला वियर') || command.includes('औरतों के कपड़े')) {
          navigateTo = '/womens';
          response = "यहाँ हमारी सुंदर महिलाओं की कपड़ों की कलेक्शन है। आप ड्रेस, टॉप्स, जीन्स और बहुत कुछ ब्राउज़ कर सकते हैं!";
        } else if (command.includes('मर्द') || command.includes('पुरुष') || command.includes('मेन्स') || command.includes('लड़का') || command.includes('पुरुषों के') || command.includes('मर्द वियर') || command.includes('पुरुष कपड़े')) {
          navigateTo = '/mens';
          response = "यहाँ हमारे स्टाइलिश पुरुषों के कपड़ों की कलेक्शन है। आप शर्ट, पैंट, हुडी और बहुत कुछ ब्राउज़ कर सकते हैं!";
        } else if (command.includes('बच्चा') || command.includes('बच्चे') || command.includes('किड्स') || command.includes('बच्चों के') || command.includes('किड वियर') || command.includes('बच्चे कपड़े')) {
          navigateTo = '/kids';
          response = "हमारे बच्चों के कपड़ों के सेक्शन में प्यारे आउटफिट्स देखें!";
        } else if (command.includes('कार्ट') || command.includes('टोकरी')) {
          navigateTo = '/cart-page';
          response = "आपको आपकी शॉपिंग कार्ट में ले चलूँ।";
        } else if (command.includes('लॉगिन') || command.includes('साइन इन')) {
          navigateTo = '/login';
          response = "मैं आपको आपके अकाउंट में साइन इन करने में मदद करूँगा।";
        } else if (command.includes('मदद') || command.includes('क्या कर सकते हो') || command.includes('सहायता')) {
          response = "मैं आपकी दुकान नेविगेट करने में मदद कर सकता हूँ! 'मर्द वियर दो' कहें पुरुषों की फैशन के लिए, 'महिला वियर दो' महिलाओं की फैशन के लिए, 'बच्चे वियर दो' बच्चों के कपड़ों के लिए, या 'कार्ट' आपकी शॉपिंग टोकरी के लिए।";
        } else if (command.includes('अलविदा') || command.includes('बाय') || command.includes('रुक') || command.includes('छोड़')) {
          setIsActive(false);
          response = "अलविदा! कभी भी बात करने के लिए 'नमस्ते' कहें।";
          setTimeout(() => {
            startPassiveListening();
          }, 2000);
        } else {
          response = "मैं महिलाओं के वियर, पुरुषों के वियर, बच्चों के वियर ढूँढने या आपकी कार्ट ऐक्सेस करने में मदद कर सकता हूँ। आप क्या देखना चाहेंगे?";
        }
      }

      // Navigate if needed
      if (navigateTo) {
        setTimeout(() => {
          navigate(navigateTo);
        }, 1500);
      }

      // Speak the response
      if ('speechSynthesis' in window) {
        const responseUtterance = new SpeechSynthesisUtterance(response);
        responseUtterance.rate = 0.8;
        responseUtterance.pitch = 1.1;
        responseUtterance.volume = 0.8;
        responseUtterance.lang = detectedLanguage;

        const voices = speechSynthesis.getVoices();
        let selectedVoice = null;

        if (detectedLanguage === 'hi-IN') {
          selectedVoice = voices.find(voice =>
            voice.lang.startsWith('hi') ||
            voice.name.toLowerCase().includes('hindi') ||
            voice.name.toLowerCase().includes('india')
          );
        } else {
          selectedVoice = voices.find(voice =>
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('woman') ||
            voice.name.toLowerCase().includes('zira') ||
            voice.name.toLowerCase().includes('hazel') ||
            voice.name.toLowerCase().includes('susan') ||
            voice.name.toLowerCase().includes('samantha') ||
            voice.name.toLowerCase().includes('victoria')
          );
        }

        if (selectedVoice) {
          responseUtterance.voice = selectedVoice;
        }

        speechSynthesis.speak(responseUtterance);
      }
    };

    // Start passive listening after page loads
    const timer = setTimeout(() => {
      startPassiveListening();
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (recognition) {
        recognition.stop();
      }
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, [all_products, navigate, isActive]);

  return (
  <>
  <Hero/>
  <Popular/>
  <Offer/>
  <NewCollections/>
  <NewsLetter/>

  {/* Voice Assistant Status */}
  {isListening && (
    <div className="voice-indicator">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-sm">
          {isActive ? 'Listening...' : 'Say "Hello" to activate'}
        </span>
      </div>
    </div>
  )}

  {isActive && !isListening && (
    <div className="voice-indicator">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-sm">Voice Assistant Active</span>
      </div>
    </div>
  )}

  {transcript && (
    <div className="transcript-display">
      <p className="text-sm">You said: "{transcript}"</p>
    </div>
  )}
  </>
  )
}

export default Home