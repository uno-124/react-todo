import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  // 追加テキストのState
  const [todoText, setTodoText] = useState("");
  // 未完了TODOのState
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了TODOのState
  const [completeTodos, setCompleteTodos] = useState([]);

  // 引数名は何でもいいがeventが一般的
  // event.target.valueでテキストボックスに入力された値をStateに設定する
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタンをクリック時、未完了TODOのStateに追加テキストのStateを追加した配列を設定する
  // その後、追加テキストを初期化する
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  // 削除ボタンをクリック時、未完了TODOのStateからindexに指定された要素を削除する
  // splice関数 第一引数：要素の番号 第二引数：指定された要素の番号から削除する要素数を指定
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // 完了ボタンをクリック時、未完了のTODOから指定された要素を削除
  // 完了のTODOに指定された要素を追加
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // 戻すボタンをクリック時、完了のTODOから指定された要素を削除
  // 未完了のTODOに指定された要素を追加
  // ※完了ボタンクリック(onClickComlete)を逆にした処理
  const onClickBack = (index) => {
    const newCompeletTodos = [...completeTodos];
    newCompeletTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    setCompleteTodos(newCompeletTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        {/* value(初期値)に追加Stateを設定する */}
        {/* このStateが変更されるたびにvalueの値を更新したいのでonChaneにテキスト変更時にStateを更新する関数を入れる*/}
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {/* 未完了TODOを配列のmap関数で表示する */}
          {/* React仮想DOMの差分を抽出しているため、ループ処理内で区別がつけられるようにkeyを指定する */}
          {incompleteTodos.map((todo, index) => {
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
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {/* 完了TODOを配列のmap関数で表示する */}
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
