import { useEffect, useState } from "react";
import styles from "./ObjectInput.module.css";
import classnames from "classnames";
import addImage from "../images/add.png";
import deleteImage from "../images/delete.png";

export const ObjectInput = ({ objectData, objectIndex, setData }) => {
  const [child, setChild] = useState([]);
  useEffect(() => {
    setData((prevstate) =>
      prevstate.map((data, dataId) =>
        dataId === objectIndex ? { ...data, child: child } : data
      )
    );
  }, [setData, child, objectIndex]);
  const updateName = (e) => {
    setData((prevstate) =>
      prevstate.map((data, dataId) =>
        dataId === objectIndex ? { ...data, input: e.target.value } : data
      )
    );
  };
  const updateType = (e) => {
    if (e.target.value === "OBJECT") {
    }
    setData((prevstate) =>
      prevstate.map((data, dataId) => {
        return dataId === objectIndex
          ? { ...data, type: e.target.value }
          : data;
      })
    );
  };
  const toggleRequired = () => {
    setData((prevstate) =>
      prevstate.map((data, dataId) =>
        dataId === objectIndex ? { ...data, required: !data.required } : data
      )
    );
  };
  const addChild = () => {
    setChild((prevstate) => [
      ...prevstate,
      { name: "addName", type: "STRING", required: false, child: [] },
    ]);
  };

  const deleteitem = () => {
    setData((prevstate) =>
      prevstate.filter((data, dataId) => {
        if (dataId === objectIndex) {
          return false;
        }
        return true;
      })
    );
  };
  return (
    <section className={styles.section}>
      <div className={styles.inputBox}>
        <div className={styles.inputBox}>
          <input
            className={styles.input}
            value={objectData.input}
            onChange={updateName}
          ></input>
          <select name="type" onChange={updateType}>
            <option value="STRING">STRING</option>
            <option value="BOOLEAN">BOOLEAN</option>
            <option value="INTEGER">INTEGER</option>
            <option value="OBJECT">OBJECT</option>
          </select>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.requiredText}>Required</span>
          <div
            className={classnames(
              styles.requiredButton,
              objectData.required ? styles.active : ""
            )}
            onClick={toggleRequired}
          >
            <div className={styles.toggleButton}></div>
          </div>

          {objectData.type === "OBJECT" ? (
            <button className={styles.button} onClick={addChild}>
              <img
                className={styles.pngButton}
                src={addImage}
                alt="addButton"
              />
            </button>
          ) : (
            ""
          )}
          <button className={styles.button} onClick={deleteitem}>
            <img
              className={styles.pngButton}
              src={deleteImage}
              alt="deleteButton"
            />
          </button>
        </div>
        <hr></hr>

        {objectData.type === "OBJECT"
          ? child.map((child, id) => (
              <ObjectInput
                key={id}
                objectData={child}
                objectIndex={id}
                setData={setChild}
              />
            ))
          : ""}
      </div>
    </section>
  );
};
