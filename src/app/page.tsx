import { RedirectType, redirect } from 'next/navigation';

export default async function Home() {
  redirect('/routine', RedirectType.replace);
}
