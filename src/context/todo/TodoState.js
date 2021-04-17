import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { ScreenContext } from "../screen/screenContext";
import {
    ADD_TODO,
    CLEAR_ERROR,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_TODO,
} from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null,
    };
    const { changeScreen } = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async (title) => {
        showLoader();
        clearError();
        try {
            const data = await Http.post(
                "https://todo-app-11ef0-default-rtdb.firebaseio.com/todos.json",
                { title }
            );
            dispatch({ type: ADD_TODO, title, id: data.name });
        } catch (e) {
            showError("Что-то пошло не так...");
        } finally {
            hideLoader();
        }
    };

    const removeTodo = (id) => {
        const todo = state.todos.find((t) => t.id === id);
        Alert.alert(
            "Удаление элемента",
            `Вы уверны, что хотите удалить задачу: ${todo.title}?`,
            [
                {
                    text: "Отмена",
                    style: "cancel",
                },
                {
                    text: "Удалить",
                    onPress: async () => {
                        changeScreen(null);
                        clearError();
                        try {
                            await Http.delete(
                                `https://todo-app-11ef0-default-rtdb.firebaseio.com/todos/${id}.json`
                            );
                            dispatch({ type: REMOVE_TODO, id });
                        } catch (e) {
                            showError("Что-то пошло не так...");
                        }
                    },
                    style: "distructive",
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    const updateTodo = async (id, title) => {
        clearError();
        try {
            await Http.patch(
                `https://todo-app-11ef0-default-rtdb.firebaseio.com/todos/${id}.json`,
                { title }
            );
            dispatch({ type: UPDATE_TODO, id, title });
        } catch (e) {
            showError("Что-то пошло не так...");
        }
    };

    const showLoader = () => dispatch({ type: SHOW_LOADER });

    const hideLoader = () => dispatch({ type: HIDE_LOADER });

    const showError = (error) => dispatch({ type: SHOW_ERROR, error });

    const clearError = () => dispatch({ type: CLEAR_ERROR });

    const fetchTodos = async () => {
        showLoader();
        clearError();
        try {
            const data = await Http.get(
                "https://todo-app-11ef0-default-rtdb.firebaseio.com/todos.json"
            );
            let todos = [];
            if (data !== null) {
                todos = Object.keys(data).map((key) => ({
                    ...data[key],
                    id: key,
                }));
            }
            dispatch({ type: FETCH_TODOS, todos });
        } catch (e) {
            showError("Что-то пошло не так...");
            console.log(e);
        } finally {
            hideLoader();
        }
    };

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                fetchTodos,
                loading: state.loading,
                error: state.error,
                addTodo,
                removeTodo,
                updateTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
