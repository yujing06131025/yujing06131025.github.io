// CodeBlock 元件
const CodeBlock = ({ code, language, title }) => {
  const [copyStatus, setCopyStatus] = React.useState('');

  const handleCopy = () => {
    const textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      setCopyStatus('已複製！');
    } catch (err) {
      setCopyStatus('複製失敗！');
      console.error('複製程式碼失敗:', err);
    }

    document.body.removeChild(textarea);
    setTimeout(() => setCopyStatus(''), 2000);
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 relative">
        <pre><code className={`language-${language} whitespace-pre-wrap break-all`}>{code}</code></pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-2 rounded-md transition-colors duration-200"
        >
          {copyStatus || '複製'}
        </button>
      </div>
    </div>
  );
};

// PdfViewer 元件
const PdfViewer = ({ src, title }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden h-96 w-full flex justify-center items-center">
      <iframe
        src={src}
        loading="lazy"
        title={title}
        className="w-full h-full border-none"
      >
        <p>您的瀏覽器似乎不支援 PDF 檢視。您可以<a href={src}>下載此 PDF</a>。</p>
      </iframe>
    </div>
  </div>
);

// App 元件
const App = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('zh-Hant');
  const handleLanguageChange = (event) => setSelectedLanguage(event.target.value);

  const codeExample = `// 這是一個簡單的 "Hello World" JavaScript 範例。\nconsole.log('Hello World!');`;
  const pdfPath = './example.pdf';

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">歡迎來到我們的多語言網站！</h1>
        <p className="text-gray-600">本頁演示如何以英語和繁體中文呈現內容。</p>
      </header>

      <hr className="border-t border-gray-200 my-8" />

      <div className="text-right mb-6">
        <label htmlFor="languageSelect" className="font-bold text-gray-700 mr-2">選擇語言:</label>
        <select
          id="languageSelect"
          className="p-2 border border-gray-300 rounded-lg text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="zh-Hant">繁體中文</option>
        </select>
      </div>

      {selectedLanguage === 'en' && (
        <section className="bg-gray-50 border-l-4 border-gray-500 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About This Page (English)</h2>
          <p className="text-gray-700 mb-4">
            This section is written primarily in English. We allow language selection using the dropdown above. When specific parts of the content are in a different language, like Traditional Chinese in this example, we use the `lang` attribute on those specific elements. This approach helps web browsers, screen readers, and search engines correctly interpret the language of different content blocks, improving accessibility and SEO.
          </p>
          <CodeBlock code={codeExample} language="javascript" title="Code Example (English)" />
          <PdfViewer src={pdfPath} title="PDF Viewer (English)" />
        </section>
      )}

      {selectedLanguage === 'zh-Hant' && (
        <section className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">關於本頁面 (繁體中文)</h2>
          <p className="text-gray-700 mb-4">本節內容主要使用繁體中文編寫。我們通過上方的下拉菜單允許選擇語言。當內容的特定部分使用其他語言（如本例中的英文）時，我們會在這些特定的元素上使用 `lang` 屬性。</p>
          <p className="text-gray-700 mb-4">這種方法有助於網絡瀏覽器、屏幕閱讀器和搜索引擎正確識別不同內容塊的語言，從而提升可訪問性和搜索引擎優化。</p>
          <ul className="list-disc ml-5 text-gray-700 mb-4">
            <li>範例列表項一</li>
            <li>範例列表項二</li>
          </ul>
          <CodeBlock code={codeExample} language="javascript" title="程式碼範例 (繁體中文)" />
          <PdfViewer src={pdfPath} title="PDF 檢視器 (繁體中文)" />
        </section>
      )}

      <hr className="border-t border-gray-200 my-8" />

      <footer className="text-center text-gray-500 text-sm">
        {selectedLanguage === 'en' ? (
          <p>Thank you for visiting!</p>
        ) : (
          <p>感謝您的訪問！</p>
        )}
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
