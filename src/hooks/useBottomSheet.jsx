// ref: https://velog.io/@boris0716/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-Bottom-Sheet-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%9E%91%EC%84%B1%EC%A4%91

import { useRef, useEffect } from 'react';

export default function useBottomSheet() {
  const MIN_Y = 60;
  const MIDDLE_Y = window.innerHeight / 2;
  const MAX_Y = window.innerHeight - 160;

  const sheet = useRef(null);
  const content = useRef(null);
  const metrics = useRef({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (!isContentAreaTouched) return true;

      if (content.current !== undefined)
        if (sheet.current.getBoundingClientRect().y !== MIN_Y) return true;

      if (content.current !== undefined)
        if (touchMove.movingDirection === 'down')
          return content.current.scrollTop <= 0;

      return false;
    };

    const handleTouchStart = (e) => {
      const { touchStart } = metrics.current;
      if (content.current === undefined) return;
      touchStart.sheetY = sheet.current.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined)
        touchMove.prevTouchY = touchStart.touchY;

      if (touchMove.prevTouchY === 0)
        // 맨 처음 앱 시작하고 시작시
        touchMove.prevTouchY = touchStart.touchY;

      if (touchMove.prevTouchY < currentTouch.clientY)
        touchMove.movingDirection = 'down';

      if (touchMove.prevTouchY > currentTouch.clientY)
        touchMove.movingDirection = 'up';

      if (canUserMoveBottomSheet()) {
        e.preventDefault();

        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= MIN_Y) nextSheetY = MIN_Y;
        if (nextSheetY >= MAX_Y) nextSheetY = MAX_Y;

        if (content.current !== undefined)
          sheet.current.style.setProperty(
            'transform',
            `translateY(${nextSheetY - MAX_Y}px)`,
          ); // 바닥 만큼은 빼야쥬...
      } else {
        document.body.style.overflowY = 'hidden';
      }
    };

    const handleTouchEnd = () => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;
      if (content.current === undefined) return;
      // Snap Animation
      const currentSheetY = sheet.current.getBoundingClientRect().y;
      const boundary = 120;
      if (currentSheetY !== MIN_Y) {
        if (
          currentSheetY < MIDDLE_Y + boundary &&
          currentSheetY > MIDDLE_Y - boundary
        ) {
          sheet.current.style.setProperty(
            'transform',
            `translateY(${MIN_Y - MIDDLE_Y}px)`,
          );
          return;
        }

        if (touchMove.movingDirection === 'down')
          sheet.current.style.setProperty('transform', 'translateY(0)');

        if (touchMove.movingDirection === 'up')
          sheet.current.style.setProperty(
            'transform',
            `translateY(${MIN_Y - MAX_Y}px)`,
          );
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
        isContentAreaTouched: false,
      };
    };
    if (content.current !== undefined) {
      sheet.current.addEventListener('touchstart', handleTouchStart);
      sheet.current.addEventListener('touchmove', handleTouchMove);
      sheet.current.addEventListener('touchend', handleTouchEnd);
    }
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      if (content.current !== undefined)
        metrics.current.isContentAreaTouched = true;
    };

    if (content.current !== undefined)
      content.current.addEventListener('touchstart', handleTouchStart);
  }, []);

  return { sheet, content };
}
