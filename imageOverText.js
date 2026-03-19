document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("image-text-form");
  const numImagesInput = document.getElementById("numImages");
  const additionalImagesDiv = document.getElementById("additionalImages");
  const previewDiv = document.getElementById("preview");
  const generatedHtmlPre = document
    .getElementById("generated-html")
    .querySelector("pre");
  const copyBtn = document.getElementById("copyToClipboard");

  function updateImageInputs() {
    const num = parseInt(numImagesInput.value);
    additionalImagesDiv.innerHTML = "";

    for (let i = 2; i <= num; i++) {
      additionalImagesDiv.innerHTML += `
                <label for="betweenText${i - 1}">Between Text ${i - 1}:</label>
                <input type="text" id="betweenText${i - 1}">
                <br>
                <label for="imageText${i}">Image Text ${i}:</label>
                <input type="text" id="imageText${i}" required>
                <br>
                <label for="image${i}Url">Image ${i} URL:</label>
                <input type="url" id="image${i}Url" required>
                <br>
            `;
    }
  }

  function generateHTML(e) {
    e.preventDefault();

    let html = `<div style="display: flex; align-items: flex-end; justify-content: center; flex-wrap: wrap">`;

    const beforeText = document.getElementById("beforeText").value;
    html += `<p class="empro empro_small">${beforeText}</p> `;

    const num = parseInt(numImagesInput.value);
    for (let i = 1; i <= num; i++) {
      const imageText = document.getElementById(`imageText${i}`).value;
      const imageUrl = document.getElementById(`image${i}Url`).value;

      html += `
            <div style="display: flex; flex-direction: column; padding: 0px 8px; align-items: center;">
                <div class="image">
                    <img alt="" src="${imageUrl}" width="40" />
                </div>
                <p class="empro empro_small" style="text-align: center">${imageText}</p>
            </div>`;

      if (i < num) {
        // if it's not the last image, add between text
        const betweenText = document.getElementById(`betweenText${i}`).value;
        html += `<p class="empro empro_small">${betweenText}</p> `;
      }
    }

    const afterText = document.getElementById("afterText").value;
    html += `<p class="empro empro_small">${afterText}</p>`;

    html += `</div>`;

    previewDiv.innerHTML = html;
    generatedHtmlPre.textContent = html;
  }
  function resetForm() {
    previewDiv.innerHTML = "Preview will appear here.";
    generatedHtmlPre.textContent = "";
    additionalImagesDiv.innerHTML = "";
    numImagesInput.value = 1;
  }

  document.getElementById("resetForm").addEventListener("click", resetForm);

  function copyToClipboard() {
    const textarea = document.createElement("textarea");
    textarea.textContent = generatedHtmlPre.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Copied to clipboard!");
  }

  numImagesInput.addEventListener("change", updateImageInputs);
  form.addEventListener("submit", generateHTML);
  copyBtn.addEventListener("click", copyToClipboard);
});
