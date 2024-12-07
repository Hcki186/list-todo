'use client'
import { useRouter } from 'next/navigation';
import { ClipboardDocumentListIcon, PencilSquareIcon, RocketLaunchIcon, ArrowPathIcon } from '@heroicons/react/24/solid';


export default function Home() {
  const router = useRouter();
  return (
    <div>
     <div
        className="relative home-banner flex items-center justify-center h-screen w-screen bg-cover bg-center">
        <div className="relative z-10 text-center text-black">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Organizing your day activity with Todo Daily
          </h1>
          <button
            onClick={() => router.push('/lists')}
            className="btn bg-todo-main text-white hover:bg-todo-main border-todo-main px-6 py-3">
            Get started
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-3xl font-bold mb-8">Don&#39;t let your day doing nothing</h2>
        <div className="grid grid-cols-4 gap-20">
          <div className="flex flex-col items-center">
            <ClipboardDocumentListIcon className="h-20 w-20 text-todo-main  mr-2" />
            <p className="mt-4">Small task</p>
          </div>
          <div className="flex flex-col items-center">
            <PencilSquareIcon className="h-20 w-20 text-todo-main  mr-2" />
            <p className="mt-4">PencilSquareIcon</p>
          </div>
          <div className="flex flex-col items-center">
            <RocketLaunchIcon className="h-20 w-20 text-todo-main  mr-2" />
            <p className="mt-4">Do it</p>
          </div>
          <div className="flex flex-col items-center">
            <ArrowPathIcon className="h-20 w-20 text-todo-main  mr-2" />
            <p className="mt-4">Repeat</p>
          </div>
        </div>
      </div>
    </div>
  );
}