// Sidebar open/close
const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");
const closeBtn = document.getElementById("closeBtn");

hamburger.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Resume Upload + Question Display
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.querySelector('input[type="file"]');
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    // Remove existing container if present
    const oldContainer = document.getElementById("question-container");
    if (oldContainer) oldContainer.remove();

    // Display MCQ-style questions
    const container = document.createElement("div");
    container.id = "question-container";
    container.style.margin = "30px auto";
    container.style.padding = "20px";
    container.style.width = "70%";
    container.style.backgroundColor = "#f9f9f9";
    container.style.border = "2px solid #ccc";
    container.style.borderRadius = "10px";
    container.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
    container.style.fontFamily = "sans-serif";

    const heading = document.createElement("h2");
    heading.textContent = "Auto-Generated MCQs Based on Your Resume";
    heading.style.textAlign = "center";
    heading.style.color = "#333";
    container.appendChild(heading);

    data.questions.forEach((q, idx) => {
      const qBox = document.createElement("div");
      qBox.style.marginBottom = "20px";
      qBox.style.padding = "15px";
      qBox.style.backgroundColor = "#fff";
      qBox.style.borderRadius = "8px";
      qBox.style.border = "1px solid #ddd";

      const question = document.createElement("p");
      question.innerHTML = `<strong>Q${idx + 1}:</strong> ${q.question}`;
      qBox.appendChild(question);

      q.options.forEach((opt, i) => {
        const optDiv = document.createElement("div");
        optDiv.innerHTML = `<input type="radio" name="q${idx}" value="${opt}" id="q${idx}opt${i}">
                            <label for="q${idx}opt${i}">${opt}</label>`;
        qBox.appendChild(optDiv);
      });

      container.appendChild(qBox);
    });

    document.body.appendChild(container);
  } catch (err) {
    alert("❌ Error uploading resume or fetching questions.");
    console.error(err);
  }
});
