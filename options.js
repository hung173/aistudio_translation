// Saves options to chrome.storage
const saveOptions = () => {
    const chunkSize = document.getElementById('chunkSize').value
    const instruction = document.getElementById('instruction').value
    chrome.storage.sync.set(
      { chunkSize : chunkSize ,
        instruction: instruction
      },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status')
        status.textContent = 'Options saved.'
        setTimeout(() => {
          status.textContent = ''
        }, 750)
      }
    );
  };
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { chunkSize : 100 ,
        instruction: ""
      },
      (items) => {
        document.getElementById('chunkSize').value = items.chunkSize
        document.getElementById('instruction').value = items.instruction
      }
    )
  }
  
  document.addEventListener('DOMContentLoaded', restoreOptions)
  document.getElementById('save').addEventListener('click', saveOptions)