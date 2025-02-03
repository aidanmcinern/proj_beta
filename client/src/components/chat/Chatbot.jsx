import useChatbot from './../../hooks/useChatbot';


const Chatbot = () => {
    const { messages, input, setInput, sendMessage, inputRef } = useChatbot();

    return (
      <div style={{
        width: '90%',
        height: '90%',
        
        backgroundColor: 'rgba(30, 30, 30, 0.4)',
        borderRadius: '10px',
        padding: '50px',
        position: 'relative',
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '10px',
          border: '1px solid #555',
          borderRadius: '5px',
          padding: '10px',
          backgroundColor: 'rgba(34, 34, 34, 0.5)',
          scrollbarWidth: 'thin',
          scrollbarColor: '#f0a500 #333',
          maxHeight: 'calc(100% - 100px)',
          display: 'flex',
          flexDirection: 'column-reverse'
        }}>
          <div>
            {messages.map((msg, index) => (
              <div key={msg.id || index} style={{
                marginBottom: '10px',
                opacity: 0.8,
                color: msg.isUser ? '#f0a500' : '#fff',
                wordBreak: 'break-word'
              }}>
                <strong>{msg.isUser ? 'You' : 'Barkeep'}:</strong> {msg.text}
              </div>
            ))}
          </div>
        </div>
  
        <div style={{
          display: 'flex',
          gap: '10px',
          backgroundColor: 'rgba(30, 30, 30, 1)',
          padding: '15px',
          borderRadius: '5px'
        }}>
          <input
            ref={inputRef}  // Add ref to the input element
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                sendMessage();
              }
            }}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '5px',
              border: '2px solid #f0a500',
              backgroundColor: '#444',
              color: 'white',
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: input.trim() ? '#f0a500' : '#666',
              color: 'white',
              border: 'none',
              cursor: input.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Send
          </button>
        </div>
      </div>
    );
  };

export default Chatbot;
  