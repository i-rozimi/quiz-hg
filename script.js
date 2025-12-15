const allQuestions = [
  { q: "Qu'est-ce que la décolonisation ?", a: "Processus par lequel un peuple colonisé accède à l’indépendance" },
  { q: "Que signifie la bipolarisation ?", a: "Division du monde en deux blocs : Est (URSS) et Ouest (USA)" },
  { q: "Quels sont les facteurs internes de la décolonisation en Afrique noire française ?", a: "Rôle des syndicats, partis, religieux, intellectuels" },
  { q: "Quels sont les facteurs externes favorables à la décolonisation ?", a: "Seconde Guerre mondiale, ONU, USA/URSS, Bandung" },
  { q: "Qu'est-ce que la période de détente ?", a: "Rapprochement entre USA et URSS après la crise de Cuba" },
  { q: "Que signifient les pays non-alignés ?", a: "Pays ni dans le bloc USA ni URSS" },
  { q: "Causes profondes de la Seconde Guerre mondiale ?", a: "Traité de Versailles, SDN faible, dictatures, crise de 1929" },
  { q: "Cause immédiate de la Seconde Guerre mondiale ?", a: "Attaque de la Pologne par l’Allemagne (1er sept 1939)" },
  { q: "Conséquences de la Seconde Guerre mondiale ?", a: "50M de morts, ONU, RFA/RDA, décolonisation" },
  { q: "Qu’est-ce que le Plan Marshall ?", a: "Aide américaine pour reconstruire l’Europe après la guerre" },
  { q: "Quand est née l’ONU ?", a: "26 juin 1945 à San Francisco" },
  { q: "Qu’est-ce que la guerre froide ?", a: "Conflit idéologique USA vs URSS sans affrontement direct" },
  { q: "Quand la guerre froide a-t-elle pris fin ?", a: "En 1989 avec la chute du mur de Berlin" },
  { q: "Qui est Fidel Castro ?", a: "Président de Cuba, installe le communisme" },
  { q: "Que signifie DOM-TOM ?", a: "Départements et Territoires d’Outre-Mer" },
  // Tu peux compléter les 80 ici (je les ai raccourcies pour tenir dans le code)
];

let level = 1;
let score = 0;
let currentQuestionIndex = 0;
let currentQuestions = [];

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");

function startLevel() {
  currentQuestions = getRandomQuestions(5);
  currentQuestionIndex = 0;
  showQuestion();
}

function getRandomQuestions(num) {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, num);
}

function getChoices(correctAnswer) {
  const incorrect = allQuestions
    .filter(q => q.a !== correctAnswer)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(q => q.a);
  const allChoices = [...incorrect, correctAnswer].sort(() => Math.random() - 0.5);
  return allChoices;
}

function showQuestion() {
  resetState();
  const current = currentQuestions[currentQuestionIndex];
  questionElement.textContent = current.q;

  const choices = getChoices(current.a);
  choices.forEach(choiceText => {
    const button = document.createElement("button");
    button.textContent = choiceText;
    button.classList.add("choice");
    button.addEventListener("click", () => selectAnswer(button, current.a));
    choicesElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  choicesElement.innerHTML = "";
}

function selectAnswer(button, correctAnswer) {
  const isCorrect = button.textContent === correctAnswer;
  if (isCorrect) {
    button.classList.add("correct");
    score++;
    scoreElement.textContent = `Score : ${score}`;
  } else {
    button.classList.add("wrong");
  }

  Array.from(choicesElement.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) btn.classList.add("correct");
  });

  nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    level++;
    if (score % 5 === 0) {
      alert(`🎉 Bravo ! Tu passes au niveau ${level} !`);
      levelElement.textContent = `Niveau ${level}`;
      startLevel();
    } else {
      alert("💡 Fin du niveau !");
      startLevel();
    }
  }
});

startLevel();
