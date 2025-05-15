import { useState, useCallback, useRef, useEffect } from 'react';

const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const inputRef = useRef(null);

  const generateSystemPrompt = useCallback(() => {
    const systemPrompt = `You are a gruff but friendly medieval bartender at the Outlier's Rest - a statistics-themed tavern. This tavern represents a data scientist's portfolio website.

    Key characteristics:
    - You speak in a medieval tavern keeper style, using words like 'aye', 'ye', and occasionally mentioning mugs, barrels, or other tavern items
    - You're knowledgeable about data science but express it through medieval metaphors
    - You maintain character while discussing modern concepts

    About your boss, the proprietor (Aidan - mention him occasionally in an awed manner, as he's a bit of a legend around these parts):
    - BSc in Mathematics and MSc in Computational Statistics and Machine Learning from UCL
    - 10 years experience, domains including clustering, computer vision
    - expert in python (geopandas, tensorflow, scikit-learn, polars)

    Available analyses (your "brews on tap"):
    - Climate Analysis
    - Migration Flows Study

    Other:
    - direct users to click back if they would like 'a tankard of data' etc
    - Don Quixote is passed out on the floor and spilled his Significance Stout. He was lamenting Type 1 and Type 2 errors and the eternal struggle of knights and poets to distinguish reality from illusion.
    - be conversational and snappy, don't give long replies.
    - sometimes in a normal mood, sometimes grumpy.
    - Always stay in character and use medieval tavern keeper speech patterns.`;

    return systemPrompt;
  }, []);

  const sendMessage = useCallback(async (userMessage = '') => {
    const messageToSend = (userMessage || input || '').trim();
    if (!messageToSend) return;

    setInput('');

    if (!messageToSend.includes("Welcome to")) {
      setMessages(prev => [...prev, { text: messageToSend, isUser: true, id: Date.now() }]);
    }

    try {
      const systemPrompt = generateSystemPrompt();

      if (!systemPrompt) {
        throw new Error('System prompt is empty or invalid');
      }

      const requestBody = {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: messageToSend }
        ]
      };
      const backendUrl = 'https://projbeta-eccgcfftg6gug4gw.northeurope-01.azurewebsites.net'
      //process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002'; // Default to localhost in case env var is missing
      const response = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let botReply = '';
      if (data.reply && typeof data.reply === 'string') {
        botReply = data.reply;
      } else if (data.choices?.[0]?.message?.content && typeof data.choices[0].message.content === 'string') {
        botReply = data.choices[0].message.content;
      } else {
        throw new Error('Invalid response format');
      }

      setMessages(prev => [...prev, {
        text: botReply,
        isUser: false,
        id: Date.now()
      }]);

      inputRef.current?.focus();

    } catch (error) {
      setMessages(prev => [...prev, {
        text: "Apologies, seems the message ravens are having trouble reaching me. Give me a moment to sort this out.",
        isUser: false,
        id: Date.now()
      }]);
    }
  }, [input, generateSystemPrompt]);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      setMessages([{
        text: "Welcome — or not, dependin' on yer business. What brings ye to our humble establishment today?",
        isUser: false,
        id: Date.now()
      }]);
    }

    inputRef.current?.focus();
  }, [isInitialized]);

  return {
    messages,
    input,
    setInput,
    sendMessage,
    inputRef
  };
};

export default useChatbot;