import styled from 'styled-components'
import {useRef} from "react";
import useOutsideClick from "@rooks/use-outside-click";
import {observer} from "mobx-react-lite";
import {StoreContext} from "../../index";
import {useContext} from "react";

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
    const inputRef = useRef()
    const store = useContext(StoreContext)

    function outsidePClick() {
        store.closedPopUp(columnId)
    }

    useOutsideClick(inputRef, outsidePClick);

    const inputChangeHandler = (e) => {
        const newTitle = e.target.value
        store.updateColumnNewTitle(newTitle, columnId)
    }

    const updateColumnTitleHandler = (e) => {
        if (e.key === 'Enter') {
            const newTitle = e.target.value
            store.updateColumnTitle(newTitle, columnId)
        }
    }

    return (
        <Input
            ref={inputRef}
            value={newTitleContent}
            autoFocus={true}
            onChange={(e) => inputChangeHandler(e)}
            onKeyDown={(e) => updateColumnTitleHandler(e)}
            onBlur={() => store.closedModifyInput(columnId)}
        />
    )
}

export default observer(ModifyInput)