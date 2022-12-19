 <div id="demo-modal" class="modal" role="dialog" tabindex="-1">
      <div class="model-inner">
        <div class="modal-header">
          <h3>Hello World</h3>
          <button class="modal-close" data-id="demo-modal" aria-label="Close">
            &times;
          </button>
        </div>
        <p>
          Natus earum velit ab nobis eos. Sed et exercitationem voluptatum omnis
          dolor voluptates. Velit ut ipsam sunt ipsam nostrum. Maiores officia
          accusamus qui sapiente. Dolor qui vel placeat dolor nesciunt quo dolor
          dolores. Quo accusamus hic atque nisi minima.
        </p>
      </div>
    </div>
    <button class="modal-open" data-id="demo-modal">Display Modal</button>













<!-- A modal dialog containing a form -->
<dialog id="favDialog">
  <form method="dialog">
  </form>
</dialog>
<p>
  <button id="showDialog">Show the dialog</button>
</p>
<output></output>
















const showButton = document.getElementById('showDialog');
const favDialog = document.getElementById('favDialog');
const outputBox = document.querySelector('output');
const selectEl = favDialog.querySelector('select');
const confirmBtn = favDialog.querySelector('#confirmBtn');

// "Update details" button opens the <dialog> modally
showButton.addEventListener('click', () => {
    favDialog.showModal();
});
// "Favorite animal" input sets the value of the submit button
selectEl.addEventListener('change', (e) => {
  confirmBtn.value = selectEl.value;
});
// "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
favDialog.addEventListener('close', () => {
  outputBox.value = `ReturnValue: ${favDialog.returnValue}.`;
});
