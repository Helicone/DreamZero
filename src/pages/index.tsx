import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PromptRequest, PromptZero } from 'promptzero';
import * as React from 'react';
import { useEffect, useState } from 'react';

import Input from '@/components/Input';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import ResultCard from '@/components/ResultCard';
import Seo from '@/components/Seo';

const promptZero = new PromptZero('Q734T4A-5KEEXLY-V6A2SVQ-RFYX7QY');

function ResultBreak() {
  return (
    <div className='relative'>
      <div className='absolute inset-0 flex items-center' aria-hidden='true'>
        <div className='w-full border-t border-gray-300' />
      </div>
      <div className='justify-left relative flex'>
        <span className='bg-white px-2 text-sm text-gray-500'>Results</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [prompts, setPrompts] = useState<PromptRequest[]>();

  useEffect(() => {
    promptZero
      .getPrompts()
      .then((x) => setPrompts(x.data.requestedPrompts))
      // eslint-disable-next-line no-console
      .catch((x) => console.error(x));
  }, []);

  return (
    <Layout>
      <Seo />
      <main className='overflow-hidden overflow-x-hidden'>
        <section className='bg-white'>
          <div className=''>
            <div>
              <div className='p-2'>
                <div className='p-3 text-gray-500'>
                  Describe what you want in detail
                </div>
                <Input onCreate={(p) => promptZero.requestNewPrompt(p)}></Input>
              </div>

              <div className='mx-5 flex flex-row justify-end text-black focus:border'>
                <button className='flex flex-initial flex-row items-center'>
                  <div className='flex-initial'>advanced</div>
                  <ChevronDownIcon className='h-3 flex-initial pl-1'></ChevronDownIcon>
                </button>
              </div>
            </div>
            <ResultBreak />

            {prompts?.map((p) => {
              const result = p.result ?? undefined;
              if (result === undefined) {
                return <>Loading...</>;
              } else if (result.__typename === 'Result_StableDiffusionV1_4') {
                return (
                  <ResultCard
                    key={p.id}
                    images={result.images.map((i) => i.url)}
                    prompt={p.prompt}
                  />
                );
              } else {
                return <>Loading...</>;
              }
            })}
          </div>
          <div className='flex flex-col items-center justify-center text-center'>
            <footer className='bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='#'>Plunkio LLC</UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
