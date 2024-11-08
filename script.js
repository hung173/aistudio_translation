chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openFileDialog") {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            readFileInChunks(file, translate)
                .then(() => saveTranslationResult("result.txt"))
                .catch(error => console.error("Error reading file:", error));
        }
        fileInput.click();
    }
})

function checkComplete() {
    return new Promise((resolve) => {
        var chatbox = document.querySelectorAll("ms-chat-session")[0]
        var run = document.querySelectorAll("run-button")[0].getElementsByTagName("button")[0]
        var lastLength = chatbox.textContent.length
        const intervalId = setInterval(() => {
            console.log(run.textContent)
            if (lastLength == chatbox.textContent.length && run.textContent !== "Stop") {
                console.log("complete")
                resolve(true)
                clearInterval(intervalId)
            }
            lastLength = chatbox.textContent.length
        }, 4000)
    })
}

const clickTranslate = () => {
    var run = document.querySelectorAll("run-button")[0].getElementsByTagName("button")[0]
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("click")
            run.click()
            resolve(true)
        }, 1000)
    })
}
const translate = (textToTranslate) => {
    console.log("fill question")
    var textareas = document.querySelectorAll("textarea")
    var instruction = textareas[0]
    var content = textareas[1]

    instruction.value = "Dịch văn bản sau sang ngôn ngữ tiếng Việt, giữ nguyên vị trí các dòng và số thứ tự như văn bản gốc mà không thay đổi format. Dịch ngắn gọn và giữ nguyên ý nghĩa nội dung, đồng nhất tên các nhân vật, chuẩn văn phong truyện tranh hàn quốc, các tên nhân vật được dịch sang tên hàn quốc phiên âm quốc tế, phân biệt rõ giới tính ngôi thứ ba của nam và nữ: phân biệt rõ và sử dụng chính xác giữa cô ấy và anh ấy, hắn và ả, kết quả trả theo dạng mã khối"
    instruction.dispatchEvent(new Event('input', { bubbles: true }))

    content.value = textToTranslate
    content.dispatchEvent(new Event('input', { bubbles: true, cancelable: false }))
}


async function readFileInChunks(file, processChunk) {
    // let offset = 0;
    // const chunkSizeSetting = await chrome.storage.sync.get({ chunkSize: 10000 })
    // const chunkSize = Number(chunkSizeSetting.chunkSize)
    // while (offset < file.size) {
    //     console.log("offset and file size and chunk size" , offset, file.size, chunkSize)
    //     const blob = file.slice(offset, offset + chunkSize);
    //     const chunkData = await readBlob(blob)
    //     offset += chunkSize;
    //     processChunk(chunkData)
    //     await clickTranslate()
    //     await checkComplete()
    // }

    let offset = 0
    const chunkSizeSetting = await chrome.storage.sync.get({ chunkSize: 100 })
    const chunkSize = Number(chunkSizeSetting.chunkSize)
    const text = await readBlob(file)
    var lines = text.split('\n')
    console.log(lines.length)
    while (offset < lines.length) {
        console.log("offset and file size and chunk size" , offset, lines.length, chunkSize)
        const chunkData = lines.slice(offset, offset + chunkSize);
        processChunk(chunkData)
        await clickTranslate()
        await checkComplete()
        offset += chunkSize
    }

}

// Helper function to read a Blob using FileReader
function readBlob(blob) {
    return new Promise((resolve, reject) => {
        console.log("read length" , blob.size)
        const reader = new FileReader()

        reader.onload = () => resolve(reader.result)
        reader.onerror = reject;

        reader.readAsText(blob); // Can be modified to readAsArrayBuffer, etc., depending on data type
    });
}

function saveToFile(filename, data) {
    // Create a new Blob with the data and specify the type (e.g., text/plain for text files)
    const blob = new Blob(data, { type: 'text/plain' });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute with the filename
    link.download = filename;

    // Create a URL for the Blob and set it as the href attribute
    link.href = URL.createObjectURL(blob);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);
}

const saveTranslationResult = (fileName) => {
    var messages = document.getElementsByTagName("ms-prompt-chunk")
    var answers = []
    for (let index = 0; index < messages.length; index++) {
        if (index % 2 === 1) {
            var answer = htmlToPlainText(messages[index].innerHTML)
            answers.push(answer)
        }
    }
    saveToFile(fileName, answers)
}