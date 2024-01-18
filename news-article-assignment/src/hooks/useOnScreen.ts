import {RefObject, useEffect, useRef, useState} from "react";

export function useOnScreen(ref: RefObject<HTMLElement>) {
    const [isOnScreen, setIsOnScreen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(([entry]) =>
            setIsOnScreen(entry.isIntersecting)
        );
    }, []);

    useEffect(() => {
        observerRef.current?.observe(ref.current as HTMLElement);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [ref]);

    return isOnScreen;
}
