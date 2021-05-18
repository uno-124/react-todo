import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

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
      {/* 追加テキストエリアのコンポーネント呼び出し */}
      {/* コンポーネント：InputTodoにpropsとしてStateと関数を渡している */}
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるTODOは5件まで！ちゃんと消化すること！
        </p>
      )}
      {/* 未完了のTODOエリアのコンポーネント呼び出し */}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      {/* 完了のTODOエリアのコンポーネント呼び出し */}
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
