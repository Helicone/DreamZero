import {
  ChevronDownIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { initPromptZero, PromptRequest, PromptZero } from 'promptzero';
import * as React from 'react';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import Input from '@/components/Input';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import ResultCard, { EmptyResultCard } from '@/components/ResultCard';
import Seo from '@/components/Seo';

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
function ApiKeyEntry({ onChange }: { onChange: (key: string) => void }) {
  return (
    <div className='flex flex-row items-center gap-5 px-4'>
      <div>Enter your PromptZero api key: </div>
      <input type='text' onChange={(e) => onChange(e.target.value)}></input>
    </div>
  );
}

export default function HomePage() {
  const [prompts, setPrompts] = useState<PromptRequest[]>();
  const [promptZero, setPromptZero] = useState<PromptZero | undefined>();
  const [promptError, setPromptError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  function getPrompts(pz: PromptZero) {
    pz.getPrompts()
      .then((x) => {
        setPrompts(x.data.requestedPrompts);
      })
      .catch((x) => setPromptError(x.message));
  }
  function initAndSetPromptZero(key: string) {
    localStorage.setItem('key', key);
    initPromptZero(key)
      .then((pz) => {
        setPromptError('');
        setPromptZero(pz);
        getPrompts(pz);
      })
      .catch(() => setPromptError('Invalid API Key!'));
  }
  React.useEffect(() => {
    const key = localStorage.getItem('key');
    if (key !== null) {
      initAndSetPromptZero(key);
    }
  }, []);
  return (
    <Layout>
      <Seo />
      <main>
        <div className='mx-auto max-w-lg lg:border lg:px-2'>
          <div className='overflow-hidden overflow-x-hidden'>
            <div
              className={`border p-2 ${
                promptZero === undefined ? '' : 'hidden'
              }`}
            >
              <ApiKeyEntry onChange={initAndSetPromptZero} />
            </div>

            {promptError}
            <section className='bg-white'>
              <div className=''>
                <div>
                  <div className='p-2'>
                    <div className='flex flex-row items-end justify-between p-3 text-gray-500'>
                      <div>Describe what you want in detail</div>
                      <div
                        className={`flex flex-row justify-end ${
                          promptZero !== undefined ? '' : 'hidden'
                        }`}
                      >
                        <Button
                          className='bg-white text-xs text-black'
                          onClick={() => setPromptZero(undefined)}
                        >
                          Change API key
                        </Button>
                      </div>
                    </div>
                    <Input
                      loading={loading}
                      onCreate={(p) => {
                        if (p !== '') {
                          setLoading(true);
                          promptZero?.requestNewPrompt(p).then(() => {
                            getPrompts(promptZero);
                            setLoading(false);
                          });
                        }
                      }}
                    ></Input>
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
                  if (
                    result !== undefined &&
                    result.__typename === 'Result_StableDiffusionV1_4'
                  ) {
                    return (
                      <ResultCard
                        key={p.id}
                        images={result.images.map((i) => i.url)}
                        prompt={p.prompt}
                        onDelete={() => {
                          null;
                        }}
                      />
                    );
                  } else {
                    return (
                      <EmptyResultCard
                        key={p.id}
                        prompt={p.prompt}
                        onDelete={() => {
                          null;
                        }}
                      />
                    );
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
            <div className='h-16'></div>
          </div>
        </div>
      </main>
      <footer
        className='fixed left-0 bottom-0 z-20
            flex h-16 w-full flex-col justify-center bg-white'
      >
        <div className='flex flex-row'>
          <RocketLaunchIcon className='h-8 flex-1 self-center text-center' />
          <PlusCircleIcon className='h-12 flex-1 self-center text-center' />
          <UserCircleIcon className='h-8 flex-1 self-center text-center' />
        </div>
      </footer>
    </Layout>
  );
}
