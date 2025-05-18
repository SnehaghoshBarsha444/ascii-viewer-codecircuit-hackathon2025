document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const imageDescriptionInput = document.getElementById('imageDescriptionInput');
    const generateFromDescriptionBtn = document.getElementById('generateFromDescriptionBtn');
    const imageUploadInput = document.getElementById('imageUploadInput');

    const asciiOutput = document.getElementById('asciiOutput');
    const loadingIndicator = document.getElementById('loadingIndicator');

    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const themeToggle = document.getElementById('themeToggle');
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const asciiFontSelect = document.getElementById('asciiFontSelect');

    // --- API Key ---
    // WARNING: THIS IS INSECURE FOR PRODUCTION. Key should be handled by a backend.
    const GROQ_API_KEY = ' Replace with your actual key if needed'; 
    // --- Utility Functions ---
    function showLoading(show) {
        loadingIndicator.style.display = show ? 'flex' : 'none';
        asciiOutput.style.display = show ? 'none' : 'block'; // asciiOutput is hidden when loading
    }

    function displayAsciiArt(art) {
        let cleanedArt = art;
        if (art.startsWith("```ascii") || art.startsWith("```text")) {
            cleanedArt = art.substring(art.indexOf('\n') + 1, art.lastIndexOf("```")).trim();
        } else if (art.startsWith("```")) {
             cleanedArt = art.substring(3, art.lastIndexOf("```")).trim();
        }
        asciiOutput.textContent = cleanedArt;
        showLoading(false); // This will make asciiOutput visible and hide loading
    }

    function displayError(message) {
        asciiOutput.textContent = `Error: ${message}`;
        asciiOutput.style.color = 'red';
        showLoading(false); // This will make asciiOutput visible and hide loading
        setTimeout(() => {
            asciiOutput.style.color = '';
            if (asciiOutput.textContent.startsWith('Error:')) {
                asciiOutput.textContent = 'Your ASCII art will appear here.';
            }
        }, 7000);
    }

    // --- ASCII Generation Logic ---

    // 1. Live Text Preview (Block Font)
    const basicBlockFont = {
        'A': [" ### ", "#   #", "#####", "#   #", "#   #"], 'B': ["#### ", "#   #", "#### ", "#   #", "#### "],
        'C': [" ####", "#    ", "#    ", "#    ", " ####"], 'D': ["#### ", "#   #", "#   #", "#   #", "#### "],
        'E': ["#####", "#    ", "###  ", "#    ", "#####"], 'F': ["#####", "#    ", "###  ", "#    ", "#    "],
        'G': [" ####", "#    ", "# ###", "#   #", " ####"], 'H': ["#   #", "#   #", "#####", "#   #", "#   #"],
        'I': ["#####", "  #  ", "  #  ", "  #  ", "#####"], 'J': ["#####", "    #", "    #", "#   #", " ### "],
        'K': ["#  ##", "# #  ", "##   ", "# #  ", "#  ##"], 'L': ["#    ", "#    ", "#    ", "#    ", "#####"],
        'M': ["#   #", "## ##", "# # #", "#   #", "#   #"], 'N': ["#   #", "##  #", "# # #", "#  ##", "#   #"],
        'O': [" ### ", "#   #", "#   #", "#   #", " ### "], 'P': ["#### ", "#   #", "#### ", "#    ", "#    "],
        'Q': [" ### ", "#   #", "# # #", "#  ##", " ## #"], 'R': ["#### ", "#   #", "#### ", "#  # ", "#   #"],
        'S': [" ####", "#    ", " ### ", "    #", "#### "], 'T': ["#####", "  #  ", "  #  ", "  #  ", "  #  "],
        'U': ["#   #", "#   #", "#   #", "#   #", " ### "], 'V': ["#   #", "#   #", "#   #", " # # ", "  #  "],
        'W': ["#   #", "#   #", "# # #", "## ##", "#   #"], 'X': ["#   #", " # # ", "  #  ", " # # ", "#   #"],
        'Y': ["#   #", " # # ", "  #  ", "  #  ", "  #  "], 'Z': ["#####", "   # ", "  #  ", " #   ", "#####"],
        '0': [" ### ", "# # #", "# # #", "# # #", " ### "], '1': ["  #  ", " ##  ", "  #  ", "  #  ", " ### "],
        '2': [" ### ", "#   #", "  ## ", " #   ", "#####"], '3': [" ### ", "#   #", "  ## ", "#   #", " ### "],
        '4': ["#  # ", "#  # ", "#####", "   # ", "   # "], '5': ["#####", "#    ", "#### ", "    #", "#### "],
        '6': [" ### ", "#    ", "#### ", "#   #", " ### "], '7': ["#####", "    #", "   # ", "  #  ", " #   "],
        '8': [" ### ", "#   #", " ### ", "#   #", " ### "], '9': [" ### ", "#   #", " ####", "    #", " ### "],
        ' ': ["     ", "     ", "     ", "     ", "     "],
        '.': ["     ", "     ", "     ", "     ", "  #  "], '!': ["  #  ", "  #  ", "  #  ", "     ", "  #  "],
        '?': [" ### ", "#   #", "  ## ", "     ", "  #  "],
    };

    function textToAsciiArt(text, fontStyle) {
        if (fontStyle === 'basic') {
            return text;
        }
        if (fontStyle === 'block' && text.trim() === '') return '';

        const lines = text.toUpperCase().split('\n');
        let outputArt = '';

        lines.forEach(line => {
            if (line.trim() === '') {
                outputArt += '\n';
                return;
            }
            const charHeight = fontStyle === 'block' ? (basicBlockFont['A'] ? basicBlockFont['A'].length : 1) : 1;
            for (let i = 0; i < charHeight; i++) {
                let lineOutput = '';
                for (const char of line) {
                    if (fontStyle === 'block') {
                        const charArt = basicBlockFont[char] || basicBlockFont['?'];
                        lineOutput += (charArt[i] || " ".repeat(charArt[0] ? charArt[0].length : 5)) + "  ";
                    }
                }
                outputArt += lineOutput.trimRight() + '\n';
            }
            if (fontStyle === 'block') outputArt += '\n';
        });

        return outputArt.trim();
    }

    textInput.addEventListener('input', () => {
        const text = textInput.value;
        const selectedFont = asciiFontSelect.value;
        if (text.trim() === '' && selectedFont === 'basic') {
             asciiOutput.textContent = 'Your ASCII art will appear here.';
             return;
        }
        const art = textToAsciiArt(text, selectedFont);
        displayAsciiArt(art); // This will call showLoading(false) internally
    });

    asciiFontSelect.addEventListener('change', () => {
        textInput.dispatchEvent(new Event('input'));
    });

    // 2. ASCII Art from Image Description (via Groq)
    async function generateAsciiFromDescriptionWithGroq(description) {
        if (!description.trim()) {
            displayError("Image description cannot be empty.");
            return;
        }
        showLoading(true); // Hides asciiOutput, shows loadingIndicator

        const groqApiUrl = 'https://api.groq.com/openai/v1/chat/completions';
        // Updated model and parameters based on the new instructions
        const modelToUse = "meta-llama/llama-4-scout-17b-16e-instruct";

        const requestBody = {
            messages: [
                {
                    role: "system",
                    content: "You are an ASCII art generator. Respond ONLY with the ASCII art, no explanations or other text."
                },
                {
                    role: "user",
                    content: `Make an ASCII art of: ${description}. Keep it concise and clear.`
                }
            ],
            model: modelToUse,
            temperature: 1,          // Updated
            max_tokens: 1024,        // Updated (equivalent to max_completion_tokens)
            top_p: 1,                // Updated
            stream: true,
            stop: null
        };

        try {
            const response = await fetch(groqApiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = "";

            let stopLoop = false;
            while (!stopLoop) {
                const { value, done: readerIsDone } = await reader.read();
                if (readerIsDone) {
                    stopLoop = true;
                    break;
                }

                const chunk = decoder.decode(value, { stream: true });
                const eventLines = chunk.split('\n');

                for (const eventLine of eventLines) {
                    if (eventLine.startsWith('data: ')) {
                        const jsonDataStr = eventLine.substring('data: '.length).trim();
                        if (jsonDataStr === '[DONE]') {
                            stopLoop = true;
                            break;
                        }
                        if (jsonDataStr) {
                            try {
                                const parsed = JSON.parse(jsonDataStr);
                                if (parsed.choices && parsed.choices[0]?.delta?.content) {
                                    const contentChunk = parsed.choices[0].delta.content;
                                    accumulatedContent += contentChunk; // Accumulate silently
                                }
                            } catch (e) {
                                console.warn("Error parsing stream chunk JSON:", e, jsonDataStr);
                            }
                        }
                    }
                }
            } // End of while loop

            if (accumulatedContent.trim() === "") {
                displayError("Received empty response from the AI. Try a different description or model.");
            } else {
                // Only display the final, complete art after the stream has finished.
                displayAsciiArt(accumulatedContent);
            }

        } catch (error) {
            console.error("Error generating ASCII art with Groq:", error);
            displayError(error.message || "An unexpected error occurred with Groq API.");
        } finally {
            if (loadingIndicator.style.display === 'flex') {
                showLoading(false);
            }
        }
    }

    generateFromDescriptionBtn.addEventListener('click', () => {
        generateAsciiFromDescriptionWithGroq(imageDescriptionInput.value);
    });


    // --- Image Upload to ASCII (This part remains the same, uses local conversion) ---
    const ASCII_CHARS = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^'. ";

    function imageToAscii(imageElement, maxWidth = 100) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const aspectRatio = imageElement.height / imageElement.width;
        let width = Math.min(maxWidth, imageElement.width);
        let height = Math.round(width * aspectRatio * 0.55);

        canvas.width = width;
        canvas.height = height;

        context.drawImage(imageElement, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        const data = imageData.data;
        let asciiImage = '';

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const offset = (y * width + x) * 4;
                const r = data[offset];
                const g = data[offset + 1];
                const b = data[offset + 2];

                const gray = (r + g + b) / 3;
                const charIndex = Math.floor((gray / 255) * (ASCII_CHARS.length - 1));
                asciiImage += ASCII_CHARS[charIndex];
            }
            asciiImage += '\n';
        }
        return asciiImage;
    }

    imageUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    showLoading(true); // Hide asciiOutput, show loading
                    setTimeout(() => {
                        const art = imageToAscii(img, 100);
                        displayAsciiArt(art); // Show final art, hide loading
                        imageDescriptionInput.value = '';
                        textInput.value = '';
                    }, 50);
                };
                img.onerror = () => {
                    displayError("Failed to load the uploaded image.");
                }
                img.src = e.target.result;
            };
            reader.onerror = () => {
                 displayError("Failed to read the uploaded file.");
            }
            reader.readAsDataURL(file);
        }
    });

    // --- Bonus Features (remain unchanged) ---
    copyBtn.addEventListener('click', () => {
        if (asciiOutput.textContent && asciiOutput.textContent !== 'Your ASCII art will appear here.' && !asciiOutput.textContent.startsWith('Generating...')) {
            navigator.clipboard.writeText(asciiOutput.textContent)
                .then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => copyBtn.textContent = 'Copy to Clipboard', 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    alert('Failed to copy text. Your browser might not support this feature or there was an error.');
                });
        } else {
            alert('Nothing to copy or generation in progress!');
        }
    });

    downloadBtn.addEventListener('click', () => {
        if (asciiOutput.textContent && asciiOutput.textContent !== 'Your ASCII art will appear here.' && !asciiOutput.textContent.startsWith('Generating...')) {
            const blob = new Blob([asciiOutput.textContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ascii-art.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            alert('Nothing to download or generation in progress!');
        }
    });

    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', themeToggle.checked);
        localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }

    fontSizeSlider.addEventListener('input', () => {
        const newSize = `${fontSizeSlider.value}px`;
        asciiOutput.style.fontSize = newSize;
        fontSizeValue.textContent = newSize;
    });
    fontSizeValue.textContent = `${fontSizeSlider.value}px`;
    asciiOutput.style.fontSize = `${fontSizeSlider.value}px`;

    if (textInput.value.trim() === '' && asciiFontSelect.value === 'basic' && imageDescriptionInput.value.trim() === '') {
        asciiOutput.textContent = 'Your ASCII art will appear here.';
    }
});
