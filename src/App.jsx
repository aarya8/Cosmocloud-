import { useState } from "react";
import "./App.css";
import { ObjectInput } from "./components/ObjectInput";

function App() {
  const [data, setData] = useState([]);
  const printData = () => {
    console.table(data);
  };
  const AddData = () => {
    setData((prevData) => [
      ...prevData,
      { input: "input", type: "STRING", required: false, child: [] },
    ]);
  };
  return (
    <div className="app">
      <section className="input-section">
        <div className="heading-box">
          <h1 className="heading">Field name and type</h1>
          <button className="heading-btn" onClick={AddData}>
            +
          </button>
        </div>

        {data.map((item, id) => (
          <div key={id} style={{ display: "flex" }}>
            <span>{id}</span>
            <ObjectInput objectData={item} setData={setData} objectIndex={id} />
          </div>
        ))}
        <button className="print-btn" onClick={() => console.log(data)}>
          Add
        </button>
      </section>
    </div>
  );
}

export default App;
