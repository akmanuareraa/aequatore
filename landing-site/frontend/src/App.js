import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { Toaster} from 'react-hot-toast';

import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";

function useEventListener(eventName, handler, element = document) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

function AnimatedCursor() {
  const cursorOuterRef = useRef();
  const cursorInnerRef = useRef();
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isActiveClickable, setIsActiveClickable] = useState(false);
  const endX = useRef(0);
  const endY = useRef(0);

  const onMouseMove = ({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY });
    cursorInnerRef.current.style.top = clientY + "px";
    cursorInnerRef.current.style.left = clientX + "px";
    endX.current = clientX;
    endY.current = clientY;
  };

  const animateOuterCursor = (time) => {
    if (previousTimeRef.current !== undefined) {
      coords.x += (endX.current - coords.x) / 8;
      coords.y += (endY.current - coords.y) / 8;
      cursorOuterRef.current.style.top = coords.y + "px";
      cursorOuterRef.current.style.left = coords.x + "px";
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateOuterCursor);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseEnter = () => setIsVisible(true);
  const onMouseLeave = () => setIsVisible(false);

  useEventListener("mousemove", onMouseMove, document);
  useEventListener("mousedown", onMouseDown, document);
  useEventListener("mouseup", onMouseUp, document);
  useEventListener("mouseenter", onMouseEnter, document);
  useEventListener("mouseleave", onMouseLeave, document);

  useEffect(() => {
    if (isActive) {
      cursorInnerRef.current.style.transform = "scale(0.7)";
      cursorOuterRef.current.style.transform = "scale(5)";
    } else {
      cursorInnerRef.current.style.transform = "scale(1)";
      cursorOuterRef.current.style.transform = "scale(1)";
    }
  }, [isActive]);

  useEffect(() => {
    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = "scale(0.91)";
      cursorOuterRef.current.style.transform = "scale(1.5)";
    }
  }, [isActiveClickable]);

  useEffect(() => {
    if (isVisible) {
      cursorInnerRef.current.style.opacity = 1;
      cursorOuterRef.current.style.opacity = 1;
    } else {
      cursorInnerRef.current.style.opacity = 0;
      cursorOuterRef.current.style.opacity = 0;
    }
  }, [isVisible]);

  const styles = {
    cursor: {
      zIndex: 999,
      position: "fixed",
      opacity: 1,
      pointerEvents: "none",
      transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
    },
    cursorInner: {
      position: "fixed",
      borderRadius: "50%",
      width: 8,
      height: 8,
      pointerEvents: "none",
      backgroundColor: "white",
      transition: "opacity 0.15s ease-in-out, transform 0.25s ease-in-out",
    },
    cursorOuter: {
      position: "fixed",
      borderRadius: "50%",
      pointerEvents: "none",
      width: 40,
      height: 40,
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      opacity: 0.6,
      boxShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
      transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
    },
  };

  return (
    <>
      <div ref={cursorOuterRef} style={styles.cursorOuter} className="z-40" />
      <div ref={cursorInnerRef} style={styles.cursorInner} className="z-40" />
    </>
  );
}

function App() {
  return (
    <>
      <AnimatedCursor />
      <Toaster />
      <div className="w-full">
        <div className="custom-cursor"></div>
        <Navbar />
        <Landing />
      </div>
    </>
  );
}

export default App;
