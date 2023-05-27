import React, { useRef } from 'react';
import { Root, Element, RootContent } from 'hast';
import styled from 'styled-components';
import MarkdownPreview, { MarkdownPreviewProps, MarkdownPreviewRef } from '@uiw/react-markdown-preview';
// import CodeLayout from 'react-code-preview-layout';
import { useMdData, MdDataHandle } from './useMdData';
import { useHyperlink } from './useHyperlink';

// const Preview = CodeLayout.Preview;
// const Code = CodeLayout.Code;
// const Toolbar = CodeLayout.Toolbar;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Markdown = styled<React.ForwardRefExoticComponent<MarkdownPreviewProps & { loading?: string } & React.RefAttributes<MarkdownPreviewRef>>>(MarkdownPreview)`
  &::after,
  &::before {
    content: none;
  }
  h1{
    position:sticky;
    top:0px;
    background-color: var(--color-canvas-default);
  }
`;

// const getBooleanValue = (param: Record<string, string>, field: string, defaultValue: boolean) => {
//   if (Reflect.has(param, field)) {
//     const newValue = Reflect.get(param, field);
//     if (newValue === 'true') {
//       return true;
//     }
//     if (newValue === 'false') {
//       return false;
//     }
//   }
//   return defaultValue;
// };

const PreviewDocument = ({ path }: { path: MdDataHandle }) => {
  const $dom = useRef<HTMLDivElement>(null);
  const { mdData } = useMdData(path);
  useHyperlink($dom.current);
  return (
    <Wrapper ref={$dom}>
      <Markdown
        disableCopy={true}
        source={mdData.source}
        rehypeRewrite={(node: Root | RootContent, index: number, parent: Root | Element) => {
          if (node.type === 'element' && parent && parent.type === 'root') {
            const menu = parent.children[1] as Element | undefined;
            let childLength = [...parent.children].filter((item) => item.type !== 'raw').length;
            const lastChild = parent.children[parent.children.length - 1];
            if (lastChild?.type === 'raw') {
              childLength = parent.children.length - 2;
            }
            if (
              (index + 1 === childLength || index - 1 === childLength || index === childLength) &&
              menu?.properties?.class !== 'menu-toc'
            ) {
              const child = [...parent.children].map((item) => {
                if (item.type === 'element' && item.tagName === 'pre') {
                  const meta = item.children[0]?.data?.meta as string;
                  // if (isMeta(meta)) {
                  //   item.tagName = 'div';
                  //   item.properties = {
                  //     ...item.properties,
                  //     'data-md': meta,
                  //     'data-meta': 'preview',
                  //   };
                  //   return { ...item };
                  // }
                }
                return item;
              });
              parent.children = [
                {
                  type: 'element',
                  tagName: 'div',
                  children: child as Element[],
                },
              ];
            }
          }
        }}
      />
    </Wrapper>
  );
};
export default PreviewDocument;
