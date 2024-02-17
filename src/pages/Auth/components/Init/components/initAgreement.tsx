import React, { useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import NextButton from '@src/components/NextButton';
import Checked from '@src/asset/icon/init/checked.svg';
import Unchecked from '@src/asset/icon/init/unchecked.svg';
import { InitContextType } from '../index.d';

const titles = [
  { value: '약관에 모두 동의합니다.', link: '' },
  { value: '(필수) 서비스 이용 약관', link: 'service' },
  { value: '(필수) 개인정보 처리 방침', link: 'privacy' },
  { value: '(선택) 마케팅 수신동의', link: 'marketing' },
];

export default function InitAgreement() {
  const navigate = useNavigate();
  const { initUser, setInitUser } = useOutletContext<InitContextType>();

  const agreeData = initUser.agreement.map((item, idx) => ({
    title: titles[idx].value,
    link: titles[idx].link,
    checked: item,
  }));

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = Number(e.target.value);
    // toggle
    if (idx === 0)
      setInitUser((prev) => ({
        ...prev,
        agreement: new Array(4).fill(!prev.agreement[0]),
      }));
    else
      setInitUser((prev) => {
        const newArr = [...prev.agreement];
        newArr[idx] = !newArr[idx];
        return { ...prev, agreement: newArr };
      });
  };

  useEffect(() => {
    let value = false;
    if (initUser.agreement[1] && initUser.agreement[2] && initUser.agreement[3])
      value = true;

    setInitUser((prev) => {
      const newArr = [...prev.agreement];
      newArr[0] = value;
      return { ...prev, agreement: newArr };
    });
  }, [initUser.agreement[1], initUser.agreement[2], initUser.agreement[3]]);

  useEffect(() => {
    // 잘못된 요청 방지
    if (!initUser.nickname) navigate('/auth/init');
  }, []);

  return (
    <div className="flex h-full flex-col justify-between px-4 py-6">
      <div>
        <div className="pb-12 pt-[33%] text-xl font-semibold">
          지구미에 오신 것을 환영합니다.
        </div>

        <div className="flex flex-col gap-4">
          {agreeData.map((item, idx) => (
            <React.Fragment key={item.title}>
              <label htmlFor={item.title} className="flex items-center gap-2">
                <img
                  src={item.checked ? Checked : Unchecked}
                  alt={`약관${idx}`}
                />
                <input
                  type="checkbox"
                  checked={item.checked}
                  value={idx}
                  onChange={handleCheck}
                  id={item.title}
                  className="hidden"
                />
                <div>
                  <span>{item.title}</span>
                  {idx !== 0 && (
                    <Link
                      className="px-1 py-2 text-sm text-zinc-600 underline"
                      to={`/auth/init/agreement/${item.link}`}
                    >
                      자세히 보기
                    </Link>
                  )}
                </div>
              </label>
              <div className={idx === 0 ? 'h-[1px] bg-zinc-300' : ''} />
            </React.Fragment>
          ))}
        </div>
      </div>

      <NextButton
        isDisabled={!(initUser.agreement[1] && initUser.agreement[2])}
        linkTo="/auth/init/image"
      />
    </div>
  );
}
