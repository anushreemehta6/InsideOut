document.addEventListener("DOMContentLoaded", () => {
    const questionInput = document.getElementById("questionInput");
    const chatContainer = document.getElementById("chatContainer");
    const generateAnswerBtn = document.getElementById("generateAnswerBtn");
  
    async function generateAnswer() {
      const question = questionInput.value;
      if (!question.trim()) return;  // Prevent empty questions
  
      // Add the user's question to the chat
      const userMessage = document.createElement("div");
      userMessage.classList.add("chat-message", "user-message");
      userMessage.textContent = question;
      chatContainer.appendChild(userMessage);
  
      // Scroll to the bottom of the chat
      chatContainer.scrollTop = chatContainer.scrollHeight;
  
      // Clear input field and show loading message
      questionInput.value = "";
      const aiMessage = document.createElement("div");
      aiMessage.classList.add("chat-message", "ai-message");
      aiMessage.textContent = "Loading...";
      chatContainer.appendChild(aiMessage);
      chatContainer.scrollTop = chatContainer.scrollHeight;
  
      try {
        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyACMbr5cMCJH7VkC_H3GMcfhOlmcmGlr5o",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: question }] }],
            }),
          }
        );
  
        const data = await response.json();
        const answer =
          data["candidates"]?.[0]?.["content"]?.["parts"]?.[0]?.["text"] || "No answer found.";
        
        // Update the AI's message with the real answer
        aiMessage.textContent = answer;
      } catch (error) {
        aiMessage.textContent = "An error occurred while fetching the answer.";
        console.error("Error fetching answer:", error);
      }
  
      // Scroll to the bottom of the chat
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  
    generateAnswerBtn.addEventListener("click", generateAnswer);
  });
  