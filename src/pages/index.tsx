import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PromptZero } from 'promptzero';
import * as React from 'react';
import { useEffect, useState } from 'react';

import Input from '@/components/Input';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import ResultCard from '@/components/ResultCard';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

interface ImageResult {
  url: string;
}

interface Pagination {
  images: ImageResult[];
}

export default function HomePage() {
  const [prompts, setPrompts] = useState<any>();

  useEffect(() => {
    const promptZero = new PromptZero('Q734T4A-5KEEXLY-V6A2SVQ-RFYX7QY');
    promptZero
      .getPrompts()
      .then((x) => setPrompts(x['data']['requestedPrompts']))
      .catch((x) => console.error(x));
  }, []);

  return (
    <Layout>
      <Seo />
      <main className='overflow-hidden overflow-x-hidden'>
        <section className='bg-white'>
          <div className=''>
            <div className='p-2'>
              <div className='p-3 text-gray-500'>
                Describe what you want in detail
              </div>
              <Input></Input>
            </div>

            <div className='mx-5 flex flex-row justify-end text-black focus:border'>
              <button className='flex flex-initial flex-row items-center'>
                <div className='flex-initial'>advanced</div>
                <ChevronDownIcon className='h-3 flex-initial pl-1'></ChevronDownIcon>
              </button>
            </div>

            <div className='relative'>
              <div
                className='absolute inset-0 flex items-center'
                aria-hidden='true'
              >
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='justify-left relative flex'>
                <span className='bg-white px-2 text-sm text-gray-500'>
                  Results
                </span>
              </div>
            </div>

            <ResultCard
              images={[
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIlif-IZBQ_wIbnddxToQw1gAnkk5VSBdZcB6ZeFHe5w&s',
              ]}
            />

            <ResultCard
              images={[
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIlif-IZBQ_wIbnddxToQw1gAnkk5VSBdZcB6ZeFHe5w&s',
              ]}
            />
          </div>
          <div className='layout flex flex-col items-center justify-center text-center'>
            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='#'>Plunkio LLC</UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
