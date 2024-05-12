import CreateNote from "./CreateNote";
import NotesList from "./NotesList";

// https://nextjs.org/docs/app/api-reference/file-conventions/page
export default async function Page(info: {
  params: { slug: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  return (
    <div>
      <CreateNote />
      <NotesList />
    </div>
  );
}

/** 
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config 
 */

export const dynamic: 'auto' | 'force-dynamic' | 'error' | 'force-static' = "auto";
export const dynamicParams: boolean = true;
export const revalidate: false | 0 | number = false; 