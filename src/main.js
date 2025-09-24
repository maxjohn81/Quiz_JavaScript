import "./style.css";
import { quizThemes } from "./question";

let app = document.getElementById("app");
let titre = document.getElementById("tittre");
let commencer = document.getElementById("commencer");

commencer.addEventListener("click", () => {
  startQuiz();

});

function startQuiz(event) {
  let countQuestion = 0;
  let score = 0;

  // let temps = 2;
  // let second = document.getElementById("second");

  // function moins() {
  //   if (temps == 0) {
  //     afficher();
  //     submit()
  //   }
  //   setInterval(() => {
  //     temps -= 1;
  //     second.innerHTML = temps;
  //   }, 1000);
  // }
  // moins()


  afficher();

  function afficher() {
    while (app.firstElementChild) {
      app.firstElementChild.remove();
    }
  }

  commencerQuestion(countQuestion);

  function commencerQuestion(index) {
    afficher();
    const question = quizThemes[index];

    if (!question) {
      finDeLaPartie();
      return;
    }

    let title = getTitleElement(question.question);
    app.appendChild(title);
    const answerDiv = creatAnswers(question.choices);
    app.appendChild(answerDiv);

    const submitBouton = getSubmitBouton();
    app.appendChild(submitBouton);

    submitBouton.addEventListener("click", () => {
      submit();
    });
  }

  function submit() {
    const selectedAnswer = app.querySelector('input[name="choice"]:checked');
    const value = selectedAnswer.value;

    const question = quizThemes[countQuestion];
    const isCorrect = question.answer === value;
    if (isCorrect) {
      score++;
    }

    plus();
  }
  function plus() {
    setTimeout(() => {
      if(countQuestion < 1){
        alert("Attendre une seconde après chaque reponse")
      }
      countQuestion++;
      commencerQuestion(countQuestion);
    }, 1000);
  }
  function finDeLaPartie() {
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    h1.innerHTML = "Quiz terminé !";
    let fel = "T'es null 😂";
    if (score > 5 && score < 8) {
      fel = "Bravo";
      p.innerHTML = `${fel} t' as eu ${score} sur ${quizThemes.length}`;
      p.classList.add("moyen");
    } else if(score > 6) {
      fel = "Chapeau"
      p.innerHTML = `${fel} t' as eu ${score} sur ${quizThemes.length}`;
      p.classList.add("moyen");
    }else{
      p.innerHTML = `${fel} t' as eu ${score} sur ${quizThemes.length}`;
      p.classList.add("bas");
    }

    app.appendChild(h1);
    app.appendChild(p);

    setTimeout(() => {
      alert("Voulez vous recommencer la partie")
      startQuiz()
    }, 7000);
  }

  function creatAnswers(choices) {
    const answerDiv = document.createElement("div");
    answerDiv.classList.add("answers");

    for (const choice of choices) {
      const label = getAnswerElement(choice);
      label.classList.add("label");
      answerDiv.appendChild(label);
    }
    return answerDiv;
  }
}

function getSubmitBouton() {
  const button = document.createElement("button");
  button.innerText = "Valider";
  button.classList.add("submit");
  return button;
}

function getTitleElement(texte) {
  let title = document.createElement("h3");
  title.innerText = texte;
  return title;
}

function getAnswerElement(texte) {
  const label = document.createElement("label");
  label.innerText = texte;
  const input = document.createElement("input");
  input.id = texte.replaceAll(" ", "_").toLowerCase();
  input.setAttribute("type", "radio");
  input.setAttribute("name", "choice");
  input.setAttribute("value", texte);
  label.appendChild(input);
  return label;
}
