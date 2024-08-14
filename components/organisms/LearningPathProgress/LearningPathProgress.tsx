"use client";
import { useAppSelector } from "../../../store/store";
import { LessonItem } from "./LessonItem";

export const LearningPathProgress = () => {
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);

  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );
  if (!selectedTopic || !selectedTopic.resources) {
    return <div></div>;
  }

  return (
    <>
      {selectedTopic?.resources.map((resource, index) => (
        <LessonItem
          key={index}
          index={index}
          selectedCourse={selectedCourse}
        />
      ))}
    </>
  );
};
