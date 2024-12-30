import { useEffect, useState } from "react";
import Input from "./components/Input.js";
import Button from "./components/Button.js";
import { addItem, getAllItems } from "./indexedDB.js";
import { convert } from "./utils/convert.js";

function App() {
  const [pdf, setPdf] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [allItems, setAllItems] = useState([]);

  const handleConvertText = async () => {
    const fileUrl = await convert(inputValue);
    if (fileUrl) {
      await addItem({ id: inputValue.slice(0, 20), url: fileUrl });
      setPdf(fileUrl);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (pdf) {
      const items = getAllItems();
      setAllItems(items);
    }
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
        {pdf && (
          <iframe
            data-testid="pdf"
            title="pdf"
            src="https://arxiv.org/pdf/quant-ph/0410100.pdf"
            width="100%"
            height="600px"
          ></iframe>
        )}
      </div>
      {allItems.length ? (
        <div className="flex flex-col items-center gap-5">
          <div className="text-xl">Історія</div>
          <div className="border rounded-xl p-3 flex flex-col gap-1 w-60">
            {allItems.map((item) => (
              <button key={item.id} onClick={() => setPdf(item.url)}>
                {item.id}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default App;
