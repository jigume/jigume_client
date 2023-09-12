import { useRef, useEffect, useState } from 'react';

export default function useBottomSheet() {
  const [threshold, setThreshold] = useState({
    min: 68,
    mid: window.innerHeight / 2,
    max: window.innerHeight - 100,
  });
  const [isOpen, setOpen] = useState(false);
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

  /**
   * sheet를 컨트롤할 수 있음
   * @param {*} level string: min | mid | max
   */
  const handleSheet = (level = 'min') => {
    if (level === 'min') {
      sheet.current.style.setProperty('transform', 'translateY(0)');
      setOpen(false);
      return;
    }
    if (level === 'mid')
      sheet.current.style.setProperty(
        'transform',
        `translateY(${threshold.min - threshold.mid}px)`,
      );
    if (level === 'max')
      sheet.current.style.setProperty(
        'transform',
        `translateY(${threshold.min - threshold.max}px)`,
      );
    setOpen(true);
  };

  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (!isContentAreaTouched) return true;

      if (sheet.current === undefined) return false;
      if (content.current === undefined) return false;

      if (sheet.current.getBoundingClientRect().y !== threshold.min)
        return true;
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
        let x = threshold.min;

        if (nextSheetY <= threshold.min) {
          nextSheetY = threshold.min;
          x = threshold.min;
        }
        if (nextSheetY >= threshold.max) {
          nextSheetY = threshold.max;
          x = 0;
        }

        if (sheet.current !== undefined)
          sheet.current.style.setProperty(
            'transform',
            `translateY(${nextSheetY - threshold.max - x}px)`,
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
      const boundary = threshold.mid * 0.4;

      // 중간 사이즈
      if (currentSheetY !== threshold.min) {
        if (
          currentSheetY < threshold.mid + boundary &&
          currentSheetY > threshold.mid - boundary
        ) {
          sheet.current.style.setProperty(
            'transform',
            `translateY(${threshold.min - threshold.mid}px)`,
          );
          setOpen(true);
          return;
        }

        if (touchMove.movingDirection === 'down') {
          sheet.current.style.setProperty('transform', 'translateY(0)');
          setOpen(false);
        }

        if (touchMove.movingDirection === 'up') {
          sheet.current.style.setProperty(
            'transform',
            `translateY(${threshold.min - threshold.max}px)`,
          );
          setOpen(true);
        }
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
    handle.current.addEventListener('touchstart', handleTouchStart);
    handle.current.addEventListener('touchmove', handleTouchMove);
    handle.current.addEventListener('touchend', handleTouchEnd);

    console.log(threshold);
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        console.log(threshold);
        setThreshold({
          min: 68,
          mid: window.innerHeight / 2,
          max: window.innerHeight - 100,
        });

        handle.current.removeEventListener('touchstart', handleTouchStart);
        handle.current.removeEventListener('touchmove', handleTouchMove);
        handle.current.removeEventListener('touchend', handleTouchEnd);
      };

      // resize 이벤트가 발생할 때 handleResize 함수가 실행되도록 한다.
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
    return () =>
      window.removeEventListener('resize', () => {
        return null;
      });
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      if (metrics.current !== undefined)
        metrics.current.isContentAreaTouched = true;
    };

    if (content.current)
      content.current.addEventListener('touchstart', handleTouchStart);
  }, []);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const handleResize = () => {
  //       setThreshold({
  //         min: 68,
  //         mid: window.innerHeight / 2,
  //         max: window.innerHeight - 100,
  //       });

  //       if (handle.current) {
  //         handle.current.removeEventListener('touchstart', handleTouchStart);
  //         handle.current.removeEventListener('touchmove', handleTouchMove);
  //         handle.current.removeEventListener('touchend', handleTouchEnd);
  //       }
  //     };

  //     // resize 이벤트가 발생할 때 handleResize 함수가 실행되도록 한다.
  //     window.addEventListener('resize', handleResize);

  //     return () => window.removeEventListener('resize', handleResize);
  //   }
  //   return () =>
  //     window.removeEventListener('resize', () => {
  //       return null;
  //     });
  // }, []);

  return { handle, sheet, content, isOpen, handleSheet };
}

// ref: https://velog.io/@boris0716/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-Bottom-Sheet-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%9E%91%EC%84%B1%EC%A4%91
