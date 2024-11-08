const htmlToPlainText = (html) => {
    // Create a temporary DOM element
    const tempElement = document.createElement('div');

    // Set the HTML content
    tempElement.innerHTML = html;

    // Replace block-level tags with line breaks for proper formatting
    const blockTags = ['P', 'DIV', 'BR', 'LI'];
    blockTags.forEach(tag => {
        tempElement.querySelectorAll(tag).forEach(el => el.insertAdjacentText('beforebegin', '\n'));
    });

    // Retrieve and trim the plain text content
    const text = tempElement.textContent || tempElement.innerText || '';
    return text.replace(/\n\s*\n/g, '\n').trim();
}