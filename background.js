importScripts('constants.js')

chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: MENU_ITEMS.IMPORT_FILE.id,
        title: MENU_ITEMS.IMPORT_FILE.name,
        type: 'normal',
        contexts: ['all']
    })
})

chrome.contextMenus.onClicked.addListener((item, tab) => {
    const tld = item.menuItemId;

    switch (tld) {
        case MENU_ITEMS.IMPORT_FILE.id:
            chrome.tabs.sendMessage(tab.id, { action: "openFileDialog" });
            break;

        default:
            break;
    }

})