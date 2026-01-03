document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user-message');
        userInput.value = '';

        // Simulate AI response (replace with actual API call)
        setTimeout(async () => {
            const aiResponse = await getAIResponse(message);
            addMessage(aiResponse, 'bot-message');
        }, 1000);
    }

    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ' + className;
        messageDiv.innerHTML = '<p>' + text + '</p>';
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function getAIResponse(userMessage) {
        const apiKey = 'AIzaSyCT5DoZ8kI_zHjt5BM8VbuOsRUm7CJvoBY';
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: userMessage
                                }
                            ]
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                return data.candidates[0].content.parts[0].text;
            } else {
                return 'Sorry, I couldn\'t generate a response. Please try again.';
            }
        } catch (error) {
            console.error('Error fetching AI response:', error);
            return 'Sorry, I encountered an error. Please try again later.';
        }
    }})
