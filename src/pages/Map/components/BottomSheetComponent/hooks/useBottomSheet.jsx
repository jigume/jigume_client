import { useRef, useEffect } from 'react';

export default function useBottomSheet() {
  const MIN_Y = 68;
  const MIDDLE_Y = window.innerHeight / 2;
  const MAX_Y = window.innerHeight - 100;

  const sheet = useRef(null);
  const handle = useRef(null);
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

      if (sheet.current === undefined) return false;
      if (content.current === undefined) return false;

      if (sheet.current.getBoundingClientRect().y !== MIN_Y) return true;
      if (touchMove.movingDirection === 'down')
        return content.current.scrollTop <= 0;

      return false;
    };

    const handleTouchStart = (e) => {
      const { touchStart } = metrics.current;
      if (sheet.current === undefined) return;
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
        // 상황에 따라 바닥 높이만큼 조절하는 변수
        let x = MIN_Y;

        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
          x = MIN_Y;
        }
        if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
          x = 0;
        }

        if (sheet.current !== undefined)
          sheet.current.style.setProperty(
            'transform',
            `translateY(${nextSheetY - MAX_Y - x}px)`,
          ); // 바닥 만큼은 빼야쥬...
      } else {
        document.body.style.overflowY = 'hidden';
      }
    };

    const handleTouchEnd = () => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;
      if (sheet.current === undefined) return;
      // Snap Animation
      const currentSheetY = sheet.current.getBoundingClientRect().y;
      const boundary = 100;

      // 중간 사이즈
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
    if (handle.current) {
      handle.current.addEventListener('touchstart', handleTouchStart);
      handle.current.addEventListener('touchmove', handleTouchMove);
      handle.current.addEventListener('touchend', handleTouchEnd);
    }
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      if (metrics.current !== undefined)
        metrics.current.isContentAreaTouched = true;
    };

    if (content.current)
      content.current.addEventListener('touchstart', handleTouchStart);
  }, []);

  return { handle, sheet, content };
}

// ref: https://velog.io/@boris0716/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-Bottom-Sheet-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%9E%91%EC%84%B1%EC%A4%91