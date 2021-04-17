import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    Modal,
    Alert,
} from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
    const [title, setTitle] = useState(value);

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert(
                "Ошибка изменения",
                `Минимальная длина названия - 3 символа. Сейчас ${
                    title.trim().length
                }`
            );
        } else {
            onSave(title);
        }
    };

    const cancelHandler = () => {
        setTitle(value)
        onCancel()
    }

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View style={styles.wrapper}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder="Введите новое название"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <View style={styles.buttons}>
                    <AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>
                        Cancel
                    </AppButton>
                    <AppButton onPress={saveHandler}>Save</AppButton>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: "80%",
    },
    buttons: {
        width: "80%",
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
