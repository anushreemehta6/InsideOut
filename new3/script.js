document.addEventListener("DOMContentLoaded", () => {
    const questionInput = document.getElementById("questionInput");
    const answerOutput = document.getElementById("answerOutput");
    const generateAnswerBtn = document.getElementById("generateAnswerBtn");
  
    async function generateAnswer() {
      const question = questionInput.value;
      answerOutput.textContent = "Loading...";
  
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
        answerOutput.textContent = answer;
      } catch (error) {
        answerOutput.textContent = "An error occurred while fetching the answer.";
        console.error("Error fetching answer:", error);
      }
    }
  
    generateAnswerBtn.addEventListener("click", generateAnswer);
  });
  