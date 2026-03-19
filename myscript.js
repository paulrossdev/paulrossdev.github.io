// Function for the "alt-text" page
function applyAltTextChanges() {
    var htmlInput = document.getElementById('html-input').value;
    var elementId = document.getElementById('element-id').value;
    var altText = document.getElementById('alt-text').value;

    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlInput, 'text/html');
    var element = doc.getElementById(elementId);

    if (element) {
        var altElement = doc.createElement('p');
        altElement.innerText = altText;
        altElement.style.position = 'absolute';
        altElement.style.top = '-1000px';
        altElement.style.left = '-1000px';
        element.appendChild(altElement);

        document.getElementById('html-output').innerText = htmlInput;
        document.getElementById('render-output').innerHTML = htmlInput;

        var updatedHtml = element.outerHTML;
        document.getElementById('updated-html').innerText = updatedHtml;
        document.getElementById('rendered-updated-html').innerHTML = updatedHtml;
    } else {
        alert('Element with provided ID not found in the HTML.');
    }
}

function convertTableToFlexbox() {
    var htmlInput = document.getElementById('table-html-input').value;
    var paddingSlider = document.getElementById('padding-slider');
    var marginSlider = document.getElementById('margin-slider');
    var paddingValue = document.getElementById('padding-value');
    var marginValue = document.getElementById('margin-value');

    paddingSlider.addEventListener('input', function() {
      paddingValue.textContent = this.value + 'px';
    });
  
    marginSlider.addEventListener('input', function() {
      marginValue.textContent = this.value + 'px';
    });
  
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlInput, 'text/html');
    var table = doc.querySelector('table');
  
    if (table) {
      var flexContainer = doc.createElement('div');
      flexContainer.style.display = 'flex';
      flexContainer.style.flexWrap = 'wrap';
  
      var tableRows = Array.from(table.rows);
      var numColumns = tableRows[0].cells.length;
      var textJustify = document.getElementById('text-justify').value;
  
      tableRows.forEach(function(row) {
        var flexRow = doc.createElement('div');
        flexRow.style.display = 'flex';
        flexRow.style.width = '100%';
  
        var tableCells = Array.from(row.cells);
        var cellWidth = 100 / numColumns + '%';
  
        tableCells.forEach(function(cell, cellIndex) {
          var flexCell = doc.createElement('div');
          flexCell.style.width = cellWidth;
          flexCell.style.textAlign = textJustify; // Apply the selected text justification

  
          // Add border to all sides of the cell
          flexCell.style.border = '1px solid black';
  
          // Remove border from the right side if it's not the last cell in the row
          if (cellIndex != tableCells.length - 1) {
            flexCell.style.borderRight = 'none';
          }
  
          // Remove border from the bottom if it's not the last row
          if (row.rowIndex != tableRows.length - 1) {
            flexCell.style.borderBottom = 'none';
          }
  
          var pTag = doc.createElement('p');
          pTag.style.padding = paddingSlider.value + 'px';
          pTag.style.margin = marginSlider.value + 'px';
          pTag.style.boxSizing = 'border-box';
          pTag.innerHTML = cell.innerHTML;
  
          flexCell.appendChild(pTag);
          flexRow.appendChild(flexCell);
        });
  
        flexContainer.appendChild(flexRow);
      });
  
      table.parentNode.replaceChild(flexContainer, table);
  
      var updatedHtml = doc.body.innerHTML;
  
      document.getElementById('table-html-output').innerText = htmlInput;
      document.getElementById('table-render-output').innerHTML = htmlInput;
      document.getElementById('table-updated-html').innerText = updatedHtml;
      document.getElementById('table-rendered-updated-html').innerHTML = updatedHtml;
    } else {
      alert('Invalid input. Please enter a valid table.');
    }
  }
  
   // Function to reset the Alt Text page
   function resetAltTextPage() {
    document.getElementById('html-input').value = '';
    document.getElementById('element-id').value = '';
    document.getElementById('alt-text').value = '';
    document.getElementById('html-output').innerText = '';
    document.getElementById('render-output').innerHTML = '';
    document.getElementById('updated-html').innerText = '';
    document.getElementById('rendered-updated-html').innerHTML = '';
  }

  function resetTableFlexbox() {
    document.getElementById('table-html-input').value = `<table>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>Data 1</td>
        <td>Data 2</td>
    </tr>
</table>`;
    document.getElementById('table-html-output').innerText = '';
    document.getElementById('table-render-output').innerHTML = '';
    document.getElementById('table-updated-html').innerText = '';
    document.getElementById('table-rendered-updated-html').innerHTML = '';
  }
  window.onload = function() {
    // Function to apply border changes
    function applyBorderChanges() {
      var htmlInput = document.getElementById('html-input').value;
      var switchButton = document.getElementById('border-switch');
      var removeBorder = !switchButton.checked;
  
      var parser = new DOMParser();
      var doc = parser.parseFromString(htmlInput, 'text/html');
      var elements = doc.querySelectorAll('*');
  
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var currentBorderStyle = window.getComputedStyle(element).getPropertyValue('border');
  
        if (removeBorder) {
          if (currentBorderStyle !== 'none') {
            element.style.border = 'none';
          }
        } else {
          if (currentBorderStyle === 'none') {
            element.style.border = '1px solid black';
          }
        }
      }
  
      var updatedHtml = doc.documentElement.outerHTML;
  
      // Update output fields
      document.getElementById('html-output').innerText = htmlInput;
      document.getElementById('render-output').innerHTML = htmlInput;
      document.getElementById('updated-html').innerText = updatedHtml;
      document.getElementById('rendered-updated-html').innerHTML = updatedHtml;
    }
  
    // Function to reset the Adjust Border page
    function resetBorderPage() {
      document.getElementById('html-input').value = '';
      document.getElementById('html-output').innerText = '';
      document.getElementById('render-output').innerHTML = '';
      document.getElementById('updated-html').innerText = '';
      document.getElementById('rendered-updated-html').innerHTML = '';
      document.getElementById('border-switch').checked = false;
    }
    
  
    // Attach the applyBorderChanges function to the "Apply Changes" button
    document.getElementById('apply-changes-border').onclick = applyBorderChanges;
  
    // Attach the resetBorderPage function to the "Reset" button
    document.getElementById('reset-page').onclick = resetBorderPage;
  
    // Function to apply alt text changes
    function applyAltTextChanges() {
      var htmlInput = document.getElementById('html-input').value;
      var elementId = document.getElementById('element-id').value;
      var altText = document.getElementById('alt-text').value;
  
      var parser = new DOMParser();
      var doc = parser.parseFromString(htmlInput, 'text/html');
      var element = doc.getElementById(elementId);
  
      if (element) {
        var altElement = doc.createElement('p');
        altElement.innerText = altText;
        altElement.style.position = 'absolute';
        altElement.style.top = '-1000px';
        altElement.style.left = '-1000px';
        element.appendChild(altElement);
  
        document.getElementById('html-output').innerText = htmlInput;
        document.getElementById('render-output').innerHTML = htmlInput;
  
        var updatedHtml = element.outerHTML;
        document.getElementById('updated-html').innerText = updatedHtml;
        document.getElementById('rendered-updated-html').innerHTML = updatedHtml;
      } else {
        alert('Element with provided ID not found in the HTML.');
      }
    }

      // JavaScript code to handle click events
      var removeBorderElement = document.getElementById("remove-border");
      var addBorderElement = document.getElementById("add-border");
      var switchButton = document.getElementById("border-switch");
      var htmlInput = document.getElementById("html-input");


      function applyBorderClasses() {
        if (switchButton.checked) {
          removeBorderElement.classList.remove("bold");
          addBorderElement.classList.add("bold");
        } else {
          removeBorderElement.classList.add("bold");
          addBorderElement.classList.remove("bold");
        }
      }

      htmlInput.addEventListener("focus", function () {
          this.value = "";
        });

      removeBorderElement.addEventListener("click", function () {
        switchButton.checked = false;
        applyBorderClasses();
      });

      addBorderElement.addEventListener("click", function () {
        switchButton.checked = true;
        applyBorderClasses();
      });

      switchButton.addEventListener("change", function () {
        applyBorderClasses();
      });
   
  
    // Attach the applyAltTextChanges function to the "Apply Changes" button
    document.getElementById('apply-changes-alt-text').onclick = applyAltTextChanges;
  
    // Attach the resetAltTextPage function to the "Reset" button
    document.getElementById('reset-alt-text').onclick = resetAltTextPage;
  };
  