import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "./ui/AppText";

export const Todo = ({ todo, onRemove, onOpen }) => {
    // TODO Add new functional too
    return (
        <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => onOpen(todo.id)}
            onLongPress={() => onRemove(todo.id)}
        >
            <View style={styles.todo}>
                <AppText>{todo.title}</AppText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    todo: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 5,
        marginBottom: 10,
    }
});
