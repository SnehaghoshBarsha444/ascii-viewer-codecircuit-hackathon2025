# ASCII Art Generator 🖼️

A versatile web-based application that allows users to generate ASCII art from various sources: direct text input, AI-powered image descriptions (using the Groq API), or by uploading their own images. Features include live text-to-ASCII conversion, font style selection, output font size control, dark mode, and options to copy or download the generated art.

<!-- Optional: Add a screenshot of the application here -->
<!-- ![App Screenshot](path/to/screenshot.png) -->

## ✨ Features

*   **Multiple Input Methods:**
    *   **Live Text Input:** Type text directly and see it converted to ASCII art in real-time.
        *   Supports "Basic Monospace" (renders text as is).
        *   Supports "Block Letters" style for a more artistic text representation.
    *   **AI-Powered Image Description:** Describe an image (e.g., "a cat sitting on a chair") and let the AI (via Groq API) generate corresponding ASCII art.
    *   **Image Upload:** Upload your own image (JPG, PNG, GIF, etc.) to convert it into ASCII art using client-side processing.
*   **Output Customization & Tools:**
    *   **Font Size Control:** Adjust the font size of the generated ASCII art using a slider.
    *   **Copy to Clipboard:** Easily copy the generated ASCII art.
    *   **Download .txt:** Download the art as a plain text file.
*   **User Experience:**
    *   **Dark Mode:** Toggle between light and dark themes for comfortable viewing.
    *   **Loading Indicator:** Visual feedback while AI-generated art is being processed.
    *   **Responsive Design:** Adapts to different screen sizes (though primarily designed for desktop).
    *   **Error Handling:** Provides user-friendly error messages.

## 🛠️ Technologies Used

*   **Frontend:**
    *   HTML5
    *   CSS3 (with CSS Variables for theming)
    *   JavaScript (ES6+)
*   **APIs & Libraries:**
    *   **Groq API:** Used for generating ASCII art from image descriptions.
        *   The project uses direct `fetch` calls to the Groq API endpoint.
        *   The HTML includes a script tag for `groq-sdk` (https://unpkg.com/groq-sdk) though it's not directly utilized by the current `main.js` for the AI calls.
    *   **Google Fonts:**
        *   `Roboto Mono` (for ASCII output and inputs)
        *   `Source Sans Pro` (for general UI text)
*   **Browser Features:**
    *   `FileReader API`: For reading uploaded image files.
    *   `Canvas API`: For client-side image processing to generate ASCII art from uploads.
    *   `Navigator.clipboard API`: For "Copy to Clipboard" functionality.
    *   `localStorage`: For persisting the theme preference (dark/light mode).

## 🚀 Getting Started

### Prerequisites

*   A modern web browser (Chrome, Firefox, Safari, Edge).
*   A Groq API Key (for the "Generate from Description" feature).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ascii-art-generator.git
    cd ascii-art-generator
    ```

2.  **Configure API Key:**
    *   Open the `js/main.js` file.
    *   Locate the `GROQ_API_KEY` constant:
        ```javascript
        const GROQ_API_KEY = 'gsk.............'; // Replace with your actual key
        ```
    *   Replace the placeholder `'gsk_...'` with your actual Groq API key.

    🚨 **SECURITY WARNING:**
    Hardcoding API keys directly in client-side JavaScript is **highly insecure** and **not recommended for production environments**. This method exposes your API key to anyone who inspects the browser's source code. For a production application, the API key should be managed by a backend server that proxies requests to the Groq API.

3.  **Run the application:**
    *   Simply open the `index.html` file in your web browser.

##  usage

1.  **Open `index.html` in your browser.**
2.  **Choose your input method:**
    *   **Enter Text (Live Preview):** Type directly into the textarea. Select a "Text Art Style" from the dropdown (e.g., "Basic Monospace" or "Block Letters"). The ASCII art will update live.
    *   **Enter Image Description (uses AI):** Type a description of an image (e.g., "a happy dog playing with a ball") into the input field and click "Generate from Description". Wait for the AI to process and display the art. (Requires a valid Groq API key).
    *   **Upload an Image:** Click "Choose File", select an image from your computer. The image will be processed locally and converted to ASCII art.
3.  **Customize Output:**
    *   Use the **Font Size** slider to adjust the size of the displayed ASCII art.
4.  **Interact with Output:**
    *   Click **"Copy to Clipboard"** to copy the art.
    *   Click **"Download .txt"** to save the art as a text file.
5.  **Theme:**
    *   Toggle the **"Dark Mode"** switch in the header to change the application's theme.

## 🤖 AI Model (Groq)

The "Generate from Description" feature currently uses the following model via the Groq API:
*   **Model:** `meta-llama/llama-4-scout-17b-16e-instruct` (or as specified in `main.js`)
*   The system prompt instructs the AI to respond *only* with ASCII art.

## ⚠️ Known Issues & Limitations

*   **Frontend API Key Exposure:** As mentioned, the Groq API key is hardcoded client-side, which is insecure for production.
*   **"Block Letters" Font:** The custom block font in `main.js` supports a limited set of uppercase letters, numbers, and a few symbols. Unsupported characters will be replaced by a question mark or space.
*   **Image-to-ASCII Quality:** The quality of ASCII art from uploaded images depends on the image's contrast, detail, and the chosen `maxWidth`. The algorithm is a basic grayscale-to-character mapping.
*   **AI Generation Consistency:** The quality and style of AI-generated ASCII art can vary depending on the prompt and the AI model's capabilities. Sometimes the AI might include extra text or not follow the "ASCII art only" instruction perfectly, though `displayAsciiArt` attempts to clean it.
*   **Streaming Display:** The Groq API response is streamed, but the UI currently accumulates the full response before displaying it. A future improvement could be to display the art as it streams in.

## 💡 Future Enhancements

*   **Backend API Key Management:** Implement a simple backend (e.g., Node.js/Express, Python/Flask) to securely handle Groq API requests.
*   **More Text Art Fonts:** Integrate or create more FIGlet-style fonts for text input.
*   **Advanced Image-to-ASCII Controls:**
    *   Adjustable character sets for image conversion.
    *   Invert brightness option.
    *   Contrast/brightness preprocessing.
*   **Real-time Streaming for AI Output:** Update the `asciiOutput` pre element as chunks arrive from the Groq API stream.
*   **Error Handling Improvements:** More specific error messages for API failures.
*   **More Robust AI Prompting:** Fine-tune the system and user prompts for better and more consistent ASCII art from the AI.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes, please feel free to:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## 📄 License

[MIT LICENSE](https://github.com/SnehaghoshBarsha444/ascii-viewer-codecircuit-hackathon2025/blob/main/LICENSE)
