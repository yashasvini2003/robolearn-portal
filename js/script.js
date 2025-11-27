// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Close mobile nav when a link is clicked
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Lesson card switching
const lessonCards = document.querySelectorAll(".lesson-card");
const lessonContents = {
  intro: document.getElementById("lesson-intro"),
  sensors: document.getElementById("lesson-sensors"),
  coding: document.getElementById("lesson-coding"),
  project: document.getElementById("lesson-project"),
};

lessonCards.forEach((card) => {
  card.addEventListener("click", () => {
    const targetLesson = card.getAttribute("data-lesson");

    // Update active card
    lessonCards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");

    // Update visible content
    Object.values(lessonContents).forEach((el) =>
      el.classList.remove("active")
    );
    const targetContent = lessonContents[targetLesson];
    if (targetContent) {
      targetContent.classList.add("active");
    }
  });
});

// Quiz questions
const quizData = [
  {
    question: "Which three parts are most common in a robot?",
    options: [
      "Brain, sensors, actuators",
      "Screen, keyboard, mouse",
      "Battery, charger, cable",
      "Camera, microphone, speaker",
    ],
    answerIndex: 0,
  },
  {
    question: "What does a sensor do in a robot?",
    options: [
      "Moves the robot",
      "Stores energy",
      "Senses the environment",
      "Prints messages",
    ],
    answerIndex: 2,
  },
  {
    question: "In line-following, what are IR sensors typically used for?",
    options: [
      "Measuring temperature",
      "Detecting a black line on a white surface",
      "Recording sound",
      "Displaying images",
    ],
    answerIndex: 1,
  },
  {
    question: "In the sample Arduino-style code, what does delay(1000) mean?",
    options: [
      "Wait 1 second",
      "Stop forever",
      "Move 1000 steps",
      "Turn LED off immediately",
    ],
    answerIndex: 0,
  },
];

const quizContainer = document.getElementById("quizContainer");
const submitQuizBtn = document.getElementById("submitQuiz");
const quizResult = document.getElementById("quizResult");

// Render quiz
if (quizContainer) {
  quizData.forEach((item, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "quiz__question";

    const title = document.createElement("h4");
    title.textContent = `${index + 1}. ${item.question}`;
    qDiv.appendChild(title);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "quiz__options";

    item.options.forEach((opt, optIndex) => {
      const label = document.createElement("label");
      label.className = "quiz__option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index}`;
      input.value = optIndex;

      const span = document.createElement("span");
      span.textContent = opt;

      label.appendChild(input);
      label.appendChild(span);
      optionsDiv.appendChild(label);
    });

    qDiv.appendChild(optionsDiv);
    quizContainer.appendChild(qDiv);
  });
}

// Handle quiz submission
submitQuizBtn?.addEventListener("click", () => {
  let score = 0;
  let answered = 0;

  quizData.forEach((item, index) => {
    const selected = document.querySelector(
      `input[name="q${index}"]:checked`
    );
    if (selected) {
      answered += 1;
      const val = parseInt(selected.value, 10);
      if (val === item.answerIndex) {
        score += 1;
      }
    }
  });

  if (answered < quizData.length) {
    quizResult.textContent = "Please answer all questions before checking.";
    quizResult.style.color = "#facc15";
    return;
  }

  quizResult.textContent = `You scored ${score} out of ${quizData.length}.`;
  quizResult.style.color = score >= 3 ? "#22c55e" : "#f97316";
});
