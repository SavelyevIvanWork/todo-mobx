import React from 'react'
import Task from "../Task";
import styled from 'styled-components'
import {Droppable, Draggable} from "react-beautiful-dnd";
import PopUp from "../PopUp/PopUp";
import ModifyInput from "../ModifyInput/ModifyInput";
import {useRef} from "react";
import {useLayoutEffect} from "react";
import {useContext} from "react";
import {StoreContext} from "../../index";
import {observer} from "mobx-react-lite";
import {v4 as uuidv4} from "uuid";

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

const Column = observer (({column, tasks, index}) => {
    const store = useContext(StoreContext)
    const containerRef = useRef(null)
    const columnHeight = column.height
    const columnTaskIds = column.taskIds
    const {id, title, popUp, newTitleContent} = column
    console.log('Rerender')


    useLayoutEffect(() => {
        const height = containerRef.current.clientHeight
        const width = containerRef.current.clientWidth
        store.getHeightColumn(id, width, height)
    }, [id, columnHeight, store, columnTaskIds])


    const titleColumnClickHandler = (e) => {
        const titleId = e.target.id
        store.clickTitle(titleId, id)
    }



    return (<>
            {<ShadowWrapper columnHeight={store.columns[id].height} columnWidth={store.columns[id].width}></ShadowWrapper>}
            <Draggable draggableId={id} index={index}>
                {(provided, snapshot) => (
                    <Wrapper ref={containerRef}>
                        <Container
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                        >
                            {
                                title.checked ?
                                    <ModifyInput newTitleContent={newTitleContent} columnId={id}/>
                                    : <Title
                                        {...provided.dragHandleProps}
                                        id={store.columns[id].title.id}
                                        onClick={(e) => titleColumnClickHandler(e)}
                                    >
                                        {store.columns[id].title.content}
                                    </Title>
                            }
                            <Droppable droppableId={id} direction='vertical' type='card'>
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
                                                popUp ? <PopUp columnId={id} newTask={store.columns[id].newTask}/>
                                                    : <ButtonWrapper>
                                                        <Button onClick={() => store.getPopUp(id)}>
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
})

export default Column
