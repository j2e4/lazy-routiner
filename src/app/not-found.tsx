import GlobalErrorFallback from 'src/components/templates/GlobalErrorFallback';

export default function NotFound() {
  return <GlobalErrorFallback code={404} message="Not Found" />;
}
