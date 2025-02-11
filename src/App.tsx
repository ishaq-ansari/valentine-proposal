import React, { useState, useEffect } from 'react';
import { Heart, HeartHandshake, HeartOff, PartyPopper, Smile, Sparkles } from 'lucide-react';

function App() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [noClickCount, setNoClickCount] = useState(0);
  const [isNoButtonVisible, setIsNoButtonVisible] = useState(true);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleNoButtonInteraction = () => {
    if (!isNoButtonVisible) return;
    
    if (noClickCount < 2) {
      setIsNoButtonVisible(false);
      setNoClickCount(noClickCount + 1);
      
      const id = window.setTimeout(() => {
        setIsNoButtonVisible(true);
      }, 3000);
      setTimeoutId(id);
    } else {
      setAnswer(false);
    }
  };
  
  const renderContent = () => {
    if (answer === true) {
      return (
        <div className="text-center space-y-4">
          <img 
            src="hug.webp"
            alt="Happy couple with heart balloons"
            className="w-64 h-64 mx-auto object-contain"
          />
          <h1 className="text-4xl font-bold text-pink-600">Yay! You said YES! ❤️</h1>
          <p className="text-xl text-gray-700">You've made me the luckiest person alive!</p>
          <p className="text-xl text-gray-700">I promise to make you the happiest person ever!</p>
        </div>
      );
    }

    if (answer === false) {
      return (
        <div className="text-center space-y-4">
          <HeartOff className="w-20 h-20 mx-auto text-gray-500" />
          <h1 className="text-4xl font-bold text-gray-600">Oh no... 💔</h1>
          <p className="text-xl text-gray-700">Maybe next time...</p>
        </div>
      );
    }

    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <Heart className="w-20 h-20 mx-auto text-pink-500 animate-pulse" />
            <h1 className="text-4xl font-bold text-pink-600">Hey there...</h1>
            <p className="text-xl text-gray-700">I have something to tell you</p>
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              What is it?
            </button>
          </div>
        );
      case 1:
        return (
          <div className="text-center space-y-6">
            <Sparkles className="w-20 h-20 mx-auto text-pink-500 animate-pulse" />
            <div className="space-y-4">
              <p className="text-xl text-gray-700 leading-relaxed italic">
                "You're the most beauuuutiful person I have ever seen. From the moment I first saw you, 
                you've made my heart skip a beat. My heart doesn't listen to me anymore. 
                I come to college so that I can see you. Your smile brightens my days, and your presence makes 
                everything better. You have no idea how much I adore you."
              </p>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
              >
                Want to know?
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center space-y-6">
            <Smile className="w-20 h-20 mx-auto text-pink-500" />
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed italic">
                "When you speak, I feel like I could listen to you forever. Your eyes, your eyes memsmerize me. I am so enthralled by their beauty or intensity that I want to keep looking into them. 
                 I want to look at you the way you needed to be looked at ~ like the whole world could crumble and I wouldn't blink. I love you and it’s getting worse."
              </p>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
              >
                Continue...
              </button>
            </div>
          </div>
        );
        case 3:
        return (
          <div className="text-center space-y-6">
            <HeartHandshake className="w-20 h-20 mx-auto text-pink-500" />
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed italic">
                "There was a time when nights were for sleep. But now, your thoughts have taken over my nights. 
                What I have with you, I don't want with anyone else. I don't know how I lived so far 
                without you. Now it seems like it would be impossible to live without you. I will be completely incomplete without you!"
              </p>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
              >
                Continue...
              </button>
            </div>
          </div>
        );
        case 4:
          return (
            <div className="text-center space-y-6">
              <img 
                src="./proposal.jpg"
                alt="Proposal illustration"
                className="w-64 h-64 mx-auto object-contain"
              />
              <h2 className="text-2xl font-bold text-pink-600">Will you be my Valentine?</h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setAnswer(true)}
                  className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                >
                  Yes! ❤️
                </button>
                <button
                  style={{
                    opacity: isNoButtonVisible ? 1 : 0,
                    transition: 'opacity 0.2s ease-in-out',
                    pointerEvents: isNoButtonVisible ? 'auto' : 'none',
                  }}
                  onMouseEnter={handleNoButtonInteraction}
                  onClick={(e) => {
                    // For mobile devices, trigger the disappearing effect on click
                    if (window.matchMedia('(hover: none)').matches) {
                      e.preventDefault();
                      handleNoButtonInteraction();
                    } else {
                      setAnswer(false);
                    }
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                >
                  No 💔
                </button>
              </div>
            </div>
          );
        default:
          return null;
      }
    };
  

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-lg w-full">
        {renderContent()}
      </div>
      <div className="absolute bottom-4 right-4 text-white/80 font-serif italic text-sm">
        Created with ❤️ by Ishaq Ansari
      </div>
    </div>
  );
}

export default App;