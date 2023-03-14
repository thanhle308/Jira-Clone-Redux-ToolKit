import _ from 'lodash';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const DragAndDropDnD = () => {
    const [state, setState] = useState({
        toDo: {
            id: 'toDo',
            items: [
                { id: '1', taskName: 'Task 1' },
                { id: '2', taskName: 'Task 2' },
                { id: '3', taskName: 'Task 3' },
            ],
        },
        inProgress: {
            id: 'inProgress',
            items: [
                { id: '4', taskName: 'Task 4' },
                { id: '5', taskName: 'Task 5' },
                { id: '6', taskName: 'Task 6' }
            ],
        },
        done: {
            id: 'done',
            items: [
                { id: '7', taskName: 'Task 7' },
                { id: '8', taskName: 'Task 8' },
                { id: '9', taskName: 'Task 9' },
            ]
        }
    })
    const handleDragEnd = (result) => {
        let { destination, source } = result;
        //Neu diem den khong ton tai thi return
        if (!destination) {
            return;
        }
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }

        //tao ra 1 tag drag
        let itemCopy = {...state[source.droppableId].items[source.index]};

        // Dropable bat dau keo
        let index = state[source.droppableId].items.findIndex(item => item.id == itemCopy.id);
        // console.log('dropSource',dropSource)

        state[source.droppableId].items.splice(index, 1);

        //Drop tha vao 
        let dropDestination = state[destination.droppableId].items;
        dropDestination.splice(destination.index, 0 , itemCopy)
        // console.log('dropDestination',dropDestination)

        setState(state)
    }
    return (
        <div className='container'>
            <h3 className='text-center display-4 mb-4 '>Demo Drag & Drop</h3>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="row">

                    {_.map(state, (statusTask, index) => {
                        return <Droppable droppableId={statusTask.id} key={index}>
                            {(provided) => {
                                return <div className='col-4'>
                                    <div className="bg-dark p-5" key={index} ref={provided.innerRef} {...provided.droppableProps}>

                                        {statusTask.items.map((item, index) => {
                                            return <Draggable key={item.id} index={index} draggableId={item.id}>
                                                {(provided) => {
                                                    return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='mt-2 p-3 bg-white text-center'>
                                                        {item.taskName}
                                                    </div>
                                                }}
                                            </Draggable>

                                        })}
                                        {provided.placeholder}

                                    </div>
                                </div>
                            }}
                        </Droppable>
                    })}

                </div>

            </DragDropContext>
        </div>
    );
}

export default DragAndDropDnD;
