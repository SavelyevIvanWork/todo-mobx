import {v4 as uuidv4} from 'uuid'
import {
    ADD_TASK, CLICK_TITLE, CLOSED_MODIFY_INPUT,
    CLOSED_POP_UP, DRAG_START, DRAG_UPDATE, GET_HEIGHT_COLUMN,
    GET_POP_UP, UPDATE_CARD,
    UPDATE_COLUMN, UPDATE_COLUMN_NEW_TITLE, UPDATE_COLUMN_TITLE,
    UPDATE_NEW_TASK,
    UPDATE_NEW_TASK_CONTENT, UPDATE_NEW_TASK_TITLE,
    UPDATE_TITLE
} from "./constants"

const initialState = {
    tasks: {
        'task-1': {id: 'task-1', title: 'Untitled', content: 'Take out the garbage'},
        'task-2': {id: 'task-2', title: 'Untitled', content: 'Watch my favorite show'},
        'task-3': {id: 'task-3', title: 'Untitled', content: 'Charge my phone'},
        'task-4': {id: 'task-4', title: 'Untitled', content: 'Cook dinner'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: {id: `column-title-${uuidv4()}`, content: 'To do', checked: false},
            newTitleContent: '',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
            popUp: false,
            newTask: {title: '', content: ''},
            height: 0,
            width: 0
        },
        'column-2': {
            id: 'column-2',
            title: {id: `column-title-${uuidv4()}`, content: 'In progress', checked: false},
            newTitleContent: '',
            taskIds: [],
            popUp: false,
            newTask: {title: '', content: ''},
            height: 0,
            width: 0
        },
        'column-3': {
            id: 'column-3',
            title: {id: `column-title-${uuidv4()}`, content: 'Done', checked: false},
            newTitleContent: '',
            taskIds: [],
            popUp: false,
            newTask: {title: '', content: ''},
            height: 0,
            width: 0
        },
    },

    columnOrder: ['column-1', 'column-2', 'column-3'],
    dragStart: false,
    dragUpdate: false
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        // destination - назначение
        // source - источник
        // draggable - перетаскиваемый
        case UPDATE_CARD:
            console.log(action.type)
            const start = state.columns[action.result.source.droppableId];
            const finish = state.columns[action.result.destination.droppableId];

            if (start === finish) {
                const newTaskIds = Array.from(start.taskIds);
                newTaskIds.splice(action.result.source.index, 1);
                newTaskIds.splice(action.result.destination.index, 0, action.result.draggableId);

                const newColumn = {
                    ...start,
                    taskIds: newTaskIds,
                };

                const newState = {
                    ...state,
                    columns: {
                        ...state.columns,
                        [newColumn.id]: newColumn,
                    },
                }
                return newState;
            }


            // Moving from one list to another
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(action.result.source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds,
            }

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(action.result.destination.index, 0, action.result.draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds,
            }

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            }

        case UPDATE_COLUMN: {
            const newColumnOrder = Array.from(state.columnOrder)
            newColumnOrder.splice(action.result.source.index, 1)
            newColumnOrder.splice(action.result.destination.index, 0, action.result.draggableId)

            return {
                ...state,
                columnOrder: [...state.columnOrder = newColumnOrder]
            }
        }

        case GET_HEIGHT_COLUMN: {
            const updateColumn = {
                ...state.columns[action.columnId]
            }
            updateColumn.height = action.columnHeight
            updateColumn.width = action.columnWidth

            return {
                ...state,
                columns: {...state.columns, [action.columnId]: updateColumn}
            }
        }

        case DRAG_START: {
            return {
                ...state,
                dragStart: true
            }
        }

        case DRAG_UPDATE: {
            return {
                ...state,
                dragUpdate: true
            }
        }

        case GET_POP_UP: {
            const updateColumn = {
                ...state.columns[action.columnId]
            }
            updateColumn.popUp = true

            return {
                ...state,
                columns: {...state.columns, [action.columnId]: updateColumn}
            }
        }

        case CLOSED_POP_UP: {
            const updateColumn = {
                ...state.columns[action.columnId]
            }
            updateColumn.popUp = false

            return {
                ...state,
                columns: {...state.columns, [action.columnId]: updateColumn}
            }
        }
        case UPDATE_NEW_TASK_TITLE: {
            const updateColumn = {
                ...state.columns[action.columnId]
            }
            updateColumn.newTask.title = action.newTitle

            return {
                ...state,
                columns: {...state.columns, [action.columnId]: updateColumn}
            }
        }

        case UPDATE_NEW_TASK_CONTENT: {
            const updateColumn = {
                ...state.columns[action.columnId]
            }
            updateColumn.newTask.content = action.text

            return {
                ...state,
                columns: {...state.columns, [action.columnId]: updateColumn}
            }
        }

        case ADD_TASK: {
            const newKey = `task-${uuidv4()}`
            const updateColumn = {
                ...state.columns[action.columnId]
            }
            updateColumn.taskIds.push(newKey)
            updateColumn.popUp = false
            updateColumn.newTask.content = ''
            updateColumn.newTask.title = ''

            return {
                ...state,
                tasks: {...state.tasks,
                    [newKey]: {
                        id: newKey,
                        title: action.newTitle === '' ? 'Untitled' : action.newTitle,
                        content: action.newContent
                    }
                },
                columns: {...state.columns, [action.columnId]: updateColumn}
            }
        }

        case CLICK_TITLE: {
            const updateColumn = {
                ...state.columns[action.columnId]
            }
            if (updateColumn.title.id === action.titleId) {
                updateColumn.title.checked = true
                updateColumn.newTitleContent = updateColumn.title.content

            }
            return {
                ...state,
                columns: {...state.columns, [action.columnId]: updateColumn}
            }
        }

        case CLOSED_MODIFY_INPUT: {
            const updateColumn = {
                ...state.columns[action.columnId]
            }

            updateColumn.title.checked = false
            updateColumn.newTitleContent = ''

            return {
                ...state,
                columns: {...state.columns, [action.columnId]: updateColumn}
            }
        }

        case UPDATE_COLUMN_NEW_TITLE: {
            const updateColumn = {
                ...state.columns[action.columnId]
            }
            updateColumn.newTitleContent = action.newTitle

            return {
                ...state,
                columns: {...state.columns, [action.columnId]: updateColumn}
            }
        }

        case UPDATE_COLUMN_TITLE: {
            const updateColumn = {
                ...state.columns[action.columnId]
            }

            updateColumn.title.content = action.newTitle
            updateColumn.title.checked = false

            return {
                ...state,
                columns: {...state.columns, [action.columnId]: updateColumn}
            }
        }

        default:
            return state
    }
}

export default dashboardReducer