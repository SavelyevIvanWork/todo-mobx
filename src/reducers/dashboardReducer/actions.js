import {
    ADD_TASK, CLICK_TITLE, CLOSED_MODIFY_INPUT,
    CLOSED_POP_UP, DRAG_START, DRAG_UPDATE, GET_HEIGHT_COLUMN,
    GET_POP_UP, UPDATE_CARD,
    UPDATE_COLUMN, UPDATE_COLUMN_NEW_TITLE, UPDATE_COLUMN_TITLE,
    UPDATE_NEW_TASK_CONTENT, UPDATE_NEW_TASK_TITLE,
    UPDATE_TITLE
} from "./constants";


export const updateTitle = (id) => {
    return {type: UPDATE_TITLE, id}
}

export const updateCard = result => {
    return {type: UPDATE_CARD, result}
}

export const updateColumn = result => {
    return {type: UPDATE_COLUMN, result}
}

export const getPopUp = columnId => {
    return {type: GET_POP_UP, columnId}
}

export const closedPopUp = columnId => {
    return {type: CLOSED_POP_UP, columnId}
}

export const updateNewTaskContent = (text, columnId) => {
    return {type: UPDATE_NEW_TASK_CONTENT, text, columnId}
}

export const updateNewTaskTitle = (newTitle, columnId) => {
    return {type: UPDATE_NEW_TASK_TITLE, newTitle, columnId}
}

export const addTask = (newTitle, newContent, columnId) => {
    return {type: ADD_TASK, newTitle, newContent, columnId}
}

export const clickTitle = (titleId, columnId) => {
    return {type: CLICK_TITLE, titleId, columnId}
}

export const updateColumnNewTitle = (newTitle, columnId) => {
    return {type: UPDATE_COLUMN_NEW_TITLE, newTitle, columnId}
}

export const updateColumnTitle = (newTitle, columnId) => {
    return {type: UPDATE_COLUMN_TITLE, newTitle, columnId}
}

export const closedModifyInput = (columnId) => {
    return {type: CLOSED_MODIFY_INPUT, columnId}
}

export const dragStart = start => {
    return {type: DRAG_START, start}
}

export const dragUpdate = update => {
    return {type: DRAG_UPDATE, update}
}

export const getHeightColumn = (columnId, columnWidth, columnHeight) => {
    return {type: GET_HEIGHT_COLUMN, columnId, columnWidth, columnHeight}
}