import { DocPage, docMetadata, docParams } from '@/components/site/doc-page';

export default async function Page(props: PageProps<'/library/[[...slug]]'>) {
  const { slug = [] } = await props.params;
  return <DocPage slugs={['library', ...slug]} />;
}

export function generateStaticParams() {
  return docParams('library');
}

export async function generateMetadata(props: PageProps<'/library/[[...slug]]'>) {
  const { slug = [] } = await props.params;
  return docMetadata(['library', ...slug]);
}
