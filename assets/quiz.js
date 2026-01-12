document.addEventListener("DOMContentLoaded", function () {
  const quizForm = document.getElementById("quizForm");
  const nextBtn = document.getElementById("next-button");
  const prevBtn = document.getElementById("prev-button");
  const finishBtn = document.getElementById("finish-button");
  const fill = document.getElementById('progress-bar-fill');

  let currentQuestionIndex = 0;
  let navigationHistory = []; // Tracks the path taken
  const answers = {};

  function displayQuestion(index) {
    const q = questions[index];
    const selected = answers[q.name] || '';

    quizForm.innerHTML = `
      <h2>${q.text}</h2>
      <div class="label-container">
        ${q.options.map(opt => `
          <div class="quiz-item">
            <input type="radio" id="${opt.value}" name="${q.name}" value="${opt.value}" ${opt.value === selected ? 'checked' : ''}>
            <label for="${opt.value}">
              ${opt.img ? `<div class="img-wrap"><img src="${opt.img}"></div>` : ''}
              <span>${opt.label}</span>
            </label>
          </div>
        `).join('')}
      </div>
    `;
    updateUI(index);
  }

 function updateUI(index) {
  // 1. Determine the path length dynamically
  let totalStepsInPath = 3; // Default for Bike Path
  
  if (answers.product_type === "equipment") {
    // If they chose equipment, the path is longer (Gear -> Color -> Size)
    totalStepsInPath = 4;
  }

  // 2. Calculate current progress based on history
  const stepsTaken = navigationHistory.length + 1; 

  // 3. Update Text Labels
  const stepLabel = document.getElementById('current-step');
  const totalLabel = document.getElementById('total-steps');
  
  if (stepLabel) stepLabel.textContent = stepsTaken;
  if (totalLabel) totalLabel.textContent = totalStepsInPath;

  // 4. Update Progress Bar
  const fill = document.getElementById('progress-bar-fill');
  if (fill) {
    const progressPercent = (stepsTaken / totalStepsInPath) * 100;
    fill.style.width = Math.min(progressPercent, 100) + "%";
  }

  // 5. Button Logic (Finish vs Next)
  const currentQ = questions[index];
  const selection = answers[currentQ.name];
  const selectedOption = currentQ.options.find(opt => opt.value === selection);
  
  const isFinish = selectedOption ? selectedOption.nextStep === null : false;

  document.getElementById("prev-button").style.display = navigationHistory.length === 0 ? "none" : "inline-block";
  document.getElementById("next-button").style.display = isFinish ? "none" : "inline-block";
  document.getElementById("finish-button").style.display = isFinish ? "inline-block" : "none";
}

  // Handle Answer selection
  quizForm.addEventListener("change", (e) => {
    answers[questions[currentQuestionIndex].name] = e.target.value;
    updateUI(currentQuestionIndex);
  });

  // Navigation: Next
  nextBtn.addEventListener("click", () => {
    const selection = answers[questions[currentQuestionIndex].name];
    if (!selection) return alert("Please select an option!");

    const opt = questions[currentQuestionIndex].options.find(o => o.value === selection);
    navigationHistory.push(currentQuestionIndex);
    currentQuestionIndex = opt.nextStep;
    displayQuestion(currentQuestionIndex);
  });

  // Navigation: Back
  prevBtn.addEventListener("click", () => {
    currentQuestionIndex = navigationHistory.pop();
    displayQuestion(currentQuestionIndex);
  });

  // Final Redirect
  finishBtn.addEventListener("click", () => {
    const collection = answers.product_type === 'bike' ? 'bikes' : 'helmets';
    let tags = [];
    
    // Build tag list based on what was actually answered
    ['bike_type', 'bike_color', 'equip_type', 'helmet_color', 'equip_size'].forEach(key => {
      if(answers[key]) tags.push(answers[key]);
    });

    window.location.href = `/collections/${collection}/${tags.join('+')}`;
  });

  displayQuestion(0);
});