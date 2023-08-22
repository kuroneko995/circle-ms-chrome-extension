load();
bind();
console.log('loaded options');

function bind() {
  const saveBtn = document.getElementById('config-save-btn');
  saveBtn.onclick = save.bind(this);
};

function load() {
  let textdata = document.getElementById('config-data');
  chrome.storage.local.get(['circleNotes']).then((result)=> {
    let circleNotes = result.circleNotes == undefined ? {} : result.circleNotes;
    circleNotes[123] = "test note";
    textdata.value = JSON.stringify(circleNotes, null, "  ");
    console.log('loaded circle notes', circleNotes);
  });
}

function save() {
  let textdata = document.getElementById('config-data');
  let config_txt = textdata.value;
  let parsed_json = JSON.parse(config_txt);
  chrome.storage.local.set({'circleNotes' : parsed_json}).then(() => {
    console.log('updated config', parsed_json);
  });
}
