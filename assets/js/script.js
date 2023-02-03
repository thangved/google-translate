const button = document.getElementById("toggle-sidebar"); // nut 3 gach
const sidebar = document.querySelector(".in-header-logo"); // the moi them

button.addEventListener("click", (e) => {
	e.stopPropagation();
	sidebar.classList.remove("animation");
});

sidebar.addEventListener("click", (e) => e.stopPropagation());

window.addEventListener("click", (e) => {
	sidebar.classList.add("animation");
});
const icon = document.getElementById("icon");
const node = document.getElementById("app-modal");
icon.addEventListener("click", (e) => {
	e.stopPropagation();
	node.classList.toggle("hidden");
});
node.addEventListener("click", (e) => e.stopPropagation());
window.addEventListener("click", (e) => {
	node.classList.add("hidden");
});

const avatar = document.getElementById("img");
const account = document.getElementById("acc");
avatar.addEventListener("click", (e) => {
	e.stopPropagation();
	account.classList.remove("hidden");
});
window.addEventListener("click", (e) => {
	account.classList.add("hidden");
});
account.addEventListener("click", (e) => e.stopPropagation());

axios
	.get("https://restcountries.com/v2/all?fields=name,alpha2Code,alpha3Code")
	.then((res) => {
		for (const lang of res.data) {
			document.getElementById(
				"language-list"
			).innerHTML += `<li>${lang.name}</li>`;
			document.getElementById(
				"language-list-target"
			).innerHTML += `<li class="${
				lang.alpha3Code === "VNM" ? "active" : ""
			}">${lang.name}</li>`;
		}
	});

const toggleLanguageSourceBox = document.getElementById("option");
const languageSourceBox = document.getElementById("languages-box");
const toggleLanguageTargetBox = document.getElementById("option-target");
const languageTargetBox = document.getElementById("languages-box-target");

function toggleSourceLanguageBox() {
	toggleLanguageSourceBox.classList.toggle("active");
	languageSourceBox.classList.toggle("hidden");
}

function closeSourceLanguageBox() {
	toggleLanguageSourceBox.classList.remove("active");
	languageSourceBox.classList.add("hidden");
}

function toggleTargetLanguageBox() {
	toggleLanguageTargetBox.classList.toggle("active");
	languageTargetBox.classList.toggle("hidden");
}

function closeTargetLanguageBox() {
	toggleLanguageTargetBox.classList.remove("active");
	languageTargetBox.classList.add("hidden");
}

toggleLanguageSourceBox.addEventListener("click", (e) => {
	e.stopPropagation();
	closeTargetLanguageBox();
	toggleSourceLanguageBox();
});

languageSourceBox.addEventListener("click", (e) => e.stopPropagation());
window.addEventListener("click", closeSourceLanguageBox);

toggleLanguageTargetBox.addEventListener("click", (e) => {
	e.stopPropagation();
	closeSourceLanguageBox();
	toggleTargetLanguageBox();
});

languageTargetBox.addEventListener("click", (e) => e.stopPropagation());

window.addEventListener("click", closeTargetLanguageBox);
