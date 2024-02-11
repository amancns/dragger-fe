import React, { useState } from "react";
import { useResizable } from "react-resizable-layout";
import { cn } from "../Utils/cn";
import SampleSplitter from "./SampleSplitter";
import "../Styles/IdeClone.css";
import Todo from "./Todos/Todo";
import { TodoList } from "./Todos/TodoList";
import APIStats from "./APIStats/APIStats";

const IdeClone = () => {
  const [todo, setTodo] = useState([]);

  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 150,
    min: 50,
    reverse: true,
  });

  const {
    isDragging: isUPTerminalDragging,
    position: upterminalH,
    splitterProps: terminalUpDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 0,
    min: 0,
    reverse: true,
  });
  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 0,
    min: 0,
  });
  const {
    isDragging: isBelowLeftSideFileDragging,
    position: fileWBelowLeftSide,
    splitterProps: fileDragBarPropsBelowLeftSide,
  } = useResizable({
    axis: "x",
    initial: 0,
    min: 0,
  });
  const {
    isDragging: isPluginDragging,
    position: pluginW,
    splitterProps: pluginDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 1000,
    min: 50,
    reverse: true,
  });
  const {
    isDragging: isSidePluginDragging,
    position: sidepluginW,
    splitterProps: sidepluginDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 0,
    min: 1,
    reverse: true,
  });

  return (
    <>
      <div
        className={
          "flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"
        }
      >
        <div className={"flex grow"}>
          <div
            className={cn("shrink-0 contents", isFileDragging && "dragging")}
            style={{ width: fileW }}
          ></div>
          <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
          <div className={"flex grow"}>
            <div className={"grow bg-darker contents"}>
              <Todo />
            </div>
            <SampleSplitter
              isDragging={isPluginDragging}
              {...pluginDragBarProps}
            />
            <div
              className={cn(
                "shrink-0 contents",
                isPluginDragging && "dragging"
              )}
              style={{ width: pluginW }}
            >
              <TodoList />
            </div>
            <SampleSplitter
              isDragging={isSidePluginDragging}
              {...sidepluginDragBarProps}
            />
            <div
              className={cn(
                "shrink-0 contents",
                isSidePluginDragging && "dragging"
              )}
              style={{ width: sidepluginW }}
            ></div>
          </div>
        </div>

        <div>
          <SampleSplitter
            dir={"horizontal"}
            isDragging={isTerminalDragging}
            {...terminalDragBarProps}
          />
          <div
            className={cn(
              "shrink-0 bg-darker contents",
              isTerminalDragging && "dragging"
            )}
            style={{ height: terminalH }}
          >
            <APIStats />
          </div>

          {/* <div className={"flex grow"}>
            <SampleSplitter
              isDragging={isBelowLeftSideFileDragging}
              {...fileDragBarPropsBelowLeftSide}
            />
            <div
              className={cn(
                "shrink-0 contents",
                fileWBelowLeftSide && "dragging"
              )}
              style={{ width: sidepluginW }}
            ></div>
          </div> */}

          <SampleSplitter
            dir={"horizontal"}
            isDragging={isUPTerminalDragging}
            {...terminalUpDragBarProps}
          />
          <div
            className={cn(
              "shrink-0 bg-darker contents",
              isUPTerminalDragging && "dragging"
            )}
            style={{ height: upterminalH }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default IdeClone;
