import styled from "styled-components";
import {useRef} from "react";
import useOutsideClick from "@rooks/use-outside-click";
import {observer} from "mobx-react-lite";
import {StoreContext} from "../../index";
import {useContext} from "react";


const Container = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 5px;
  background-color: white;
  z-index: 10;
`

const Title = styled.textarea`
  height: 30px;
  margin: 5px;
  margin-bottom: 0;
  padding: 5px;
  resize: none;
  border: 1px solid lightgrey;
  border-radius: 5px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  outline: none;
`

const Textarea = styled(Title)`
  height: 100px;
  margin-top: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`

const Button = styled.button`
  margin: 5px;
  padding: 5px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: inherit;
  outline: none;
`


const PopUp = observer(({columnId, newTask}) => {
    const {title, content} = newTask
    const store = useContext(StoreContext)
    const containerRef = useRef(null)

    function outsidePClick() {
        store.closedPopUp(columnId)
    }
    useOutsideClick(containerRef, outsidePClick);

    const updateNewTaskTitleHandler = (e) => {
        const newTitle = e.target.value
        store.updateNewTaskTitle(newTitle, columnId)
    }

    const updateNewTaskContentHandler = (e) => {
        const text = e.target.value
        store.updateNewTaskContent(text, columnId)
    }

    const addTaskHandler = (e) => {
        e.stopPropagation()
        store.addTask(title, content, columnId)
    }

    return (
        <Container
            ref={containerRef}
        >
            <Title
                value={title}
                onChange={(e) => updateNewTaskTitleHandler(e)}
            >
                {title}
            </Title>
            <Textarea
                placeholder='Add a new task!'
                value={content}
                onChange={(e) => updateNewTaskContentHandler(e)}
            >
                {content}
            </Textarea>
            <Button onClick={(e) => addTaskHandler(e)}
            >Save</Button>
        </Container>
    )
})

export default PopUp