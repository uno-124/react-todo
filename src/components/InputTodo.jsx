import React from "react";

const style = {
  backgroundColor: "#c1ffff",
  width: "400px",
  height: "30px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px"
};

export const InputTodo = (props) => {
  // propsからStateと関数を取得
  const { todoText, onChange, onClick, disabled } = props;
  return (
    <div style={style}>
      {/* value(初期値)に追加Stateを設定する */}
      {/* このStateが変更されるたびにvalueの値を更新したいのでonChangeにテキスト変更時にStateを更新する関数を入れる*/}
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChange}
      />
      <button disabled={disabled} onClick={onClick}>
        追加
      </button>
    </div>
  );
};
