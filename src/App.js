import {DragDropContext, Droppable} from "react-beautiful-dnd";
import Column from "./components/Column/Column";
import styled from 'styled-components'
import React from "react";
import {observer} from "mobx-react-lite";
import {StoreContext} from "./index";
import {useContext} from "react";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  background-color: ${props => (props.isDraggingOver ? 'red' : 'white')};
`
const App = observer(() => {
    const store = useContext(StoreContext)
    const onDragStart = start => {
        store.dragStart(start)
    }
    const {columnOrder, tasks} = store

    const onDragUpdate = update => {
        store.dragUpdate(update)
    }

    const onDragEnd = result => {
        const {destination, source} = result
        // destination - назначение
        // source - источник
        // draggable - перетаскиваемый
        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId
            &&
            destination.index === source.index) {
            return
        }
        if (result.type === 'column') {
            return store.updateColumn(result)
        }

        if (result.type === 'card') {
            return store.updateCard(result)
        }
    }

    return (
            <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
                <Droppable droppableId={'all-columns'} direction='horizontal' type={'column'}>
                    {(provided, snapshot) => (
                        <Container
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {columnOrder.map((columnId, index) => {
                                const column = store.columns[columnId]
                                console.log('Column', column)
                                const columnTasks = column.taskIds.map(
                                    taskId => tasks[taskId],
                                )
                                return <Column key={column.id} column={column} tasks={columnTasks} index={index}
                                />
                            })}
                            {provided.placeholder}
                        </Container>
                    )}

                </Droppable>
            </DragDropContext>
    )
})

export default App
