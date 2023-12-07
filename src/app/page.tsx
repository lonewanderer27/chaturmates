"use client";

import dynamic from 'next/dynamic';

const MApp = dynamic(() => import("../components/AppShell"), {
  ssr: false,
})

function Page() {
  return (
    <MApp/>
  );
}

export default Page;
