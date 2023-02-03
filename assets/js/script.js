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
	account.classList.toggle("hidden");
});
window.addEventListener("click", (e) => {
	account.classList.add("hidden");
});
account.addEventListener("click", (e) => e.stopPropagation());

axios
	.get(
		"https://restcountries.com/v2/all?fields=nativeName,alpha2Code,alpha3Code"
	)
	.then((res) => {
		for (const lang of res.data) {
			document.getElementById(
				"language-list"
			).innerHTML += `<li class="source-lang" data-value="${
				lang.alpha2Code
			}" onclick='sourceLanguage.set(${JSON.stringify(lang)})'>${
				lang.nativeName
			}</li>`;

			document.getElementById(
				"language-list-target"
			).innerHTML += `<li class="target-lang" data-value="${
				lang.alpha2Code
			}" onclick='targetLanguage.set(${JSON.stringify(lang)})' class="${
				lang.alpha3Code === "VNM" ? "active" : ""
			}">${lang.nativeName}</li>`;
		}
	});

// Language box
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

// Source
toggleLanguageSourceBox.addEventListener("click", (e) => {
	e.stopPropagation();
	closeTargetLanguageBox();
	toggleSourceLanguageBox();
});

document.getElementById("source-language").addEventListener("click", (e) => {
	e.stopPropagation();
	toggleSourceLanguageBox();
});

languageSourceBox.addEventListener("click", (e) => e.stopPropagation());
window.addEventListener("click", closeSourceLanguageBox);

// Target
toggleLanguageTargetBox.addEventListener("click", (e) => {
	e.stopPropagation();
	closeSourceLanguageBox();
	toggleTargetLanguageBox();
});

document.getElementById("target-language").addEventListener("click", (e) => {
	e.stopPropagation();
	toggleTargetLanguageBox();
});

languageTargetBox.addEventListener("click", (e) => e.stopPropagation());

window.addEventListener("click", closeTargetLanguageBox);

const sourceLanguage = (() => {
	let lang = {
		nativeName: "Phát hiện ngôn ngữ",
		alpha2Code: "AU",
		alpha3Code: "AUT",
	};

	return {
		get() {
			return lang;
		},
		set(newLang) {
			lang = newLang;
			document.getElementById("source-language").innerText =
				lang.nativeName;

			document
				.querySelector(".source-lang.active")
				?.classList.remove("active");

			document
				.querySelector(`.source-lang[data-value=${lang.alpha2Code}]`)
				.classList.add("active");
		},
	};
})();

const targetLanguage = (() => {
	let lang = { nativeName: "Việt Nam", alpha2Code: "VN", alpha3Code: "VNM" };

	return {
		get() {
			return lang;
		},
		set(newLang) {
			lang = newLang;
			document.getElementById("target-language").innerText =
				lang.nativeName;

			document
				.querySelector(".target-lang.active")
				?.classList.remove("active");

			document
				.querySelector(`.target-lang[data-value=${lang.alpha2Code}]`)
				.classList.add("active");
		},
	};
})();

document.getElementById("swap-lang").addEventListener("click", () => {
	const newSource = targetLanguage.get();
	const newTarget = sourceLanguage.get();

	if (newTarget.alpha2Code === "AU") return;

	sourceLanguage.set(newSource);
	targetLanguage.set(newTarget);
});
