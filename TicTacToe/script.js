// Selektujemo sve ćelije na tabli
const cells = document.querySelectorAll(".cell");
// Selektujemo element za prikaz statusa igre
const statusText = document.querySelector("#statusText");
// Selektujemo dugme za restart igre
const restartBtn = document.querySelector("#restartBtn");

// Niz koji sadrži sve moguće kombinacije za pobedu
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Niz koji predstavlja stanje na tabli
let options = ["", "", "", "", "", "", "", "", ""];
// Promenljiva koja prati trenutnog igrača
let currentPlayer = "X";
// Promenljiva koja prati da li je igra u toku
let running = false;

// Inicijalizujemo igru
initializeGame();

// Funkcija za inicijalizaciju igre
function initializeGame() {
  // Dodajemo event listener na svaku ćeliju za klik
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  // Dodajemo event listener na dugme za restart igre
  restartBtn.addEventListener("click", restartGame);
  // Postavljamo tekst za prikaz statusa igre
  statusText.textContent = `${currentPlayer}'s turn`;
  // Označavamo da je igra u toku
  running = true;
}

// Funkcija koja se poziva kada se klikne na ćeliju
function cellClicked() {
  // Dobavljamo indeks kliknutog polja
  const cellIndex = this.getAttribute("cellIndex");
  // Proveravamo da li je polje već popunjeno ili igra nije u toku
  if (options[cellIndex] !== "" || !running) {
    return;
  }
  // Ažuriramo polje i proveravamo da li ima pobednika
  updateCell(this, cellIndex);
  checkWinner();
}

// Funkcija za ažuriranje polja
function updateCell(cell, index) {
  // Postavljamo vrednost u nizu options na trenutnog igrača
  options[index] = currentPlayer;
  // Postavljamo tekst u ćeliji na trenutnog igrača
  cell.textContent = currentPlayer;
}

// Funkcija za promenu igrača
function changePlayer() {
  // Menjamo trenutnog igrača
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  // Ažuriramo tekst za prikaz statusa igre
  statusText.textContent = `${currentPlayer}'s turn`;
}

// Funkcija za proveru pobednika
function checkWinner() {
  let roundWon = false;
  // Prolazimo kroz sve moguće kombinacije za pobedu
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    // Proveravamo da li su sva tri polja popunjena
    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    // Proveravamo da li su sva tri polja ista
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }

  // Ako je neko pobedio, prikazujemo odgovarajuću poruku
  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  }
  // Ako nema pobednika i sva polja su popunjena, prikazujemo poruku za nerešeno
  else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  }
  // Ako igra nije završena, menjamo igrača
  else {
    changePlayer();
  }
}

// Funkcija za restart igre
function restartGame() {
  // Postavljamo početnog igrača na X
  currentPlayer = "X";
  // Resetujemo niz options
  options = ["", "", "", "", "", "", "", "", ""];
  // Ažuriramo tekst za prikaz statusa igre
  statusText.textContent = `${currentPlayer}'s turn`;
  // Resetujemo tekst u svim ćelijama
  cells.forEach(cell => cell.textContent = "");
  // Označavamo da je igra u toku
  running = true;
}
