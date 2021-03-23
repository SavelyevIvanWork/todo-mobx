import React from 'react'
import Task from "../Task";
import styled from 'styled-components'
import {Droppable, Draggable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import {clickTitle, getHeightColumn, getPopUp} from "../../reducers/dashboardReducer/actions";
import PopUp from "../PopUp/PopUp";
import ModifyInput from "../ModifyInput/ModifyInput";
import {useRef} from "react";
import {useLayoutEffect} from "react";
import {useEffect} from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //width: 20%;
  max-height: 80vh;
  //margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: ${props => (props.isDragging ? 'gray' : 'white')};
`

const ShadowWrapper = styled.div`
  height: ${props => `${props.columnHeight}px`};
  width: ${props => `${props.columnWidth}px`};
  background-color: blue;
`

const Wrapper = styled.section`
  width: 20%;
  //margin: 10px;
  background-color: inherit;
`

const Title = styled.h3`
  font-size: 20px;
  margin: 0;
  padding: 10px;
  border-bottom: 1px solid lightgrey;
`
const TaskList = styled.div`
  min-height: 30px;
  max-height: 70vh;
  overflow-y: scroll;
  scrollbar-width: 3px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};

  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-track {
    background-color: inherit;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: inherit;
  }

  &::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #666;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-corner {
    background-color: #999;
  }

  &::-webkit-resizer {
    background-color: #666;
  }
`

const ButtonWrapper = styled.div`
  border-top: 1px solid lightgrey;
`

const Button = styled.button`
  margin: 5px;
  padding: 5px 20px;
  background-color: inherit;
  border: 1px solid lightgrey;
  border-radius: 5px;
  outline: none;
`

const Column = ({column, tasks, index}) => {
    const dispatch = useDispatch()
    const {dragStart, columnOrder, columns} = useSelector(state => state.dashboardReducer)
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        const columnHeight = containerRef.current.clientHeight
        const columnWidth = containerRef.current.clientWidth
        dispatch(getHeightColumn(column.id, columnWidth, columnHeight))
    }, [dispatch, column.id, column.height, columnOrder, column.taskIds])


    const titleColumnClickHandler = (e) => {
        const titleId = e.target.id
        dispatch(clickTitle(titleId, column.id))
    }


    return (<>
            {<ShadowWrapper columnHeight={column.height} columnWidth={column.width}></ShadowWrapper>}
            <Draggable draggableId={column.id} index={index}>
                {(provided, snapshot) => (
                    <Wrapper ref={containerRef}>
                        <Container
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                        >
                            {
                                column.title.checked ?
                                    <ModifyInput newTitleContent={column.newTitleContent} columnId={column.id}/>
                                    : <Title
                                        {...provided.dragHandleProps}
                                        id={column.title.id}
                                        onClick={(e) => titleColumnClickHandler(e)}
                                    >
                                        {column.title.content}
                                    </Title>
                            }
                            <Droppable droppableId={column.id} direction='vertical' type='card'>
                                {(provided, snapshot) => {
                                    return (
                                        <>
                                            <TaskList
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                isDraggingOver={snapshot.isDraggingOver}
                                            >
                                                {
                                                    tasks.map((task, index) => {
                                                        return <Task key={task.id} task={task} index={index}/>
                                                    })
                                                }
                                                {provided.placeholder}
                                            </TaskList>
                                            {
                                                column.popUp ? <PopUp columnId={column.id} newTask={column.newTask}/>
                                                    : <ButtonWrapper>
                                                        <Button onClick={() => dispatch(getPopUp(column.id))}>
                                                            Add task
                                                        </Button>
                                                    </ButtonWrapper>
                                            }
                                        </>
                                    )
                                }
                                }
                            </Droppable>
                        </Container>
                    </Wrapper>

                )}

            </Draggable>

        </>
    )
}

export default Column
