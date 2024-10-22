interface Window {
  docsearch: any;
  notBlockEnabled: any;
}

interface Header {
  level: number;
  title: string;
  slug: string;
  content: string;
}
interface PageData {
  title: string;
  description: string;
  headers: Header[];
  frontmatter: Record<string, any>;
}
declare module '*.md' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<any, any, any> & { readonly pageDate?: PageData }
  export default component
}

declare module '*.svg';
