// Votes for each option
let votes = [0, 0, 0, 0];

// Check if the user has already voted
let hasVoted = localStorage.getItem("hasVoted");

// HTML elements
const form = document.getElementById("pollForm");
const totalVotes = document.getElementById("totalVotes");
const resetBtn = document.getElementById("resetBtn");

// Percentage text
const percentText = [
    document.getElementById("htmlPercent"),
    document.getElementById("cssPercent"),
    document.getElementById("jsPercent"),
    document.getElementById("pythonPercent")
];

// Progress bars
const bars = [
    document.getElementById("bar0"),
    document.getElementById("bar1"),
    document.getElementById("bar2"),
    document.getElementById("bar3")
];

// Load saved votes
if (localStorage.getItem("pollVotes")) {
    votes = JSON.parse(localStorage.getItem("pollVotes"));
}

updateResults();

// Vote Button
form.addEventListener("submit", function (e) {

    e.preventDefault();

    if (hasVoted) {
        alert("You have already voted!");
        return;
    }

    const selected = document.querySelector("input[name='vote']:checked");

    if (!selected) {
        alert("Please select an option.");
        return;
    }

    const index = Number(selected.value);

    votes[index]++;

    localStorage.setItem("pollVotes", JSON.stringify(votes));

    localStorage.setItem("hasVoted", "true");

    hasVoted = true;

    updateResults();

    alert("Thank you for voting!");
});

// Update Results
function updateResults() {

    const total = votes.reduce((a, b) => a + b, 0);

    totalVotes.textContent = total;

    for (let i = 0; i < votes.length; i++) {

        let percentage = 0;

        if (total > 0) {
            percentage = (votes[i] / total) * 100;
        }

        bars[i].style.width = percentage + "%";

        percentText[i].textContent = percentage.toFixed(1) + "%";
    }
}

// Reset Poll
resetBtn.addEventListener("click", function () {

    if (!confirm("Reset the poll?")) return;

    votes = [0, 0, 0, 0];

    localStorage.removeItem("pollVotes");

    localStorage.removeItem("hasVoted");

    hasVoted = false;

    form.reset();

    updateResults();
});