let TEXT_AREA_ID = 'customNoteDetailsTextArea';
setWhitespaceStyle();
addCustomNote();

function setWhitespaceStyle() {
  let textElem = document.getElementsByClassName('m-favorite-control')[0].children[0];
  textElem.style.whiteSpace = 'pre';
}

function addCustomNote() {
  chrome.storage.local.get(['circleNotes']).then((result)=> {
    let circleNotes = result.circleNotes == undefined ? {} : result.circleNotes;
    addCustomNoteElement(circleNotes);
    console.log('loaded circle notes', circleNotes);
  });
}

function addCustomNoteElement(circleNotes) {
  let kiniiriElem = document.getElementsByClassName('m-colorbox')[0];
  let customNoteBox = document.createElement('div');
  kiniiriElem.after(customNoteBox);
  customNoteBox.style.border = '1px solid silver';
  customNoteBox.textContent = '▼ Custom note';
  let customNoteDetails = document.createElement('textarea');
  customNoteDetails.id = TEXT_AREA_ID;
  customNoteBox.appendChild(customNoteDetails)
  customNoteDetails.style.display = 'block';
  customNoteDetails.style.width = '100%';
  let circleNumber = getCircleNumber();
  if (circleNotes[circleNumber] != undefined) {
    customNoteDetails.value = circleNotes[circleNumber];
  } else {
    customNoteDetails.value = 'Add your custom notes here\nClick Save to save.';
  }

  let customNoteSave = addCustomNoteButton('Save', 'custom-note-save');
  customNoteBox.appendChild(customNoteSave);
  customNoteSave.onclick = (event) => {
    let textArea = document.getElementById(TEXT_AREA_ID);
    circleNotes[circleNumber] = textArea.value;
    console.log('onclick', circleNotes);
    chrome.storage.local.set({'circleNotes' : circleNotes}).then(() => {
      console.log('after update', circleNotes);
      // window.alert('Saved circle notes');
    });
  };

  let customNoteClear = document.createElement('div');
  customNoteBox.appendChild(customNoteClear);
  customNoteClear.style.clear = 'both';
}

function getCircleNumber() {
  let url = window.location.href.split('/');
  return parseInt(url[url.length - 1]);
}

function addCustomNoteButton(buttonName, buttonClass) {
  let button = document.createElement('a');
  button.textContent = buttonName;
  button.className = buttonClass;
  button.style.border = '1px solid gray';
  button.style.float = 'right';
  button.style.padding = '10px';
  button.style.display = 'block';
  return button;
}

function getCustomNote(circleNumber) {
  chrome.storage.local.get([])
}