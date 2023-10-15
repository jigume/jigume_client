import { useRef, useEffect, useState } from 'react';

const getThreshold = () => {
  return {
    min: 68,
    mid: window.innerHeight / 2,
    max: window.innerHeight - 100,
  };
};

export default function useBottomSheet() {
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
        `translateY(${getThreshold().min - getThreshold().mid}px)`,
      );
    if (level === 'max')
      sheet.current.style.setProperty(
        'transform',
        `translateY(${getThreshold().min - getThreshold().max}px)`,
      );
    setOpen(true);
  };

  // Touch Event 핸들러들 등록
  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;
      if (!sheet.current || !content.current) return false;

      if (
        !isContentAreaTouched ||
        sheet.current.getBoundingClientRect().y !== getThreshold().min
      )
        return true;

      if (touchMove.movingDirection === 'down')
        return content.current.scrollTop <= 0;

      return false;
    };

    const handleTouchStart = (e) => {
      const { touchStart } = metrics.current;
      if (!sheet.current) return;
      touchStart.sheetY = sheet.current.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (!touchMove.prevTouchY) touchMove.prevTouchY = touchStart.touchY;

      // 맨 처음 앱 시작하고 시작시
      if (touchMove.prevTouchY === 0) touchMove.prevTouchY = touchStart.touchY;

      // 방향 조절
      if (touchMove.prevTouchY < currentTouch.clientY)
        touchMove.movingDirection = 'down';
      if (touchMove.prevTouchY > currentTouch.clientY)
        touchMove.movingDirection = 'up';

      if (canUserMoveBottomSheet()) {
        // content에서 scroll이 발생하는 것을 막습니다.
        e.preventDefault();

        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;
        // 상황에 따라 바닥 높이만큼 조절하는 변수
        let x = getThreshold().min;

        if (nextSheetY <= getThreshold().min) {
          nextSheetY = getThreshold().min;
          x = getThreshold().min;
        }
        if (nextSheetY >= getThreshold().max) {
          nextSheetY = getThreshold().max;
          x = 0;
        }

        if (sheet.current)
          sheet.current.style.setProperty(
            'transform',
            `translateY(${nextSheetY - getThreshold().max - x}px)`,
          ); // 바닥 만큼은 빼야쥬...
      } else {
        document.body.style.overflowY = 'hidden';
      }
    };

    const handleTouchEnd = () => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;
      if (!sheet.current) return;
      // Snap Animation
      const currentSheetY = sheet.current.getBoundingClientRect().y;
      const boundary = getThreshold().mid * 0.4;

      // 중간 사이즈
      if (currentSheetY !== getThreshold().min) {
        if (
          currentSheetY < getThreshold().mid + boundary &&
          currentSheetY > getThreshold().mid - boundary
        ) {
          sheet.current.style.setProperty(
            'transform',
            `translateY(${getThreshold().min - getThreshold().mid}px)`,
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
            `translateY(${getThreshold().min - getThreshold().max}px)`,
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
  }, []);

  useEffect(() => {
    // content 영역을 터치하는 것을 기록합니다.
    const handleTouchStart = () => {
      if (!metrics.current) metrics.current.isContentAreaTouched = true;
    };

    content.current.addEventListener('touchstart', handleTouchStart);
  }, []);

  useEffect(() => {
    // resize event
    window.addEventListener('resize', () => {
      handleSheet('min');
    });
  }, []);

  return { handle, sheet, content, isOpen, handleSheet };
}

// ref: https://velog.io/@boris0716/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-Bottom-Sheet-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%9E%91%EC%84%B1%EC%A4%91
