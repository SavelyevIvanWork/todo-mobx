import {v4 as uuidv4} from 'uuid'
import {action, autorun, computed, makeAutoObservable, observable} from "mobx";

class ObservableTodoStore {
    constructor() {
        makeAutoObservable(this);
        autorun(() => console.log('HelloWord!'));
    }

    @observable.deep tasks = {
        'task-1': {id: 'task-1', title: 'Untitled', content: 'Take out the garbage'},
        'task-2': {id: 'task-2', title: 'Untitled', content: 'Watch my favorite show'},
        'task-3': {id: 'task-3', title: 'Untitled', content: 'Charge my phone'},
        'task-4': {id: 'task-4', title: 'Untitled', content: 'Cook dinner'},
    };

    @observable.deep columns = {
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
    };

    @observable columnOrder = ['column-1', 'column-2', 'column-3'];
    @observable draggableStart = false;
    @observable draggableUpdate = false;

    @action updateCard = (result) => {
        const start = this.columns[result.source.droppableId];
        const finish = this.columns[result.destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(result.source.index, 1);
            newTaskIds.splice(result.destination.index, 0, result.draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            return {
                columns: {
                    ...this.columns,
                    [newColumn.id]: newColumn,
                },
            }
        }
        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(result.source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        }

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(result.destination.index, 0, result.draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        }

        return {
            columns: {
                ...this.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        }
    }

    @action updateColumn = (result) => {
        const newColumnOrder = Array.from(this.columnOrder)
        newColumnOrder.splice(result.source.index, 1)
        newColumnOrder.splice(result.destination.index, 0, result.draggableId)
        this.columnOrder = newColumnOrder
    }

    @action getHeightColumn = (columnId, columnWidth, columnHeight) => {
        this.columns[columnId].height = columnHeight
        this.columns[columnId].width = columnWidth
    }

    @action dragStart = (start) => {
        this.draggableStart = true
    }

    @action dragUpdate = (update) => {
        this.draggableUpdate = true
    }

    @action getPopUp = (columnId) => {
        console.log(columnId)
        this.columns[columnId].popUp = true
    }

    @action closedPopUp = (columnId) => {
        this.columns[columnId].popUp = false
    }

    @action updateNewTaskTitle = (newTitle, columnId) => {
        this.columns[columnId].newTask.title = newTitle
    }

    @action updateNewTaskContent = (text, columnId) => {
        this.columns[columnId].newTask.content = text
    }

    @action addTask = (newTaskTitle, newTaskContent, columnId) => {
        const newKey = `task-${uuidv4()}`

        this.tasks[newKey] = {
            id: newKey,
            title: newTaskTitle === '' ? 'Untitled' : newTaskTitle,
            content: newTaskContent
        }
        this.columns[columnId].taskIds.push(newKey)
        this.columns[columnId].popUp = false
        this.columns[columnId].newTask.content = ''
        this.columns[columnId].newTask.title = ''
    }

    @action clickTitle = (titleId, columnId) => {
        if (this.columns[columnId].title.id === titleId) {
            this.columns[columnId].title.checked = true
            this.columns[columnId].newTitleContent = this.columns[columnId].title.content
        }
    }

    @action closedModifyInput = (columnId) => {
        this.columns[columnId].title.checked = false
        this.columns[columnId].newTitleContent = ''

    }

    @action updateColumnNewTitle = (newTitle, columnId) => {
        this.columns[columnId].newTitleContent = newTitle
    }

    @action updateColumnTitle = (newTitle, columnId) => {
        this.columns[columnId].title.content = newTitle
        this.columns[columnId].title.checked = false
    }
}

export default ObservableTodoStore


