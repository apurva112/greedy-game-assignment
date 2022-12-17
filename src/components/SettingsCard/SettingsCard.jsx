import React, { useCallback, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./SettingsCard.css";

const getItemStyle = (isDragging, draggableStyle, selected) => ({
  padding: 10,
  margin: `0 10px 0px 0px`,
  background: isDragging ? "rgb(117, 201, 250)" : "white",
  color: isDragging ? "white" : "black",
  border: isDragging ? "white" : `1px solid black`,
  fontSize: `15px`,
  borderRadius: `5px`,
  width: `150px`,
  height: `40px`,
  borderLeft: selected ? `5px solid rgb(117, 201, 250)` : "1px solid black",
  ...draggableStyle,
});

const SettingsCard = ({ onChange, value }) => {
  const [columns, setColumns] = useState(value);

  const handleToggleSelected = useCallback(
    (id) => {
      setColumns(
        columns.map((item) =>
          item.id === id ? { ...item, selected: !item.selected } : item
        )
      );
    },
    [columns]
  );
  const handleSave = useCallback(() => {
    onChange(columns);
  }, [columns, onChange]);

  const handleCancel = useCallback(() => {
    setColumns(value);
    onChange(value);
  }, [onChange, value]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(columns);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);
    setColumns(items);
  };
  return (
    <div className="card-container">
      <div className="inner-card">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todo" direction="horizontal">
            {(provided) => (
              <div
                className="todo"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="inner-card-items">
                  {columns.map(({ id, name, selected }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              onClick={() => handleToggleSelected(id)}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                selected
                              )}
                            >
                              {name}
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="card-lower">
        <button className="card-lower-btn1" onClick={handleCancel}>
          Cancel
        </button>
        <button className="card-lower-btn2" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingsCard;
