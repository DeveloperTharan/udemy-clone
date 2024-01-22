"use client";

import React, { useEffect, useRef, useState } from "react";

import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { MdOutlineFullscreen } from "react-icons/md";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Slider,
  Spinner,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";

export const VideoPlayer = ({ videoUrl }: { videoUrl: string | null }) => {
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoRunTime, setVideoRunTime] = useState("00:00");

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });

      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [volume, isMuted, playbackSpeed]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      togglePlay();
    }
  };

  const handleVideoProgress = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      const progress = (currentTime / duration) * 100;
      setProgress(progress);

      const formattedCurrentTime = formatTime(currentTime);
      const formattedDuration = formatTime(duration);

      const time = `${formattedCurrentTime}/${formattedDuration}`;
      setVideoRunTime(time);
    }
  };

  const handleVideoProgressChange = (value: number | number[]) => {
    if (typeof value === "number" && videoRef.current) {
      const duration = videoRef.current.duration;
      const newTime = (value / 100) * duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedMinutes = minutes < 10 ? `${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      videoRef.current.muted = newMuteState;

      if (newMuteState) {
        setVolume(0);
      } else {
        setVolume(1);
      }
    }
  };

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === "number" && videoRef.current) {
      const newVolume = value / 100;
      setVolume(newVolume);
      videoRef.current.volume = newVolume;
      setIsMuted(false);

      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      const isFullScreen = !document.fullscreenElement;
      if (isFullScreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  return (
    <>
      {videoUrl === null ? (
        <p>
          <Spinner
            size="lg"
            className="w-full h-fit flex justify-center items-center"
          />
        </p>
      ) : (
        <div
          className="relative w-full h-fit group cursor-pointer"
          onKeyDown={handleKeyDown}
        >
          {!isPlaying ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="px-5 py-2 bg-white/30 border border-white rounded-md">
                <FaPlay className="h-5 w-5 text-white" />
              </div>
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <FaPause className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition delay-300 duration-300 ease-linear" />
            </div>
          )}
          <video
            onTimeUpdate={handleVideoProgress}
            ref={videoRef}
            width="100%"
            height="100%"
            className="rounded-md"
            onClick={togglePlay}
          >
            <source src={videoUrl!} />
          </video>
          <div
            className={cn(
              "bg-black/10 absolute left-0 bottom-0 w-full h-fit p-2 transition-all delay-300 duration-300 ease-linear group/controls",
              !isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <div className="flex flex-col gap-2 justify-center items-start w-full">
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row gap-x-5">
                  <button
                    onClick={togglePlay}
                    className="outline-none focus:outline-none hover:bg-gray-600/80 px-2 py-1.5 rounded-full text-center"
                  >
                    {isPlaying ? (
                      <FaPause className="h-[14px] w-[14px]" />
                    ) : (
                      <FaPlay className="h-[14px] w-[14px]" />
                    )}
                  </button>
                  <p className="text-sm text-gray-300">{videoRunTime}</p>
                </div>
                <div className="flex flex-row gap-x-5 items-center">
                  <div className="flex flex-row gap-x-5 items-center">
                    <div className="flex flex-row gap-x-2 items-center">
                      <button
                        onClick={toggleMute}
                        className="outline-none focus:outline-none hover:bg-gray-600/80 px-2 py-1.5 rounded-full"
                      >
                        {isMuted ? (
                          <FaVolumeMute className="h-[14px] w-[14px]" />
                        ) : (
                          <FaVolumeUp className="h-[14px] w-[14px]" />
                        )}
                      </button>
                      <Slider
                        value={volume * 100}
                        size="sm"
                        onChange={(value) =>
                          handleSliderChange(value as number)
                        }
                        className="w-20 rounded-md hidden group-hover/controls:block transition 
                        delay-500 ease-linear"
                      />
                    </div>
                  </div>
                  <div
                    role="button"
                    onClick={handleFullScreen}
                    className="hover:bg-gray-600/80 px-2 py-1.5 rounded-full"
                  >
                    <MdOutlineFullscreen className="h-4 w-4" />
                  </div>
                  <div className="text-xs hover:bg-gray-600/80 px-2 py-1.5 rounded-full">
                    <Dropdown>
                      <DropdownTrigger>{`${playbackSpeed}x`}</DropdownTrigger>
                      <DropdownMenu aria-label="Playback Speed">
                        <DropdownItem onClick={() => handleSpeedChange(1)}>
                          1x
                        </DropdownItem>
                        <DropdownItem onClick={() => handleSpeedChange(1.5)}>
                          1.5x
                        </DropdownItem>
                        <DropdownItem onClick={() => handleSpeedChange(2)}>
                          2x
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <Slider
                value={progress}
                size="sm"
                onChange={handleVideoProgressChange}
                className="w-full rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
