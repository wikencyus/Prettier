function loadFile(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("codeInput").value = e.target.result;
    };
    reader.readAsText(file);
  }
}

function formatCode() {
  const language = document.getElementById("languageSelect").value;
  const codeInput = document.getElementById("codeInput").value;
  const formattedOutputElement = document.getElementById("formattedOutput");
  const actionButtons = document.getElementById("actionButtons");
  const formatH2 = document.getElementById("formatH2");

  let formattedCode;

  if (language === "python") {
    formattedCode = formatPython(codeInput);
  } else {
    formattedCode = prettier.format(codeInput, {
      parser: language,
      plugins: prettierPlugins,
    });
  }

  formattedOutputElement.textContent = formattedCode;

  formattedOutputElement.style.display = "flex";
  formatH2.style.display = "flex";
  actionButtons.style.display = "flex";
}

function formatPython(code) {
  return code
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}

function copyCode() {
  const formattedOutput =
    document.getElementById("formattedOutput").textContent;
  navigator.clipboard
    .writeText(formattedOutput)
    .then(() => {
      console.log("Kode berhasil di salin")
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
}

function downloadCode() {
  const formattedOutput =
    document.getElementById("formattedOutput").textContent;
  const blob = new Blob([formattedOutput], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "formatted_code.txt";
  a.click();
  URL.revokeObjectURL(url);
}
