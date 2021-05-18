import React from "react";

const style = {
  backgroundColor: "#c6ffe2",
  width: "400px",
  minHeight: "200px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px"
};

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div style={style}>
      <p className="title">未完了のTODO</p>
      <ul>
        {/* 未完了TODOを配列のmap関数で表示する */}
        {/* React仮想DOMの差分を抽出しているため、ループ処理内で区別がつけられるようにkeyを指定する */}
        {todos.map((todo, index) => {
          return (
            <div key={todo} className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickComplete(index)}>完了</button>
              {/* 引数()をつけると関数の登録ではなく実行の意味になり、画面ロード時に関数が実行されてしまう */}
              {/* これを回避するために、アロー関数で呼び出し先の関数を呼び出す */}
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
