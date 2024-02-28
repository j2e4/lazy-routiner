import { RedirectType, redirect } from 'next/navigation';

export default async function Home() {
  redirect('/plan', RedirectType.replace);
}
