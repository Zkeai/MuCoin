import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
  return (
    <main className="mt-16 p-4 h-auto">
     loading...
    </main>
  );
}
