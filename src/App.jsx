import React from 'react';
import { RecoilRoot } from 'recoil';
import { ActivityIcon, CheckCircleIcon } from '@goorm-dev/gds-goormthon';

function App() {
  return (
    <RecoilRoot>
      <div className="text-3xl font-bold underline">
        <ActivityIcon width="1rem" className="ActivityIcon__icon" />
        Hello earth
      </div>
    </RecoilRoot>
  );
}

export default App;
