import styled from 'styled-components'
import {useDispatch} from "react-redux";
import {
    closedModifyInput, closedPopUp,
    updateColumnNewTitle,
    updateColumnTitle,
    updateNewTaskTitle
} from "../../reducers/dashboardReducer/actions";
import {useRef} from "react";
import useOutsideClick from "@rooks/use-outside-click";

const Input = styled.input`
  margin: 0;
  padding: 10px;
  border: none;
  border-bottom: 1px solid lightgrey;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  outline: none;
  font-size: 20px;
  line-height: 16px;
  font-weight: bold;
`

const ModifyInput = ({newTitleContent, columnId}) => {
    const dispatch = useDispatch()
    const inputRef = useRef()

    function outsidePClick() {
        dispatch(closedPopUp(columnId))
    }

    useOutsideClick(inputRef, outsidePClick);

    const inputChangeHandler = (e) => {
        const newTitle = e.target.value
        dispatch(updateColumnNewTitle(newTitle, columnId))
    }

    const updateColumnTitleHandler = (e) => {
        if (e.key === 'Enter') {
            const newTitle = e.target.value
            dispatch(updateColumnTitle(newTitle, columnId))
        }
    }

    return (
        <Input
            ref={inputRef}
            value={newTitleContent}
            autoFocus={true}
            onChange={(e) => inputChangeHandler(e)}
            onKeyDown={(e) => updateColumnTitleHandler(e)}
            onBlur={() => dispatch(closedModifyInput(columnId))}
        />
    )
}

export default ModifyInput