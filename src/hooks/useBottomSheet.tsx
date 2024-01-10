import { useRef, useEffect, useState } from 'react';
import { thresholds } from '../utils';

interface MetricsInterface {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY: number;
    movingDirection: 'none' | 'up' | 'down';
  };
  isContentAreaTouched: boolean;
}

const initMetrics: MetricsInterface = {
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

export default function useBottomSheet() {
  const [isOpen, setOpen] = useState(false);
  const [sheetLevel, setSheetLevel] = useState('min');
  const sheet = useRef<HTMLDivElement | null>(null);
  const handle = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);
  const metrics = useRef<MetricsInterface>(initMetrics);

  /**
   * sheet를 컨트롤할 수 있음
   * @param {'min'|'mid'|'max'} level string: min | mid | max
   */
  const handleSheet = (level = 'min') => {
    if (!sheet.current) return;
    if (level === 'min') {
      sheet.current.style.setProperty('transform', 'translateY(0)');
      setSheetLevel('min');
      setOpen(false);
      return;
    }
    if (level === 'mid') {
      sheet.current.style.setProperty(
        'transform',
        `translateY(${thresholds.min - thresholds.mid}px)`
      );
      setSheetLevel('mid');
    }
    if (level === 'max') {
      sheet.current.style.setProperty(
        'transform',
        `translateY(${thresholds.min - thresholds.max}px)`
      );
      setSheetLevel('max');
    }
    setOpen(true);
  };

  // Touch Event 핸들러들 등록
  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;
      if (!sheet.current || !content.current) return false;

      if (
        !isContentAreaTouched ||
        sheet.current.getBoundingClientRect().y !== thresholds.min
      )
        return true;

      if (touchMove.movingDirection === 'down')
        return content.current.scrollTop <= 0;

      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      if (!sheet.current) return;
      touchStart.sheetY = sheet.current.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
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
        let x = thresholds.min;

        if (nextSheetY <= thresholds.min) {
          nextSheetY = thresholds.min;
          x = thresholds.min;
        }
        if (nextSheetY >= thresholds.max) {
          nextSheetY = thresholds.max;
          x = 0;
        }

        if (sheet.current) {
          sheet.current.style.setProperty(
            'transform',
            `translateY(${nextSheetY - thresholds.max - x}px)`
          ); // 바닥 만큼은 빼야쥬...
          setSheetLevel('max');
        }
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
      const boundary = thresholds.mid * 0.4;

      if (currentSheetY !== thresholds.min) {
        // max size
        if (touchMove.movingDirection === 'up') {
          sheet.current.style.setProperty(
            'transform',
            `translateY(${thresholds.min - thresholds.max}px)`
          );
          setSheetLevel('max');
          setOpen(true);
        }

        // mid size
        if (
          currentSheetY < thresholds.mid + boundary &&
          currentSheetY > thresholds.mid - boundary
        ) {
          sheet.current.style.setProperty(
            'transform',
            `translateY(${thresholds.min - thresholds.mid}px)`
          );
          setSheetLevel('mid');
          setOpen(true);
          return;
        }

        // min size
        if (touchMove.movingDirection === 'down') {
          sheet.current.style.setProperty('transform', 'translateY(0)');
          setSheetLevel('min');
          setOpen(false);
        }
      }

      // metrics 초기화.
      metrics.current = initMetrics;
    };

    if (!handle.current) return;
    handle.current.addEventListener('touchstart', handleTouchStart);
    handle.current.addEventListener('touchmove', handleTouchMove);
    handle.current.addEventListener('touchend', handleTouchEnd);
  }, []);

  useEffect(() => {
    // content 영역을 터치하는 것을 기록합니다.
    if (!content.current || !metrics.current) return;
    content.current.addEventListener('touchstart', () => {
      metrics.current.isContentAreaTouched = true;
    });
  }, []);

  useEffect(() => {
    // resize event
    window.addEventListener('resize', () => {
      handleSheet('min');
    });
  }, []);

  return { handle, sheet, content, isOpen, sheetLevel, handleSheet };
}

// ref: https://velog.io/@boris0716/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-Bottom-Sheet-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%9E%91%EC%84%B1%EC%A4%91
