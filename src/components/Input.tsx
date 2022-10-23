import { useState } from 'react';

export default function Input({
  onCreate,
}: {
  onCreate: (prompt: string) => void;
}) {
  const [description, setDescription] = useState('');
  return (
    <div className='relative'>
      <div className='overflow-hidden rounded-lg border border-gray-300 shadow-sm'>
        <label htmlFor='description' className='sr-only'>
          Description
        </label>
        <textarea
          rows={2}
          name='description'
          id='description'
          className='block w-full resize-none border-0 py-2 placeholder-gray-500 focus:ring-0 sm:text-sm'
          placeholder='Write a description...'
          defaultValue=''
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden='true'>
          <div className='py-2'>
            <div className='h-9' />
          </div>
          <div className='h-px' />
          <div className='py-2'>
            <div className='py-px'>
              <div className='h-9' />
            </div>
          </div>
        </div>
      </div>

      <div className='absolute inset-x-px bottom-0'>
        <div className='flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3'>
          <button
            className='inline-flex w-full content-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 '
            onClick={() => onCreate(description)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
