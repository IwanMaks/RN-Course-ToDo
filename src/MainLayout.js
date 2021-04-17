import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavBar } from "./components/NavBar";
import { THEME } from "./theme";
import { Mainscreens } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
    const { todoId } = useContext(ScreenContext);
    //const [todoId, setTodoId] = useState(null);
    //const [todos, setTodos] = useState([]);

    //const addTodo = (title) => {
    //    //const newTodo = {
    //    //    id: Date.now().toString(),
    //    //    title: title
    //    //}

    //    //setTodos(todos.concat([ newTodo ]))

    //    //setTodos(prevTodos => {
    //    //    return [
    //    //        ...prevTodos,
    //    //        newTodo
    //    //    ]
    //    //})

    //    setTodos((prev) => [
    //        ...prev,
    //        {
    //            id: Date.now().toString(),
    //            title,
    //        },
    //    ]);
    //};

    //const removeTodo = (id) => {
    //    const todo = todos.find((t) => t.id === id);
    //    Alert.alert(
    //        "Удаление элемента",
    //        `Вы уверны, что хотите удалить задачу: ${todo.title}?`,
    //        [
    //            {
    //                text: "Отмена",
    //                style: "cancel",
    //            },
    //            {
    //                text: "Удалить",
    //                onPress: () => {
    //                    setTodoId(null);
    //                    setTodos((prev) =>
    //                        prev.filter((todo) => todo.id !== id)
    //                    );
    //                },
    //                style: "distructive",
    //            },
    //        ],
    //        {
    //            cancelable: true,
    //        }
    //    );
    //};

    //const updateTodo = (id, title) => {
    //    setTodos((old) =>
    //        old.map((todo) => {
    //            if (todo.id === id) {
    //                todo.title = title;
    //            }
    //            return todo;
    //        })
    //    );
    //};

    //let content = (
    //    <Mainscreens />
    //);

    //if (todoId) {
    //    const selectetdTodo = todos.find((todo) => todo.id === todoId);
    //    content = (
    //        <TodoScreen
    //            goBack={() => {
    //                changeScreen(null);
    //            }}
    //            todo={selectetdTodo}
    //            onRemove={removeTodo}
    //            onSave={updateTodo}
    //        />
    //    );
    //}

    return (
        <View style={styles.wrapper}>
            <NavBar title="Todo App" />
            <View style={styles.container}>
                {todoId ? <TodoScreen /> : <Mainscreens />}
            </View>
        </View>
    );
};
// TODO Add new functional too2323

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20,
        flex: 1
    },
    wrapper: {
        flex: 1
    }
});
