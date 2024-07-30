"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../../store/store";
import { LearningPahtVideoComponent } from "./LearningPahtVideoComponent";
import { useDispatch } from "react-redux";
import { selectedResource } from "../../../store/slices/ResourceSlice";

export const LearningPathVideo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userRating, setUserRating] = useState<number>(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [duracionTotal, setDuracionTotal] = useState<number>(0);

  const selectedCourse = useAppSelector(
    (state) => state.courses.selectedCourse
  );
  const selectedTopic = useAppSelector((state) => state.topics.selectedTopic);

  const selectedResourceTopic = useAppSelector(
    (state) => state.resource.selectedResource
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoReady(true);
    }, 200);

    return () => setIsVideoReady(false);
  }, [selectedResourceTopic]);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const obtenerDuracionFormateada = (length: number) => {
    length = Math.round(length);

    const horas = Math.floor(length / 3600);
    const minutosRestantes = Math.floor((length % 3600) / 60);
    const segundos = length % 60;

    const duracionFormateada =
      (horas > 0 ? `${horas}:` : "") +
      (minutosRestantes < 10 ? "0" : "") +
      `${minutosRestantes}:${segundos < 10 ? "0" : ""}${segundos}`;

    return duracionFormateada;
  };

  const handleDuration = (duration: number) => {
    setDuracionTotal(duration);
  };

  const handleNextVideoClick = () => {
    console.log("siguiente");
    if (selectedTopic && selectedResourceTopic) {
      const currentLessonIndex = selectedTopic.resources.findIndex(
        (resource) => resource._id === selectedResourceTopic._id
      );
      console.log("currentLessonIndex", currentLessonIndex);

      if (
        currentLessonIndex !== -1 &&
        currentLessonIndex < selectedTopic.resources.length - 1
      ) {
        const nextResourceFull =
          selectedTopic.resources[currentLessonIndex + 1];
        const nextResources = {
          _id: nextResourceFull._id._id,
          resourceUrl: nextResourceFull._id.resourceUrl,
          title: nextResourceFull._id.title,
          description: nextResourceFull._id.description,
          typeResource: nextResourceFull._id.typeResource,
          visibility: nextResourceFull._id.visibility,
          miniaturaUrl: nextResourceFull._id.miniaturaUrl,
          createdAt: nextResourceFull._id.createdAt,
          updatedAt: nextResourceFull._id.updatedAt,
        };
        console.log(nextResourceFull);
        if (nextResourceFull) {
          // Asegúrate de que nextResourceFull tenga todas las propiedades requeridas
          dispatch(selectedResource(nextResources));
        }
      }
    }
  };

  return (
    <LearningPahtVideoComponent
      isVideoReady={isVideoReady}
      selectedResource={selectedResourceTopic}
      handleDuration={handleDuration}
      obtenerDuracionFormateada={obtenerDuracionFormateada}
      userRating={userRating}
      handleRatingChange={handleRatingChange}
      duracionTotal={duracionTotal}
      onNextVideoClick={handleNextVideoClick}
    />
  );
};
