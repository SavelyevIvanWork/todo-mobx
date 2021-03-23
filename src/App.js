import {useDispatch, useSelector} from "react-redux";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import Column from "./components/Column/Column";
import {dragStart, dragUpdate, updateCard, updateColumn} from "./reducers/dashboardReducer/actions";
import styled from 'styled-components'
import React from "react";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  background-color: ${props => (props.isDraggingOver ? 'red' : 'white')};
`

function App() {
    const {columns, columnOrder, tasks} = useSelector(state => state.dashboardReducer)
    const dispatch = useDispatch()

    const onDragStart = start => {
        dispatch(dragStart(start))
    }

    const onDragUpdate = update => {
        dispatch(dragUpdate(update))
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
            return dispatch(updateColumn(result))
        }

        if (result.type === 'card') {
            return dispatch(updateCard(result))
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
                            const column = columns[columnId]
                            const columnTasks = column.taskIds.map(
                                taskId => tasks[taskId],
                            )
                            return <Column key={column.id} column={column} tasks={columnTasks} index={index}/>
                        })}
                        {provided.placeholder}
                    </Container>
                )}

            </Droppable>
        </DragDropContext>
    )
}

export default App
