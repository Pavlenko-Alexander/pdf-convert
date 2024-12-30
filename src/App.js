import { useEffect, useState, useMemo } from "react";
import Input from "./components/Input.js";
import Button from "./components/Button.js";
import { addItem, getAllItems } from "./indexedDB.js";
import { convert } from "./utils/convert.js";
import PDFViewer from "pdf-viewer-reactjs";

function App() {
  const [pdf, setPdf] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [allItems, setAllItems] = useState([]);
  const doc = useMemo(() => ({ url: pdf }), [pdf]);

  const handleConvertText = async () => {
    const file = await convert(inputValue);
    if (file) {
      await addItem({
        id: allItems.length + 1,
        name: inputValue.slice(0, 20),
        file: file
      });
      setPdf(URL.createObjectURL(file));
      setInputValue("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllItems();
      setAllItems(data);
    };
    fetchData();
  }, [pdf]);

  const isButtonDisabled = !inputValue;

  return (
    <main className="w-full min-h-screen antialiased text-slate-400 bg-slate-900 flex justify-around p-10">
      <div className="flex flex-col items-center gap-10">
        <div className="text-2xl">
          Введіть текст щоб конвертувати його у PDF документ.
        </div>
        <Input
          value={inputValue}
          placeholder="Введіть текст"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          onClick={handleConvertText}
          text="Конвертувати в PDF"
          disabled={isButtonDisabled}
        />
        {pdf && doc.url ? (
          <div>
            <PDFViewer key={pdf} document={doc} />
          </div>
        ) : null}
      </div>
      {allItems.length ? (
        <div className="flex flex-col items-center gap-5">
          <div className="text-xl">Історія</div>
          <div className="border rounded-xl p-3 flex flex-col items-start gap-1 w-60">
            {allItems
              .sort((a, b) => a.id - b.id)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPdf(URL.createObjectURL(item.file))}
                >
                  {item.name}
                </button>
              ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default App;
