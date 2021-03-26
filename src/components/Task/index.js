import styled from 'styled-components'
import {Draggable} from "react-beautiful-dnd";
import {observer} from "mobx-react-lite";


const Container = styled.div`
  margin: 5px;
  border: 1px solid lightgray;
  border-color: ${props => (props.isDragging ? 'gray' : 'lightgray')};
  border-radius: 5px;
  background-color: ${props => (props.isDragging ? 'lightgray' : 'white')};
`

const Title = styled.h3`
  position: relative;
  margin: 5px;

  &::before {
    content: '';
    position: absolute;
    top: 25px;
    width: 100%;
    height: 2px;
    background-color: darkcyan;
  }
`;

const Content = styled.p`
  display: block;
  margin: 5px;
  padding: 5px
`;


const Task = observer(({task, index}) => {
    const {id, title, content} = task

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <Title>
                        {title}
                    </Title>
                    <Content>
                        {content}
                    </Content>

                    {provided.placeholder}
                </Container>
            )}
        </Draggable>
    )
})

export default Task