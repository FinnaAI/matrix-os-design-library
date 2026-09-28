import { DocPage, docMetadata, docParams } from '@/components/site/doc-page';

export default async function Page(props: PageProps<'/guides/[[...slug]]'>) {
  const { slug = [] } = await props.params;
  return (
    <div className="mx-auto max-w-3xl">
      <DocPage slugs={['guides', ...slug]} />
    </div>
  );
}

export function generateStaticParams() {
  return docParams('guides');
}

export async function generateMetadata(props: PageProps<'/guides/[[...slug]]'>) {
  const { slug = [] } = await props.params;
  return docMetadata(['guides', ...slug]);
}
